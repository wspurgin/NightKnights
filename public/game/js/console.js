 
/* console.js
 * Author: Anthony Cloudy
 * Manages the console canvas.
 */

var log = [];

function initConsole()
{
  consoleCanvas = document.getElementById("consoleCanvas");
  consoleStage = new createjs.Stage(consoleCanvas); 
  nrnr = new createjs.Text("Text goes here", "30px VT323", "#FFFFFF");
  nrnr.maxWidth = 250;
  nrnr.textAlign = "center";
  nrnr.x = consoleCanvas.width / 2;
  nrnr.y = consoleCanvas.height / 2; //The game area is half of the canvas' height
  consoleStage.addChild(nrnr);
  consoleStage.update();   //Update the stage to show the text we just added.
}