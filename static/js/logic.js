//  Set up initial URL
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Perform a Get request to the query URL
d3.json(queryUrl, function(data) {
    console.log(data);
    console.log("test");

    createFeatures(data.features);
    console.log(data.features)
});

function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer)  {
        layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"); 
    }
}

