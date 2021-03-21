// set up sprites and images
// background
var combatScreenImage = new Image();
combatScreenImage.src = "./assests/Combat_Screen.png";

// player
var playerImage = new Image();
playerImage.src = "./assests/player.png"

// enemy
var enemyImage = new Image();
enemyImage.src = "./assests/enemy.png"

// set up canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

combatScreenImage.onload = function()
{
	canvas.width = combatScreenImage.width;
	canvas.height = combatScreenImage.height;
}

// player entity set up and creation
function playerEntity(name, image, health) 
{
    this.name = name;
    this.img = image;
    this.health = health;
    this.x = 100; 
    this.y = 150; 
	this.isAlive = true;
	this.choiceMade = false;
	this.buttonSelected = "NONE"; // default value
}
var player = new playerEntity("Default", playerImage, 20) // player name is found through split function

// enemy entity set up and creation
function enemyEntity(name, image, health) 
{
    this.name = name;
    this.img = image;
	this.health = health;	
    this.x = 500;
    this.y = 150;
	this.buttonSelected = "NONE"; 
}
var enemy = new enemyEntity("Mr.Stache", enemyImage, 10)

 //game starts here
 window.requestAnimationFrame(gameLoop);

// update game world
function update()
{
	// this will be used for animation
	console.log("update")
}

function draw()
{
	// Clear Canvas
	// Draw current background
	// Draw player and enemy
    //console.log("Draw");
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	if (player.isAlive)
	{
		context.drawImage(combatScreenImage, 0, 0 );
		context.drawImage(player.img, player.x, player.y);
		context.drawImage(enemy.img, enemy.x, enemy.y);
		drawHealthbars();
	}
	else
	{
		context.fillText("GAME OVER SCREEN HERE", canvas.width / 4 , canvas.height / 2)
	}
}

// after game start, loop
function gameLoop()
{
	//update();
    draw();
    window.requestAnimationFrame(gameLoop);
	
}

function drawHealthbars() 
{
  var width = 200;
  var height = 20;
  context.font = "30px Arial";
  
  // player health bar
  // Draw the background and name 
  context.fillStyle = "#000000";
  context.fillText(player.name, player.x, player.y -40)
  context.fillRect(player.x, player.y - 25, width, height);
  // Draw the filled portion of the bar
  context.fillStyle = "#00FF00";
  var fillVal = player.health * 10 // 20 * 10 = 200, enough to fill a full health bar
  context.fillRect(player.x, player.y - 25, fillVal, height);
  
  // enemy health bar
  // Draw the background and name 
  context.fillStyle = "#000000";
  context.fillText(enemy.name, enemy.x, enemy.y -40)
  context.fillRect(enemy.x, enemy.y - 25, width, height);
  // Draw the filled portion of the bar
  context.fillStyle = "#00FF00";
  fillVal = enemy.health * 20 // 20 * 10 = 200, enough to fill a full health bar
  context.fillRect(enemy.x, enemy.y - 25, fillVal, height);
  
}

function splitFunction() 
{
	console.log("split function called")
	var url = window.location.search;
	console.log(url);
	var result = url.split("="); // Splits string based on =
	player.name = result[1];
}

function getRandomInt(max)
{
	 return Math.floor(Math.random() * Math.floor(max));
}

function processGameLogic()
{
	var randomEnemyChoice = getRandomInt(3) // generate a number between 0 and 2 inclusive to determine enemy choice
	
	// set enemies button selected
	if (randomEnemyChoice == 0)
	{
		enemy.buttonSelected = "HEAD"
	}
	if (randomEnemyChoice == 1)
	{
		enemy.buttonSelected = "BODY"
	}
	if (randomEnemyChoice == 2)
	{
		enemy.buttonSelected = "LEGS"
	}
	
	// player picked head
	if (player.buttonSelected == "HEAD")
	{
		if (enemy.buttonSelected == "HEAD")
		{
			// parried, no update
		}
		if (enemy.buttonSelected == "BODY")
		{
			enemy.health -= 2
		}
		if (enemy.buttonSelected == "LEGS")
		{
			player.health -= 2
		}
	}
	
	// player picked body
	if (player.buttonSelected == "BODY")
	{
		if (enemy.buttonSelected == "HEAD")
		{
			player.health -= 2
		}
		if (enemy.buttonSelected == "BODY")
		{
			// parried, no update
		}
		if (enemy.buttonSelected == "LEGS")
		{
			enemy.health -= 2
		}
	}
	
	// player picked legs
	if (player.buttonSelected == "LEGS")
	{
		if (enemy.buttonSelected == "HEAD")
		{
			enemy.health -= 2
		}
		if (enemy.buttonSelected == "BODY")
		{
			player.health -= 2
		}
		if (enemy.buttonSelected == "LEGS")
		{
			// parried, no update
		}
	}
	
	// debug alert
	alert("Player picked: " + player.buttonSelected + " Enemy picked: " + enemy.buttonSelected)
	player.buttonSelected = "NONE"
	enemy.buttonSelected = "NONE"
	
	if (player.health <= 0)
	{
		player.isAlive = false;
	}
}

function headClicked()
{
	player.buttonSelected = "HEAD";
	processGameLogic();
}

function bodyClicked()
{
	player.buttonSelected = "BODY";
	processGameLogic();
}

function legsClicked()
{
	player.buttonSelected = "LEGS";
	processGameLogic();
}