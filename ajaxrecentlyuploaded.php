<?php 
/* Original code: https://github.com/chillly/plaques/blob/master/ajax/ajxplaques.php
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

ini_set('display_errors', 1);
error_reporting(E_ALL);

/*
 * ajaxrecentlyuploaded.php
 * returns recently uploaded images info
 */

// open the database
$dbmycnf = parse_ini_file("../replica.my.cnf");
$dbuser = $dbmycnf['user'];
$dbpass = $dbmycnf['password'];
unset($dbmycnf);
$dbhost = "s4.labsdb";
$dbname = "commonswiki_p";

try {
    $db = new PDO('mysql:host='.$dbhost.';dbname='.$dbname.';charset=utf8', $dbuser, $dbpass);
} catch(PDOException $e) {
    // send the PDOException message
    $ajaxres=array();
    $ajaxres['resp']=40;
    $ajaxres['dberror']=$e->getCode();
    $ajaxres['msg']=$e->getMessage();
    sendajax($ajaxres);
}

try {
    $limit = 4;
    $sql="SELECT page_title, page_latest, rev_user_text, rev_timestamp FROM page, categorylinks, revision WHERE page_id=cl_from AND page_latest=rev_id AND page_namespace=6 AND cl_to='Images_from_Wiki_Loves_Monuments_2016' GROUP BY rev_user_text ORDER BY rev_timestamp DESC LIMIT ".$limit;
    $stmt = $db->prepare($sql);
    $stmt->execute();
} catch(PDOException $e) {
    // send the PDOException message
    $ajaxres=array();
    $ajaxres['resp']=40;
    $ajaxres['dberror']=$e->getCode();
    $ajaxres['msg']=$e->getMessage();
    sendajax($ajaxres);
}

$ajaxres=array(); // place to store the geojson result
$images=array(); // array to build up the images collection
$ajaxres['type']='ImageCollection';

// go through the list adding each one to the array to be returned    
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $prop=array();
    $prop['img_title']=$row['page_title'];
    $prop['uploader']=$row['rev_user_text'];
    $prop['upload_date']=$row['rev_timestamp'];
    $prop['md5']=substr(md5($prop['img_title']),0,2);

    $i=array();
    $i['type']='Image';
    $i['properties']=$prop;

    $images[]=$i;
}

// add the features array to the end of the ajxres array
$ajaxres['images']=$images;
// tidy up the DB
$db = null;
sendajax($ajaxres); // no return from there

function sendajax($ajax) {
    // encode the ajx array as json and return it.
    $encoded = json_encode($ajax);
    exit($encoded);
}
?>
