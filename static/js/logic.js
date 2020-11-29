var queryurl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// Grab the data with d3
d3.json(queryurl, function(data) {
    createFeatures(data.features);
});

//  Set the color scale for earthquakes and legend, Red through Green
function getColor(magnitude) {
    switch(true) {
        case magnitude > 5:
            return "#ff0000";
        case magnitude > 4:
            return "#ff4500";
        case magnitude > 3:
            return "#ff8c00";
        case magnitude > 2:
            return "#ffff00";
        case magnitude > 1:
            return "#ccff33";
        default:
            return "#66ff66"; 
    }
}

function createFeatures(earthquakeData) {
    // Format the Pop-up options
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3 align='center'>" + feature.properties.place +
            "</h3><hr><p><u>Earthquake Details:</u> " + new Date(feature.properties.time) + "</p>" +
            "</h3><p><u>Magnitude:</u> " + feature.properties.mag + "</p>");
    }

    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            var MarkerOptions = {
            radius: 4*feature.properties.mag,
            fillColor: getColor(feature.properties.mag),
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 1
            };
            return L.circleMarker(latlng, MarkerOptions);
        }
    });
    
    createMap(earthquakes);
}

function createMap(earthquakes) {

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: "pk.eyJ1Ijoia2FyZW5lbWNnZWUiLCJhIjoiY2sweDMzcnFmMDJmZTNjb2M2bTA0bDBsYiJ9.2VPrGXusLoJpCMfTWrgBRQ"
    });
 
    var baseMaps = {
        "Light Map": lightmap 
    };
    
    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    var map = L.map("map", {
        center: [37, -122],
        zoom: 5,
        layers: [lightmap, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {collapsed: false})
             .addTo(map);

    var legend = L.control({position: 'bottomright'});
  
    legend.onAdd = function (map) {    
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];
        
        //  Header for Legend
        div.innerHTML+='Magnitude<br><hr>'

        // Loop through data
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    
    return div;
    };
    
    legend.addTo(map);
}
