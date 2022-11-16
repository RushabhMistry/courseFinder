<?php
function GetConstants() {
	global $CONSTANTS;
	if (!isset($_SESSION["CONSTANTS"])) {
		header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
		header("Cache-Control: post-check=0, pre-check=0", false);
		header("Pragma: no-cache");
		$constFile = "../../static/const.json";
		$str = file_get_contents($constFile);
		$err = error_get_last();
		$CONSTANTS = json_decode($str, false);
		$_SESSION["CONSTANTS"] = $CONSTANTS;
	}
}
//
function Validate($Token) {
	global $dbCon;
	
	$sql = "SELECT *
			FROM `users`
			WHERE Token=?";
	$stmt = $dbCon->prepare($sql);
	$stmt->bind_param("s", $Token);
	$stmt->execute();
	$result = $stmt->get_result();
	return ($result->num_rows == 1);
}
?>