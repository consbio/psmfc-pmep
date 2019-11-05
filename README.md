# West Coast Estuaries Explorer

This application allows you to easily explore estuaries along the U.S. West Coast.

This application was developed by the [Conservation Biology Institute](https://consbio.org/) in partnership with the [Pacific Marine & Estuarine Fish Habitat Partnership](http://www.pacificfishhabitat.org/) (PMEP), [Pacific States Marine Fisheries Commission](https://www.psmfc.org/) (PSMFC), and U.S. Fish and Wildlife Service - [North Pacific Landscape Conservation Cooperative](http://northpacificlcc.org/) (NPLCC).

Data on estuary boundaries, biotic habitats, and focal species presence were developed by PMEP and are available for download [here](http://www.pacificfishhabitat.org/data/).

## Architecture

This application is a Javascript-based static web application, created using GatsbyJS and React.

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

Must contain a string attribute `CMECS_ID` which is used to join to styling and other attributes within this project.

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

Create a vector tile service with the data layer, or include as a layer within an existing vector tile service (vector tile services can have multiple layers). At minimum, this layer must contain the property (attribute) that is used for display and for filtering if this layer is also to be filtered.

For example, the estuaries boundaries layer must contain the property `PMEP_ID` because it is used to filter estuaries. The biotic habitat layer must contain the property `CMECS_BC_Code` because this is used for display.

#### Update `config/map.js`:

Add a new object toward the top of the file with the following information:

```
export const myLayer = {
  tileURL: '<url of tile service>',
  sourceLayer: '<layer in tile service>',
  idProperty: '<id property used to uniquely identify each feature>'
}
```

`idProperty` is only relevant if used for filtering.

Sources and layers are defined according to the [Mapbox GL style specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/).

Add an entry for this to `sources` object:

```
sources = {
  ...,
  myLayer: {
    type: 'vector',
    tiles: [myLayer.tileURL],
    minzoom: <min zoom level of vector tile SOURCE>,
    maxzoom: <max zoom level of vector tile SOURCE>,
    tileSize: <tile size used when creating tiles: 256 or 512>
  },
}
```

This defines the source tile service and associated properties so that one or more layers can be created against it within the map. More information on vector tile sources [here](https://docs.mapbox.com/mapbox-gl-js/style-spec/#sources-vector).

Add an entry for this source to the `layers` array. Layers in Mapbox GL can be quite complex and creating them is outside the scope for this README. See the [layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers) documentation for more information.

Note: in order to show a polygon layer with border and fill styles, you need to define 2 layers: one for the fill (`type: 'fill'`), and one for the border (`type: 'line'`)

For example, the following shows a basic border style that is 1px wide black (hex: `#000`):

```
layers = [
  ...,
  {
    id: 'myLayer',
    source: 'myLayer',  // must match the entry in the sources object abovce
    'source-layer': myLayer.sourceLayer,
    minzoom: <min zoom level for DISPLAY>,
    maxzoom: <max zoom level for DISPLAY>,  // can be higher than maxzoom of source
    type: 'line',
    paint: {
      'line-width': 1,
      'line-opacity': 1,
      'line-color': '#000',
    },
  },
]
```

To include in the legend, add an entry to `legends`:

```
legends = {
  ...,
  getLegend: features => {
    return [
      {
        type: 'fill', // or 'circle'
        label: 'Label for value 1',
        color: '#F00',  // fill color
        borderColor: '#AAA', // optional
        borderWidth: 1 // optional
      },
      ...
    ]
  }
}
```

The `getLegend` function is called against this layer based on the features that are visible in the map for a particular zoom level and extent. For example, the legend for biotic habitat shows a color for each of the visible biotic habitat types. It must return an array of entries based on the feature values passed in. See existing legends for examples.

Adding click, hover, or filtering interaction for this layer is more complex and outside the scope of this README. Custom code will need to be added to `src/components/Map/index.jsx` for this specific layer.

### Adding layer information to estuary details

The data to be shown for this layer in the estuaries view needs to be included in the `data/estuaries.json` file. Depending on the nature of the data, it may need to be structured in a particular way. This will require obtaining and standardizing the input data (e.g., ensuring that it is in WGS 84 projection and can be easily joined to existing estuary data on `PMEP_ID`). This will also require modifying `tools/extract_data.py` to preprocess the data into the appropriate format.

Once the entry has been added for each estuary into `data/estuaries.json`, the data import component in `src/components/Data/index.jsx` needs to be updated to add add that field name to the list of imported fields in the GraphQL query at the top of that component. More information on GraphQL [here](https://graphql.org/).

Important note: do not name your field any one of the reserved GraphQL keywords (e.g., `id`, `type`, etc) as this may create errors that are difficult to troubleshoot.

If necessary to decode or convert the type of the data for that field during import, add an entry below the query to convert the value for that field.

Custom development is required in `src/components/EstuaryDetails/*` to display this new data. Depending on the level of complexity, this may require one or more new component in that directory. Developing custom components is outside the scope of this README.

### Adding a new filter:

The field used for filtering must first be added to `data/estuaries.json` and imported as described above.

Update `config/filters.js` to add a new entry to the `filters` array:

```
filters = [
  ...,
  {
    field: '<name of field in record>',
    internal: false, // optional
    getValue: record => {...return field value from record...}, // optional
    filterFunc: filterValues => recordValue => {...return true if record value meets conditions of filterValues...},
    values: <array of values to use for filtering field>,
    labels: <array of labels to show for values, if different than values> // optional
  }
]
```

This filter object provides all the information needed to register this new filter within the `crossfilter` index.

If `internal` is present and `true` this filter is accessible for internal filtering but not displayed in the list of filters to the user. Example: `bounds` used to filter records based on the bounds of the map. Internal filters require custom code in the appropriate view.

`getValue` is a function that takes a record as input, and returns the value for this field. You can convert the type or otherwise transform the field value to use for filtering. Note: each record is an `ImmutableJS` `Map` object, so you need to use the `Map` API to acccess the appropriate value. By default, this returns the raw value for the `field`, so `getValue` is only necessary if you need to transform the value of that field before adding it to the index.

`filterFunc` is a function that takes an object, generally an `ImmutableJS` `Set` with the values selected by the user for filtering. This function needs to return a function that takes a value for a singular record as input and returns `true` or `false` based on whether that record meets the criteria of the filter values. The most common case is to return `true` if the value for that field in the record is present in `filterValues`.

`values` is an array of all possible values for this particular field. For example, this would be the list of codes for biotic habitat types.

`labels` is an array of labels to show for the above values next to the filter bars. It must be in the same order as `values`.

The non-internal filters in `filters` are displayed to the user in the order they appear within this attribute.

**Note:**
In general, the array of values and labels are stored in `config/constants.js` so that they can also be used in other parts of the application. These need to be added to the `import` list at the top of `config/filters.js`.

## Data processing

Data are available [here](http://www.pacificfishhabitat.org/data/). Data were downloaded on 4/19/2019.
Information on the State of the Knowledge and NFHAP status of each estuary was provided separately by PSMFC staff on 11/3/2017.

Data were processed using Python 3.6 using `tools/extract_data.py`.
This script reads from each dataset, transforms the data as needed, and creates `data/estuaries.json` with the required fields.

## Estuary Photos

Oblique aerial imagery was captured by the [Washington State Department of Ecology](https://fortress.wa.gov/ecy/shorephotoviewer/), [Oregon ShoreZone](https://www.oregonshorezone.info/images.html) project, and supplemented with imagery from Google Earth.

Representative photos were obtained by Brett Holycross (PSMFC) and hosted on PSMFC servers.

These photos were processed into smaller versions for use in this application using `tools/extract_data.py`.

## Changes

This was originally built in 2017 using [Create React App](https://facebook.github.io/create-react-app/) and [Leaflet](https://leafletjs.com/) and hosted as part of the North Pacific Landscape Conservation Cooperative's (NPLCC) [Conservation Planning Atlas in Data Basin](https://nplcc.databasin.org/).

This project has since been converted to [GatsbyJS](https://www.gatsbyjs.org/) and [MapboxGL JS](https://docs.mapbox.com/mapbox-gl-js/) in 2019 and hosted by the Pacific States Marine Fisheries Commission (PSMFC). This migration is described in more detail in this [article](https://medium.com/@brendan_ward/migrating-from-create-react-app-and-leaflet-to-gatsbyjs-and-mapbox-gl-98b49c2e75c4).

## Credits

This project was made possible by financial support from the NPLCC and National Oceanic and Atmospheric Administration - [Office of Habitat Conservation](https://www.fisheries.noaa.gov/about/office-habitat-conservation).
