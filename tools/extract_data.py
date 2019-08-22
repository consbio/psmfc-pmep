# Export attributes for PMEP estuaries.
from io import BytesIO
import os
import json
from pathlib import Path
from PIL import Image
import requests
import pandas as pd
import geopandas as gp

from constants import (
    get_state,
    spp_fields,
    nfhp_codes,
    region_codes,
    type_codes,
    thumbnail_size,
    get_photo_credit_code,
)

# If QA is True, save a copy of the final dataframe as a CSV file or feather file
# for review in data_dir / "qa"
QA = True

# locations are relative to project repository root
data_dir = Path("../data/pmep")
image_dir = Path("./src/images/aerial")
out_dir = Path("./data")

# Data are downloaded from: http://www.pacificfishhabitat.org/data/
boundaries_gdb = "PMEP_West_Coast_USA_Estuary_Extent_V1.gdb"
points_gdb = "PMEP_Estuary_Points_V1_3.gdb"
biotic_gdb = "PMEP_West_Coast_USA_Estuarine_Biotic_Habitat_V1_1.gdb"
twl_gdb = "PMEP_Tidal_Wetland_Loss_V1.gdb"

# State of the Knowledge and NFHAP summary data
# Sent by PSFMC staff separately on 11/3/2017
sok_gdb = "PMEP_SoKData_ForSharing.gdb"
sok_fc = "PMEP_SoK_SpeciesPresence"
nfhp_fc = "PMEP_EstuaryExtent_NFHPScores"

photo_filename = "PMEP_Estuary_Image_Links.csv"

### Read in Boundary and center point info
print("Reading Estuary boundaries")
df = gp.read_file(data_dir / boundaries_gdb)[
    [
        "PMEP_EstuaryID",
        "geometry",
        "Estuary_Name",
        "CMECS_Class",
        "PMEP_Region",
        "Estuary_Hectares",
    ]
].rename(
    columns={
        "PMEP_EstuaryID": "id",
        "Estuary_Name": "name",
        "CMECS_Class": "estuaryType",
        "PMEP_Region": "region",
        "Estuary_Hectares": "hectares",
    }
)

# Filter out boundaries with empty geometries
df = df[df.geometry.notnull()].copy()

# Calculate acres
df["acres"] = (df.hectares * 2.47105).round(0).astype("int")
df = df.drop(columns=["hectares"])

df["state"] = df.id.apply(get_state)

# Convert region and type to codes for smaller file
df.region = df.region.map(region_codes)
df.estuaryType = df.estuaryType.map(type_codes)

# Project feature envelopes to WGS84 and derive approx bounds in geographic coordinates,
# rounded to 2 decimal places, as a list
print("Calculating geographic bounds")
bounds = pd.Series(
    df.geometry.envelope.to_crs({"init": "EPSG:4326"})
    .bounds.round(2)
    .apply(lambda row: list(row), axis=1),
    name="bounds",
)

# Join in bounds and drop geometry (no longer needed)
df = (
    pd.DataFrame(df.drop(columns=["geometry"])).join(bounds).set_index("id", drop=False)
)


### Read in esturary points and project to WGS84
print("reading points")

pts = (
    gp.read_file(data_dir / points_gdb)
    .set_index("PMEP_EstuaryID")
    .to_crs({"init": "EPSG:4326"})
)
pts["lon"] = pts.geometry.apply(lambda g: g.x)
pts["lat"] = pts.geometry.apply(lambda g: g.y)
pts = pts[["lon", "lat"]].round(3)


### Read in SoK species and NFHP scores
print("Reading species and NFHAP data")

# Note: drop any records that are completely empty
spps = (
    gp.read_file(data_dir / sok_gdb, layer=sok_fc)
    .set_index(["PMEP_EstuaryID"])[spp_fields + ["DataQualityIndex"]]
    .rename(columns={"DataQualityIndex": "SoKJoin"})
).fillna("")

# collapse species down to a list of species:life stage for each species that is P or J
spps["species"] = spps[spp_fields].apply(
    lambda row: [
        "{}:{}".format(species, stage) for species, stage in row[row != ""].iteritems()
    ],
    axis=1,
)
spps = spps[["species", "SoKJoin"]]


### Read NFHAP data, only keep Rating from 2015
nfhp = (
    gp.read_file(data_dir / sok_gdb, layer=nfhp_fc)[
        ["PMEP_EstuaryID", "DataQualityIndex", "Rating_2015"]
    ]
    .set_index(["PMEP_EstuaryID"])
    .rename(columns={"DataQualityIndex": "NFHPJoin", "Rating_2015": "nfhp2015"})
)

# Convert NFHP to codes to make file smaller
nfhp.nfhp2015 = nfhp.nfhp2015.str.lower().map(nfhp_codes).fillna(5).astype("uint8")


### Read in CMECS Biotic data to get a lookup of area for each type
print("Reading biotic data, this might take a while...")

# We do not need the geometry here
biotic = gp.read_file(data_dir / biotic_gdb)[
    ["PMEP_EstuaryID", "Acres", "CMECS_BC_Code"]
].rename(columns={"Acres": "acres", "CMECS_BC_Code": "type"})

# Filter out CMECS 9.9.9.9.9
biotic = biotic.loc[biotic.type != "9.9.9.9.9"].copy()

# Calculate total area for each type per estuary and join into a list of [type:acres, ...]
acres_by_type = (
    biotic.groupby(["PMEP_EstuaryID", "type"], as_index=False)["acres"].sum().round(2)
)

# filter out areas <= 0
acres_by_type = acres_by_type.loc[acres_by_type.acres > 0].copy()

acres_by_type["biotic_acres"] = acres_by_type.apply(
    lambda x: "{0}:{1:g}".format(x.type, x.acres), axis=1
)
biotic_areas = acres_by_type.groupby(["PMEP_EstuaryID"])["biotic_acres"].apply(list)

# this is series, add a name so we can join it with this name
biotic_areas.name = "biotic"


### Tidal wetland loss
print("Reading tidal wetland loss")
twl = gp.read_file(data_dir / twl_gdb).set_index("PMEP_EstuaryID")
# discard areas of open water
twl = twl.loc[twl.TWL_Type != "N/A"].copy()

# calculate the total area of tidal wetlands (lost & retained) by estuary
# convert hectares to acres and round to nearest acre
tw_acres = (
    (twl.groupby("PMEP_EstuaryID").TWL_Hectares.sum() * 2.47105)
    .round(0)
    .astype("Int64")
    .rename("twAcres")
)
# calculate the area lost
twl_acres = (
    (
        twl.loc[twl.TWL_Type == "lost"].groupby("PMEP_EstuaryID").TWL_Hectares.sum()
        * 2.47105
    )
    .round(0)
    .astype("Int64")
    .rename("twlAcres")
)


### Photos
image_df = (
    pd.read_csv(data_dir / photo_filename)
    .set_index("PMEP_EstuaryID")
    .rename(columns={"Image_Link": "imageURL"})
)

# Only process those with images
image_df = image_df.loc[~image_df.imageURL.isnull()].copy()

### Download and resize photos
for id, row in image_df.iterrows():
    outfilename = image_dir / "{}.jpg".format(id)

    # Skip existing files
    if os.path.exists(outfilename):
        continue

    print("Downloading {}...".format(id))
    r = requests.get(row.imageURL)
    img = Image.open(BytesIO(r.content))

    # Convert to RGB so we can output as a JPG
    if img.mode == "RGBA":
        img = img.convert("RGB")

    # Create thumbnail, automatically handles aspect ratio based on smallest dimension
    img.thumbnail((thumbnail_size, thumbnail_size * 2))
    img.save(outfilename)


# drop constant part of URL
image_df.imageURL = image_df.imageURL.str.replace(
    "https://maps.psmfc.org/imagelibrary/PMEP/Images/Estuary_Images/", ""
)
image_df["imageCredits"] = image_df.Credits.apply(get_photo_credit_code)
image_df = image_df[["imageURL", "imageCredits"]]


### Join everything together
df = (
    df.join(pts)
    .join(spps)
    .join(nfhp)
    .join(biotic_areas)
    .join(tw_acres)
    .join(twl_acres)
    .join(image_df)
)

# Remove duplicate rows
df = df[~df.index.duplicated(keep="first")]


# For debugging, write to a CSV or feather file
if QA:
    qa_dir = data_dir / "qa"
    if not os.path.exists(qa_dir):
        os.makedirs(qa_dir)

    print("Exporting to CSV")
    df.to_csv("pmep_estuaries.csv", index=False)


# Convert to JSON for frontend
# Note: ID must be a string to work in graphql, we will convert back to an integer on frontend
df.id = df.id.astype("str")
with open(out_dir / "estuaries.json", "w") as outfile:
    # Write JSON, dropping any values that are null
    outfile.write(json.dumps([row.dropna().to_dict() for index, row in df.iterrows()]))

