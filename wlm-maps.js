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
var layerNoPicMonuments;
var layerWithPicMonuments;
var withimageicon;
var withoutimageicon;
var browserlang;
var withimage;
var withoutimage;
var encodedCSVUri;
var featureCollection;

if (navigator.systemLanguage) {
    browserlang = navigator.systemLanguage;
}else if (navigator.userLanguage) {
    browserlang = navigator.userLanguage;
}else if(navigator.language) {
    browserlang = navigator.language;
}else {
    browserlang = 'en';
}
browserlang = browserlang.split('-')[0];

$(document).ready(init);

function geohack(latd,lond) {
    if ( latd != '' ) {
        sign = latd > 0 ? 1 : -1;
        lat4 = latd > 0 ? 'N' : 'S';
        latd *= sign;
        lat1 = Math.floor ( latd );
        lat2 = Math.floor ( ( latd - lat1 ) * 60 );
        lat3 = Math.floor ( ( latd - lat1 - lat2 / 60 ) * 3600 );
    }
    
    if ( lond != '' ) {
        sign = lond > 0 ? 1 : -1;
        lon4 = lond > 0 ? 'E' : 'W';
        lond *= sign;
        lon1 = Math.floor ( lond ) ;
        lon2 = Math.floor ( ( lond - lon1 ) * 60 );
        lon3 = Math.floor ( ( lond - lon1 - lon2 / 60 ) * 3600 );
    }
    var p = lat1 + '_' + lat2 + '_' + lat3 + '_' + lat4 + '_';
    p += lon1 + '_' + lon2 + '_' + lon3 + '_' + lon4;
    return p;
}

function getfacebook (country) {
    var facebook = 'https://www.facebook.com/WikiLovesMonuments';
    switch (country) {
        case 'br': facebook = 'https://www.facebook.com/WikiLovesMonumentsBrasil'; break;
        case 'ch': facebook = 'https://www.facebook.com/WikilovesmonumentsCH'; break;
        case 'cl': facebook = 'https://www.facebook.com/wlmcl'; break;
        case 'dz': facebook = 'https://www.facebook.com/WikiDezed'; break;
        case 'en': facebook = 'https://www.facebook.com/WikiLovesMonuments'; break;
        case 'fr': facebook = 'https://www.facebook.com/WikiLovesMonumentsFrance'; break;
        case 'in': facebook = 'https://www.facebook.com/WikiLovesMonumentsIndia'; break;
        case 'it': facebook = 'https://www.facebook.com/WikiLovesMonumentsItalia'; break;
        case 'mx': facebook = 'https://www.facebook.com/WikiLovesMonumentsMexico'; break;
        case 'nl': facebook = 'https://www.facebook.com/WikiLovesMonumentsNL'; break;
        case 'pa': facebook = 'https://www.facebook.com/pages/Wiki-Loves-Monuments-Panama-2013/319795771436882'; break;
        case 'rs': facebook = 'https://www.facebook.com/WikiLovesMonumentsSerbia'; break;
        case 'za': facebook = 'https://www.facebook.com/WLMZA'; break;
        
        default: facebook = 'https://www.facebook.com/WikiLovesMonuments';
    }
    return facebook;
}

function gettwitter (country) {
    var twitter = 'wikimonuments';
    switch (country) {
        case 'at': twitter = 'WikimediaAT'; break;
        case 'br': twitter = 'WLM_BRASIL'; break;
        case 'cl': twitter = 'wikimedia_cl'; break;
        case 'cm': twitter = 'WLM_CM'; break;
        case 'co': twitter = 'wlmco'; break;
        case 'dz': twitter = 'WikimediaDZ'; break;
        case 'en': twitter = 'wikimonuments'; break;
        case 'es': twitter = 'wikimedia_es'; break;
        case 'fr': twitter = 'WLM_Fr'; break;
        case 'hu': twitter = 'WikimediaHU'; break;
        case 'il': twitter = 'WikimediaIL'; break;
        case 'in': twitter = 'wlmindia'; break;
        case 'mx': twitter = 'Wikimedia_mx'; break;
        case 'my': twitter = 'WLMMalaysia'; break;
        case 'nl': twitter = 'WLM_Nederland'; break;
        case 'pa': twitter = 'WLMPanama'; break;
        case 'pk': twitter = 'Wikimedia_PK'; break;
        case 'ru': twitter = 'Wikimedia_RU'; break;
        case 'se': twitter = 'WikimediaSE'; break;
        case 'sv': twitter = 'wlmElSalvador'; break;
        case 'tn': twitter = 'WikimediaTN'; break;
        case 'uk': twitter = 'WikiLovesUK'; break;
        case 'uy': twitter = 'wikimedia_uy'; break;
        case 'za': twitter = 'WLM_ZA'; break;
        
        default: twitter = 'wikimonuments';
    }
    return twitter;
}

function getwebsite (country) {
    var website = 'http://www.wikilovesmonuments.org';
    switch (country) {
        case 'al': website = 'http://wikilovesmonuments.al'; break;
        case 'am': website = 'https://hy.wikipedia.org/wiki/%D5%8E%D5%AB%D6%84%D5%AB%D5%BA%D5%A5%D5%A4%D5%AB%D5%A1:%D5%8E%D5%AB%D6%84%D5%AB%D5%B6_%D5%BD%D5%AB%D6%80%D5%B8%D6%82%D5%B4_%D5%A7_%D5%B0%D5%B8%D6%82%D5%B7%D5%A1%D6%80%D5%B1%D5%A1%D5%B6%D5%B6%D5%A5%D6%80_2016'; break;
        case 'at': website = 'http://wikilovesmonuments.at'; break;
        case 'az': website = 'https://az.wikipedia.org/wiki/Vikipediya:Viki_Abid%C9%99l%C9%99ri_Sevir_2016'; break;
        case 'br': website = 'https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:Wiki_Loves_Monuments_2016/Brasil'; break;
        case 'cm': website = 'http://cm.wikilovesmonuments.org'; break;
        case 'co': website = 'http://wikilovesmonuments.co'; break;
        case 'de': website = 'http://wikilovesmonuments.de'; break;
        case 'dz': website = 'http://wlm.wikimedia-dz.org/index.php/fr/'; break;
        case 'eg': website = 'https://ar.wikipedia.org/wiki/%D9%88%D9%8A%D9%83%D9%8A%D8%A8%D9%8A%D8%AF%D9%8A%D8%A7:%D8%A7%D9%84%D9%88%D9%8A%D9%83%D9%8A_%D8%AA%D9%87%D9%88%D9%89_%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D9%84%D9%85_2016/%D9%85%D8%B5%D8%B1#.D8.B4.D8.B1.D9.88.D8.B7_.D8.A7.D9.84.D9.85.D8.B3.D8.A7.D8.A8.D9.82.D8.A9'; break;
        case 'ee': website = 'http://wikilovesmonuments.ee'; break;
        case 'en': website = 'http://www.wikilovesmonuments.org'; break;
        case 'es': website = 'http://www.wikilm.es'; break;
        case 'fr': website = 'http://wikilovesmonuments.fr'; break;
        case 'ie': website = 'http://www.wikilovesmonuments.ie'; break;
        case 'il': website = 'http://www.wlm.org.il'; break;
        case 'in': website = 'https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2013_in_India'; break; //LOST http://wikilovesmonuments.in
        case 'ir': website = 'https://fa.wikipedia.org/wiki/%D9%88%DB%8C%DA%A9%DB%8C%E2%80%8C%D9%BE%D8%AF%DB%8C%D8%A7:%D9%88%DB%8C%DA%A9%DB%8C_%D8%AF%D9%88%D8%B3%D8%AA%D8%AF%D8%A7%D8%B1_%DB%8C%D8%A7%D8%AF%D9%85%D8%A7%D9%86%E2%80%8C%D9%87%D8%A7_%DB%B2%DB%B0%DB%B1%DB%B5_%D8%A7%DB%8C%D8%B1%D8%A7%D9%86'; break;
        case 'it': website = 'http://wikilovesmonuments.wikimedia.it'; break;
        case 'lv': website = 'https://lv.wikipedia.org/wiki/Vikiprojekts:Kult%C5%ABras_pieminek%C4%BCi_Vikip%C4%93dij%C4%81_2016'; break;
        case 'mk': website = 'http://wikilovesmonuments.mk'; break;
        case 'my': website = 'http://2016.wikilovesmonuments.my'; break;
        case 'nl': website = 'http://www.wikimedia.nl/project/wiki-loves-monuments'; break;
        case 'no': website = 'https://no.wikipedia.org/wiki/Wikipedia:Wiki_Loves_Monuments_2016'; break;
        case 'np': website = 'https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2016_in_Nepal'; break;
        case 'pa': website = 'https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2013_in_Panama'; break; //LOST http://www.wlmpanama.org.pa
        case 'pk': website = 'https://en.wikipedia.org/wiki/Wikipedia:Wiki_Loves_Monuments_Pakistan'; break;
        case 'ro': website = 'http://wikilovesmonuments.ro'; break;
        case 'rs': website = 'http://wikilovesmonuments.al'; break; // same as Albania
        case 'ru': website = 'https://ru.wikimedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8_%D0%BB%D1%8E%D0%B1%D0%B8%D1%82_%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%BD%D0%B8%D0%BA%D0%B8-2016'; break;
        case 'se': website = 'https://www.wikimedia.se/sv/wlm/'; break;
        case 'sk': website = 'http://wikilovesmonuments.sk'; break;
        case 'th': website = 'http://www.wmth.org'; break;
        case 'tn': website = 'http://www.wikilovesmonuments.tn'; break;
        case 'ua': website = 'http://wikilovesmonuments.org.ua'; break;
        case 'uk': website = 'http://www.wikilovesmonuments.org.uk'; break;
        case 'za': website = 'http://wikilovesmonuments.co.za/wiki/Main_Page'; break;
        
        default: website = 'http://www.wikilovesmonuments.org';
    }
    return website;
}

function init() {
    var osmUrl='//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';    
    var osmAttrib=translatemsg('osm-attrib');
    
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
    
    layerNoPicMonuments = L.geoJson(null, {
        pointToLayer: setMarker,
        }
    );
    layerWithPicMonuments = L.geoJson(null, {
        pointToLayer: setMarker,
        }
    );
    var start = new L.LatLng(0, 0);    
    
    // create the map
    map = new L.Map('mapdiv', {
        zoomControl: false,
        center: start,
        zoom: 2,
        layers: [layerOSM,layerNoPicMonuments,layerWithPicMonuments]
    });
    map.addControl(
        L.control.zoom({
            'zoomInTitle':translatemsg('zoom-in'),
            'zoomOutTitle':translatemsg('zoom-out')
        })
    );
    L.control.scale().addTo(map);
    
    var baseLayers = {
        "OpenStreetMap": layerOSM
    };

    var overlays = {}
    overlays[translatemsg('monument-without-image')] = layerNoPicMonuments;
    overlays[translatemsg('monument-with-image')] = layerWithPicMonuments;

    L.control.layers(baseLayers, overlays).addTo(map);
    
    var osmOptions = {text: translatemsg('locate')};
    var osmGeocoder = new L.Control.OSMGeocoder(osmOptions);
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
        '<p><img src="//upload.wikimedia.org/wikipedia/commons/thumb/f/f3/LUSITANA_WLM_2011_d.svg/70px-LUSITANA_WLM_2011_d.svg.png" align=right />' + translatemsg('welcome') + '</p>' + 
        
        '<h3>' + translatemsg('legend') + '</h3>' + 
        '<table border=0 width=300px>' + 
        '<tr><td><img src="icons/withimageicon.png" /></td><td>' + translatemsg('monument-with-image') + ' (<span id="withimage">&nbsp;</span>)</td>' + 
        '<td><img src="icons/withoutimageicon.png" /></td><td>' + translatemsg('monument-without-image') + ' (<span id="withoutimage">&nbsp;</span>)</td></tr>' + 
        '</table>' + 
        
        '<h3>' + translatemsg('statistics') + '</h3>' + 
        '<p>' + translatemsg('statistics-description') + '</p>' + 
        '<iframe src="//tools.wmflabs.org/wlm-stats/stats-2016-mini.php" width=330px height=170px frameborder=0 scrolling=no style="margin-bottom: -20px;">Browser not compatible.</iframe>' +
        
        '<h3>' + translatemsg('see-also') + '</h3>' + 
        '<ul style="margin-left: -20px;">' + 
        '<li><a href="//tools.wmflabs.org/wmcounter/" target="_blank">wmcounter</a>: ' + translatemsg('wmcounter') + '</li>' + 
        //'<li><a href="//tools.wmflabs.org/commons-coverage/" target="_blank">Commons Coverage</a>: ' + translatemsg('commons-coverage') + '</li>' + 
        '<li><a href="' + translatemsg('deadline-link') + '" target="_blank">There is a deadline</a>: ' + translatemsg('deadline') + '</li>' + 
        '<li><a href="//en.wikipedia.org/wiki/User:Emijrp/All_human_knowledge" target="_blank">User:Emijrp/All human knowledge</a>: ' + translatemsg('ahk') + '</li>' + 
        '</ul>' + 
        
        '<p><i><a href="//en.wikipedia.org/wiki/User:Emijrp/Wiki_Loves_Monuments_map" target="_blank"><i>Translate this map into your language!</i></a></p>' + 
        ''
        );
    
    //Plugin magic goes here! Note that you cannot use the same layer object again, as that will confuse the two map controls
    var osm2 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13, attribution: osmAttrib });
    var miniMapOptions = {
        toggleDisplay: true,
        zoomLevelOffset: -6,
        strings: {hideText: translatemsg('hide-minimap'), showText: translatemsg('show-minimap')}
    };
    var miniMap = new L.Control.MiniMap(osm2, miniMapOptions).addTo(map);

    map.on('moveend', whenMapMoves);
    //map.on('zoomend', whenMapMoves);
    //map.on('dragend', whenMapMoves);
    updateMonuments();
    askForRecentlyUploaded();
}

function whenMapMoves(e) {
    updateMonuments();
    askForRecentlyUploaded();
}

function setMarker(feature,latlng) {
    var popuptext = '';
    popuptext = popuptext + '<table border=0 width=350px>';
    if (feature.properties.monument_article)
    {
        popuptext = popuptext + '<tr><td colspan=3><strong><a href="//'+feature.properties.lang+'.wikipedia.org/wiki/'+feature.properties.monument_article+'" target="_blank">'+feature.properties.name+'</a></strong></td></tr>';
    }else{
        popuptext = popuptext + '<tr><td colspan=3><strong>'+feature.properties.name+'</strong></td></tr>';
    }
    fileext = feature.properties.image.split('.');
    fileext = fileext[fileext.length-1];
    switch (fileext) {
        case 'svg':
        var thumb_url = '//upload.wikimedia.org/wikipedia/commons/thumb/' + feature.properties.md5.substring(0,1) + '/' + feature.properties.md5.substring(0,2) + '/' + feature.properties.image + '/150px-' + feature.properties.image + '.png';
        break;
        
        case 'tif':
        case 'tiff':
        var thumb_url = '//upload.wikimedia.org/wikipedia/commons/thumb/' + feature.properties.md5.substring(0,1) + '/' + feature.properties.md5.substring(0,2) + '/' + feature.properties.image + '/lossless-page1-150px-' + feature.properties.image + '.png';
        break;
        
        default:
        var thumb_url = '//upload.wikimedia.org/wikipedia/commons/thumb/' + feature.properties.md5.substring(0,1) + '/' + feature.properties.md5.substring(0,2) + '/' + feature.properties.image + '/150px-' + feature.properties.image;
    }
    
    var anchorid = '';
    switch (feature.properties.lang) {
        case 'de': anchorid = '#objektid-'+feature.properties.id; break;
    }
    
    popuptext = popuptext + '<tr><td><b>ID:</b></td><td><a href="' + feature.properties.source + anchorid + '" target="_blank">'+feature.properties.id+'</a></td>';
    popuptext = popuptext + '<td rowspan=6 valign=top><div style="overflow: hidden;height: 100px; width: 150px;"><a href="//commons.wikimedia.org/wiki/File:'+feature.properties.image.replace(/"/g, '%22')+'" target="_blank"><img src="'+thumb_url.replace(/"/g, '%22')+'" onerror="this.src=this.src.replace(/\\/commons\\//,\'/' + feature.properties.lang + '/\');this.parentElement.href=this.parentElement.href.replace(/commons\.wikimedia\.org/,\'' + feature.properties.lang + '.wikipedia.org\');" /></a></div></td></tr>';
    popuptext = popuptext + '<tr><td><b>'+translatemsg('country')+':</b></td><td><a href="' + getwebsite(feature.properties.country) + '" target="_blank" title="' + getwebsite(feature.properties.country) + '">'+ translatemsg('country-'+feature.properties.country)+'</a></td></tr>';
    municipality = feature.properties.municipality;
    municipality = municipality ? municipality : translatemsg('n/a');
    municipality = municipality.replace(/\[\[[^\|\]]*?\|([^\|\]]*?)\]\]/g, '$1');
    municipality = municipality.replace(/\[\[([^\|\]]*?)\]\]/g, '$1');
    popuptext = popuptext + '<tr><td><b>'+translatemsg('municipality')+':</b></td><td>'+municipality+'</td></tr>';
    address = feature.properties.address;
    address = address ? address : translatemsg('n/a');
    address = address.replace(/\[\[[^\|\]]*?\|([^\|\]]*?)\]\]/g, '$1');
    address = address.replace(/\[\[([^\|\]]*?)\]\]/g, '$1');
    popuptext = popuptext + '<tr><td><b>'+translatemsg('address')+':</b></td><td>'+address+'</td></tr>';
    popuptext = popuptext + '<tr><td><b>'+translatemsg('lat/lon')+':</b></td><td colspan=2><a href="//tools.wmflabs.org/geohack/geohack.php?params=' + geohack(latlng.lat,latlng.lng) + '" target="_blank">'+latlng.lat+', '+latlng.lng+'</a></td></tr>';
    if (feature.properties.commonscat)
    {
        popuptext = popuptext + '<tr><td><b>'+translatemsg('gallery')+':</b></td><td colspan=2><a href="//commons.wikimedia.org/wiki/Category:'+feature.properties.commonscat+'" target="_blank">'+translatemsg('see')+'</a></td></tr>';
    }else{
        popuptext = popuptext + '<tr><td><b>'+translatemsg('gallery')+':</b></td><td colspan=2>'+translatemsg('n/a')+'</td></tr>';
    }
    popuptext = popuptext + '<tr><td colspan=3 style="text-align: center;font-size: 150%;"><a href="//commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=wlm-'+feature.properties.country+'&id='+feature.properties.id+'" target="_blank" title="'+translatemsg('upload-your-photo')+'"><b>'+translatemsg('upload-your-photo')+'</b> <img src="icons/upload.png" width="30px" /></a></td></tr>';
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
    monument.bindPopup(popuptext, {minWidth: 350});
    
    return monument;
}

function updateMonuments() {
    featureCollection = [];
    withimage = 0;
    withoutimage = 0;
    document.getElementById('wait').style.display = 'block';
    var withoutCall = askForMonuments('0');  // without images
    var withCall = askForMonuments('1');  // with images

    // wait for ajax calls to complete
    $.when(withoutCall, withCall).done(function() {
        document.getElementById('wait').style.display = 'none';

        //counting
        if (withimage + withoutimage == 0) {
            document.getElementById('withimage').innerHTML = '0, 0%';
            document.getElementById('withoutimage').innerHTML = '0, 0%';
        }else{
            document.getElementById('withimage').innerHTML = withimage + ', ' + Number((withimage / ((withimage + withoutimage)/100.0)).toFixed(1)) + '%';
            document.getElementById('withoutimage').innerHTML = withoutimage + ', ' + Number((withoutimage / ((withimage + withoutimage)/100.0)).toFixed(1)) + '%';
        }

        //csv
        var csvContent = "data:text/csv;charset=utf-8,";
        for (var i=0;i<featureCollection.length;i++) {
            feature = featureCollection[i];
            id = feature.properties.id;
            country = feature.properties.country;
            municipality = feature.properties.municipality.replace(/"/, '');
            address = feature.properties.address.replace(/"/, '');
            name = feature.properties.name.replace(/"/, '');
            name = name.replace(/#.*/, '');
            lat = feature.geometry.coordinates[1];
            lon = feature.geometry.coordinates[0];
            dataString = '"'+id+'","'+country+'","'+municipality+'","'+address+'","'+name+'","'+lat+','+lon+'"';
            csvContent += i < featureCollection.length ? dataString + "\n" : dataString;
        }
        encodedCSVUri = encodeURI(csvContent);
        featureCollection = []; // no need to hang on to this in memory
    });
}

function askForMonuments(withImages) {
    var mobile;
    mobile = '0';
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 800 && window.innerHeight <= 600) ) {
        mobile = '1';
    }
    var data='bbox=' + map.getBounds().toBBoxString() + '&mobile=' + mobile + '&withImages=' + withImages;
    return $.ajax({
        url: 'ajaxmonuments.php',
        dataType: 'json',
        data: data,
        success: showMonuments,
        error: function(e) { console.log(e); }
    });
}

function askForRecentlyUploaded() {
    $.ajax({
        url: 'ajaxrecentlyuploaded.php',
        dataType: 'json',
        //data: data,
        success: showRecentlyUploaded,
        error: function(e) { console.log(e); }
    });
}

function showMonuments(ajaxresponse) {
    if( ajaxresponse.withImages == '0' ) {
        layerNoPicMonuments.clearLayers();
        layerNoPicMonuments.addData(ajaxresponse);
        withoutimage = ajaxresponse.features.length;
    }else{
        layerWithPicMonuments.clearLayers();
        layerWithPicMonuments.addData(ajaxresponse);
        withimage = ajaxresponse.features.length;
    }
    featureCollection = featureCollection.concat(ajaxresponse.features);
}

function showRecentlyUploaded(ajaxresponse) {
    var images = ajaxresponse['images'];
    
    var gallery = '<table id="gallery-table">';
    for (i=0; i<images.length; i++) {
        var img = images[i].properties.img_title;
        var uploader = images[i].properties.uploader;
        var upload_date = images[i].properties.upload_date;
        var md5 = images[i].properties.md5;
        
        fileext = img.split('.');
        fileext = fileext[fileext.length-1];
        switch (fileext) {
            case 'svg':
            var thumb_url = '//upload.wikimedia.org/wikipedia/commons/thumb/' + md5.substring(0,1) + '/' + md5.substring(0,2) + '/' + img + '/150px-' + img + '.png';
            break;
            
            case 'tif':
            case 'tiff':
            var thumb_url = '//upload.wikimedia.org/wikipedia/commons/thumb/' + md5.substring(0,1) + '/' + md5.substring(0,2) + '/' + img + '/lossless-page1-150px-' + img + '.png';
            break;
            
            default:
            var thumb_url = '//upload.wikimedia.org/wikipedia/commons/thumb/' + md5.substring(0,1) + '/' + md5.substring(0,2) + '/' + img + '/150px-' + img;
        }
    
        var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
        var dt = new Date(upload_date.replace(pattern,'$1-$2-$3T$4:$5:$6'));
        var now = new Date(); 
        var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        var datediff = Math.round((now_utc - dt)/1000);
        var datediff2 = datediff;
        timeunit = 'seconds';
        if (datediff >= 60) { datediff2 = Math.round(datediff / 60); timeunit = datediff2 == 1 ? 'minute' : 'minutes'; }
        if (datediff >= 3600) { datediff2 = Math.round(datediff / 3600); timeunit = datediff2 == 1 ? 'hour' : 'hours'; }
        if (datediff >= 86400) { datediff2 = Math.round(datediff / 86400); timeunit = datediff2 == 1 ? 'day' : 'days'; }
        
        gallery = gallery + '<td valign=top><a href="https://commons.wikimedia.org/wiki/File:' + img.replace(/"/g, '%22') + '" target="_blank"><img src="' + thumb_url.replace(/"/g, '%22') + '" title="Uploaded by ' + uploader +', ' + datediff2 + ' ' + timeunit + ' ago" onerror="this.src=\'//upload.wikimedia.org/wikipedia/commons/thumb/f/f3/LUSITANA_WLM_2011_d.svg/80-LUSITANA_WLM_2011_d.svg.png\';" /></a></td>';
    }
    gallery = gallery + "</table>";
    document.getElementById('gallery-div').innerHTML = gallery;
}

