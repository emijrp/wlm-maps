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
var browserlang;
var withimage;
var withoutimage;

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

function translatemsg (msg) {
    var msg2 = msg;
    switch (msg) {
       case 'welcome':
           switch (browserlang) {
               case 'fr': msg2 = '<b>Bienvenue !</b> Ceci est une carte pour le concours photographique <a href="//commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2015" target="_blank">Wiki Loves Monuments 2015</a> (<a href="http://www.wikilovesmonuments.org" target="_blank">blog</a>). Cherchez monuments proche de vous, prenez des photos et importez-les !'; break;
               case 'es': msg2 = '<b>¡Bienvenido/a!</b> Este es un mapa para el concurso <a href="//commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2015" target="_blank">Wiki Loves Monuments 2015</a> (<a href="http://www.wikilovesmonuments.org" target="_blank">blog</a>). ¡Busca monumentos próximos a ti, hazles fotos y súbelas!'; break;
               case 'ro': msg2 = 'Bun venit! Aceasta este o hartă pentru concursul de fotografie <a href="//commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2015" target="_blank">Wiki Loves Monuments 2015</a> (<a href="http://www.wikilovesmonuments.org" target="_blank">blog</a>). Căutați monumente din preajmă, fotografiați-le și încărcați imaginile!'; break;
               case 'se': msg2 = 'Välkommen! Detta är en karta för fototävlngen <a href="//commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2015" target="_blank">Wiki Loves Monuments 2015</a> (<a href="http://www.wikilovesmonuments.org" target="_blank">blog</a>). Hitta monument nära dig, ta bilder och ladda upp dem!'; break;
               case 'uk': msg2 = 'Привіт! Це карта для фотоконкурсу <a href="//commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2015" target="_blank">Wiki Loves Monuments 2015</a> (<a href="http://www.wikilovesmonuments.org" target="_blank">blog</a>). Шукайте пам\'ятки біля Вас, робіть фотографії та вантажте їх!'; break;

               default: msg2 = '<b>Welcome!</b> This is a map for the <a href="//commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2015" target="_blank">Wiki Loves Monuments 2015</a> (<a href="http://www.wikilovesmonuments.org" target="_blank">blog</a>) photographic contest. Search monuments near to you, take photos and upload them!';
           }
           break;
       
       
       case 'legend':
           switch (browserlang) {
               case 'fr': msg2 = 'Légende'; break;
               case 'es': msg2 = 'Leyenda'; break;
               case 'ro': msg2 = 'Legendă'; break;
               case 'se': msg2 = 'Legend'; break;
               case 'uk': msg2 = 'Легенда'; break;
               
               default: msg2 = 'Legend';
           }
           break;
       
       
       case 'monument-with-image':
           switch (browserlang) {
               case 'fr': msg2 = 'Monument avec image'; break;
               case 'es': msg2 = 'Monumento con foto'; break;
               case 'ro': msg2 = 'Monument cu imagine'; break;
               case 'se': msg2 = 'Monument med bild'; break;
               case 'uk': msg2 = 'Пам\'ятка із фото'; break;
               
               default: msg2 = 'Monument with image';
           }
           break;
       
       
       case 'monument-without-image':
           switch (browserlang) {
               case 'fr': msg2 = 'Monument sans image'; break;
               case 'es': msg2 = 'Monumento sin foto'; break;
               case 'ro': msg2 = 'Monument fără imagine'; break;
               case 'se': msg2 = 'Monument utan bild'; break;
               case 'uk': msg2 = 'Пам\'ятка без фото'; break;
               
               default: msg2 = 'Monument without image';
           }
           break;
       
       
       case 'statistics':
           switch (browserlang) {
               case 'fr': msg2 = 'Statistiques'; break;
               case 'es': msg2 = 'Estadísticas'; break;
               case 'ro': msg2 = 'Statistici'; break;
               case 'se': msg2 = 'Statistik'; break;
               case 'uk': msg2 = 'Статистика'; break;
               
               default: msg2 = 'Statistics';
           }
           break;
       
       
       case 'statistics-description':
           switch (browserlang) {
               case 'fr': msg2 = 'Il y a des <a href="//tools.wmflabs.org/wlm-stats" target="_blank">statistiques</a> pour comparer avec les éditions précédentes.'; break;
               case 'es': msg2 = 'Consulta las <a href="//tools.wmflabs.org/wlm-stats" target="_blank">estadísticas</a> de ediciones anteriores.'; break;
               case 'ro': msg2 = 'Aici sunt <a href="//tools.wmflabs.org/wlm-stats" target="_blank">statistici</a> pentru a compara cu edițiile precedente.'; break;
               case 'se': msg2 = 'Det finns <a href="//tools.wmflabs.org/wlm-stats" target="_blank">statistik</a> att jämföra med tidigare år.'; break;
               case 'uk': msg2 = '<a href="//tools.wmflabs.org/wlm-stats" target="_blank">Статистика</a> для порівняння з попередніми конкурсами.'; break;
               
               default: msg2 = 'There are <a href="//tools.wmflabs.org/wlm-stats" target="_blank">statistics</a> to compare with previous editions.';
           }
           break;
       
       
       case 'see-also':
           switch (browserlang) {
               case 'fr': msg2 = 'Voir aussi'; break;
               case 'es': msg2 = 'Véase también'; break;
               case 'ro': msg2 = 'Vedeți și'; break;
               case 'se': msg2 = 'Se även'; break;
               case 'uk': msg2 = 'Див. також'; break;
               
               default: msg2 = 'See also';
           }
           break;
       
       
       case 'wmcounter':
           switch (browserlang) {
               case 'fr': msg2 = 'compteur de contributions sur les projets Wikimédia'; break;
               case 'es': msg2 = 'Contador de ediciones de todos los proyectos Wikimedia'; break;
               case 'ro': msg2 = 'contor pentru contributiile la Wikimédia'; break;
               case 'se': msg2 = 'Redigeringräknare för Wikimediaprojekten'; break;
               case 'uk': msg2 = 'лічильник редагувань у проектах Вікімедіа'; break;
               
               default: msg2 = 'Wikimedia projects edits counter';
           }
           break;
       
       
       case 'commons-coverage':
           switch (browserlang) {
               case 'fr': msg2 = 'une image par km<sup>2</sup>, c\'est possible !'; break;
               case 'es': msg2 = '1 imagen/km<sup>2</sup>, ¡podemos hacerlo!'; break;
               case 'ro': msg2 = '1 imagine/km<sup>2</sup>, putem reuși!'; break;
               case 'se': msg2 = '1 bild/km<sup>2</sup>, det klarar vi!'; break;
               case 'uk': msg2 = '1 зображення на км<sup>2</sup>, ми це зможемо!'; break;
               
               default: msg2 = '1 image/km<sup>2</sup>, we can do it!';
           }
           break;
       
       
       case 'deadline':
           switch (browserlang) {
               case 'fr': msg2 = 'un essai sur l\'importance de la préservation de la connaissance'; break;
               case 'es': msg2 = 'un ensayo sobre la importancia de preservar el conocimiento'; break;
               case 'ro': msg2 = 'un eseu despre importanța păstrării cunoștințelor'; break;
               case 'se': msg2 = 'en essä om vikten av att bevara kunskap'; break;
               case 'uk': msg2 = 'допис про важливість зберігати знання'; break;
               
               default: msg2 = 'an essay on the importance of preserving knowledge';
           }
           break;
       
       
       case 'ahk':
           switch (browserlang) {
               case 'fr': msg2 = 'estimation du nombre d\'articles nécessaires pour couvrir l\'intégralité des connaissances'; break;
               case 'es': msg2 = 'estimación del número de artículos necesarios para abarcar todo el conocimiento'; break;
               case 'ro': msg2 = 'estimare a numărului de articole necesare pentru acoperirea tuturor cunoștințelor'; break;
               case 'se': msg2 = 'uppskattning av antal artiklar som krävs för att täcka all kunskap'; break;
               case 'uk': msg2 = 'скільки треба статей, щоб охопити всю сукупність знань'; break;
               
               default: msg2 = 'estimating the number of articles needed to cover all knowledge';
           }
           break;
       
       
       case 'country':
           switch (browserlang) {
               case 'fr': msg2 = 'Pays'; break;
               case 'es': msg2 = 'País'; break;
               case 'ro': msg2 = 'Țară'; break;
               case 'se': msg2 = 'Land'; break;
               case 'uk': msg2 = 'Країна'; break;
               
               default: msg2 = 'Country';
           }
           break;
       
       
       case 'show-menu':
           switch (browserlang) {
               case 'fr': msg2 = 'Montrer le menu'; break;
               case 'es': msg2 = 'Mostrar menú'; break;
               case 'ro': msg2 = 'Arată meniul'; break;
               case 'se': msg2 = 'Visa meny'; break;
               case 'uk': msg2 = 'Показати меню'; break;
               
               default: msg2 = 'Show menu';
           }
           break;
       
       
       case 'upload-your-photo':
           switch (browserlang) {
               case 'fr': msg2 = 'Importer votre photo !'; break;
               case 'es': msg2 = '¡Sube tu foto!'; break;
               case 'ro': msg2 = 'Încarcă fotografia!'; break;
               case 'se': msg2 = 'Ladda upp ditt foto!'; break;
               case 'uk': msg2 = 'Завантажити власні фото!'; break;
               
               default: msg2 = 'Upload your photo!';
           }
           break;
       
       
       case 'loading':
           switch (browserlang) {
               case 'fr': msg2 = 'Chargement en cours... merci de patienter'; break;
               case 'es': msg2 = 'Cargando... espere por favor'; break;
               case 'ro': msg2 = 'Se încarcă... mulțumim pentru răbdare'; break;
               case 'se': msg2 = 'Laddar--- vänligen vänta'; break;
               case 'uk': msg2 = 'Завантажується... будь ласка, зачекайте'; break;
               
               default: msg2 = 'Loading... please wait';
           }
           break;
        
        
       case 'country-aq':
           switch (browserlang) {
               case 'es': msg2 = 'Antártida'; break;
               
               default: msg2 = 'Antarctica';
           }
           break;
        
        
       case 'country-at':
           switch (browserlang) {
               case 'es': msg2 = 'Austria'; break;
               
               default: msg2 = 'Austria';
           }
           break;
        
        
       case 'country-ch':
           switch (browserlang) {
               case 'es': msg2 = 'Suiza'; break;
               
               default: msg2 = 'Switzerland';
           }
           break;
        
        
       case 'country-cn':
           switch (browserlang) {
               case 'es': msg2 = 'China'; break;
               
               default: msg2 = 'China';
           }
           break;
        
        
       case 'country-cz':
           switch (browserlang) {
               case 'es': msg2 = 'República Checa'; break;
               
               default: msg2 = 'Czech Republic';
           }
           break;
        
        
       case 'country-dz':
           switch (browserlang) {
               case 'es': msg2 = 'Argelia'; break;
               
               default: msg2 = 'Algeria';
           }
           break;
        
        
       case 'country-ee':
           switch (browserlang) {
               case 'es': msg2 = 'Estonia'; break;
               
               default: msg2 = 'Estonia';
           }
           break;
        
        
       case 'country-es':
           switch (browserlang) {
               case 'es': msg2 = 'España'; break;
               
               default: msg2 = 'Spain';
           }
           break;
        
        
       case 'country-fr':
           switch (browserlang) {
               case 'es': msg2 = 'Francia'; break;
               
               default: msg2 = 'France';
           }
           break;
        
        
       case 'country-hk':
           switch (browserlang) {
               case 'es': msg2 = 'Hong Kong'; break;
               
               default: msg2 = 'Hong Kong';
           }
           break;
        
        
       case 'country-hu':
           switch (browserlang) {
               case 'es': msg2 = 'Hungría'; break;
               
               default: msg2 = 'Hungary';
           }
           break;
        
        
       case 'country-il':
           switch (browserlang) {
               case 'es': msg2 = 'Israel'; break;
               
               default: msg2 = 'Israel';
           }
           break;
        
        
       case 'country-in':
           switch (browserlang) {
               case 'es': msg2 = 'India'; break;
               
               default: msg2 = 'India';
           }
           break;
        
        
       case 'country-it':
           switch (browserlang) {
               case 'es': msg2 = 'Italia'; break;
               
               default: msg2 = 'Italy';
           }
           break;
        
        
       case 'country-it-bz':
           switch (browserlang) {
               case 'es': msg2 = 'Italia'; break;
               
               default: msg2 = 'Italy';
           }
           break;
        
        
       case 'country-jp-nhs':
           switch (browserlang) {
               case 'es': msg2 = 'Japón'; break;
               
               default: msg2 = 'Japan';
           }
           break;
        
        
       case 'country-ke':
           switch (browserlang) {
               case 'es': msg2 = 'Kenia'; break;
               
               default: msg2 = 'Kenya';
           }
           break;
        
        
       case 'country-mt':
           switch (browserlang) {
               case 'es': msg2 = 'Malta'; break;
               
               default: msg2 = 'Malta';
           }
           break;
        
        
       case 'country-nl':
           switch (browserlang) {
               case 'es': msg2 = 'Países Bajos'; break;
               
               default: msg2 = 'The Netherlands';
           }
           break;
        
        
       case 'country-nl-gem':
           switch (browserlang) {
               case 'es': msg2 = 'Países Bajos'; break;
               
               default: msg2 = 'The Netherlands';
           }
           break;
        
        
       case 'country-no':
           switch (browserlang) {
               case 'es': msg2 = 'Noruega'; break;
               
               default: msg2 = 'Norway';
           }
           break;
        
        
       case 'country-ph':
           switch (browserlang) {
               case 'es': msg2 = 'Filipinas'; break;
               
               default: msg2 = 'Philippines';
           }
           break;
        
        
       case 'country-pl':
           switch (browserlang) {
               case 'es': msg2 = 'Polonia'; break;
               
               default: msg2 = 'Poland';
           }
           break;
        
        
       case 'country-pt':
           switch (browserlang) {
               case 'es': msg2 = 'Portugal'; break;
               
               default: msg2 = 'Portugal';
           }
           break;
        
        
       case 'country-ro':
           switch (browserlang) {
               case 'es': msg2 = 'Rumanía'; break;
               
               default: msg2 = 'Romania';
           }
           break;
        
        
       case 'country-rs':
           switch (browserlang) {
               case 'es': msg2 = 'Serbia'; break;
               
               default: msg2 = 'Serbia';
           }
           break;
        
        
       case 'country-ru':
           switch (browserlang) {
               case 'es': msg2 = 'Rusia'; break;
               
               default: msg2 = 'Russia';
           }
           break;
        
        
       case 'country-se-fornmin':
           switch (browserlang) {
               case 'es': msg2 = 'Suecia'; break;
               
               default: msg2 = 'Sweden';
           }
           break;
        
        
       case 'country-sk':
           switch (browserlang) {
               case 'es': msg2 = 'Eslovaquia'; break;
               
               default: msg2 = 'Slovakia';
           }
           break;
        
        
       case 'country-th':
           switch (browserlang) {
               case 'es': msg2 = 'Tailandia'; break;
               
               default: msg2 = 'Thailand';
           }
           break;
        
        
       case 'country-tn':
           switch (browserlang) {
               case 'es': msg2 = 'Túnez'; break;
               
               default: msg2 = 'Tunisia';
           }
           break;
        
        
       case 'country-ua':
           switch (browserlang) {
               case 'es': msg2 = 'Ucrania'; break;
               
               default: msg2 = 'Ukraine';
           }
           break;
        
        
       case 'country-us':
           switch (browserlang) {
               case 'es': msg2 = 'Estados Unidos'; break;
               
               default: msg2 = 'United States';
           }
           break;
        
        
       case 'country-za':
           switch (browserlang) {
               case 'es': msg2 = 'Sudáfrica'; break;
               
               default: msg2 = 'South Africa';
           }
           break;
        
        
    }
    return msg2;
}

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
        '<p><img src="//upload.wikimedia.org/wikipedia/commons/thumb/f/f3/LUSITANA_WLM_2011_d.svg/70px-LUSITANA_WLM_2011_d.svg.png" align=right />' + translatemsg('welcome') + '</p>' + 
        
        '<h3>' + translatemsg('legend') + '</h3>' + 
        '<table border=0 width=300px>' + 
        '<tr><td><img src="icons/withimageicon.png" /></td><td>' + translatemsg('monument-with-image') + ' (<span id="withimage">&nbsp;</span>)</td>' + 
        '<td><img src="icons/withoutimageicon.png" /></td><td>' + translatemsg('monument-without-image') + ' (<span id="withoutimage">&nbsp;</span>)</td></tr>' + 
        '</table>' + 
        
        '<h3>' + translatemsg('statistics') + '</h3>' + 
        '<p>' + translatemsg('statistics-description') + '</p>' + 
        '<iframe src="//tools.wmflabs.org/wlm-stats/stats-2015-mini.php" width=330px height=170px frameborder=0 scrolling=no style="margin-bottom: -20px;">Browser not compatible.</iframe>' +
        
        '<h3>' + translatemsg('see-also') + '</h3>' + 
        '<ul style="margin-left: -20px;">' + 
        '<li><a href="//tools.wmflabs.org/wmcounter/" target="_blank">wmcounter</a>: ' + translatemsg('wmcounter') + '</li>' + 
        '<li><a href="//tools.wmflabs.org/commons-coverage/" target="_blank">Commons Coverage</a>: ' + translatemsg('commons-coverage') + '</li>' + 
        '<li><a href="//en.wikipedia.org/wiki/Wikipedia:There_is_a_deadline" target="_blank">There is a deadline</a>: ' + translatemsg('deadline') + '</li>' + 
        '<li><a href="//en.wikipedia.org/wiki/User:Emijrp/All_human_knowledge" target="_blank">User:Emijrp/All human knowledge</a> - ' + translatemsg('ahk') + '</li>' + 
        '</ul>' + 
        
        '<p><i><a href="//en.wikipedia.org/wiki/User:Emijrp/Wiki_Loves_Monuments_map" target="_blank"><i>Translate this map into your language!</i></a></p>' + 
        ''
        );
    
    map.on('moveend', whenMapMoves);
    askForMonuments();
    askForRecentlyUploaded();
}

function whenMapMoves(e) {
    askForMonuments();
    askForRecentlyUploaded();
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
    fileext = feature.properties.image.split('.');
    fileext = fileext[fileext.length-1];
    switch (fileext) {
        case 'svg':
        var thumb_url = '//upload.wikimedia.org/wikipedia/commons/thumb/' + feature.properties.md5.substring(0,1) + '/' + feature.properties.md5.substring(0,2) + '/' + feature.properties.image + '/150px-' + feature.properties.image + '.png';
        var thumb_local_url = '//upload.wikimedia.org/wikipedia/' + feature.properties.lang + '/thumb/' + feature.properties.md5.substring(0,1) + '/' + feature.properties.md5.substring(0,2) + '/' + feature.properties.image + '/150px-' + feature.properties.image + '.png';
        break;
        
        case 'tif':
        case 'tiff':
        var thumb_url = '//upload.wikimedia.org/wikipedia/commons/thumb/' + feature.properties.md5.substring(0,1) + '/' + feature.properties.md5.substring(0,2) + '/' + feature.properties.image + '/lossless-page1-150px-' + feature.properties.image + '.png';
        var thumb_local_url = '//upload.wikimedia.org/wikipedia/' + feature.properties.lang + '/thumb/' + feature.properties.md5.substring(0,1) + '/' + feature.properties.md5.substring(0,2) + '/' + feature.properties.image + '/lossless-page1-150px-' + feature.properties.image + '.png';
        break;
        
        default:
        var thumb_url = '//upload.wikimedia.org/wikipedia/commons/thumb/' + feature.properties.md5.substring(0,1) + '/' + feature.properties.md5.substring(0,2) + '/' + feature.properties.image + '/150px-' + feature.properties.image;
        var thumb_local_url = '//upload.wikimedia.org/wikipedia/' + feature.properties.lang + '/thumb/' + feature.properties.md5.substring(0,1) + '/' + feature.properties.md5.substring(0,2) + '/' + feature.properties.image + '/150px-' + feature.properties.image;
    }
    
    var anchorid = '';
    switch (feature.properties.lang) {
        case 'de': anchorid = '#objektid-'+feature.properties.id; break;
    }
    
    popuptext = popuptext + '<tr><td valign=top width=150px><b>ID:</b> <a href="' + feature.properties.source + anchorid + '" target="_blank">'+feature.properties.id+'</a><br/><b>'+translatemsg('country')+':</b> '+translatemsg('country-'+feature.properties.country)+'</td><td rowspan=3><a href="//commons.wikimedia.org/wiki/File:'+feature.properties.image.replace(/"/g, '%22')+'" target="_blank"><img src="'+thumb_url.replace(/"/g, '%22')+'" onerror="this.src=\'' + thumb_local_url.replace(/"/g, '%22') + '\';this.parentElement.href=this.parentElement.href.replace(/commons.wikimedia.org/,\'' + feature.properties.lang + '.wikipedia.org\');" /></a></td></tr>';
    popuptext = popuptext + '<tr><td style="text-align: center;font-size: 120%;"><a href="//commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=wlm-'+feature.properties.country+'&id='+feature.properties.id+'" target="_blank"><b>'+translatemsg('upload-your-photo')+'</b><br/><img src="icons/upload.png" width="40px" /></a></td></tr>';
    if (feature.properties.commonscat)
    {
        popuptext = popuptext + '<tr><td style="text-align: center;">(<a href="//commons.wikimedia.org/wiki/Category:'+feature.properties.commonscat+'" target="_blank">Wikimedia Commons</a>)</td></tr>';
    }
    popuptext = popuptext + '</table>';
    var icon;
    if (feature.properties.image != 'Monument_unknown.png')
    {
        icon = withimageicon;
        withimage = withimage + 1;
    }else{
        icon = withoutimageicon;
        withoutimage = withoutimage + 1;
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
    layerMonuments.clearLayers();
    withimage = 0; withoutimage = 0;
    layerMonuments.addData(ajaxresponse);
    document.getElementById('wait').style.display = 'none';
    if (withimage + withoutimage == 0) {
        document.getElementById('withimage').innerHTML = '0, 0%';
        document.getElementById('withoutimage').innerHTML = '0, 0%';
    }else{
        document.getElementById('withimage').innerHTML = withimage + ', ' + Number((withimage / ((withimage + withoutimage)/100.0)).toFixed(1)) + '%';
        document.getElementById('withoutimage').innerHTML = withoutimage + ', ' + Number((withoutimage / ((withimage + withoutimage)/100.0)).toFixed(1)) + '%';
    }
}

function showRecentlyUploaded(ajaxresponse) {
    var images = ajaxresponse['images'];
    
    var gallery = '<table id="gallery-table">';
    for (i=0; i<images.length; i++) {
        var img = images[i].properties.img_title;
        var uploader = images[i].properties.uploader;
        var upload_date = images[i].properties.upload_date;
        var md5 = images[i].properties.md5;
        
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
        
        gallery = gallery + '<td valign=top><a href="https://commons.wikimedia.org/wiki/File:' + img.replace(/"/g, '%22') + '" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/' + md5[0] + '/' + md5 + '/' + img.replace(/"/g, '%22') + '/150px-' + img.replace(/"/g, '%22') + '" title="Uploaded by ' + uploader +', ' + datediff2 + ' ' + timeunit + ' ago"/></a></td>';
    }
    gallery = gallery + "</table>";
    document.getElementById('gallery-div').innerHTML = gallery;
}

