/*
 * Original code: https://github.com/chillly/plaques/blob/master/example3.js
 * 
 * Created by Chris Hill <osm@raggedred.net> and contributors.
 * Adapted for Wiki Loves Monuments by Emijrp <emijrp@gmail.com>
 * 
 * This software and associated documentation files (the "Software") is
 * released under the CC0 Public Domain Dedication, version 1.0, as
 * published by Creative Commons. To the extent possible under law, the
 * author(s) have dedicated all copyright and related and neighboring
 * rights to the Software to the public domain worldwide. The Software is
 * distributed WITHOUT ANY WARRANTY.
 * 
 * If you did not receive a copy of the CC0 Public Domain Dedication
 * along with the Software, see
 * <http://creativecommons.org/publicdomain/zero/1.0/>
 */
 
var map;
var layerOSM;
var layerMonuments;
var withimageicon;
var withoutimageicon;

$(document).ready(init);

function init() {
    var osmUrl='//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';    
    var osmAttrib='Map data &copy; <a href="//openstreetmap.org" target="_blank">OpenStreetMap</a> contributors | <a href="//commons.wikimedia.org/wiki/Commons:Monuments_database" target="_blank">Monuments database</a> by Wikipedia editors | <a href="//github.com/emijrp/wlm-maps" target="_blank">Source code</a> by <a href="//en.wikipedia.org/wiki/User:Emijrp" target="_blank">emijrp</a> in GitHub';
    
    withimageicon=L.icon({
    iconUrl: 'icons/withimageicon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 31],
    popupAnchor: [0, -16]
    });

    withoutimageicon=L.icon({
    iconUrl: 'icons/withoutimageicon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 31],
    popupAnchor: [0, -16]
    });

    layerOSM = new L.TileLayer(osmUrl, {
        minZoom: 2, 
        maxZoom: 19, 
        attribution: osmAttrib
    });
    
    layerMonuments = L.geoJson(null, {
        pointToLayer: setMarker,
        }
    );
    var start = new L.LatLng(0, 0);    
    
    // create the map
    map = new L.Map('mapdiv', {
        center: start,
        zoom: 2,
        layers: [layerOSM,layerMonuments]
    });
    L.control.scale().addTo(map);
    
    var baseLayers = {
        "OpenStreetMap": layerOSM
    };

    var overlays = {
        "Monuments": layerMonuments
    };

    L.control.layers(baseLayers, overlays).addTo(map);
    
    var osmGeocoder = new L.Control.OSMGeocoder();
    map.addControl(osmGeocoder);
    var hash = new L.Hash(map);
    
    // sidebar
    sidebar = L.control.sidebar('sidebar', {
        position: 'left',
        autoPan: false,
    });
    map.addControl(sidebar);
    /*setTimeout(function () {
        sidebar.show();
    }, 500);*/
    sidebar.setContent('<h1>Wiki Loves Monuments</h1>' + 
        '<p><img src="//upload.wikimedia.org/wikipedia/commons/thumb/f/f3/LUSITANA_WLM_2011_d.svg/70px-LUSITANA_WLM_2011_d.svg.png" align=right /><b>Welcome!</b> This is a map for the <a href="//commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2014" target="_blank">Wiki Loves Monument 2014</a> (<a href="//www.wikilovesmonuments.org" target="_blank">blog</a>) photographic contest. Search monuments near to you, take photos and upload them!</p>' + 
        '<h3>Legend</h3>' + 
        '<table border=0 width=300px>' + 
        '<tr><td><img src="icons/withimageicon.png" /></td><td>Monument with image</td>' + 
        '<td><img src="icons/withoutimageicon.png" /></td><td>Monument without image</td></tr>' + 
        '</table>' + 
        '<h3>Statistics</h3>' + 
        '<p>There are <a href="//tools.wmflabs.org/wlm-stats" target="_blank">statistics</a> to compare with previous editions.</p>' + 
        '<iframe src="//tools.wmflabs.org/wlm-stats/stats-2014-mini.php" width=330px height=170px frameborder=0 scrolling=no style="margin-bottom: -20px;">Browser not compatible.</iframe>' +
        '<h3>See also</h3>' + 
        '<ul style="margin-left: -20px;">' + 
        '<li><a href="//tools.wmflabs.org/wmcounter/" target="_blank">wmcounter</a>: Wikimedia projects edits counter</li>' + 
        '<li><a href="//tools.wmflabs.org/commons-coverage/" target="_blank">Commons Coverage</a>: 1 image/km<sup>2</sup>, we can do it!</li>' + 
        '<li><a href="//en.wikipedia.org/wiki/Wikipedia:There_is_a_deadline" target="_blank">There is a deadline</a>: an essay on the importance of preserving knowledge</li>' + 
        '<li><a href="//en.wikipedia.org/wiki/User:Emijrp/All_human_knowledge" target="_blank">User:Emijrp/All human knowledge</a> - estimating the number of articles needed to cover all knowledge</li>' + 
        '</ul>' + 
        ''
        );
    
    map.on('moveend', whenMapMoves);
    askForMonuments();
}

function whenMapMoves(e) {
    askForMonuments();
}

function setMarker(feature,latlng) {
    var popuptext;
    popuptext = '<table border=0 width=300px>';
    if (feature.properties.monument_article)
    {
        popuptext = popuptext + '<tr><td colspan=2><strong><a href="//'+feature.properties.lang+'.wikipedia.org/wiki/'+feature.properties.monument_article+'" target="_blank">'+feature.properties.name+'</a></strong></td></tr>';
    }else{
        popuptext = popuptext + '<tr><td colspan=2><strong>'+feature.properties.name+'</strong></td></tr>';
    }
    var thumb_url = '//upload.wikimedia.org/wikipedia/commons/thumb/' + feature.properties.md5.substring(0,1) + '/' + feature.properties.md5.substring(0,2) + '/' + feature.properties.image + '/150px-' + feature.properties.image;
    popuptext = popuptext + '<tr><td valign=top><b>ID:</b> '+feature.properties.id+'<br/><b>Country:</b> '+feature.properties.country+'</td><td><a href="//commons.wikimedia.org/wiki/File:'+feature.properties.image+'" target="_blank"><img src="'+thumb_url+'" /></a></td></tr>';
    popuptext = popuptext + '<tr><td colspan=2 style="text-align: center;font-size: 150%;"><a href="//commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=wlm-'+feature.properties.country+'&id='+feature.properties.id+'&lat='+feature.geometry.coordinates[0]+'&lon='+feature.geometry.coordinates[1]+'" target="_blank"><b>Upload your photo!</b></a></td></tr>';
    if (feature.properties.commonscat)
    {
        popuptext = popuptext + '<tr><td colspan=2 style="text-align: center;">(<a href="//commons.wikimedia.org/wiki/Category:'+feature.properties.commonscat+'" target="_blank">More images in Commons</a>)</td></tr>';
    }
    popuptext = popuptext + '</table>';
    var icon;
    if (feature.properties.image != 'Monument_unknown.png')
    {
        icon = withimageicon;
    }else{
        icon = withoutimageicon;
    }
    var monument; 
    monument=L.marker(latlng, {icon: icon});
    monument.bindPopup(popuptext, {minWidth: 300});
    return monument;
}

function askForMonuments() {
    var mobile;
    mobile = '0';
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 800 && window.innerHeight <= 600) ) {
        mobile = '1';
    }
    var data='bbox=' + map.getBounds().toBBoxString() + '&mobile=' + mobile;
    document.getElementById('wait').style.display = 'block';
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
    document.getElementById('wait').style.display = 'none';
}
