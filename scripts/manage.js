//holds all slides
var slides = [];

//determines current slide
var slideNum;

//array of all lines in presentation file
var presentation = [];

//note visibility
var notesVisible = false;

//colors
var fro;
var int;
var hi1;
var hi2;
var hi3;

//loads relevant presentation information
function loadSlide(n) {
	//update slideNum number
	slideNum = n;

	//load sidebar
	loadSidebar();

	//load content
	loadContent();

	//update stats
	updatePercentage(slideNum, slides.length - 1);

	//load custom interface theme
	loadTheme();
}

//loads and renders sidebar
function loadSidebar() {
	var sidebar = document.getElementById('side');
	var bars = sidebar.getElementsByTagName('*');

	while (sidebar.firstChild) {
		sidebar.removeChild(sidebar.firstChild);
	}

	sideBar();
	bars = sidebar.getElementsByTagName('*');

	bars[slideNum * 4].className = 'bar-select';
}

//creates sidebar menu
function sideBar() {

	//holds current section
	var section;

	for (var i = 0; i < slides.length; i++) {

		//create generic elements
		var bar = document.createElement('div');
		var barinner = document.createElement('div');
		var anchor = document.createElement('a');
		var span = document.createElement('span');
		var text = document.createTextNode(slides[i].til);
		var num = document.createTextNode(i);

		span.appendChild(num);
		barinner.appendChild(span);
		barinner.appendChild(text);
		anchor.appendChild(barinner);
		bar.appendChild(anchor);

		barinner.className = 'bar-inner';
		span.className = 'bar-number';

		anchor.href = 'javascript:void(0)';
		anchor.onclick = makeOnClickCallback(i);

		//make special bar for first section slide
		if (slides[i].sec != section) {
			section = slides[i].sec;
			bar.className = 'bar-section';
			document.getElementById('side').appendChild(bar);
			continue;
		}

		//otherwise, make regular bar
		bar.className = 'bar-slide';
		document.getElementById('side').appendChild(bar);
	}
}

//loads and renders content
function loadContent() {
	currentSlide = slides[slideNum];

	//clear old slide elements
	var content = document.getElementById('content');

	while (content.firstChild) {
		content.removeChild(content.firstChild);
	}

	//background
	if (currentSlide.img.substring(0, 1) === '#') {
		content.style.backgroundColor = currentSlide.img;
		content.style.backgroundImage = '';
	} else {
		//create onload event to ensure loading of background image
		var imageLoad = new Image();

		imageLoad.onload = function() {
			currentSlide.img = currentSlide.img.replace(' ', '%20');
			content.style.backgroundImage = 'url(' + imageLoad.src + ')';
		}

		imageLoad.src = 'images/' + currentSlide.img;
		if (imageLoad.complete) imageLoad.onload();
	}

	//title
	var title = document.createElement('div');

	title.insertAdjacentHTML('afterbegin', currentSlide.til);
	title.style.color = currentSlide.col;

	if (currentSlide.sho !== "false") {
		if (currentSlide.con.length == 0) {
			title.className = 'content-big-title';
			content.style.textAlign = "center";
			content.style.paddingTop = "calc(50vh - 57.5px)";
			content.appendChild(title);
		} else {
			title.className = 'content-title';
			content.style.textAlign = "left";
			content.style.paddingTop = "60px";

			var divider = document.createElement('div');
			divider.className = 'divider';
			divider.style.backgroundColor = currentSlide.col;
			content.appendChild(title);
			content.appendChild(divider);
		}
	}

	//content
	var slideContent = document.createElement('span');

	slideContent.insertAdjacentHTML('afterbegin', currentSlide.con);
	slideContent.style.color = currentSlide.col;
	slideContent.className = 'content-text';

	content.appendChild(slideContent);

	//notes
	if (notesVisible & currentSlide.not.length > 1) {
		var notes = document.createElement('div');

		notes.insertAdjacentHTML('afterbegin', currentSlide.not);
		notes.style.color = currentSlide.col;
		notes.className = 'notes';

		content.appendChild(notes);
	}
}

//loads custom color scheme
function loadTheme() {
	if (fro) {
		addStyle('<style>#side {background-color:' + fro + ';}</style>');
		addStyle('<style>#clock {background-color:' + fro + ';}</style>');
		addStyle('<style>#timer {background-color:' + fro + ';}</style>');
		addStyle('<style>#count {background-color:' + fro + ';}</style>');
		addStyle('<style>.notes {background-color:' + fro + ';}</style>');
		addStyle('<style>::moz-selection {color:' + fro + ';}</style>');
		addStyle('<style>::selection {color:' + fro + ';}</style>');
		addStyle('<style>.bar-select {color: ' + fro + ';}</style>');
	}

	if (int) {
		addStyle('<style>body {color:' + int + ';}</style>');
	}

	if (hi1) {
		addStyle('<style>.bar-slide {background-color:' + hi1 + ';}</style>');
		addStyle('<style>::-webkit-scrollbar {background-color: ' + hi1 + ';}</style>');
	}

	if (hi2) {
		addStyle('<style>.bar-section {background-color:' + hi2 + ';}</style>');
	}

	if (hi3) {
		addStyle('<style>.bar-select {background-color:' + hi3 + '; color: ' + fro + ';}</style>');
		addStyle('<style>.bar-slide:hover, .bar-section:hover {background-color: ' + hi3 + '; color: ' + fro + ';}</style>');
		addStyle('<style>::moz-selection {background:' + hi3 + ';}</style>');
		addStyle('<style>::selection {background:' + hi3 + ';}</style>');
		addStyle('<style>::-webkit-scrollbar-thumb {background-color:' + hi3 + ';}</style>');
	}
}

//add style into html
function addStyle(style) {
	var content = document.getElementById('content');
	content.insertAdjacentHTML('afterbegin', style);
}

//used to escape closure issue when creating sidebar links
function makeOnClickCallback(i) {
	return function() {
		loadSlide(i);
		return false;
	};
}