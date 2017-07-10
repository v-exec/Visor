//formats string to support links #[text>link], bolding *[text], and italics _[text]
function formatString(string, symbol) {

	//if number of opening brackets and closing brackets is uneven count, display error
	if (allStringPositions(string, '[').length != allStringPositions(string, ']').length) {
		window.alert('Uneven number of brackets found in string: \n\n '+ string);
	} else {
		//all string positions
		var positions = allStringPositions(string, symbol + '[');
		while (positions.length > 0) {
			//find closing ']'
			var end = string.indexOf(']', positions[0]);

			//check if any other '[]' pairs exist within substring, suggesting we haven't found the proper ']'
			//find next ']' until we've found the proper ']'
			while (allStringPositions(string.substring(positions[0], end, '[')).length != allStringPositions(string.substring(positions[0], end), ']').length) {
				end = string.indexOf(']', end + 1);
			}

			//run proper format rule
			var selectString = string.substring(positions[0], end + 1);

			var format;

			switch (symbol) {
				case '#':
					format = createCustomLink(selectString);
					break;

				case '_':
					format = makeItalic(selectString);
					break;

				case '*':
					format = makeBold(selectString);
					break;
			}

			//replace string with new format
			string = string.replace(selectString, format);

			//find next set to parse
			positions = allStringPositions(string, symbol + '[');
		}
	}
	return string;
}

//formats image for color or background use
function formatImage(image) {
	if (image.substring(0, 1) === "#") return image;
	else {
		image = image.replace(' ', '%20');
		image = 'images/ ' + image + '.png';
		return image;
	}
}

//finds all instances of a substring(needle) in a string(haystack)
function allStringPositions(haystack, needle) {
	var offset = 0;
	var all = [];
	var pos;

	while ((pos = haystack.indexOf(needle, offset)) !== -1) {
		offset = pos + 1;
		all.push(pos);
	}

	return all;
}

//takes string and makes it italic
function makeItalic(string) {
	string = cleanString(string);
	string = '<em>' + string + '</em>';
	return string;
}

//takes string and makes it bold
function makeBold(string) {
	string = cleanString(string);
	string = '<strong>' + string + '</strong>';
	return string;
}

//takes $string and makes it into custom link with custom $style
function createCustomLink(string) {
	string = cleanString(string);
	var accessor = string.indexOf('>');

	var word = string.substring(0, accessor);
	word = word.trim();

	var link = string.substring(accessor + 1, string.length);
	link = link.trim();

	return '<a href="' + link + '" class="intended-link">' + word + '</a>';
}

//removes symbol and [] (first two characters and last character) from string
function cleanString(string) {
	string = string.substring(2);
	string = string.substring(0, string.length - 1);
	return string;
}