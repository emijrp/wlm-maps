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
        pointToLayer: setMarker,
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

function style(feature) {
    return {
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.3,
                fillColor: '#ff0000'
            };
}

function setMarker(feature,latlng) {
    var monument; 
    monument=L.marker(latlng);
    popuptext = '<table border=0>';
    if (feature.properties.monument_article)
    {
        popuptext = popuptext + '<tr><td colspan=2><strong><a href="https://'+feature.properties.lang+'.wikipedia.org/wiki/'+feature.properties.monument_article+'" target="_blank">'+feature.properties.name+'</a></strong></td></tr>';
    }else{
        popuptext = popuptext + '<tr><td colspan=2><strong>'+feature.properties.name+'</strong></td></tr>';
    }
    var thumb_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/' + feature.properties.md5.substring(0,1) + '/' + feature.properties.md5.substring(0,2) + '/' + feature.properties.image + '/150px-' + feature.properties.image;
    popuptext = popuptext + '<tr><td valign=top><b>ID:</b> '+feature.properties.id+'<br/><b>Country:</b> '+feature.properties.country+'</td><td><a href="https://commons.wikimedia.org/wiki/File:'+feature.properties.image+'" target="_blank"><img src="'+thumb_url+'" /></a></td></tr>';
    popuptext = popuptext + '<tr><td colspan=2 style="text-align: center;font-size: 150%;"><a href="https://commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=wlm-'+feature.properties.country+'&id='+feature.properties.id+'&lat='+feature.geometry.coordinates[0]+'&lon='+feature.geometry.coordinates[1]+'" target="_blank"><b>Upload your photo!</b></a></td></tr>';
    if (feature.properties.commonscat)
    {
        popuptext = popuptext + '<tr><td colspan=2 style="text-align: center;">(<a href="https://commons.wikimedia.org/wiki/Category:'+feature.properties.commonscat+'" target="_blank">More images in Commons</a>)</td></tr>';
    }
    popuptext = popuptext + '</table>';
    monument.bindPopup(popuptext);
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
