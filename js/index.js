var curTab;
$(document).on("allLoaded", function() {
	$('.tab a').on('click', function (e) {
	e.preventDefault();

	$(this).parent().addClass('active');
	$(this).parent().siblings().removeClass('active');

	var href = $(this).attr('href');
	$('.forms > #login, .forms > #signup').hide();
		$(href).fadeIn(500);
	});
	
	$("#bLogin").click(function() {
		curTab = "login";
		if (!ValidateForm()) {
			//There was no error
			$.ajax({
				type: "POST",
				url: "../php/user/login.php",
				dataType: "json",
				data: {
					Email: $("#lgnEmail").val(),
					Pass: $("#lgnPass").val()
				},
				success: function(ret) {
					console.log("success",ret);
					if (ret.code == CONSTANTS.STATUS_CODES.OK) {
						// $(".form-msg").text("Form submitted successfully");
						CourseFinder.Token = ret.token;
						LaunchPage("home.html");
					} else {
						$(".forms").effect("shake");
					}
				},
				error: function(ret) {
					console.log("error",ret);
					$(".form-msg").text("There was a server error while submitting the form");
				}
			})
		}
	})
	$("#bSignup").click(function() {
		curTab = "signup";
		if (!ValidateForm()) {
			//There was no error
			$.ajax({
				type: "POST",
				url: "../php/user/sign-up.php",
				dataType: "json",
				data: {
					Name: $("#name").val(),
					Email: $("#sgnEmail").val(),
					Pass: $("#sgnPass").val()
				},
				success: function(ret) {
					if (ret.code == CONSTANTS.STATUS_CODES.OK) {
						LaunchPage("index.html");
					} else {
						ShowMessage("ERROR!", CONSTANTS.STATUS_CODES_R[ret.code]);
						console.log("ERROR", ret);
						$(".form-msg").text("Form could not be submitted successfully");
					}
				},
				error: function(ret) {
					console.log("error",ret);
					$(".form-msg").text("There was a server error while submitting the form");
				}
			})
		}
	})
	
	function ValidateForm() {
		var em = $("#lgnEmail");
		var lp = $("#lgnPass");
		//
		var nm = $("#name");
		var sem = $("#sgnEmail");
		var sp = $("#sgnPass");
		var rp = $("#rePass");
		
		var err = false;
		
		if (em.val().length == 0) {
			em.parent().parent().find("span.error-msg").text("Email is required");
			err = true;
		} else {
			if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(em.val()))) {
				em.parent().parent().find("span.error-msg").text("Invalid email address");
				err = true;
			} else {
				em.parent().parent().find("span.error-msg").text("");
			}
		}
		
		if (curTab == "signup") {
			if (nm.val().length == 0) {
				nm.parent().parent().find("span.error-msg").text("First name is required");
				err = true;
			} else {
				nm.parent().parent().find("span.error-msg").text("");
			}
		
			if (sem.val().length == 0) {
				sem.parent().parent().find("span.error-msg").text("Email is required");
				err = true;
			} else {
				if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(em.val()))) {
					sem.parent().parent().find("span.error-msg").text("Invalid email address");
					err = true;
				} else {
					sem.parent().parent().find("span.error-msg").text("");
				}
			}
			
			if (sp != rp) {
				sp.parent().parent().find("span.error-msg").text("Password does not match.");
				rp.parent().parent().find("span.error-msg").text("Password does not match.");
				err = true;
			} else {
				sp.parent().parent().find("span.error-msg").text("");
				rp.parent().parent().find("span.error-msg").text("");
			}
		}
	}
});
