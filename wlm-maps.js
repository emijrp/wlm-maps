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
        case 'am': website = 'https://hy.wikipedia.org/wiki/%D5%8E%D5%AB%D6%84%D5%AB%D5%BA%D5%A5%D5%A4%D5%AB%D5%A1:%D5%8E%D5%AB%D6%84%D5%AB%D5%B6_%D5%BD%D5%AB%D6%80%D5%B8%D6%82%D5%B4_%D5%A7_%D5%B0%D5%B8%D6%82%D5%B7%D5%A1%D6%80%D5%B1%D5%A1%D5%B6%D5%B6%D5%A5%D6%80_2015'; break;
        case 'at': website = 'http://wikilovesmonuments.at'; break;
        case 'az': website = 'https://az.wikipedia.org/wiki/Vikipediya:Viki_Abid%C9%99l%C9%99ri_Sevir_2015'; break;
        case 'br': website = 'https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:Wiki_Loves_Monuments_2015/Brasil'; break;
        case 'cm': website = 'http://cm.wikilovesmonuments.org'; break;
        case 'co': website = 'http://wikilovesmonuments.co'; break;
        case 'de': website = 'http://wikilovesmonuments.de'; break;
        case 'dz': website = 'http://wlm.wikimedia-dz.org/index.php/fr/'; break;
        case 'eg': website = 'https://ar.wikipedia.org/wiki/%D9%88%D9%8A%D9%83%D9%8A%D8%A8%D9%8A%D8%AF%D9%8A%D8%A7:%D8%A7%D9%84%D9%88%D9%8A%D9%83%D9%8A_%D8%AA%D9%87%D9%88%D9%89_%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D9%84%D9%85_2015/%D9%85%D8%B5%D8%B1#.D8.B4.D8.B1.D9.88.D8.B7_.D8.A7.D9.84.D9.85.D8.B3.D8.A7.D8.A8.D9.82.D8.A9'; break;
        case 'ee': website = 'http://wikilovesmonuments.ee'; break;
        case 'en': website = 'http://www.wikilovesmonuments.org'; break;
        case 'es': website = 'http://www.wikilm.es'; break;
        case 'fr': website = 'http://wikilovesmonuments.fr'; break;
        case 'ie': website = 'http://www.wikilovesmonuments.ie'; break;
        case 'il': website = 'http://www.wlm.org.il'; break;
        case 'in': website = 'https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2013_in_India'; break; //LOST http://wikilovesmonuments.in
        case 'ir': website = 'https://fa.wikipedia.org/wiki/%D9%88%DB%8C%DA%A9%DB%8C%E2%80%8C%D9%BE%D8%AF%DB%8C%D8%A7:%D9%88%DB%8C%DA%A9%DB%8C_%D8%AF%D9%88%D8%B3%D8%AA%D8%AF%D8%A7%D8%B1_%DB%8C%D8%A7%D8%AF%D9%85%D8%A7%D9%86%E2%80%8C%D9%87%D8%A7_%DB%B2%DB%B0%DB%B1%DB%B5_%D8%A7%DB%8C%D8%B1%D8%A7%D9%86'; break;
        case 'it': website = 'http://wikilovesmonuments.wikimedia.it'; break;
        case 'lv': website = 'https://lv.wikipedia.org/wiki/Vikiprojekts:Kult%C5%ABras_pieminek%C4%BCi_Vikip%C4%93dij%C4%81_2015'; break;
        case 'mk': website = 'http://wikilovesmonuments.mk'; break;
        case 'my': website = 'http://2015.wikilovesmonuments.my'; break;
        case 'nl': website = 'http://www.wikimedia.nl/project/wiki-loves-monuments'; break;
        case 'no': website = 'https://no.wikipedia.org/wiki/Wikipedia:Wiki_Loves_Monuments_2015'; break;
        case 'np': website = 'https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2015_in_Nepal'; break;
        case 'pa': website = 'https://commons.wikimedia.org/wiki/Commons:Wiki_Loves_Monuments_2013_in_Panama'; break; //LOST http://www.wlmpanama.org.pa
        case 'pk': website = 'https://en.wikipedia.org/wiki/Wikipedia:Wiki_Loves_Monuments_Pakistan'; break;
        case 'ro': website = 'http://wikilovesmonuments.ro'; break;
        case 'rs': website = 'http://wikilovesmonuments.al'; break; // same as Albania
        case 'ru': website = 'https://ru.wikimedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8_%D0%BB%D1%8E%D0%B1%D0%B8%D1%82_%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%BD%D0%B8%D0%BA%D0%B8-2015'; break;
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

function translatemsg (msg) {
    var msg2 = msg;
    switch (msg) {
       case 'welcome':
           switch (browserlang) {
               case 'fr': msg2 = '<b>Bienvenue !</b> Ceci est une carte pour le concours photographique <a href="' + getwebsite ('fr') + '" target="_blank">Wiki Loves Monuments 2015</a>&nbsp;<a href="https://twitter.com/'+gettwitter('fr')+'" target="_blank" title="@'+gettwitter('fr')+' on Twitter!"><img src="icons/twitter.ico" /></a>&nbsp;<a href="'+getfacebook('fr')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" /></a>. Cherchez monuments proche de vous, prenez des photos et importez-les !'; break;
               case 'es': msg2 = '<b>¡Bienvenido/a!</b> Este es un mapa para el concurso <a href="' + getwebsite ('es') + '" target="_blank">Wiki Loves Monuments 2015</a>&nbsp;<a href="https://twitter.com/'+gettwitter('es')+'" target="_blank" title="@'+gettwitter('es')+' on Twitter!"><img src="icons/twitter.ico" /></a>&nbsp;<a href="'+getfacebook('es')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" /></a>. ¡Busca monumentos próximos a ti, hazles fotos y súbelas!'; break;
               case 'nb': msg2 = 'Velkommen! Dette er et kart for <a href="' + getwebsite ('no') + '" target="_blank">Wiki Loves Monuments 2015</a>-fotokonkurransen&nbsp;<a href="https://twitter.com/'+gettwitter('no')+'" target="_blank" title="@'+gettwitter('no')+' on Twitter!"><img src="icons/twitter.ico" /></a>&nbsp;<a href="'+getfacebook('no')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" /></a>. Søk i monumenter nær deg, ta bilder og last dem opp!'; break;
               case 'ne': msg2 = 'तपाईंलाई स्वागत छ! यो <a href="' + getwebsite ('np') + '" target="_blank">विकी लभ्स मोन्युमेन्ट्स २०१५</a>&nbsp;<a href="https://twitter.com/'+gettwitter('np')+'" target="_blank" title="@'+gettwitter('np')+' on Twitter!"><img src="icons/twitter.ico" /></a>&nbsp;<a href="'+getfacebook('np')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" /></a> तस्विर प्रतियोगिताको नक्सा हो । तपाईं नजिकै रहेको धरोहरहरूको तस्विर खिच्नुहोस् र त्यसलाई अपलोड गर्नुहोस!'; break;
               case 'nl': msg2 = 'Welkom! Dit is de kaart voor de fotowedstrijd <a href="' + getwebsite ('nl') + '" target="_blank">Wiki Loves Monuments 2015</a>&nbsp;<a href="https://twitter.com/'+gettwitter('nl')+'" target="_blank" title="@'+gettwitter('nl')+' on Twitter!"><img src="icons/twitter.ico" /></a>&nbsp;<a href="'+getfacebook('nl')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" /></a>. Zoek naar monumenten in jouw buurt, maak foto\'s en upload ze!'; break;
               case 'ro': msg2 = 'Bun venit! Aceasta este o hartă pentru concursul de fotografie <a href="' + getwebsite ('ro') + '" target="_blank">Wiki Loves Monuments 2015</a>&nbsp;<a href="https://twitter.com/'+gettwitter('ro')+'" target="_blank" title="@'+gettwitter('ro')+' on Twitter!"><img src="icons/twitter.ico" /></a>&nbsp;<a href="'+getfacebook('ro')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" /></a>. Căutați monumente din preajmă, fotografiați-le și încărcați imaginile!'; break;
               case 'ru': msg2 = 'Добро пожаловать! Это карта памятников, участвующих в международном фотоконкурсе <a href="' + getwebsite ('ru') + '" target="_blank">Вики любит памятники</a>&nbsp;<a href="https://twitter.com/'+gettwitter('ru')+'" target="_blank" title="@'+gettwitter('ru')+' on Twitter!"><img src="icons/twitter.ico" /></a>&nbsp;<a href="'+getfacebook('ru')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" /></a>. Найдите объекты, находящиеся неподалёку, сфотографируйте их и примите участие в конкурсе!'; break;
               case 'sq': msg2 = 'Mirë se vini! Kjo është një hartë për konkursin fotografik <a href="' + getwebsite ('al') + '" target="_blank">Wiki Loves Monuments 2015</a>&nbsp;<a href="https://twitter.com/'+gettwitter('al')+'" target="_blank" title="@'+gettwitter('al')+' on Twitter!"><img src="icons/twitter.ico" /></a>&nbsp;<a href="'+getfacebook('al')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" /></a>. Kërko monumentet afër teje, fotografoi dhe ngarkoi fotot!'; break;
               case 'sv': msg2 = 'Välkommen! Detta är en karta för fototävlngen <a href="' + getwebsite ('se') + '" target="_blank">Wiki Loves Monuments 2015</a>&nbsp;<a href="https://twitter.com/'+gettwitter('se')+'" target="_blank" title="@'+gettwitter('se')+' on Twitter!"><img src="icons/twitter.ico" /></a>&nbsp;<a href="'+getfacebook('se')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" /></a>. Hitta monument nära dig, ta bilder och ladda upp dem!'; break;
               case 'uk': msg2 = 'Привіт! Це карта для фотоконкурсу <a href="' + getwebsite ('ua') + '" target="_blank">Wiki Loves Monuments 2015</a>&nbsp;<a href="https://twitter.com/'+gettwitter('ua')+'" target="_blank" title="@'+gettwitter('ua')+' on Twitter!"><img src="icons/twitter.ico" /></a>&nbsp;<a href="'+getfacebook('ua')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" /></a>. Шукайте пам\'ятки біля Вас, робіть фотографії та вантажте їх!'; break;

               default: msg2 = '<b>Welcome!</b> This is a map for the <a href="' + getwebsite ('en') + '" target="_blank">Wiki Loves Monuments 2015</a>&nbsp;<a href="https://twitter.com/'+gettwitter('en')+'" target="_blank" title="@'+gettwitter('en')+' on Twitter!"><img src="icons/twitter.ico" /></a>&nbsp;<a href="'+getfacebook('en')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" /></a> photographic contest. Search monuments near to you, take photos and upload them!';
           }
           break;
       
       
       case 'legend':
           switch (browserlang) {
               case 'fr': msg2 = 'Légende'; break;
               case 'es': msg2 = 'Leyenda'; break;
               case 'nb': msg2 = 'Kartbeskrivelse'; break;
               case 'ne': msg2 = 'लिजेन्ड'; break;
               case 'nl': msg2 = 'Legenda'; break;
               case 'ro': msg2 = 'Legendă'; break;
               case 'ru': msg2 = 'Легенда'; break;
               case 'sq': msg2 = 'Harta'; break;
               case 'sv': msg2 = 'Legend'; break;
               case 'uk': msg2 = 'Легенда'; break;
               
               default: msg2 = 'Legend';
           }
           break;
       
       
       case 'monument-with-image':
           switch (browserlang) {
               case 'fr': msg2 = 'Monument avec image'; break;
               case 'es': msg2 = 'Monumento con foto'; break;
               case 'nb': msg2 = 'Monument med bilde'; break;
               case 'ne': msg2 = 'तस्विर सहितको धरोहर'; break;
               case 'nl': msg2 = 'Monument met afbeelding'; break;
               case 'ro': msg2 = 'Monument cu imagine'; break;
               case 'ru': msg2 = 'Сфотографированный памятник'; break;
               case 'sq': msg2 = 'Monument me imazh'; break;
               case 'sv': msg2 = 'Monument med bild'; break;
               case 'uk': msg2 = 'Пам\'ятка із фото'; break;
               
               default: msg2 = 'Monument with image';
           }
           break;
       
       
       case 'monument-without-image':
           switch (browserlang) {
               case 'fr': msg2 = 'Monument sans image'; break;
               case 'es': msg2 = 'Monumento sin foto'; break;
               case 'nb': msg2 = 'Monument uten bilde'; break;
               case 'ne': msg2 = 'तस्विर विनाको धरोहर'; break;
               case 'nl': msg2 = 'Monument zonder afbeelding'; break;
               case 'ro': msg2 = 'Monument fără imagine'; break;
               case 'ru': msg2 = 'Несфотографированный памятник'; break;
               case 'sq': msg2 = 'Monument pa imazh'; break;
               case 'sv': msg2 = 'Monument utan bild'; break;
               case 'uk': msg2 = 'Пам\'ятка без фото'; break;
               
               default: msg2 = 'Monument without image';
           }
           break;
       
       
       case 'statistics':
           switch (browserlang) {
               case 'fr': msg2 = 'Statistiques'; break;
               case 'es': msg2 = 'Estadísticas'; break;
               case 'nb': msg2 = 'Statistikk'; break;
               case 'ne': msg2 = 'तथ्याङ्कहरू'; break;
               case 'nl': msg2 = 'Statistieken'; break;
               case 'ro': msg2 = 'Statistici'; break;
               case 'ru': msg2 = 'Статистика'; break;
               case 'sq': msg2 = 'Statistika'; break;
               case 'sv': msg2 = 'Statistik'; break;
               case 'uk': msg2 = 'Статистика'; break;
               
               default: msg2 = 'Statistics';
           }
           break;
       
       
       case 'statistics-description':
           switch (browserlang) {
               case 'fr': msg2 = 'Il y a des <a href="//tools.wmflabs.org/wlm-stats" target="_blank">statistiques</a> pour comparer avec les éditions précédentes.'; break;
               case 'es': msg2 = 'Consulta las <a href="//tools.wmflabs.org/wlm-stats" target="_blank">estadísticas</a> de ediciones anteriores.'; break;
               case 'nb': msg2 = 'Det fins <a href="//tools.wmflabs.org/wlm-stats" target="_blank">statistikk</a> for å sammenligne med tidligere konkurranser.'; break;
               case 'ne': msg2 = 'पछिल्लो संस्करणहरूसँग तुलना गर्नका लागी <a href="//tools.wmflabs.org/wlm-stats" target="_blank">तथ्याङ्कहरू</a> रहेका छन् ।'; break;
               case 'nl': msg2 = 'Er zijn geen <a href="//tools.wmflabs.org/wlm-stats" target="_blank">statistieken</a> bekend van eerdere edities.'; break;
               case 'ro': msg2 = 'Aici sunt <a href="//tools.wmflabs.org/wlm-stats" target="_blank">statistici</a> pentru a compara cu edițiile precedente.'; break;
               case 'ru': msg2 = '<a href="//tools.wmflabs.org/wlm-stats" target="_blank">Стастистика</a>, которую можно сравнить с прежней.'; break;
               case 'sq': msg2 = 'Ekzistojnë <a href="//tools.wmflabs.org/wlm-stats" target="_blank">statistika</a> që mund të krahasohen me edicionet e kaluara.'; break;
               case 'sv': msg2 = 'Det finns <a href="//tools.wmflabs.org/wlm-stats" target="_blank">statistik</a> att jämföra med tidigare år.'; break;
               case 'uk': msg2 = '<a href="//tools.wmflabs.org/wlm-stats" target="_blank">Статистика</a> для порівняння з попередніми конкурсами.'; break;
               
               default: msg2 = 'There are <a href="//tools.wmflabs.org/wlm-stats" target="_blank">statistics</a> to compare with previous editions.';
           }
           break;
       
       
       case 'see-also':
           switch (browserlang) {
               case 'fr': msg2 = 'Voir aussi'; break;
               case 'es': msg2 = 'Véase también'; break;
               case 'nb': msg2 = 'Se også'; break;
               case 'ne': msg2 = 'यो पनि हेर्नुहोस'; break;
               case 'nl': msg2 = 'Zie ook'; break;
               case 'ro': msg2 = 'Vedeți și'; break;
               case 'ru': msg2 = 'См. также'; break;
               case 'sq': msg2 = 'Shiko gjithashtu'; break;
               case 'sv': msg2 = 'Se även'; break;
               case 'uk': msg2 = 'Див. також'; break;
               
               default: msg2 = 'See also';
           }
           break;
       
       
       case 'wmcounter':
           switch (browserlang) {
               case 'fr': msg2 = 'compteur de contributions sur les projets Wikimédia'; break;
               case 'es': msg2 = 'Contador de ediciones de todos los proyectos Wikimedia'; break;
               case 'nb': msg2 = 'Redigeringsteller for Wikimedia-prosjekter'; break;
               case 'ne': msg2 = 'विकिमीडिया परियोजना काउन्टर सम्पादनहरू'; break;
               case 'nl': msg2 = 'Wikimedia-projecten bijdragenteller'; break;
               case 'ro': msg2 = 'contor pentru contributiile la Wikimédia'; break;
               case 'ru': msg2 = 'Счётчик правок в проектах Викимедиа'; break;
               case 'sq': msg2 = 'Matësi i editimeve të projekteve Wikimedia'; break;
               case 'sv': msg2 = 'Redigeringräknare för Wikimediaprojekten'; break;
               case 'uk': msg2 = 'лічильник редагувань у проектах Вікімедіа'; break;
               
               default: msg2 = 'Wikimedia projects edits counter';
           }
           break;
       
       
       case 'commons-coverage':
           switch (browserlang) {
               case 'fr': msg2 = 'une image par km<sup>2</sup>, c\'est possible !'; break;
               case 'es': msg2 = '1 imagen/km<sup>2</sup>, ¡podemos hacerlo!'; break;
               case 'nb': msg2 = 'Ett bilde per km<sup>2</sup>, det får vi til!'; break;
               case 'ne': msg2 = '१ तस्विर किमी<sup>२</sup>, हामीहरू गर्न सक्छौ!'; break;
               case 'nl': msg2 = '1 afbeelding/km<sup>2</sup>, we kunnen het!'; break;
               case 'ro': msg2 = '1 imagine/km<sup>2</sup>, putem reuși!'; break;
               case 'ru': msg2 = '1 фотография на км<sup>2</sup>, это нетрудно!'; break;
               case 'sq': msg2 = '1 imazh/km<sup>2</sup>, mund t\'ja dalim!'; break;
               case 'sv': msg2 = '1 bild/km<sup>2</sup>, det klarar vi!'; break;
               case 'uk': msg2 = '1 зображення на км<sup>2</sup>, ми це зможемо!'; break;
               
               default: msg2 = '1 image/km<sup>2</sup>, we can do it!';
           }
           break;
       
       
       case 'deadline-link':
           switch (browserlang) {
               case 'ca': msg2 = '//ca.wikipedia.org/wiki/Viquipèdia:Hi_ha_una_data_límit'; break;
               case 'en': msg2 = '//en.wikipedia.org/wiki/Wikipedia:There_is_a_deadline'; break;
               case 'it': msg2 = '//it.wikipedia.org/wiki/Wikipedia:Lotta_contro_il_tempo'; break;
               case 'nl': msg2 = '//nl.wikipedia.org/wiki/Wikipedia:Er_is_een_deadline'; break;
               case 'ro': msg2 = '//ro.wikipedia.org/wiki/Wikipedia:Există_un_termen_limită'; break;
               case 'sv': msg2 = '//sv.wikipedia.org/wiki/Wikipedia:Det_finns_en_deadline'; break;
               
               default: msg2 = '//en.wikipedia.org/wiki/Wikipedia:There_is_a_deadline';
           }
           break;
       
       
       case 'deadline':
           switch (browserlang) {
               case 'fr': msg2 = 'un essai sur l\'importance de la préservation de la connaissance'; break;
               case 'es': msg2 = 'un ensayo sobre la importancia de preservar el conocimiento'; break;
               case 'nb': msg2 = 'et essay om viktigheten av å bevare kunnskap'; break;
               case 'ne': msg2 = 'संरक्षण ज्ञानको महत्त्व माथि एउटा निबन्ध'; break;
               case 'nl': msg2 = 'een opstel over de waarde van het conserveren van kennis'; break;
               case 'ro': msg2 = 'un eseu despre importanța păstrării cunoștințelor'; break;
               case 'ru': msg2 = 'эссе о важности сохранения знаний'; break;
               case 'sq': msg2 = 'një ese mbi rëndësinë e ruajtjes së dijes'; break;
               case 'sv': msg2 = 'en essä om vikten av att bevara kunskap'; break;
               case 'uk': msg2 = 'допис про важливість зберігати знання'; break;
               
               default: msg2 = 'an essay on the importance of preserving knowledge';
           }
           break;
       
       
       case 'ahk':
           switch (browserlang) {
               case 'fr': msg2 = 'estimation du nombre d\'articles nécessaires pour couvrir l\'intégralité des connaissances'; break;
               case 'es': msg2 = 'estimación del número de artículos necesarios para abarcar todo el conocimiento'; break;
               case 'nb': msg2 = 'estimat av antall artikler som trengs for å dekke all kunnskap'; break;
               case 'ne': msg2 = 'लेखहरूको संख्याको आकलनमा सबै ज्ञानलाई समेट्नु जरूरी छ'; break;
               case 'nl': msg2 = 'schatting van het aantal artikelen benodigd om alle kennis af te dekken'; break;
               case 'ro': msg2 = 'estimare a numărului de articole necesare pentru acoperirea tuturor cunoștințelor'; break;
               case 'ru': msg2 = 'оценка числа статей, необходимых для того, чтобы собрать все нужные знания'; break;
               case 'sq': msg2 = 'duke llogaritur numrin e artikujve që nevojiten për të paraqitur të gjithë dijen njerëzore'; break;
               case 'sv': msg2 = 'uppskattning av antal artiklar som krävs för att täcka all kunskap'; break;
               case 'uk': msg2 = 'скільки треба статей, щоб охопити всю сукупність знань'; break;
               
               default: msg2 = 'estimating the number of articles needed to cover all knowledge';
           }
           break;
       
       
       case 'country':
           switch (browserlang) {
               case 'fr': msg2 = 'Pays'; break;
               case 'es': msg2 = 'País'; break;
               case 'nb': msg2 = 'Land'; break;
               case 'ne': msg2 = 'राष्ट्र'; break;
               case 'nl': msg2 = 'Land'; break;
               case 'ro': msg2 = 'Țară'; break;
               case 'ru': msg2 = 'Страна'; break;
               case 'sq': msg2 = 'Shteti'; break;
               case 'sv': msg2 = 'Land'; break;
               case 'uk': msg2 = 'Країна'; break;
               
               default: msg2 = 'Country';
           }
           break;
       
       
       case 'municipality':
           switch (browserlang) {
               case 'es': msg2 = 'Municipio'; break;
               case 'sq': msg2 = 'Njësi bashkiake'; break;
               
               default: msg2 = 'Municipality';
           }
           break;
       
       
       case 'address':
           switch (browserlang) {
               case 'es': msg2 = 'Dirección'; break;
               case 'sq': msg2 = 'Addresa'; break;
               
               default: msg2 = 'Address';
           }
           break;
       
       
       case 'lat/lon':
           switch (browserlang) {
               case 'es': msg2 = 'Lat/Lon'; break;
               case 'sq': msg2 = 'Lat/Lon'; break;
               
               default: msg2 = 'Lat/Lon';
           }
           break;
       
       
       case 'gallery':
           switch (browserlang) {
               case 'es': msg2 = 'Galería'; break;
               
               default: msg2 = 'Gallery';
           }
           break;
       
       
       case 'n/a':
           switch (browserlang) {
               case 'es': msg2 = 'n/d'; break;
               case 'sq': msg2 = 'n/a'; break;
               
               default: msg2 = 'n/a';
           }
           break;
       
       
       case 'show-menu':
           switch (browserlang) {
               case 'fr': msg2 = 'Montrer le menu'; break;
               case 'es': msg2 = 'Mostrar menú'; break;
               case 'nb': msg2 = 'Vis meny'; break;
               case 'ne': msg2 = 'मेनु देखाउने'; break;
               case 'nl': msg2 = 'Laad menu'; break;
               case 'ro': msg2 = 'Arată meniul'; break;
               case 'ru': msg2 = 'Показать меню'; break;
               case 'sq': msg2 = 'Shfaq menunë'; break;
               case 'sv': msg2 = 'Visa meny'; break;
               case 'uk': msg2 = 'Показати меню'; break;
               
               default: msg2 = 'Show menu';
           }
           break;
       
       
       case 'upload-your-photo':
           switch (browserlang) {
               case 'fr': msg2 = 'Importer votre photo !'; break;
               case 'es': msg2 = '¡Sube tu foto!'; break;
               case 'nb': msg2 = 'Last opp bildet ditt!'; break;
               case 'ne': msg2 = 'आफ्नो तस्विर अपलोड गर्नुहोस!'; break;
               case 'nl': msg2 = 'Upload jouw foto!'; break;
               case 'ro': msg2 = 'Încarcă fotografia!'; break;
               case 'ru': msg2 = 'Загрузите свои фотографии!'; break;
               case 'sq': msg2 = 'Ngarko foton tënde!'; break;
               case 'sv': msg2 = 'Ladda upp ditt foto!'; break;
               case 'uk': msg2 = 'Завантажити власні фото!'; break;
               
               default: msg2 = 'Upload your photo!';
           }
           break;
       
       
       case 'loading':
           switch (browserlang) {
               case 'fr': msg2 = 'Chargement en cours... merci de patienter'; break;
               case 'es': msg2 = 'Cargando... espere por favor'; break;
               case 'nb': msg2 = 'Laster... vennligst vent'; break;
               case 'ne': msg2 = 'लोड हुँदैछ... कृपया पर्खिनुहोस'; break;
               case 'nl': msg2 = 'Laden... een moment geduld'; break;
               case 'ro': msg2 = 'Se încarcă... mulțumim pentru răbdare'; break;
               case 'ru': msg2 = 'Загрузка... пожалуйста, подождите'; break;
               case 'sq': msg2 = 'Duke u ngarkuar... ju jutem prisni'; break;
               case 'sv': msg2 = 'Laddar--- vänligen vänta'; break;
               case 'uk': msg2 = 'Завантажується... будь ласка, зачекайте'; break;
               
               default: msg2 = 'Loading... please wait';
           }
           break;
        
        
       case 'country-ad':
           switch (browserlang) {
               case 'es': msg2 = 'Andorra'; break;
               
               default: msg2 = 'Andorra';
           }
           break;
        
        
       case 'country-am':
           switch (browserlang) {
               case 'es': msg2 = 'Armenia'; break;
               
               default: msg2 = 'Armenia';
           }
           break;
        
        
       case 'country-aq':
           switch (browserlang) {
               case 'es': msg2 = 'Antártida'; break;
               
               default: msg2 = 'Antarctica';
           }
           break;
        
        
       case 'country-ar':
           switch (browserlang) {
               case 'es': msg2 = 'Argentina'; break;
               
               default: msg2 = 'Argentina';
           }
           break;
        
        
       case 'country-at':
           switch (browserlang) {
               case 'es': msg2 = 'Austria'; break;
               
               default: msg2 = 'Austria';
           }
           break;
        
        
       case 'country-az':
           switch (browserlang) {
               case 'es': msg2 = 'Azerbaiyán'; break;
               
               default: msg2 = 'Azerbaijan';
           }
           break;
        
        
       case 'country-be':
       case 'country-be-bru':
       case 'country-be-vlg':
       case 'country-be-wal':
           switch (browserlang) {
               case 'es': msg2 = 'Bélgica'; break;
               
               default: msg2 = 'Belgium';
           }
           break;
        
        
       case 'country-bo':
           switch (browserlang) {
               case 'es': msg2 = 'Bolivia'; break;
               
               default: msg2 = 'Bolivia';
           }
           break;
       
       
       case 'country-br':
           switch (browserlang) {
               case 'es': msg2 = 'Brazil'; break;
               
               default: msg2 = 'Brazil';
           }
           break;
       
       
       case 'country-by':
           switch (browserlang) {
               case 'es': msg2 = 'Bielorrusia'; break;
               
               default: msg2 = 'Belarus';
           }
           break;
       
       
       case 'country-ca':
           switch (browserlang) {
               case 'es': msg2 = 'Canadá'; break;
               
               default: msg2 = 'Canada';
           }
           break;
        
        
       case 'country-ch':
           switch (browserlang) {
               case 'es': msg2 = 'Suiza'; break;
               
               default: msg2 = 'Switzerland';
           }
           break;
        
        
       case 'country-cl':
           switch (browserlang) {
               case 'es': msg2 = 'Chile'; break;
               
               default: msg2 = 'Chile';
           }
           break;
        
        
       case 'country-cm':
           switch (browserlang) {
               case 'es': msg2 = 'Camerún'; break;
               
               default: msg2 = 'Cameroon';
           }
           break;
        
        
       case 'country-cn':
           switch (browserlang) {
               case 'es': msg2 = 'China'; break;
               
               default: msg2 = 'China';
           }
           break;
        
        
       case 'country-co':
           switch (browserlang) {
               case 'es': msg2 = 'Colombia'; break;
               
               default: msg2 = 'Colombia';
           }
           break;
        
        
       case 'country-cz':
           switch (browserlang) {
               case 'es': msg2 = 'República Checa'; break;
               
               default: msg2 = 'Czech Republic';
           }
           break;
        
        
       case 'country-de':
       case 'country-de-by':
       case 'country-de-he':
       case 'country-de-nrw-bm':
       case 'country-de-nrw-k':
           switch (browserlang) {
               case 'es': msg2 = 'Alemania'; break;
               
               default: msg2 = 'Germany';
           }
           break;
        
       
       case 'country-dk':
       case 'country-dk-bygning':
       case 'country-dk-fortids':
           switch (browserlang) {
               case 'es': msg2 = 'Dinamarca'; break;
               
               default: msg2 = 'Denmark';
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
        
        
       case 'country-gb':
       case 'country-gb-eng':
       case 'country-gb-nir':
       case 'country-gb-sct':
       case 'country-gb-wls':
           switch (browserlang) {
               case 'es': msg2 = 'Reino Unido'; break;
               
               default: msg2 = 'United Kingdom';
           }
           break;
        
        
       case 'country-gh':
           switch (browserlang) {
               case 'es': msg2 = 'Ghana'; break;
               
               default: msg2 = 'Ghana';
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
        
        
       case 'country-ie':
           switch (browserlang) {
               case 'es': msg2 = 'Irlanda'; break;
               
               default: msg2 = 'Ireland';
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
       case 'country-it-bz':
       case 'country-it-88':
           switch (browserlang) {
               case 'es': msg2 = 'Italia'; break;
               
               default: msg2 = 'Italy';
           }
           break;
        
        
       case 'country-jo':
           switch (browserlang) {
               case 'es': msg2 = 'Jordán'; break;
               
               default: msg2 = 'Jordan';
           }
           break;
        
        
       case 'country-jp':
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
        
        
       case 'country-lu':
           switch (browserlang) {
               case 'es': msg2 = 'Luxemburgo'; break;
               
               default: msg2 = 'Luxembourg';
           }
           break;
        
        
       case 'country-mt':
           switch (browserlang) {
               case 'es': msg2 = 'Malta'; break;
               
               default: msg2 = 'Malta';
           }
           break;
        
        
       case 'country-mx':
           switch (browserlang) {
               case 'es': msg2 = 'México'; break;
               
               default: msg2 = 'Mexico';
           }
           break;
        
        
       case 'country-nl':
       case 'country-nl-aw':
       case 'country-nl-gem':
       case 'country-nl-prov':
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
        
        
       case 'country-np':
           switch (browserlang) {
               case 'es': msg2 = 'Nepal'; break;
               
               default: msg2 = 'Nepal';
           }
           break;
        
        
       case 'country-ph':
           switch (browserlang) {
               case 'es': msg2 = 'Filipinas'; break;
               
               default: msg2 = 'Philippines';
           }
           break;
        
        
       case 'country-pk':
           switch (browserlang) {
               case 'es': msg2 = 'Pakistán'; break;
               
               default: msg2 = 'Pakistan';
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
        
        
       case 'country-se':
       case 'country-se-arbetsl':
       case 'country-se-bbr':
       case 'country-se-fornmin':
       case 'country-se-ship':
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
       case 'country-us-ca':
           switch (browserlang) {
               case 'es': msg2 = 'Estados Unidos'; break;
               
               default: msg2 = 'United States';
           }
           break;
        
        
       case 'country-uy':
           switch (browserlang) {
               case 'es': msg2 = 'Uruguay'; break;
               
               default: msg2 = 'Uruguay';
           }
           break;
        
        
       case 'country-ve':
           switch (browserlang) {
               case 'es': msg2 = 'Venezuela'; break;
               
               default: msg2 = 'Venezuela';
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
        center: start,
        zoom: 2,
        layers: [layerOSM,layerNoPicMonuments,layerWithPicMonuments]
    });
    L.control.scale().addTo(map);
    
    var baseLayers = {
        "OpenStreetMap": layerOSM
    };

    var overlays = {
        "Monuments (without images)": layerNoPicMonuments,
        "Monuments (with images)": layerWithPicMonuments
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
        //'<li><a href="//tools.wmflabs.org/commons-coverage/" target="_blank">Commons Coverage</a>: ' + translatemsg('commons-coverage') + '</li>' + 
        '<li><a href="' + translatemsg('deadline-link') + '" target="_blank">There is a deadline</a>: ' + translatemsg('deadline') + '</li>' + 
        '<li><a href="//en.wikipedia.org/wiki/User:Emijrp/All_human_knowledge" target="_blank">User:Emijrp/All human knowledge</a>: ' + translatemsg('ahk') + '</li>' + 
        '</ul>' + 
        
        '<p><i><a href="//en.wikipedia.org/wiki/User:Emijrp/Wiki_Loves_Monuments_map" target="_blank"><i>Translate this map into your language!</i></a></p>' + 
        ''
        );
    
    //Plugin magic goes here! Note that you cannot use the same layer object again, as that will confuse the two map controls
    var osm2 = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 13, attribution: osmAttrib });
    var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, zoomLevelOffset: -6 }).addTo(map);

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
        popuptext = popuptext + '<tr><td><b>'+translatemsg('gallery')+':</b></td><td colspan=2><a href="//commons.wikimedia.org/wiki/Category:'+feature.properties.commonscat+'" target="_blank">See</a></td></tr>';
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
    withimage = 0; withoutimage = 0;
    document.getElementById('wait').style.display = 'block';
    askForMonuments('0');  // without images
    askForMonuments('1');  // with images
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
}

function askForMonuments(withImages) {
    var mobile;
    mobile = '0';
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 800 && window.innerHeight <= 600) ) {
        mobile = '1';
    }
    var data='bbox=' + map.getBounds().toBBoxString() + '&mobile=' + mobile + '&withImages=' + withImages;
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
    if( ajaxresponse.withImages == '0' ) {
        layerNoPicMonuments.clearLayers();
        layerNoPicMonuments.addData(ajaxresponse);
        withoutimage = ajaxresponse.features.length;
    }else{
        layerWithPicMonuments.clearLayers();
        layerWithPicMonuments.addData(ajaxresponse);
        withimage = ajaxresponse.features.length;
    }
    featureCollection.push(ajaxresponse.features);
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

