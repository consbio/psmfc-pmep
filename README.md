# West Coast Estuaries Explorer

A simple tool to explore various characteristics of estuaries along the U.S. West Coast.

This was originally built in 2017 using [Create React App](https://facebook.github.io/create-react-app/) and [Leaflet](https://leafletjs.com/) with data and tiles hosted by the Conservation Biology Institute.

This project was converted to [GatsbyJS](https://www.gatsbyjs.org/) and [MapboxGL JS](https://docs.mapbox.com/mapbox-gl-js/) in 2019 and hosted by the Pacific States Marine Fisheries Commission (PSMFC).

## Map layers

Tiles are published to ArcGIS Online by PSMFC. The lookup of the layer to the source URL and source layer is stored in `/config/map.js`. Example:

```
const boundaries = {
  tileURL: 'https://tiles.arcgis.com/tiles/kpMKjjLr8H1rZ4XO/arcgis/rest/services/PMEP_Estuary_Extent_Vector_Tiles/VectorTileServer/tile/{z}/{y}/{x}.pbf',
  sourceLayer: 'PMEP Estuary Extent:1',
}
```

`tileURL` and `sourceLayer` may need to be updated for each layer each time it is republished to ArcGIS Online.

### Boundaries:

Must contain an integer attribute `PMEP_ID` which is used to join to other attributes within this project.

### CMECS Biotic layer:

Must contain a string attribute `CMECS_ID` (TODO) which is used to join to styling and other attributes within this project.

To add a new CMECS Biotic class, add a new entry for it to `/config/constants.js::bioticInfo`. Each entry has a key for the CMECS ID, and values for labels, colors, and crosslinks:

```
  '2.5': {
    label: 'Aquatic Vegetation Bed',
    description:
      'Subtidal or intertidal bottoms and other areas dominated by rooted vascular plants, attached macroalgae, or mosses, which are usually submersed in the water column or floating on the surface. They may be exposed during low tides.',
    color: 'rgb(102, 205, 171)',
    vtID: 0, // _symbol in ArcGIS online vector tiles
    link: 'https://www.cmecscatalog.org/cmecs/classification/unit/394.html',
  },
```

Colors can be specified as RGB strings or hex codes.

### Adding a new map layer:

TODO

### Adding a new filter:

TODO

## Data processing

Data are available [here](http://www.pacificfishhabitat.org/data/). Data were downloaded on 4/19/2019.
Information on the State of the Knowledge and NFHAP status of each estuary was provided separately by PSMFC staff on 11/3/2017.

Data were processed using Python 3.6 using `tools/extract_data.py`.
This script reads from each dataset, transforms the data as needed, and creates `data/estuaries.json` with the required fields.

## Credits

Developed by the Conservation Biology Institute in partnership with the Pacific Marine and Estuarine Fish Habitat Partnership (PMEP) and North Pacific Landscape Conservation Cooperative (NPLCC).

This project was made possible by support from the US Fish and Wildlife Service - NPLCC and the Pacific States Marine Fisheries Commission.
