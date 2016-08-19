document.addEventListener('DOMContentLoaded', function() {
	var checkPageButton = document.getElementById('randomPage');
	checkPageButton.addEventListener('click', function() {
		chrome.tabs.update({ 
			url: "https://en.wikipedia.org/wiki/Special:Random"
		});
	}, false);
}, false);

document.addEventListener('DOMContentLoaded', function() {
	var checkPageButton = document.getElementById('randomPage');
	checkPageButton.addEventListener('click', function() {
		chrome.tabs.executeScript({
			file: 'modifyPage_new.js'
		});
	}, false);
}, false);

document.addEventListener('DOMContentLoaded', function() {
	var checkPageButton = document.getElementById('goatPage');
	checkPageButton.addEventListener('click', function() {
		chrome.tabs.executeScript({
			file: 'modifyPage_new.js'
		});
	}, false);
}, false);