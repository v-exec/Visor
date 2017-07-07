//holds time since beginning of slides
var seconds = 0;
var minutes = 0;
var hours = 0;

//updates clock
function updateClock() {
 	var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();

    h = formatNum(h);
    m = formatNum(m);

    document.getElementById('clock-time').innerHTML = h + ':' + m;
    var t = setTimeout(updateClock, 500);
}

//updates timer
function updateTimer() {
	seconds++;

	 if(seconds == 60) {
		seconds = 00;
		minutes++;

		if(minutes == 60) {
			minutes = 00;
			hours++;
		}
	}

	if (hours.toString().length < 2) hours = formatNum(hours);
	if (minutes.toString().length < 2) minutes = formatNum(minutes);
	if (seconds.toString().length < 2) seconds = formatNum(seconds);

	document.getElementById('timer-time').innerHTML = hours + ':' + minutes + ':' + seconds;
	var t = setTimeout(updateTimer, 1000);
}

//updates percentage
function updatePercentage(currentNum, allNum) {
	var percentage = (currentNum / allNum) * 100;

	percentage = percentage.toFixed(2);
	if (percentage < 10) percentage = formatNum(percentage);

	document.getElementById('percent').innerHTML = percentage + '%';
}

//adds 0 to numbers smaller than 10
function formatNum(num) {
    if (num < 10) num = "0" + num;
    return num;
}