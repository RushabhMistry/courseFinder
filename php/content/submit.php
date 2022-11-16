<?php
include("../common/database-connect.php");
global $dBcon, $CONSTANTS;
///////////////////////////////////////////
$Token = $_POST["Token"];
$ID = $_POST["ID"];
$CourseName = $_POST["CourseName"];
$CourseLink = $_POST["CourseLink"];
$CourseSource = $_POST["CourseSource"];

$response = new stdClass();
if (!Validate($Token)) {
	$response->code = $CONSTANTS->STATUS_CODES->INVALID_TOKEN;
	echo json_encode($response);
	return;
}

$dbCon->autocommit(false);
$anyError = false;

$sql = "INSERT INTO `course_titles`
			(ID, CourseName, CourseLink, Source)
		VALUES (?,?,?,?)";
$stmt = $dbCon->prepare($sql);
$stmt->bind_param("ssss", $ID, $CourseName, $CourseLink, $CourseSource);
$stmt->execute() or $anyError=true;

if ($anyError) {
	$response->code = $CONSTANTS->STATUS_CODES->DATA_ADD_ERROR;
	$dbCon->rollback();
} else {
	$response->code = $CONSTANTS->STATUS_CODES->OK;
	$dbCon->commit();
}

echo json_encode($response);
$dbCon->close();
?>
