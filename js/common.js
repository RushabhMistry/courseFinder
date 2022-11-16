var CourseFinder={};
var constantsLoaded=false;
var CONSTANTS;
var debug = true;

$().ready(function() {
	Date.prototype.toShortFormat = function() {
		var month_names =["Jan","Feb","Mar",
						  "Apr","May","Jun",
						  "Jul","Aug","Sep",
						  "Oct","Nov","Dec"];
		var day = ("0"+this.getDate()).slice(-2);
		var month_index = this.getMonth();
		var year = this.getFullYear();
		
		return "" + day + "-" + month_names[month_index] + "-" + year;
	}
	//
	$.ajaxSetup({cache: false});
	var obj;
	$.getJSON("../static/const.json", function(data) {
		CONSTANTS = data;
		constantsLoaded = true;
		$(document).trigger("allLoaded");
	});
	var cf = window.sessionStorage.getItem("CourseFinder");
	if (cf) {
		CourseFinder = JSON.parse(cf);
	} else {
		CourseFinder = {};
	}
	//
});
//
function LaunchPage(url) {
	window.sessionStorage.setItem("CourseFinder", JSON.stringify(CourseFinder));
	window.open(url, "_self");
}
//
function ShowMessage(title, message) {
	var html = "";
	html += "<div class='modal fade' id='modalWindow' style='z-index:10000000;' tabindex='-1' role='dialog' aria-labelledby='exampleModalCenterTitle' aria-hidden='true'>\
				<div class='modal-dialog modal-dialog-centered' role='document'>\
					<div class='modal-content'>\
						<div class='modal-header'>\
							<h5 class='modal-title' id='modalTitle'>"+title+"</h5>\
							<button type='button' class='close' data-dismiss='modal' aria-label='Close'>\
								<span aria-hidden='true'>&times;</span>\
							</button>\
						</div>\
						<div class='modal-body'>\
							<span id='modalMessage'>"+message+"</span>\
						</div>\
						<div class='modal-footer'>\
							<button type='button' id='modalOK' data-dismiss='modal' class='btn btn-primary' >OK</button>\
						</div>\
					</div>\
				</div>\
			</div>";
	$(html).appendTo("body");
	$("#modalWindow").modal({backdrop: "none"});
}