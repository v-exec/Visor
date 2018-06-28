//slide object

//holds slide information
function Slide(img, sho, col, sec, til, con, not) {
	this.img = img;
	this.sho = sho;
	this.col = col;
	this.sec = sec;
	this.til = til;
	this.con = con;
	this.not = not;

	this.image = formatImage(this.img);
	
	this.con = formatString(this.con, '#');
	this.con = formatString(this.con, '_');
	this.con = formatString(this.con, '*');
	
	this.not = formatString(this.not, '#');
	this.not = formatString(this.not, '_');
	this.not = formatString(this.not, '*');
}

//parses through array of lines (pres) and creates all slides
function createSlides(pres) {
	//list of all possible attributes
	var attributes = [
	'fro',
	'int',
	'hil',
	'img',
	'sho',
	'col',
	'sec',
	'til',
	'con',
	'not'
	];

	//attributes to be used to define slide
	var img = '';
	var sho = '';
	var col = '';
	var sec = '';
	var til = '';
	var con = '';
	var not = '';

	//manage information retrieval
	var currentKey;
	var newKey;
	var value;
	var atSlides = false;

	//go through each line
	for (var i = 0; i < pres.length; i++) {
		newKey = false;

		//skip lines starting with '//' and empty lines
		if (pres[i].substring(0, 2) === '//' || pres[i].trim() === '') continue;

		//start new slide if line starts with '='
		if (pres[i].substring(0, 1) === '=') {
			
			//everything before first '=' is not considered a slide, can be used to declare custom theme
			if (atSlides) {
				var s = new Slide(img, sho, col, sec, til, con, not);
				slides.push(s);

				//reset title, independant image flag, content, and notes (other values can stay, so as to avoid redundancy)
				til = '';
				sho = true;
				con = '';
				not = '';
			} else atSlides = true;
			continue;
		}

		//go through each attribute and see if line begins with its declaration
		for (var j = 0; j < attributes.length; j++) {
			if (pres[i].substring(0, attributes[j].length + 1) === attributes[j] + ':') {

				//once key has been found, update $currentKey, and get the line's value
				currentKey = attributes[j];
				value = pres[i].substring(currentKey.length + 1, pres[i].length);
				value = value.trim();
				newKey = true;
			}
		}

		//if key wasn't found, continue adding to the previously acquired attribute while looking for declared line breaks
		if (!newKey) {
			if (pres[i].substring(0, 1) === '+') value = value + '<br>';
			else if (pres[i].substring(0, 1) === '-') value = value + '<span class="content-indent">' + pres[i].substring(1, pres[i].length) + '</span>';
			else value = value + pres[i];
		}

		//assign value to attribute for slide
		switch (currentKey) {
			case 'img':
				img = value;
				break;

			case 'sho':
				sho = value;
				break;

			case 'col':
				col = value;
				break;

			case 'sec':
				sec = value;
				break;

			case 'til':
				til = value;
				//check if title is empty - make single dot to retain formatting
				if (til === '') til = '·';
				break;

			case 'con':
				con = value;
				break;

			case 'not':
				not = value;
				break;

			//globals (not for slides, but for interface colors)
			case 'fro':
				fro = value;
				break;

			case 'int':
				int = value;
				break;

			case 'hil':
				hil = value;
				break;
		}
	}
	//push last slide
	var s = new Slide(img, sho, col, sec, til, con, not);
	slides.push(s);

	//load first slide
	loadSlide(0);
}
