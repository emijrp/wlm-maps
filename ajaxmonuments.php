<?php 
// Code forked from: https://github.com/chillly/plaques/blob/master/ajax/ajxplaques.php

// uncomment below to turn error reporting on
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
	$sql="SELECT country, lang, id, name, lat, lon, image, monument_article, monument_random FROM monuments_all WHERE lon>=:left AND lon<=:right AND lat>=:bottom AND lat<=:top ORDER BY monument_random LIMIT 500";
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

// go through the list adding each one to the array to be returned	
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$lat=$row['lat'];
	$lon=$row['lon'];
	
    $prop=array();
	$prop['country']=$row['country'];
	$prop['lang']=$row['lang'];
	$prop['id']=$row['id'];
	$prop['name']=$row['name'];
	$prop['image']=$row['image'];
    $image_ = str_replace(' ', '_', $row['image']);
    $image_md5 = md5($image_);
	$prop['monument_article']='https://'.$row['lang'].'.wikipedia.org/wiki/'.$row['monument_article'];
    $prop['thumb_url']='https://upload.wikimedia.org/wikipedia/commons/thumb/'.substr($image_md5,0,1).'/'.substr($image_md5,0,2).'/'.$image_.'/150px-'.$image_;
    $prop['upload_url']='https://commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=wlm-'.$row['country'].'&id='.$row['id'].'&lat='.$row['lat'].'&lon='.$row['lon'];
	$prop['markercolor']='#ff8888';

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
