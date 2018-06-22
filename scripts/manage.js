//core

//holds all slides
var slides = [];

//determines current slide
var slideNum;

//array of all lines in presentation file
var presentation = [];

//note visibility
var notesVisible = false;

//sidebar visibility
var sideVisible = true;

//keybindings will not work before file is placed in hotzone
var unlockInputs = false;

//colors
var fro;
var int;
var hil;

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
	
	if (sideVisible) {
		sidebar.style.display = 'block';
		sideBar();
		bars = sidebar.getElementsByTagName('*');
		var b = [];
		for(var i = 0, n; n = bars[i]; ++i) b.push(n);

		//clean section headers
		for (var i = 0; i < b.length; i++) {
			if (b[i].className == "bar-section") {
				b.splice(i, 1);
				i--;
			}
		}

		b[slideNum * 4].className = 'bar-select';
	} else {
		sidebar.style.display = 'none';
	}
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

			var banner = document.createElement('div');
			var bannertext = document.createTextNode(section);
			banner.appendChild(bannertext);
			banner.className = 'bar-section';
			document.getElementById('side').appendChild(banner);
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

	if (currentSlide.sho == "false") {
		title.style.display = "none";
	}

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
		notes.className = 'notes';

		if (sideVisible) {
			notes.style.width = "calc(100% - 250px - 30px - 300px)";
			notes.style.left = "calc(250px + 30px)";
		} else {
			notes.style.width = "calc(100% - 30px - 300px)";
			notes.style.left = "30px";
		}

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
		addStyle('<style>.notes {color:' + int + ';}</style>');
		addStyle('<style>::-webkit-scrollbar {background-color: ' + int + ';}</style>');
		addStyle('<style>.bar-select {background-color:' + int + '; color: ' + fro + ';}</style>');
		addStyle('<style>.bar-slide:hover {background-color: ' + int + '; color: ' + fro + ';}</style>');
		addStyle('<style>::moz-selection {background:' + int + ';}</style>');
		addStyle('<style>::selection {background:' + int + ';}</style>');
		addStyle('<style>::-webkit-scrollbar-thumb {background-color:' + int + ';}</style>');
	}

	if (hil) {
		addStyle('<style>.bar-section {color:' + hil + ';}</style>');
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