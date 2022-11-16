$(document).on("allLoaded", function() {
	if (!CourseFinder.Token) {
		LaunchPage("index.html");
	}
	$("#bBrowse").on("click", function() {
		LaunchPage("browse.html");
	});
	$("#bSubmit").on("click", function() {
		LaunchPage("submit.html");
	});
});
