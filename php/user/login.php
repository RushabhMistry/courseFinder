<?php
include("../common/database-connect.php");
global $dBcon, $CONSTANTS;
///////////////////////////////////////////
$Email = $_POST["Email"];
$Pass = $_POST["Pass"];

$dbCon->autocommit(false);
$anyError = false;

$sql = "SELECT *
		FROM `users`
		WHERE Email=?";
$stmt = $dbCon->prepare($sql);
$stmt->bind_param("s", $Email);
$stmt->execute();
$result = $stmt->get_result();

$response = new stdClass();
$response->token = "";
if ($result->num_rows == 0) {
	$response->code = $CONSTANTS->STATUS_CODES->INVALID_USER;
	$anyError = true;
} else {
	$result = $result->fetch_assoc();
	$Hash = $result["Hash"];
	$res = password_verify($Pass, $Hash);
	if ($res) {
		$Token = bin2hex(openssl_random_pseudo_bytes(32));
		$sql = "UPDATE `users`
				SET Token=?
				WHERE Email=?";
		$stmt = $dbCon->prepare($sql);
		$stmt->bind_param("ss", $Token, $Email);
		$stmt->execute() or $anyError=true;
		$response->token = $Token;
	} else {
		$response->code = $CONSTANTS->STATUS_CODES->INVALID_USER;
		$anyError = true;
	}
}

if ($anyError) {
	$response->code = $CONSTANTS->STATUS_CODES->INVALID_USER;
	$dbCon->rollback();
} else {
	$response->code = $CONSTANTS->STATUS_CODES->OK;
	$dbCon->commit();
}
echo json_encode($response);
$dbCon->close();
?>
