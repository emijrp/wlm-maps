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
 * ajaxmonuments.php
 * returns monuments points as geojson 
 */

if (isset($_GET['bbox'])) {
    $bbox=$_GET['bbox'];
} else {
    // invalid request
    $ajaxres=array();
    $ajaxres['resp']=4;
    $ajaxres['dberror']=0;
    $ajaxres['msg']='missing bounding box';
    sendajax($ajaxres);
}
// split the bbox into it's parts
list($left,$bottom,$right,$top)=explode(",",$bbox);
$mobile='0';
if (isset($_GET['mobile'])) {
    $mobile = $_GET['mobile'];
}
$withImages='0';
if (isset($_GET['withImages'])) {
    $withImages = $_GET['withImages'];
}
// open the database
$dbmycnf = parse_ini_file("../replica.my.cnf");
$dbuser = $dbmycnf['user'];
$dbpass = $dbmycnf['password'];
unset($dbmycnf);
$dbhost = "tools-db";
$dbname = "s51138__heritage_p";

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
    $limit = 125;
    if ($mobile == '1'){
        $limit = 15;
    }
    $imageCondition = "image = ''";
    if ($withImages == '1'){
        $imageCondition = "image != ''";
    }
    $sql="SELECT country, lang, id, name, lat, lon, municipality, address, image, commonscat, monument_article, source " .
         "FROM monuments_all " .
         "WHERE lon>=:left AND lon<=:right AND lat>=:bottom AND lat<=:top AND " . $imageCondition . " " .
         "ORDER BY MD5(id)" .
         "LIMIT " . $limit;
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':left', $left, PDO::PARAM_STR);
    $stmt->bindParam(':right', $right, PDO::PARAM_STR);
    $stmt->bindParam(':bottom', $bottom, PDO::PARAM_STR);
    $stmt->bindParam(':top', $top, PDO::PARAM_STR);
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
$features=array(); // array to build up the feature collection
$ajaxres['type']='FeatureCollection';
$ajaxres['withImages']=$withImages;

// go through the list adding each one to the array to be returned    
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $lat=$row['lat'];
    $lon=$row['lon'];
    
    $prop=array();
    $prop['country']=$row['country'];
    $prop['municipality']=$row['municipality'];
    $prop['address']=$row['address'];
    $prop['lang']=$row['lang'];
    $prop['id']=$row['id'];
    $prop['name']=explode('|', $row['name']);
    $prop['name']=str_replace(array('[', ']'), '', $prop['name'][0]);
    $prop['monument_article']=str_replace(' ' , '_', $row['monument_article']);
    $prop['image']=str_replace(' ', '_', $row['image']);
    $prop['image']=preg_replace('/_+/', '_', $prop['image']); //remove duplicated spaces
    $prop['image']=preg_replace('/([Ff]ile|[Ii]mage):/', '', $prop['image']);
    if (empty($prop['image'])) {
        $prop['image'] = 'Monument_unknown.png';
    }
    $prop['md5']=substr(md5($prop['image']),0,2);
    $prop['commonscat']=str_replace(' ', '_', $row['commonscat']);
    $prop['source']=str_replace(' ', '_', preg_split('/&[a-z]+=/', $row['source'])[0]);

    $f=array();
    $geom=array();
    $coords=array();
    
    $geom['type']='Point';
    $coords[0]=floatval($lon);
    $coords[1]=floatval($lat);
    $geom['coordinates']=$coords;
    
    $f['type']='Feature';
    $f['geometry']=$geom;
    $f['properties']=$prop;

    $features[]=$f;
}

// add the features array to the end of the ajxres array
$ajaxres['features']=$features;
// tidy up the DB
$db = null;
sendajax($ajaxres); // no return from there

function sendajax($ajax) {
    // encode the ajx array as json and return it.
    $encoded = json_encode($ajax);
    exit($encoded);
}
?>
