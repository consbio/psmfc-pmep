"""Constants and helper functions used for processing estuary data"""

# Region: sorted north to south
region_codes = {
    "Salish Sea": 0,
    "Washington, Oregon, Northern California Coast": 1,
    "Central California": 2,
    "Southern California Bight": 3,
}

# Estuary type: sorted by size
type_codes = {
    "Embayment/Bay": 0,
    "Major River Delta": 1,
    "Riverine Estuary": 2,
    "Lagoonal Estuary": 3,
}


# Fields to extract from the SoK GDB
spp_fields = [
    "DungenessCrab",
    "BayShrimp",
    "GreenSturgeon",
    "LeopardShark",
    "BatRay",
    "CaliforniaHalibut",
    "EnglishSole",
    "StarryFlounder",
    "ShinerPerch",
    "StaghornSculpin",
    "PacificHerring",
    "BrownRockfish",
    "Steelhead",
    "CohoSalmon",
    "ChinookSalmon",
]


nfhp_codes = {
    "very high": 0,
    "high": 1,
    "moderate": 2,
    "low": 3,
    "very low": 4,
    # Anything missing or not otherwise scored is 5
    "not scored / unavailable at this scale": 5,
    "not scored": 5,
    "na": 5,
    "": 5,
}


### Helper functions
# PMEP polygons were ID'd starting in WA, and increment going south.  This makes it easy to get state for them
def get_state(id):
    if id <= 2024:
        return "WA"
    if id <= 2032:
        return "ORWA"
    if id <= 2086:
        return "OR"
    return "CA"
