$(document).on("allLoaded", function() {
	var curCourseID;
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
		curCourseID = $(this).data("id");
		$(".course-item").removeClass("active");
		$(this).addClass("active");
	});
	$("#bReset").click(function() {
		if (confirm("Are you sure you want to reset the form?")) {
			$("#fName")
				.add("#CourseName")
				.add("#CourseLink")
				.add("#CourseSource")
			.val("");
		}
	});
	$("#bSubmit").click(function() {
		if (!ValidateForm()) {
			//There was no error
			$.ajax({
				type: "POST",
				url: "../php/content/submit.php",
				dataType: "json",
				data: {
					Token: CourseFinder.Token,
					ID: curCourseID,
					CourseName: $("#CourseName").val(),
					CourseLink: $("#CourseLink").val(),
					CourseSource: $("#CourseSource").val()
				},
				success: function(ret) {
					console.log("success",ret);
					if (ret.code == 0) {
						$(".form-control").val("");
						$(".form-msg").text("Form submitted successfully");
					} else {
						$(".form-msg").text("Form could not be submitted successfully");
					}
				},
				error: function(ret) {
					console.log("error",ret);
					$(".form-msg").text("There was a server error while submitting the form");
				}
			})
		}
	});
	function ValidateForm() {
		var cn = $("#CourseName");
		var cl = $("#CourseLink");
		var cs = $("#CourseSource");
		
		var err = false;
		
		if (cn.val().length == 0) {
			cn.parent().parent().find("span.error-msg").text("First name is required");
			err = true;
		} else {
			cn.parent().parent().find("span.error-msg").text("");
		}
		
		if (cl.val().length == 0) {
			cl.parent().parent().find("span.error-msg").text("Last name is required");
			err = true;
		} else {
			cl.parent().parent().find("span.error-msg").text("");
		}
		
		if (cs.val().length == 0) {
			cs.parent().parent().find("span.error-msg").text("Last name is required");
			err = true;
		} else {
			cs.parent().parent().find("span.error-msg").text("");
		}
		
		return err;
	}
});
