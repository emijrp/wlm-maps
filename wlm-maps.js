/*
 * global variables
 */
var map; // global map object
var layerOSM; // the Mapnik base layer of the map
var layerMonuments; // the geoJson layer to display monuments with

// when the whole document has loaded call the init function
$(document).ready(init);

function init() {
    // map stuff
    // base layer
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';    
    var osmAttrib='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors | <a href="https://commons.wikimedia.org/wiki/Commons:Monuments_database">Monuments database</a> by Wikipedia editors | <a href="https://github.com/emijrp/wlm-maps">Source code</a> in GitHub';
    
    layerOSM = new L.TileLayer(osmUrl, {
        minZoom: 2, 
        maxZoom: 19, 
        attribution: osmAttrib
    });
    
    // a geojson layer
    layerMonuments = L.geoJson(null, {
        pointToLayer: setMarker
        }
    );
    
    // set the starting location for the centre of the map
    var start = new L.LatLng(0, 0);    
    
    // create the map
    map = new L.Map('mapdiv', {        // use the div called mapdiv
        center: start,                // centre the map as above
        zoom: 2,                    // start up zoom level
        layers: [layerOSM,layerMonuments]        // layers to add 
    });
    
    // create a layer control
    // add the base layers
    var baseLayers = {
        "OpenStreetMap": layerOSM
    };

    // add the overlays
    var overlays = {
        "Monuments": layerMonuments
    };

    // add the layers to a layer control
    L.control.layers(baseLayers, overlays).addTo(map);
    
    // create the hash url on the browser address line
    var hash = new L.Hash(map);
    
    map.on('moveend', whenMapMoves);
    askForMonuments();
}

function whenMapMoves(e) {
    askForMonuments();
}

function setMarker(feature,latlng) {
    var monument; 
    monument=L.marker(latlng, {'marker-color': '#F00'});
    monument.bindPopup('<table><tr><td><strong><a href="'+feature.properties.monument_article+'" target="_blank">'+feature.properties.name+'</a></strong></td></tr><tr><td><a href="'+feature.properties.image_url+'" target="_blank"><img src="'+feature.properties.thumb_url+'" /></a></td></tr><tr><td><a href="'+feature.properties.upload_url+'" target="_blank">Upload your photo</a></td></tr></table>');
    return monument;
}

function askForMonuments() {
    var data='bbox=' + map.getBounds().toBBoxString();
    $.ajax({
        url: 'ajaxmonuments.php',
        dataType: 'json',
        data: data,
        success: showMonuments
    });
}

function showMonuments(ajaxresponse) {
    layerMonuments.clearLayers();
    layerMonuments.addData(ajaxresponse);
}
