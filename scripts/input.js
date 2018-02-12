//input handler

//track keyboard input
window.onload = function(){
	document.onkeypress = function(e){
		key = code(e);

		if(unlockInputs){
			//.
			if (key == 44 && slideNum > 0) loadSlide(slideNum - 1);

			//,
			if (key == 46 && slideNum < slides.length - 1) loadSlide(slideNum + 1);

			//n
			if (key == 110) {
				notesVisible = !notesVisible;
				loadSlide(slideNum);
			}

			//s
			if (key == 115) {
				sideVisible = !sideVisible;
				loadSlide(slideNum);
			}
		}
	};
};

//get keycode
function code(e) {
	e = e || window.event;
	return(e.keyCode || e.which);
}