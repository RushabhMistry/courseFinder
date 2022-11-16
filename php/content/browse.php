<?php
include("../common/database-connect.php");
global $dBcon, $CONSTANTS;
///////////////////////////////////////////
$Token = $_POST["Token"];
$ID = $_POST["ID"];

if (!Validate($Token)) {
	$response = new stdClass();
	$response->code = $CONSTANTS->STATUS_CODES->INVALID_TOKEN;
	echo json_encode($response);
	return;
}

$sql = "SELECT *
		FROM `course_titles`
		WHERE ID=?";
$stmt = $dbCon->prepare($sql);
$stmt->bind_param("s", $ID);
$stmt->execute();
$result = $stmt->get_result();
$result = $result->fetch_all(MYSQLI_ASSOC);

$response = new stdClass();
$response->code = $CONSTANTS->STATUS_CODES->OK;
$response->data = $result;
echo json_encode($response);
$dbCon->close();
?>
