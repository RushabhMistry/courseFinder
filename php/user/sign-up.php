<?php
include("../common/database-connect.php");
global $dBcon, $CONSTANTS;
///////////////////////////////////////////
$Name = $_POST["Name"];
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
if ($result->num_rows == 0) {
	$hash = password_hash($Pass, PASSWORD_BCRYPT, ['cost' => 9]);
	$sql = "INSERT INTO `users`
				(UserName, Email, Hash)
			VALUES (?,?,?)";
	$stmt = $dbCon->prepare($sql);
	$stmt->bind_param("sss", $Name, $Email, $hash);
	$stmt->execute() or $anyError=true;
} else {
	$response->code = $CONSTANTS->STATUS_CODES->DUPLICATE_USER;
	$anyError = true;
}

if ($anyError) {
	if (!isset($response->code)) {
		$response->code = $CONSTANTS->STATUS_CODES->DATA_ADD_ERROR;
	}
	$dbCon->rollback();
} else {
	$response->code = $CONSTANTS->STATUS_CODES->OK;
	$dbCon->commit();
}
echo json_encode($response);
$dbCon->close();
?>
