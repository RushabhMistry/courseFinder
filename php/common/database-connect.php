<?php
session_start();

include("utils.php");
GetConstants();
$CONSTANTS = $_SESSION["CONSTANTS"];
//////////////////////////////////////////
$protocol = (strpos($_SERVER["SERVER_PROTOCOL"], "HTTPS") === 0) ? "https" : "http";
$url = "$protocol://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
//////////////////////////////////////////
if (strpos($url, "localhost") > 0) {
	$hostName = "localhost";
	$userName = "root";
	$passWord = "";
	$dataBase = "course_finder";
	date_default_timezone_set("Asia/Kolkata");
} else {
	$hostName = "localhost";
	$userName = "root";
	$passWord = "";
	$dataBase = "course_finder";
	date_default_timezone_set("Europe/London");
}

$dbCon = new mysqli($hostName, $userName, $passWord, $dataBase) or die("Could not connect database");
if (!$dbCon) {
	echo "Error: Unable to connect to MySQL." . PHP_EOL;
	echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
	echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
	exit;
}
?>