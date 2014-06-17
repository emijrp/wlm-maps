/*
 * global variables
 */
var map;			// global map object
var lyrOsm;			// the Mapnik base layer of the map
var lyrPlq;			// the geoJson layer to display plaques with
var blueicon;		// a blue icon for blue plaques	
var greenicon;		// a green icon for green plaques
var whiteicon;		// a white icon for white plaques

// when the whole document has loaded call the init function
$(document).ready(init);

function init() {		
	// map stuff
	// create the icons
	blueicon=L.icon({
		iconUrl: 'images/blueplaque.png',
		iconSize:     [24, 24], // size of the icon
		iconAnchor:   [12, 23],	// point of the icon which will correspond to marker's location
		popupAnchor:  [0, -12]  // point from which the popup should open relative to the iconAnchor
	});
	greenicon=L.icon({
		iconUrl: 'images/greenplaque.png',
		iconSize:     [24, 24], // size of the icon
		iconAnchor:   [12, 23],	// point of the icon which will correspond to marker's location
		popupAnchor:  [0, -12]  // point from which the popup should open relative to the iconAnchor

	});
	whiteicon=L.icon({
		iconUrl: 'images/whiteplaque.png',
		iconSize:     [24, 24], // size of the icon
		iconAnchor:   [12, 23],	// point of the icon which will correspond to marker's location
		popupAnchor:  [0, -12]  // point from which the popup should open relative to the iconAnchor

	});
	
	// base layer
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';    
	var osmAttrib='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	
	lyrOsm = new L.TileLayer(osmUrl, {
		minZoom: 1, 
		maxZoom: 19, 
		attribution: osmAttrib
	});
	
	// a geojson layer
	lyrPlq = L.geoJson(null, {
		pointToLayer: setIcon
		}
	);
	
	// set the starting location for the centre of the map
	var start = new L.LatLng(44, 7);	
	
	// create the map
	map = new L.Map('mapdiv', {		// use the div called mapdiv
		center: start,				// centre the map as above
		zoom: 1,					// start up zoom level
		layers: [lyrOsm,lyrPlq]		// layers to add 
	});
	
	// create a layer control
	// add the base layers
	var baseLayers = {
		"OpenStreetMap": lyrOsm
	};

	// add the overlays
	var overlays = {
		"Monuments": lyrPlq
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

function setIcon(feature,ll) {
	var plq; 
	if (feature.properties.image!='') {
		plq=L.marker(ll, {icon: greenicon});
	}
	else {
		plq=L.marker(ll, {icon: whiteicon});
	}
	plq.bindPopup(feature.properties.plaquedesc);
	return plq;
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
	lyrPlq.clearLayers();
	lyrPlq.addData(ajaxresponse);
}
