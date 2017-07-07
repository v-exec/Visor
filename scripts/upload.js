//set up drop zone listeners
var dropZone = document.getElementById('drop');

dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

//drop handler
function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var file = evt.dataTransfer.files[0];
	var reader = new FileReader();

	reader.onload = function(progressEvent){
		var lines = this.result.split('\n');

		for(var line = 0; line < lines.length; line++){
			presentation.push(lines[line]);
		}
		dropZone.parentNode.removeChild(dropZone);
		updateTimer();
		updateClock();
		createSlides(presentation);
	};
	reader.readAsText(file);
}

//on drag over
function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}