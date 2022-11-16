$(document).on("allLoaded", function() {
	if (!CourseFinder.Token) {
		LaunchPage("index.html");
	}
	$('.btnn').click(function(){
		// $('nav ul.open').toggleClass("show");
		$("nav ul.open").removeClass("show");
		$(this).parent().find("ul.open").addClass("show");
	});
	$('nav ul li span i').click(function(){
		$(this).parent().addClass("active").siblings().removeClass("active");
	});
	$(".course-item").on("click", function() {
		var id = $(this).data("id");
		$.ajax({
			type: "POST",
			url: "../php/content/browse.php",
			dataType: "json",
			data: {
				Token: CourseFinder.Token,
				ID: id
			},
			success: function(ret) {
				console.log("Success", ret);
				if (ret.code == CONSTANTS.STATUS_CODES.OK) {
					RefreshData(ret.data);
				} else {
					ShowMessage("ERROR!", CONSTANTS.STATUS_CODES_R[ret.code]);
				}
			},
			error: function(ret) {
				console.log("Error", ret);
				ShowMessage("ERROR!", "There was a server error. Coiuld not retrieve the courses for selected category. Please try again later.");
			}
		});
	});
	//
	function RefreshData(data) {
		$(".content").empty();
		var html = "";
		html = "<table id='courseTable' class='table table-striped' cellspacing='0' width='100%'>\
				<thead>\
					<tr>\
						<th class='th-sm'>Course Name</th>\
						<th class='th-sm'>Link</th>\
						<th class='th-sm'>Source</th>\
					</tr>\
				</thead>\
				<tbody>";
		$.each(data, function(id, row) {
			html += "<tr>\
						<td>"+row.CourseName+"</td>\
						<td class='course-link' data-link='"+row.CourseLink+"'>Click here</td>\
						<td>"+row.Source+"</td>\
					</tr>";
		});
		html += "</tbody>\
			</table>";
		
		$(html).appendTo(".content");
		// $("#courseTable").DataTable({
			// "ordering": false
		// });
	}
	$("body").on("click", ".course-link", function() {
		var lnk = $(this).data("link");
		window.open(lnk, "_blank");
	});
});