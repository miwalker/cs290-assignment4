var originalGistList = [];
var favGistList = [];
var gistList = document.getElementById("gist-list");
var favList = document.getElementById("fav-list");
var tracker = 0;


function checkFavs(idCheck) {
	for (var i = 0; i < favGistList.length; i++) {
		if (idCheck == favGistList[i].id) {
			return 0;
		}
	}
	return 1;
}

function createFavList(n) {
	for (var i = n; i < favGistList.length; i++) {
		var tableData = document.createElement("tr");
		var tableUrl = document.createElement("a");
		var fbutton = document.createElement("button");
		fbutton.innerHTML = "-";
		fbutton.id = favGistList[i].id;
		tableData.id = favGistList[i].id + "1";

		fbutton.onclick = function addToFavs() {
			var favListID = this.id;
			for (var ii = 0; ii < favGistList.length; ii++) {
				if (favGistList[ii].id == favListID) {
					var elRemove = document.getElementById(favListID + 1);
					favList.removeChild(elRemove);
					favGistList.splice(ii, 1);
					localStorage.setItem("favz", JSON.stringify(favGistList));
				}
			}
		};
		
		var description = favGistList[i].description;
		tableUrl.href = favGistList[i].url;
		if (description === "") {
			description = "No description provided";
		}
		var tableDataText = document.createTextNode(description);
		tableUrl.appendChild(tableDataText);
		tableData.appendChild(fbutton);
		tableData.appendChild(tableUrl);
		favList.appendChild(tableData);
		localStorage.clear();
		localStorage.setItem("favz", JSON.stringify(favGistList));
	}
}


function createList(searchString) {
	for (var i = 0; i < originalGistList.length; i++) {
		if ((searchString === "") && (checkFavs(originalGistList[i].id) == 1)) {
			var tableData = document.createElement("tr");
			var tableUrl = document.createElement("a");
			var fbutton = document.createElement("button");
			fbutton.innerHTML = "+";
			fbutton.id = originalGistList[i].id;

			fbutton.onclick = function addToFavs() {
				var favListID = this.id;
				for (var ii = 0; ii < originalGistList.length; ii++) {
					if (originalGistList[ii].id == favListID) {
						favGistList[favGistList.length] = originalGistList[ii];
						createFavList(favGistList.length - 1);
						var elRemove = document.getElementById(favListID + "1");
						gistList.removeChild(elRemove);
						originalGistList.splice(ii, 1);
					}
				}
			};

			var description = originalGistList[i].description;
			tableUrl.href = originalGistList[i].url;
			if (description === "") {
				description = "No description provided";
			}
			var tableDataText = document.createTextNode(description);
			tableUrl.appendChild(tableDataText);
			tableData.appendChild(fbutton);
			tableData.appendChild(tableUrl);
			tableData.id = fbutton.id + "1";
			gistList.appendChild(tableData);
		}
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


function searchGists(searchText, jsRadio, sqlRadio, jsonRadio, pythonRadio) {
	
}

function clearList() {
	gistList.innerHTML = "";
}

function startSearch() {
	clearList();
	var searchText = document.getElementsByName('search-text')[0].value;
	var allRadio = document.getElementsByName('all-radio')[0].checked;
	var jsRadio = document.getElementsByName('javascript-radio')[0].checked;
	var sqlRadio = document.getElementsByName('sql-radio')[0].checked;
	var jsonRadio = document.getElementsByName('json-radio')[0].checked;
	var pythonRadio = document.getElementsByName('python-radio')[0].checked;
	searchGists(searchText, jsRadio, sqlRadio, jsonRadio, pythonRadio);
	if (tracker == 0) {
		if (localStorage.getItem('favz') != null) {
			favGistList = JSON.parse(localStorage.getItem('favz'));
			//localStorage.clear();
		}
		createFavList(0);
		tracker = 1;
	}
	createList(searchText);
}


window.onload = function () {
	getData();
};