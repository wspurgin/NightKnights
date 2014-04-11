 
/* console.js
 * Author: Anthony Cloudy
 * Manages the console canvas.
 */

var gameConsole = new createjs.Container();
var consoleHeight = 0;

function initConsole()
{
  consoleCanvas = document.getElementById("consoleCanvas");
  consoleStage = new createjs.Stage(consoleCanvas); 
  consoleStage.addChild(gameConsole);
  consoleStage.update();   //Update the stage to show the text we just added.
}

function textFactory(text, color, y)
{
  var newText = new createjs.Text(text, "30px VT323", "#FFFFFF");
  newText.lineWidth = 240;
  newText.lineHeight = 25;
  newText.textAlign = "left";
  newText.textBaseline = "top";
  newText.shadow = new createjs.Shadow(color, 0, 0, 10);
  newText.x = 10;
  newText.y = y; //The game area is half of the canvas' height
  newText.viewHeight = newText.getBounds().height;
  return newText;
}

function log(text, color)
{
  var y;
  if (color === undefined)
    color = "#00FF00";
  if (gameConsole.children.length === 0)
    y = 0;
  else
    y = gameConsole.getChildAt(gameConsole.children.length - 1).viewHeight + consoleHeight;
  
  var newLine = textFactory(text, color, y);
  gameConsole.addChild(newLine);
  if ((y + newLine.viewHeight) > 339){
    var missingHeight = gameConsole.getChildAt(0).viewHeight;
    y -= missingHeight;
    consoleHeight -= missingHeight;
    gameConsole.removeChildAt(0);
    for (var i = 0; i < gameConsole.children.length; i++)
    {
      gameConsole.getChildAt(i).y -= missingHeight;
    }
  }
  
  consoleHeight = y;
  
  consoleStage.update(); 
}

function clearLog()
{
  gameConsole.removeAllChildren();
  consoleStage.update();
}