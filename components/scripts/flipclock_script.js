var clock;

$(document).ready(function() {
	// Grab the current date
	var currentDate = new Date();

	// Set some date in the past.
	// Real time is: 07/10/2016 08:00:00 am
	var pastDate  = new Date(2016, 9, 7, 8, 0, 0);
	// In this case, it's always been since Jan 1
	//var pastDate = new Date(currentDate.getFullYear(), 0, 1);

	// Calculate the difference in seconds between the future and current date
	var diff = currentDate.getTime() / 1000 - pastDate.getTime() / 1000;

	// Instantiate a coutdown FlipClock
	clock = $('.clock').FlipClock(diff, {
		clockFace: 'DailyCounter'
	});
});