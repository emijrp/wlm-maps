function translatemsg (msg) {
    var msg2 = msg;
    switch (msg) {
       case 'zoom-in':
           switch (browserlang) {
               case 'sv': msg2 = 'Zooma in'; break;

               default: msg2 = 'Zoom in';
           }
           break;
       
       case 'zoom-out':
           switch (browserlang) {
               case 'sv': msg2 = 'Zooma ut'; break;

               default: msg2 = 'Zoom out';
           }
           break;
       
       case 'hide-minimap':
           switch (browserlang) {
               case 'de': msg2 = 'Miniaturkarte ausblenden'; break;
               case 'sv': msg2 = 'Dölj minikarta'; break;

               default: msg2 = 'Hide MiniMap';
           }
           break;
       
       case 'show-minimap':
           switch (browserlang) {
               case 'de': msg2 = 'Miniaturkarte einblenden'; break;
               case 'sv': msg2 = 'Visa minikarta'; break;

               default: msg2 = 'Show MiniMap';
           }
           break;
       
       case 'locate':
           switch (browserlang) {
               case 'sv': msg2 = 'Hitta'; break;

               default: msg2 = 'Locate';
           }
           break;
       
       case 'osm-attrib':
           switch (browserlang) {
               case 'sv': msg2 = 'Kartdata &copy; <a href="//openstreetmap.org" target="_blank">OpenStreetMap</a>-bidragsgivare | <a href="//commons.wikimedia.org/wiki/Commons:Monuments_database" target="_blank">Minnesmärkesdatabas</a> av Wikipedia-skribenter | <a href="//github.com/emijrp/wlm-maps" target="_blank">Källkod</a> av <a href="//en.wikipedia.org/wiki/User:Emijrp" target="_blank">emijrp</a> på GitHub'; break;

               default: msg2 = 'Map data &copy; <a href="//openstreetmap.org" target="_blank">OpenStreetMap</a> contributors | <a href="//commons.wikimedia.org/wiki/Commons:Monuments_database" target="_blank">Monuments database</a> by Wikipedia editors | <a href="//github.com/emijrp/wlm-maps" target="_blank">Source code</a> by <a href="//en.wikipedia.org/wiki/User:Emijrp" target="_blank">emijrp</a> in GitHub';
           }
           break;
       
       case 'welcome':
           switch (browserlang) {
               case 'es': msg2 = '<b>¡Bienvenido/a!</b> Este es un mapa para el concurso <a href="' + getwebsite ('es') + '" target="_blank">Wiki Loves Monuments 2016</a>&nbsp;<a href="https://twitter.com/'+gettwitter('es')+'" target="_blank" title="@'+gettwitter('es')+' on Twitter!"><img src="icons/twitter.ico" width="18px" /></a>&nbsp;<a href="'+getfacebook('es')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" width="18px" /></a>. ¡Busca monumentos próximos a ti, hazles fotos y súbelas!'; break;
               case 'fr': msg2 = '<b>Bienvenue !</b> Ceci est une carte pour le concours photographique <a href="' + getwebsite ('fr') + '" target="_blank">Wiki Loves Monuments 2016</a>&nbsp;<a href="https://twitter.com/'+gettwitter('fr')+'" target="_blank" title="@'+gettwitter('fr')+' on Twitter!"><img src="icons/twitter.ico" width="18px" /></a>&nbsp;<a href="'+getfacebook('fr')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" width="18px" /></a>. Cherchez monuments proche de vous, prenez des photos et importez-les !'; break;
               case 'he': msg2 = 'ברוכים הבאים! זוהי מפה עבור תחרות הצילום ויקיפדיה אוהבת אתרי מורשת 2016. חפשו אתרי מורשת ועתיקות לידכם, צלמו והעלו את התמונות!'; break;
               case 'it': msg2 = '<b>Welcome!</b> This is a map for the <a href="' + getwebsite ('it') + '" target="_blank">Wiki Loves Monuments 2016</a>&nbsp;<a href="https://twitter.com/'+gettwitter('it')+'" target="_blank" title="@'+gettwitter('it')+' on Twitter!"><img src="icons/twitter.ico" width="18px" /></a>&nbsp;<a href="'+getfacebook('it')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" width="18px" /></a> photographic contest. Search monuments near to you, take photos and upload them!'; break;
               case 'nb': msg2 = 'Velkommen! Dette er et kart for <a href="' + getwebsite ('no') + '" target="_blank">Wiki Loves Monuments 2016</a>-fotokonkurransen&nbsp;<a href="https://twitter.com/'+gettwitter('no')+'" target="_blank" title="@'+gettwitter('no')+' on Twitter!"><img src="icons/twitter.ico" width="18px" /></a>&nbsp;<a href="'+getfacebook('no')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" width="18px" /></a>. Søk i monumenter nær deg, ta bilder og last dem opp!'; break;
               case 'ne': msg2 = 'तपाईंलाई स्वागत छ! यो <a href="' + getwebsite ('np') + '" target="_blank">विकी लभ्स मोन्युमेन्ट्स २०१५</a>&nbsp;<a href="https://twitter.com/'+gettwitter('np')+'" target="_blank" title="@'+gettwitter('np')+' on Twitter!"><img src="icons/twitter.ico" width="18px" /></a>&nbsp;<a href="'+getfacebook('np')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" width="18px" /></a> तस्विर प्रतियोगिताको नक्सा हो । तपाईं नजिकै रहेको धरोहरहरूको तस्विर खिच्नुहोस् र त्यसलाई अपलोड गर्नुहोस!'; break;
               case 'nl': msg2 = 'Welkom! Dit is de kaart voor de fotowedstrijd <a href="' + getwebsite ('nl') + '" target="_blank">Wiki Loves Monuments 2016</a>&nbsp;<a href="https://twitter.com/'+gettwitter('nl')+'" target="_blank" title="@'+gettwitter('nl')+' on Twitter!"><img src="icons/twitter.ico" width="18px" /></a>&nbsp;<a href="'+getfacebook('nl')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" width="18px" /></a>. Zoek naar monumenten in jouw buurt, maak foto\'s en upload ze!'; break;
               case 'ro': msg2 = 'Bun venit! Aceasta este o hartă pentru concursul de fotografie <a href="' + getwebsite ('ro') + '" target="_blank">Wiki Loves Monuments 2016</a>&nbsp;<a href="https://twitter.com/'+gettwitter('ro')+'" target="_blank" title="@'+gettwitter('ro')+' on Twitter!"><img src="icons/twitter.ico" width="18px" /></a>&nbsp;<a href="'+getfacebook('ro')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" width="18px" /></a>. Căutați monumente din preajmă, fotografiați-le și încărcați imaginile!'; break;
               case 'ru': msg2 = 'Добро пожаловать! Это карта памятников, участвующих в международном фотоконкурсе <a href="' + getwebsite ('ru') + '" target="_blank">Вики любит памятники</a>&nbsp;<a href="https://twitter.com/'+gettwitter('ru')+'" target="_blank" title="@'+gettwitter('ru')+' on Twitter!"><img src="icons/twitter.ico" width="18px" /></a>&nbsp;<a href="'+getfacebook('ru')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" width="18px" /></a>. Найдите объекты, находящиеся неподалёку, сфотографируйте их и примите участие в конкурсе!'; break;
               case 'sq': msg2 = 'Mirë se vini! Kjo është një hartë për konkursin fotografik <a href="' + getwebsite ('al') + '" target="_blank">Wiki Loves Monuments 2016</a>&nbsp;<a href="https://twitter.com/'+gettwitter('al')+'" target="_blank" title="@'+gettwitter('al')+' on Twitter!"><img src="icons/twitter.ico" width="18px" /></a>&nbsp;<a href="'+getfacebook('al')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" width="18px" /></a>. Kërko monumentet afër teje, fotografoi dhe ngarkoi fotot!'; break;
               case 'sv': msg2 = 'Välkommen! Detta är en karta för fototävlngen <a href="' + getwebsite ('se') + '" target="_blank">Wiki Loves Monuments 2016</a>&nbsp;<a href="https://twitter.com/'+gettwitter('se')+'" target="_blank" title="@'+gettwitter('se')+' on Twitter!"><img src="icons/twitter.ico" width="18px" /></a>&nbsp;<a href="'+getfacebook('se')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" width="18px" /></a>. Hitta monument nära dig, ta bilder och ladda upp dem!'; break;
               case 'uk': msg2 = 'Привіт! Це карта для фотоконкурсу <a href="' + getwebsite ('ua') + '" target="_blank">Wiki Loves Monuments 2016</a>&nbsp;<a href="https://twitter.com/'+gettwitter('ua')+'" target="_blank" title="@'+gettwitter('ua')+' on Twitter!"><img src="icons/twitter.ico" width="18px" /></a>&nbsp;<a href="'+getfacebook('ua')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" width="18px" /></a>. Шукайте пам\'ятки біля Вас, робіть фотографії та вантажте їх!'; break;

               default: msg2 = '<b>Welcome!</b> This is a map for the <a href="' + getwebsite ('en') + '" target="_blank">Wiki Loves Monuments 2016</a>&nbsp;<a href="https://twitter.com/'+gettwitter('en')+'" target="_blank" title="@'+gettwitter('en')+' on Twitter!"><img src="icons/twitter.ico" width="18px" /></a>&nbsp;<a href="'+getfacebook('en')+'" target="_blank" title="Wiki Loves Monuments on Facebook!"><img src="icons/facebook.png" width="18px" /></a> photographic contest. Search monuments near to you, take photos and upload them!';
           }
           break;
       
       
       case 'legend':
           switch (browserlang) {
               case 'es': msg2 = 'Leyenda'; break;
               case 'fr': msg2 = 'Légende'; break;
               case 'he': msg2 = 'מקרא'; break;
               case 'it': msg2 = 'Legenda'; break;
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
               case 'es': msg2 = 'Monumento con foto'; break;
               case 'fr': msg2 = 'Monument avec image'; break;
               case 'he': msg2 = 'אתרי מורשת או עתיקות עם תמונה'; break;
               case 'it': msg2 = 'Monumento con immagine'; break;
               case 'nb': msg2 = 'Monument med bilde'; break;
               case 'ne': msg2 = 'तस्विर सहितको धरोहर'; break;
               case 'nl': msg2 = 'Monument met afbeelding'; break;
               case 'ro': msg2 = 'Monument cu imagine'; break;
               case 'ru': msg2 = 'Сфотографированный памятник'; break;
               case 'sq': msg2 = 'Monument me imazh'; break;
               case 'sv': msg2 = 'Minnesmärke med bild'; break;
               case 'uk': msg2 = 'Пам\'ятка із фото'; break;
               
               default: msg2 = 'Monument with image';
           }
           break;
       
       
       case 'monument-without-image':
           switch (browserlang) {
               case 'es': msg2 = 'Monumento sin foto'; break;
               case 'fr': msg2 = 'Monument sans image'; break;
               case 'he': msg2 = 'אתרי מורשת או עתיקות ללא תמונה'; break;
               case 'it': msg2 = 'Monumento senza immagine'; break;
               case 'nb': msg2 = 'Monument uten bilde'; break;
               case 'ne': msg2 = 'तस्विर विनाको धरोहर'; break;
               case 'nl': msg2 = 'Monument zonder afbeelding'; break;
               case 'ro': msg2 = 'Monument fără imagine'; break;
               case 'ru': msg2 = 'Несфотографированный памятник'; break;
               case 'sq': msg2 = 'Monument pa imazh'; break;
               case 'sv': msg2 = 'Minnesmärke utan bild'; break;
               case 'uk': msg2 = 'Пам\'ятка без фото'; break;
               
               default: msg2 = 'Monument without image';
           }
           break;
       
       
       case 'statistics':
           switch (browserlang) {
               case 'es': msg2 = 'Estadísticas'; break;
               case 'fr': msg2 = 'Statistiques'; break;
               case 'he': msg2 = 'נתונים סטטיסטיים'; break;
               case 'it': msg2 = 'Statistiche'; break;
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
               case 'es': msg2 = 'Consulta las <a href="//tools.wmflabs.org/wlm-stats" target="_blank">estadísticas</a> de ediciones anteriores.'; break;
               case 'fr': msg2 = 'Il y a des <a href="//tools.wmflabs.org/wlm-stats" target="_blank">statistiques</a> pour comparer avec les éditions précédentes.'; break;
               case 'he': msg2 = 'קיימים נתונים סטטיסטיים להשוואה לגרסאות קודמות.'; break;
               case 'it': msg2 = 'Compara le <a href="//tools.wmflabs.org/wlm-stats" target="_blank">statistiche</a> con l\'edizione precedente'; break;
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
               case 'es': msg2 = 'Véase también'; break;
               case 'fr': msg2 = 'Voir aussi'; break;
               case 'he': msg2 = 'ראה גם'; break;
               case 'it': msg2 = 'Vedi anche'; break;
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
               case 'es': msg2 = 'Contador de ediciones de todos los proyectos Wikimedia'; break;
               case 'fr': msg2 = 'compteur de contributions sur les projets Wikimédia'; break;
               case 'he': msg2 = 'מונה עריכות למיזמי ויקימדיה'; break;
               case 'it': msg2 = 'contatore modifiche dei progetti Wikimedia'; break;
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
               case 'es': msg2 = '1 imagen/km<sup>2</sup>, ¡podemos hacerlo!'; break;
               case 'fr': msg2 = 'une image par km<sup>2</sup>, c\'est possible !'; break;
               case 'he': msg2 = 'תמונה אחת לקמ"ר, אנחנו מסוגלים לעשות את זה!'; break;
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
               case 'es': msg2 = 'un ensayo sobre la importancia de preservar el conocimiento'; break;
               case 'fr': msg2 = 'un essai sur l\'importance de la préservation de la connaissance'; break;
               case 'he': msg2 = 'מאמר על חשיבות שימור הידע'; break;
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
               case 'es': msg2 = 'estimación del número de artículos necesarios para abarcar todo el conocimiento'; break;
               case 'fr': msg2 = 'estimation du nombre d\'articles nécessaires pour couvrir l\'intégralité des connaissances'; break;
               case 'he': msg2 = 'הערכה של כמות הערכים הדרושים כדי לכסות את כל הידע האנושי'; break;
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
               case 'es': msg2 = 'País'; break;
               case 'fr': msg2 = 'Pays'; break;
               case 'he': msg2 = 'מדינה'; break;
               case 'it': msg2 = 'Nazione'; break;
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
               case 'it': msg2 = 'Comune'; break;
               case 'sq': msg2 = 'Njësi bashkiake'; break;
               case 'sv': msg2 = 'Kommun'; break;
               
               default: msg2 = 'Municipality';
           }
           break;
       
       
       case 'address':
           switch (browserlang) {
               case 'es': msg2 = 'Dirección'; break;
               case 'it': msg2 = 'Indirizzo'; break;
               case 'sq': msg2 = 'Addresa'; break;
               case 'sv': msg2 = 'Adress'; break;
               
               default: msg2 = 'Address';
           }
           break;
       
       
       case 'lat/lon':
           switch (browserlang) {
               case 'es': msg2 = 'Lat/Lon'; break;
               case 'it': msg2 = 'Lat/Lon'; break;
               case 'sq': msg2 = 'Lat/Lon'; break;
               case 'sv': msg2 = 'Lat/Lon'; break;
               
               default: msg2 = 'Lat/Lon';
           }
           break;
       
       
       case 'gallery':
           switch (browserlang) {
               case 'es': msg2 = 'Galería'; break;
               case 'it': msg2 = 'Galleria'; break;
               case 'sv': msg2 = 'Galleri'; break;
               
               default: msg2 = 'Gallery';
           }
           break;
       
       
       case 'n/a':
           switch (browserlang) {
               case 'es': msg2 = 'n/d'; break;
               case 'it': msg2 = 'n/a'; break;
               case 'sq': msg2 = 'n/a'; break;
               case 'sv': msg2 = 'n/a'; break;
               
               default: msg2 = 'n/a';
           }
           break;
       
       
       case 'show-menu':
           switch (browserlang) {
               case 'es': msg2 = 'Mostrar menú'; break;
               case 'fr': msg2 = 'Montrer le menu'; break;
               case 'he': msg2 = 'הצג תפריט'; break;
               case 'it': msg2 = 'Mostra menu'; break;
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
               case 'es': msg2 = '¡Sube tu foto!'; break;
               case 'fr': msg2 = 'Importer votre photo !'; break;
               case 'he': msg2 = 'העלה תמונה!'; break;
               case 'it': msg2 = 'Carica la tua foto!'; break;
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
               case 'es': msg2 = 'Cargando... espere por favor'; break;
               case 'fr': msg2 = 'Chargement en cours... merci de patienter'; break;
               case 'he': msg2 = 'טוען... נא המתן'; break;
               case 'it': msg2 = 'Attendere prego'; break;
               case 'nb': msg2 = 'Laster... vennligst vent'; break;
               case 'ne': msg2 = 'लोड हुँदैछ... कृपया पर्खिनुहोस'; break;
               case 'nl': msg2 = 'Laden... een moment geduld'; break;
               case 'ro': msg2 = 'Se încarcă... mulțumim pentru răbdare'; break;
               case 'ru': msg2 = 'Загрузка... пожалуйста, подождите'; break;
               case 'sq': msg2 = 'Duke u ngarkuar... ju jutem prisni'; break;
               case 'sv': msg2 = 'Laddar... vänligen vänta'; break;
               case 'uk': msg2 = 'Завантажується... будь ласка, зачекайте'; break;
               
               default: msg2 = 'Loading... please wait';
           }
           break;
        
        
       case 'september-year':
           switch (browserlang) {
               case 'es': msg2 = 'Septiembre de 2016'; break;
               case 'it': msg2 = 'Settembre 2016'; break;
               case 'sv': msg2 = 'September 2016'; break;
               
               default: msg2 = 'September 2016';
           }
           break;
        
        
       case 'share-map':
           switch (browserlang) {
               case 'es': msg2 = '¡Comparte el mapa!'; break;
               case 'sv': msg2 = 'Dela denna karta!'; break;
               
               default: msg2 = 'Share this map!';
           }
           break;
        
        
       case 'see':
           switch (browserlang) {
               case 'es': msg2 = 'Ver'; break;
               case 'sv': msg2 = 'Se'; break;
               
               default: msg2 = 'See';
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
