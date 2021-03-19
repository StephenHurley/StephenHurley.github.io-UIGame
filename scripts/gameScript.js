var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

function splitFunction() 
{
	console.log("split function called")
	var url = window.location.search;
	console.log(url);
	var result = url.split("="); // Splits string based on =
	document.getElementById("playerName").innerHTML = result[1];
}

function headClicked()
{
	alert("head button worked");
}

function bodyClicked()
{
	alert("body button worked");
}

function legsClicked()
{
	alert("legs button worked");
}