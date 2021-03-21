// set up sprites and images
// background
var combatScreenImage = new Image();
combatScreenImage.src = "./assests/Combat_Screen.png";
var overWorldImage = new Image();
overWorldImage.src = "./assests/OverWorld.png";

// player
var playerImage = new Image();
playerImage.src = "./assests/player.png"
var playerIconImage = new Image();
playerIconImage.src = "./assests/player_icon.png"

// enemy
var enemyImage = new Image();
enemyImage.src = "./assests/enemy.png"
var enemyIconImage = new Image();
enemyIconImage.src = "./assests/enemy_icon.png"

// set up canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// bool to control when we are in combat or the overworld
var inCombat = false;

// init our "grid" for overworld
var gridCoordinatesX = new Array(10);
var gridCoordinatesY = new Array(10);
console.log(gridCoordinatesX.length)
console.log(gridCoordinatesY.length)

for (i = 0; i < gridCoordinatesX.length; i++)
{
	gridCoordinatesX[i] = 80 * i
	//console.log(gridCoordinatesX[i])
}

for (i = 0; i < gridCoordinatesY.length; i++)
{
	gridCoordinatesY[i] = 60 * i
	//console.log(gridCoordinatesX[i])
}

combatScreenImage.onload = function()
{
	canvas.width = combatScreenImage.width;
	canvas.height = combatScreenImage.height;
}

// player entity set up and creation
function playerEntity(name, image, icon, health) 
{
    this.name = name;
    this.img = image;
	this.icon = icon;
    this.health = health;
    this.x = 100; 
    this.y = 150; 
	this.iconX = gridCoordinatesX[1];
	this.iconY = gridCoordinatesY[1];
	this.XIndex = 1;
	this.YIndex = 1;
	this.isAlive = true;
	this.buttonSelected = "NONE"; // default value
}
var player = new playerEntity("Default", playerImage, playerIconImage, 20) // player name is found through split function

// enemy entities set up and creation
function enemyEntity(name, image, icon, health) 
{
    this.name = name;
    this.img = image;
	this.icon = icon;
	this.health = health;	
    this.x = 500;
    this.y = 150;
	this.iconX = gridCoordinatesX[5];
	this.iconY = gridCoordinatesY[5];
	this.XIndex = 5;
	this.YIndex = 5;
	this.isAlive = true;
	this.buttonSelected = "NONE"; 
}
var enemy = new enemyEntity("Mr.Stache", enemyImage, enemyIconImage, 4)
var grunt = new enemyEntity("Grunt", enemyImage, enemyIconImage, 10)
var lackey = new enemyEntity("Lacky", enemyImage, enemyIconImage, 10)

var enemies = [enemy,grunt,lackey];

 //game starts here
 window.requestAnimationFrame(gameLoop);

// update animations
function update()
{
	// this will be used for animation
	//console.log("update")
}

function draw()
{
	// Clear Canvas
	// Draw current background
	// Draw player and enemy
    //console.log("Draw");
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	if (inCombat)
	{
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
	else
	{
		context.drawImage(overWorldImage, 0, 0 );
		context.drawImage(player.icon, player.iconX, player.iconY);
		
		if (enemy.isAlive)
		{
			context.drawImage(enemy.icon, enemy.iconX, enemy.iconY);
		}
		
		//console.log("X pos = " + player.iconX)
		//console.log("Y pos = " + player.iconY)
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
	
	if (enemy.health <=0)
	{
		enemy.isAlive = false;
		inCombat = false;
	}
}

function checkforBattle()
{
	if (enemy.isAlive)
	{
		if (player.iconX == enemy.iconX && player.iconY == enemy.iconY)
		{
			inCombat = true;
		}
	}
}

function headClicked()
{
	if (inCombat)
	{
		player.buttonSelected = "HEAD";
		processGameLogic();
	}
}

function bodyClicked()
{
	if (inCombat)
	{
		player.buttonSelected = "BODY";
		processGameLogic();
	}
}

function legsClicked()
{
	if (inCombat)
	{
		player.buttonSelected = "LEGS";
		processGameLogic();
	}
}

function downClicked()
{
	if (inCombat == false)
	{
		player.YIndex++
		if (player.YIndex > 9)
		{
			alert("Invalid move!")
			player.YIndex--
		}
		player.iconY = gridCoordinatesY[player.YIndex]
		checkforBattle()
	}
}

function upClicked()
{
	if (inCombat == false)
	{
		player.YIndex--
		if (player.YIndex < 0)
		{
			alert("Invalid move!")
			player.YIndex++
		}
		player.iconY = gridCoordinatesY[player.YIndex]
		checkforBattle()
	}
}

function rightClicked()
{
	if (inCombat == false)
	{
		player.XIndex++
		if (player.XIndex > 9)
		{
			alert("Invalid move!")
			player.XIndex--
		}
		player.iconX = gridCoordinatesX[player.XIndex]
		checkforBattle()
	}
}

function leftClicked()
{
	if (inCombat == false)
	{
		player.XIndex--
		if (player.XIndex < 0)
		{
			alert("Invalid move!")
			player.XIndex++
		}
		player.iconX = gridCoordinatesX[player.XIndex]
		checkforBattle()
	}
}
