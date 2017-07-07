//track keyboard input
window.onload = function(){
	document.onkeypress = function(e){
		key = code(e);

		//.
		if (key == 44 && slideNum > 0) loadSlide(slideNum - 1);

		//,
		if (key == 46 && slideNum < slides.length - 1) loadSlide(slideNum + 1);

		//n
		if (key == 110 && slideNum) {
			notesVisible = !notesVisible;
			loadSlide(slideNum);
		}
	};
};

//get keycode
function code(e) {
	e = e || window.event;
	return(e.keyCode || e.which);
}

//used to escape closure issue when creating sidebar links
function makeOnClickCallback(i) {
	return function() {
		loadSlide(i);
		return false;
	};
}