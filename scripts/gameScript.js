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

// mrStache
var mrStacheImage = new Image();
enemyImage.src = "./assests/mr_stache_img.png"
var mrStacheIconImage = new Image();
mrStacheIconImage.src = "./assests/mr_stache_icon.png"

// set up canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

// bool to control when we are in combat or the overworld
var inCombat = false;

var gameWon = false;

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
    this.x = 190; 
    this.y = 150; 
	this.iconX = gridCoordinatesX[1];
	this.iconY = gridCoordinatesY[1];
	this.XIndex = 1;
	this.YIndex = 1;
	this.isAlive = true;
	this.numOfKills = 0;
	this.buttonSelected = "NONE"; // default value
	
	this.currentFrame = 3;
	this.numFrames = 4;
}
var player = new playerEntity("Default", playerImage, playerIconImage, 20) // player name is found through split function

// enemy entities set up and creation
function enemyEntity(name, image, icon, gridX, gridY, health, healthBarFill) 
{
    this.name = name;
    this.img = image;
	this.icon = icon;
	this.health = health;	
    this.x = 400;
    this.y = 150;
	this.iconX = gridCoordinatesX[gridX];
	this.iconY = gridCoordinatesY[gridY];
	this.XIndex = 5;
	this.YIndex = 5;
	this.isAlive = true;
	this.buttonSelected = "NONE"; 
	this.fightingPlayer = false;
	
	this.currentFrame = 3;
	this.numFrames = 4;
	
	this.healthBarFill = healthBarFill;
}

var mrStache = new enemyEntity("Mr.Stache", enemyImage, mrStacheIconImage, 8, 8, 10, 20)
var grunt = new enemyEntity("Grunt", enemyImage, enemyIconImage, 5, 5 , 5, 40)
var lackey = new enemyEntity("Lacky", enemyImage, enemyIconImage, 3, 7, 8, 25)

var enemies = [mrStache, grunt, lackey];

 //game starts here
 window.requestAnimationFrame(gameLoop);

var icon_frames = 2;
var currentFrame = 0;
// Initial time set
var initial = new Date().getTime();
var current; // current time

function animateIcons() {
	
    current = new Date().getTime(); // update current
	
    if (current - initial >= 500) 
	{ // check is greater that 200 ms
        currentFrame = (currentFrame + 1) % icon_frames; // update frame
        initial = current; // reset initial
    } 

	for (i = 0; i < enemies.length; i++)
	{
		if (enemies[i].isAlive)
		{
			context.drawImage(enemies[i].icon, (enemies[i].icon.width / icon_frames) * currentFrame, 0, 80, 60, enemies[i].iconX, enemies[i].iconY, 80, 60);
		}
	}
	
    // Draw sprite frame
    context.drawImage(player.icon, (player.icon.width / icon_frames) * currentFrame, 0, 80, 60, player.iconX, player.iconY, 80, 60);

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
	
			context.drawImage(player.img, (player.img.width / player.numFrames) * player.currentFrame, 0, 200, 400, player.x, player.y, 200, 400);
			
				for (i = 0; i < enemies.length; i++)
				{
					if (enemies[i].fightingPlayer == true)
					{
						// Draw sprite frame
						context.drawImage(enemies[i].img, (enemies[i].img.width / enemies[i].numFrames) * enemies[i].currentFrame, 0, 200, 400, enemies[i].x, enemies[i].y, 200, 400);
						drawHealthbars(i);
					}
				}
		}
		else
		{
			context.drawImage(combatScreenImage, 0, 0 );
			context.fillText("GAME OVER, YOU DIED", canvas.width / 4 , canvas.height / 2)
		}
	}
	else
	{
		context.drawImage(overWorldImage, 0, 0 );
		animateIcons();
		//console.log("X pos = " + player.iconX)
		//console.log("Y pos = " + player.iconY)
	}
}

// after game start, loop
function gameLoop()
{
    draw();
    window.requestAnimationFrame(gameLoop);
}

function drawHealthbars(i) 
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
  context.fillText(enemies[i].name, enemies[i].x, enemies[i].y -40)
  context.fillRect(enemies[i].x, enemies[i].y - 25, width, height);
  // Draw the filled portion of the bar
  context.fillStyle = "#00FF00";
  
  fillVal = enemies[i].health * enemies[i].healthBarFill;
  context.fillRect(enemies[i].x, enemies[i].y - 25, fillVal, height);
  
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
	
	for (i = 0; i < enemies.length; i++)
	{
		if (enemies[i].fightingPlayer == true)
		{
			if (randomEnemyChoice == 0)
			{
				enemies[i].buttonSelected = "HEAD"
				enemies[i].currentFrame = 0
			}
			if (randomEnemyChoice == 1)
			{
				enemies[i].buttonSelected = "BODY"
				enemies[i].currentFrame = 1
			}
			if (randomEnemyChoice == 2)
			{
				enemies[i].buttonSelected = "LEGS"
				enemies[i].currentFrame = 2
			}
	
			// player picked head
			if (player.buttonSelected == "HEAD")
			{
				player.currentFrame = 0
				if (enemies[i].buttonSelected == "HEAD")
				{
					// parried, no update
				}
				if (enemies[i].buttonSelected == "BODY")
				{
					enemies[i].health -= 2
				}
				if (enemies[i].buttonSelected == "LEGS")
				{
					player.health -= 2
				}
			}
			
			// player picked body
			if (player.buttonSelected == "BODY")
			{
				player.currentFrame = 1
				
				if (enemies[i].buttonSelected == "HEAD")
				{
					player.health -= 2
				}
				if (enemies[i].buttonSelected == "BODY")
				{
					// parried, no update
				}
				if (enemies[i].buttonSelected == "LEGS")
				{
					enemies[i].health -= 2
				}
			}
		
			// player picked legs
			if (player.buttonSelected == "LEGS")
			{
				player.currentFrame = 2
				
				if (enemies[i].buttonSelected == "HEAD")
				{
					enemies[i].health -= 2
				}
				if (enemies[i].buttonSelected == "BODY")
				{
					player.health -= 2
				}
				if (enemies[i].buttonSelected == "LEGS")
				{
					// parried, no update
				}
			}
		
			// debug alert
			// alert("Player picked: " + player.buttonSelected + " Enemy picked: " + enemies[i].buttonSelected)
			
			console.log("Player picked: " + player.buttonSelected + " Enemy picked: " + enemies[i].buttonSelected)
			player.buttonSelected = "NONE"
			enemies[i].buttonSelected = "NONE"
		
			if (player.health <= 0)
			{
				player.isAlive = false;
			}
			
			if (enemies[i].health <=0)
			{
				enemies[i].isAlive = false;
				enemies[i].fightingPlayer = false;
				player.numOfKills = player.numOfKills + 1;
				inCombat = false;
			}
		}
	}
}

function checkforBattle()
{
	for (i = 0; i < enemies.length; i++)
	{
		if (enemies[i].isAlive)
		{
			if (player.iconX == enemies[i].iconX && player.iconY == enemies[i].iconY)
			{
				inCombat = true;
				enemies[i].fightingPlayer = true;
			}
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
