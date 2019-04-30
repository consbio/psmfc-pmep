# Export attributes for PMEP estuaries.

import os
import pandas as pd
import geopandas as gp

from constants import get_state, spp_fields, nfhp_codes, region_codes, type_codes


# locations are relative to project repository root
data_dir = "../data/pmep"
out_dir = "./data"

# Data are downloaded from: http://www.pacificfishhabitat.org/data/
boundaries_gdb = "PMEP_West_Coast_USA_Estuary_Extent_V1.gdb"
points_gdb = "PMEP_Estuary_Points_V1_3.gdb"
biotic_gdb = "PMEP_West_Coast_USA_Estuarine_Biotic_Habitat_V1_1.gdb"

# State of the Knowledge and NFHAP summary data
# Sent by PSFMC staff separately on 11/3/2017
sok_gdb = "PMEP_SoKData_ForSharing.gdb"
sok_fc = "PMEP_SoK_SpeciesPresence"
nfhp_fc = "PMEP_EstuaryExtent_NFHPScores"


### Read in Boundary and center point info
print("Reading Estuary boundaries")
df = gp.read_file(os.path.join(data_dir, boundaries_gdb))[
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
    gp.read_file(os.path.join(data_dir, points_gdb))
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
    gp.read_file(os.path.join(data_dir, sok_gdb), layer=sok_fc)
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
    gp.read_file(os.path.join(data_dir, sok_gdb), layer=nfhp_fc)[
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
biotic = gp.read_file(os.path.join(data_dir, biotic_gdb))[
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

# Previous version joined these to a single pipe delimited field:
# biotic_areas = acres_by_type.groupby(["PMEP_EstuaryID"])["biotic_acres"].agg(
#     lambda x: "|".join(x.unique())
# )

# this is series, add a name so we can join it with this name
biotic_areas.name = "biotic"

# NOT USED
# # Group by PMEP_EstuaryID and aggregate into a list of dicts: [{"type": <type>, "acres": <acres>}, ...]
# biotic_areas = acres_by_type.groupby("PMEP_EstuaryID")[["type", "acres"]].apply(
#     lambda x: x.to_dict(orient="records")
# )
# # this is series, add a name so we can join it with this name
# biotic_areas.name = "biotic"


### Join everything together
df = df.join(pts).join(spps).join(nfhp).join(biotic_areas)

# Remove duplicate rows
df = df[~df.index.duplicated(keep="first")]


# For debugging, write to a CSV
# print("Exporting to CSV")
# df.to_csv("pmep_estuaries.csv", index=False)


# Convert to JSON for frontend
# Note: ID must be a string to work in graphql, we will convert back to an integer on frontend
df.id = df.id.astype("str")
df.to_json(os.path.join(out_dir, "estuaries.json"), orient="records")

