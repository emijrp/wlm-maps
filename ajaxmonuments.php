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
	$ajxres=array();
	$ajxres['resp']=4;
	$ajxres['dberror']=0;
	$ajxres['msg']='missing bounding box';
	sendajax($ajxres);
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
	$ajxres=array();
	$ajxres['resp']=40;
	$ajxres['dberror']=$e->getCode();
	$ajxres['msg']=$e->getMessage();
	sendajax($ajxres);
}

try {
	$sql="SELECT name, image, lat, lon FROM monuments_all WHERE lon>=:left AND lon<=:right AND lat>=:bottom AND lat<=:top LIMIT 500";
	$stmt = $db->prepare($sql);
	$stmt->bindParam(':left', $left, PDO::PARAM_STR);
	$stmt->bindParam(':right', $right, PDO::PARAM_STR);
	$stmt->bindParam(':bottom', $bottom, PDO::PARAM_STR);
	$stmt->bindParam(':top', $top, PDO::PARAM_STR);
	$stmt->execute();
} catch(PDOException $e) {
	// send the PDOException message
	$ajxres=array();
	$ajxres['resp']=40;
	$ajxres['dberror']=$e->getCode();
	$ajxres['msg']=$e->getMessage();
	sendajax($ajxres);
}

$ajxres=array(); // place to store the geojson result
$features=array(); // array to build up the feature collection
$ajxres['type']='FeatureCollection';

// go through the list adding each one to the array to be returned	
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$lat=$row['lat'];
	$lon=$row['lon'];
	
    $prop=array();
	$prop['name']=$row['name'];
	$prop['image']=$row['image'];

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
$ajxres['features']=$features;
// tidy up the DB
$db = null;
sendajax($ajxres); // no return from there

function sendajax($ajx) {
	// encode the ajx array as json and return it.
	$encoded = json_encode($ajx);
	exit($encoded);
}
?>
