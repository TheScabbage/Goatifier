// Goatifier 
// @version 1.0
// @authors [Scabbage, Kakalavala]

	// Links to goat images
	// Must be "https://" to work
	var goatList = [
		"https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg",
		"https://s-media-cache-ak0.pinimg.com/736x/44/91/31/449131cabd0f6c51259cf881355368a1.jpg",
		"https://s-media-cache-ak0.pinimg.com/236x/cf/b1/a4/cfb1a4dc8574d810a098396a338aed14.jpg",
		"https://s-media-cache-ak0.pinimg.com/564x/41/ee/f0/41eef07e886d7938b3671c6a46420c02.jpg",
		"https://upload.wikimedia.org/wikipedia/commons/5/55/A_white_irish_goat.jpg",
		"https://gocooking.files.wordpress.com/2014/11/goatssly.jpg",
		"https://www.sciencenews.org/sites/default/files/main/blogposts/sci_Goats_Go_Inspecting_wikimedia_commons.jpg",
		"https://s-media-cache-ak0.pinimg.com/564x/8c/f4/99/8cf499a0ab629b73e6504d120b41f84b.jpg",
		"https://s-media-cache-ak0.pinimg.com/564x/59/bb/5c/59bb5c9d69122a419ccd2c19bccd6c77.jpg",
		"https://i.imgur.com/CLArldE.jpg",
		"https://i.imgur.com/PfcZLQI.jpg",
		"https://imgur.com/F07pjOz.jpg",
		"https://pbs.twimg.com/media/BsmAbjHCEAAjp8H.jpg",
		"https://s-media-cache-ak0.pinimg.com/236x/89/17/cf/8917cf37157c9aef7072c4ac3ed9d2ac.jpg",
		"https://i.imgur.com/OrAlCpG.jpg",
		"https://s-media-cache-ak0.pinimg.com/736x/7d/69/88/7d698821ba6474cf73694f6f80d55dfa.jpg",
		"https://s-media-cache-ak0.pinimg.com/736x/dc/e4/e6/dce4e689956d240836c7050fd0846e7b.jpg",
		"https://s-media-cache-ak0.pinimg.com/736x/94/86/be/9486bebc31fa8cf89fb0f0ea1f4f29f7.jpg",
		"https://s-media-cache-ak0.pinimg.com/564x/94/d3/3c/94d33cbefd02aeb61dbcdf323aa20af5.jpg"
	];

	// Options
	var replaceProbability = 100;
	var resizeImages = false;
	var debugMessages = false;

	// Log
	console.log("Goat script initalised...");

	// Init
	var paras = document.getElementsByTagName("p");
	var italics = document.getElementsByTagName("i");

	// Get Goat'd scrub
	replaceElementWithGoat(headerLists());
	replaceElementWithGoat(paras);
	replaceElementWithGoat(italics);

	SHRByTag("td");
	SHRByTag("th");
	SHRByClass("comment-renderer-text-content");

	replaceImages();

	// Methods

	//Logs a debug message to console
	function log(message){
		if(debugMessages)
			console.log("[Debug]: " + message);
	}

	//Gets all headers
	function headerLists(){
		for(i = 1; i < 6; i++)
			return document.getElementsByTagName("h" + i);
	}

	//Shorthand function to goatify all elements with a given class name
	function SHRByClass(className){
		var classList = document.getElementsByClassName(className);
		replaceElementWithGoat(classList);
	}

	function SHRByTag(tagName){
		var tagList = document.getElementsByTagName(tagName);
		replaceElementWithGoat(tagList);
	}

	function replaceImages(){
		var imgs = document.getElementsByTagName("img");

		for(i = 0; i < imgs.length; i++){ 
			var ran = Math.floor((Math.random() * goatList.length) - 1);

			if(debugMessages)
				console.log("[Debug]: Replaced image " + imgs[i].getAttribute("src") + " with " + goatList[ran] + " (element " + ran + " of goat list)");
			
			if(resizeImages){
				//Try to resize by width initally (usually better looking result)
				if(imgs[i].hasAttribute("width")){
					var lastWidth = imgs[i].getAttribute("width");
					imgs[i].removeAttribute("height"); //This is supposed to be height (auto resize)
					imgs[i].setAttribute("width", lastWidth);
				} else {
					//otherwise, resize by height (not preferable)
					var lastWidth = imgs[i].getAttribute("height");
					imgs[i].removeAttribute("width"); //This should be width (auto resize)
					imgs[i].setAttribute("height", lastWidth);
				}
			}
			
			imgs[i].setAttribute("src", goatList[ran]);
		}
	}

	
	//Note that this only works with inner HTML of elements
	function replaceElementWithGoat(headerList){
		for(var i = 0; i<headerList.length; i++){
			var headerText = headerList[i].innerHTML;
			var words = headerText.split(" ");

			if(debugMessages)
				console.log("Text to modify: " + headerText);

			// Replace random words with "Goat"
			var rawIndex = Math.random() * words.length;

			if(debugMessages)
				console.log("[Debug] random index raw: " + rawIndex);

			var defReplaceIndex = Math.floor(rawIndex);
			
			if(defReplaceIndex === words.length)
				defReplaceIndex = words.length - 1;

			if(debugMessages)
				console.log("Replace index: " + defReplaceIndex);

			words[defReplaceIndex] = replaceWordWithGoat(words[defReplaceIndex]);

			var newString = "";

			// Ensure we never edit HTML tags
			var insideTag = false;
			var endTag = false;

			for(w = 0; w < words.length; w++){
				if(endTag){
					endTag = false;
					insideTag = false;
				}

				if(words[w].startsWith("<")) insideTag = true;//Not the most robust code- needs reworking

				if(words[w].endsWith(">")) endTag = true;

				if(!insideTag){
					// List of words that are always replaced with goat
					if(alwaysReplace(words[w]) === words[w]){
						// Chance to replace other words with goat
						var randPer = Math.random();

						if(randPer * 100 <= replaceProbability){
							if(debugMessages)
								console.log("[Debug]: Replaced word '" + words[w] + "', Random percentage: " + randPer);

							// Replace this word
							words[w] = replaceWordWithGoat(words[w]) + " ";

							if(debugMessages)
								console.log("---" + newString);
						}
					} else {
						if(debugMessages)
							console.log("[Debug]: Replaced " + words[w] + ", (known word)");
						
						words[w] = alwaysReplace(words[w]) + " ";
					}
				}

				newString += words[w] + " ";
			}
			
			//Set the new header
			headerList[i].innerHTML = newString;
		}
	}

	function alwaysReplace(word){
		console.log(word);
		switch(word){
			case "Wikipedia":
				return "Goatipedia";
			case "Russia":
				return "Goat Motherland";
			case "Google":
				return "Goat";
			case "Gmail":
				return "Goatmail";
			default:
				return word;
		}
	}

	//Still doesnt check if end of word is comma
	function replaceWordWithGoat(s){
		if(s === undefined || s === ""){
			if(debugMessages)
				//console.log("Earlied out. (string was " + s + ")");
			return "goat";
		}
		
		var newWord = "";
		var comma = false;
		var bracket = false;

		//Check for brackets and commas
		if(s[0] === "(") bracket = true;
		if(s[0] === ",") comma = true;
		
		switch(s){
			case "the":
			    newWord =  "the";
			    break;
			case "of":
				newWord =  "of";
				break;
			case "or":
				newWord =  "or";
				break;
			case "a":
				newWord = "a";
				break;
			default:
				if(!(comma || bracket)){
					if(s[0] === undefined){
						newWord = s;
						break;
					}

					if(debugMessages)
						console.log("[Debug]: " + s);

					if(s[0] === s[0].toUpperCase()) newWord = "Goat"; // Word is capitalised
					else newWord =  "goat";
				} else {
					if(bracket){
						if(s[1] === undefined){
							newWord = s;
							break;
						}

						if(s[1] === s[1].toUpperCase()) newWord =  "Goat"; // Word is capitalised
						else newWord =  "(goat";
					} else {
						if(s[1] === undefined){
							newWord = s;
							break;
						}

						if(s[1] === s[1].toUpperCase()) newWord =  "Goat"; // Word is capitalised
						else newWord =  ",goat";
					}
				}
			}

		if(s.endsWith(")")) newWord += ")";
		
		if(debugMessages)
			console.log("Replaced " + s + " with " + newWord);

		return newWord;
	}
	