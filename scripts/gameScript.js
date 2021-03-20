// set up sprites and images
var combatScreenImage = new Image();
combatScreenImage.src = "./assests/Combat_Screen.png";

// set up canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

combatScreenImage.onload = function()
{
	canvas.width = combatScreenImage.width;
	canvas.height = combatScreenImage.height;
}


	
// update game world
function update()
{
	console.log("update")
}

function draw()
{
	// Clear Canvas
    // Iterate through all GameObjects
	// Draw current background
	
    //console.log("Draw");
	
	//context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(combatScreenImage, 0, 0 );
	
}

// after game start, loop
function gameLoop()
{
	update();
    draw();
    window.requestAnimationFrame(gameLoop);
}

// game starts here
 window.requestAnimationFrame(gameLoop);

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