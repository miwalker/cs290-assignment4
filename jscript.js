var originalGistList = [];
var gistList = document.getElementById("gist-list");
var favList = document.getElementById("fav-list");

//elDiv.innerHTML = test;



function createList() {
	for (var i = 0; i < originalGistList.length; i++) {
		var tableData = document.createElement("tr");
		var tableUrl = document.createElement("a");
		var breaker = document.createElement("br");
		var fbutton = document.createElement("button");
		fbutton.innerHTML = "+";
		fbutton.id = originalGistList[i].id;
		/*
		fubtton.onclick = function addToFavs() {
			var favListID = this.id;
			for (var ii = 0; ii < originalGistList.length; ii++) {
				if (originalGistList[ii].id == favListID) {
					var description = originalGistList[i].description;
					tableUrl.href = originalGistList[i].url;
					if (description === "") {
						description = "No description provided";
					}
					var tableDataText = document.createTextNode(description);
					tableUrl.appendChild(tableDataText);
					gistList.appendChild(this);
					gistList.appendChild(tableUrl);
					gistList.appendChild(breaker);
				}
			}
		};
		*/
		var description = originalGistList[i].description;
		tableUrl.href = originalGistList[i].url;
		if (description === "") {
			description = "No description provided";
		}
		var tableDataText = document.createTextNode(description);
		tableUrl.appendChild(tableDataText);
		gistList.appendChild(fbutton);
		gistList.appendChild(tableUrl);
		gistList.appendChild(breaker);
	}
}

function getData() {
	var req = new XMLHttpRequest();
	var urlGit = "https://api.github.com/gists";
	if (!req) {
		throw "Unable to create HttpRequest";
	}
	req.onreadystatechange = function () {
		if (this.readyState === 4) {
			originalGistList = JSON.parse(this.responseText);
		}
	};
	req.open("GET", urlGit);
	req.send();
	createList();
}



window.onload = function () {
	
	
	getData();
};





function searchGists(searchText, jsRadio, sqlRadio, jsonRadio, pythonRadio) {
	
}

function startSearch() {
	var searchText = document.getElementsByName('search-text')[0].value;
	var jsRadio = document.getElementsByName('javascript-radio')[0].checked;
	var sqlRadio = document.getElementsByName('sql-radio')[0].checked;
	var jsonRadio = document.getElementsByName('json-radio')[0].checked;
	var pythonRadio = document.getElementsByName('python-radio')[0].checked;
	searchGists(searchText, jsRadio, sqlRadio, jsonRadio, pythonRadio);
	createList();
}

