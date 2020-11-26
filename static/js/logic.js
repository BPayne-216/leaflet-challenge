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
    function radius(magnitude) {
        return magnitude * 20000;
    }
    //  Select colors for magnitude of earthquake
    function magnaColor(magnitude) {
        if (magnitude < 1) {    
            return "#ccff33"    
        }
        else if (magnitude < 2) {
            return "#ffff33"
        }
        else if (magnitude < 3) {
            return "#ffcc33"
        }
        else if (magnitude < 4) {
            return "ff9933"
        }
        else if (magnitude < 5) {
            return "ff6633"
        }
        else {
            return "#ff3333"
        }
    }

}

