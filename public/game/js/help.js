 /* help.js
  * Author: Anthony Cloudy
  * Manages the help canvas.
  */
 var helpView = new createjs.Container();
 var consoleHeight = 0;

 function initHelp() {
   helpCanvas = document.getElementById("helpCanvas");
   helpStage = new createjs.Stage(helpCanvas);
   helpStage.addChild(helpView);
   helpStage.update(); //Update the stage to show the text we just added.
 }

 function helpTextFactory(text, color, size, y) {
   var newText = new createjs.Text(text, size + " VT323", "#FFFFFF");
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

 function helpSplash(titleText, descriptionText) {
   var title = helpTextFactory(titleText, "#00FF00", "50px", 10);
   var description = helpTextFactory(descriptionText, "#FF9900", "30px", 100);

   helpView.addChild(title, description);
   helpStage.update();
 }

 function clearHelp() {
   helpView.removeAllChildren();
   helpStage.update();
 }