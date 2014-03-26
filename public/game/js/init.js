
/* init.js
 * Author: Anthony Cloudy
 * Houses the code for initializing the views.
 */

function initWorldView()
{
 worldMap = new createjs.Bitmap(preload.getResult("worldMap"));
 var stageSelect = new createjs.Container();
  
  var forest = new createjs.Sprite(stageSelectSheet, "default");
  forest.setTransform(130, 230);
  forest.framerate = 10;
  forest.on("rollover", stageOver);
  forest.on("rollout", stageOut);
  forest.on("click", function() {areaView.addChild(initNightmaresList()); switchTo(areaView);});
  
  var mountain = new createjs.Sprite(stageSelectSheet, "default");
  mountain.setTransform(320, 170);
  mountain.framerate = 10;
  mountain.on("rollover", stageOver);
  mountain.on("rollout", stageOut);
  if (player.level < 5){
    mountain.locked = true;
    mountain.gotoAndPlay("lockedDefault");
  }
  
  var castle = new createjs.Sprite(stageSelectSheet, "default");
  castle.setTransform(600, 240);
  castle.framerate = 10;
  castle.on("rollover", stageOver);
  castle.on("rollout", stageOut);
  if (player.level < 10){
    castle.locked = true;
    castle.gotoAndPlay("lockedDefault");
  }
  
  stageSelect.addChild(forest, mountain, castle);  
  
  worldView.addChild(worldMap, stageSelect);
}

function initForestView()
{
  var forestMap = new createjs.Bitmap(preload.getResult("forestMap"));
  
  backButton = new createjs.Bitmap(preload.getResult("backButton"));
  backButton.setTransform(10, 10);
  backButton.on("click", function() {areaView.removeChildAt(2); switchTo(worldView);});
  
  areaView.addChild(forestMap, backButton);
}

function initNightmaresList()
{
  var nightmaresList = new createjs.Container();
  
  for (var i = 0; i < 3; i++){
    var nightmareSelection = new createjs.Sprite(nightmareSelectSheet, "default");
    nightmareSelection.setTransform(Math.floor((Math.random()*500) + 100), Math.floor((Math.random()*180) + 100));
    nightmareSelection.framerate = 10;
    nightmareSelection.on("rollover", stageOver);
    nightmareSelection.on("rollout", stageOut);
    nightmareSelection.on("click", function() {nightmaresList.removeChild(this); initEncounter(); switchTo(encounterView);});
    
    nightmaresList.addChild(nightmareSelection);
  }
  return nightmaresList;
}

function initEncounterView()
{
  var background = new createjs.Sprite(backgroundSheet, "forest");
  background.scaleX = 3;
  background.scaleY = 3;
  
  textContainer = new createjs.Container();
  
  playerhp = new createjs.Text("Energy: ", "bold 24px Arial", "#000000");
  playerhp.maxWidth = 1000;
  playerhp.textAlign = "left";
  playerhp.x = 10;
  playerhp.y = 300;
  
  hpBar = new createjs.Bitmap(preload.getResult("hpBar"));
  hpBar.setTransform(100, 300, 1, 1);
  hpBarEmpty = new createjs.Bitmap(preload.getResult("hpBarEmpty"));
  hpBarEmpty.setTransform(100, 300, 1, 1);
  
  hpBarSmall = new createjs.Bitmap(preload.getResult("hpBarSmall"));
  hpBarSmall.setTransform(bgCanvas.width /2 - 100, 50, 1, 1);
  hpBarEmptySmall = new createjs.Bitmap(preload.getResult("hpBarEmptySmall"));
  hpBarEmptySmall.setTransform(bgCanvas.width /2 - 100, 50, 1, 1);
  
  treasureChest = new createjs.Sprite(treasureSheet, "closed");
  treasureChest.setTransform(bgCanvas.width / 2 - 75, bgCanvas.height / 2 - 75);
  treasureChest.framerate = 10;
  treasureChest.on("click", openChest);
  treasureChest.alpha = 0;
  
  fadeToBlack = new createjs.Bitmap(preload.getResult("blackBG"));
  fadeToBlack.alpha = 0;
  
  loot = new createjs.Bitmap(preload.getResult("loot"));
  loot.setTransform(bgCanvas.width / 2 - 25, bgCanvas.height / 2 - 25);
  loot.alpha = 0;

  
  textContainer.addChild(playerhp, hpBarEmpty, hpBar, hpBarEmptySmall, hpBarSmall, treasureChest);
  
  encounterView.addChild(background, textContainer);
}
 
//This function initializes the actual entities in the encounter, not the view itself
function initEncounter()
{ 
  hpBar.setTransform(100, 300, 1, 1);
  hpBarEmpty.setTransform(100, 300, 1, 1);
  hpBarSmall.setTransform(bgCanvas.width /2 - 100, 50, 1, 1);
  hpBarEmptySmall.setTransform(bgCanvas.width /2 - 100, 50, 1, 1);
  
  nightmare = new Nightmare("Big Snake", 1, 10, 1, 1);
  nightmare.initSprite("testMonster");
  
  menuStage.addChild(menuView);
  menuStage.update();
  
  encounterView.addChild(nightmare.sprite, fadeToBlack);
}

//Removes the sprites that were used for the encounter to ready for another battle.
function encounterCleanup()
{
  fadeToBlack.alpha = 0;
  treasureChest.alpha = 0;
  treasureChest.gotoAndPlay("closed");
  encounterView.removeChild(loot);
  encounterView.removeChild(nightmare.sprite);
  menuStage.removeChild(menuView);
  menuStage.update();
}
 
function initMenuView()
{
   //These buttons are really ugly right now, but the code works well enough to get to testing.
  attackButton = new createjs.Bitmap(preload.getResult("attackButton"));
  attackButton.setTransform(0, 0, 2, 2);
  attackButton.on("click", function() {swapMenu(combatMenu, attackMenu);});
  
  magicButton = new createjs.Bitmap(preload.getResult("magicButton"));
  magicButton.setTransform(menuCanvas.width / 2, 0, 2, 2);
  magicButton.on("click", function() {swapMenu(combatMenu, attackMenu);});
  
  combatMenu.addChild(attackButton, magicButton);
  
  attack1Button = new createjs.Bitmap(preload.getResult("attackButton1"));
  attack1Button.setTransform(0, 0, 1, 1);
  attack1Button.on("click", function() {startTurn("attack1"); swapMenu(attackMenu, combatMenu);});
  
  /* Removed until implemented, they're just too dang ugly!
  attack2Button = new createjs.Bitmap(preload.getResult("attackButton2"));
  attack2Button.setTransform(0, 170, 1, 1);
  attack2Button.on("click", function() {console.log("Attack2"); menuView.removeChild(attackMenu); menuView.addChild(combatMenu);});
  
  attack3Button = new createjs.Bitmap(preload.getResult("attackButton3"));
  attack3Button.setTransform(menuCanvas.width / 2, 0, 1, 1);
  attack3Button.on("click", function() {console.log("Attack3"); menuView.removeChild(attackMenu); menuView.addChild(combatMenu);});
  
  attack4Button = new createjs.Bitmap(preload.getResult("attackButton4"));
  attack4Button.setTransform(menuCanvas.width / 2, 170, 1, 1);
  attack4Button.on("click", function() {console.log("Attack4"); menuView.removeChild(attackMenu); menuView.addChild(combatMenu);});
  
  attackMenu.addChild(attack1Button, attack2Button, attack3Button, attack4Button);
  
  magic1Button = new createjs.Bitmap(preload.getResult("magicButton1"));
  magic1Button.setTransform(0, 0, 1, 1);
  magic1Button.on("click", function() {console.log("Magic1"); menuView.removeChild(magicMenu); menuView.addChild(combatMenu);});
  
  magic2Button = new createjs.Bitmap(preload.getResult("magicButton2"));
  magic2Button.setTransform(0, 170, 1, 1);
  magic2Button.on("click", function() {console.log("Magic2"); menuView.removeChild(magicMenu); menuView.addChild(combatMenu);});
  
  magic3Button = new createjs.Bitmap(preload.getResult("magicButton3"));
  magic3Button.setTransform(menuCanvas.width / 2, 0, 1, 1);
  magic3Button.on("click", function() {console.log("Magic3"); menuView.removeChild(magicMenu); menuView.addChild(combatMenu);});
  
  magic4Button = new createjs.Bitmap(preload.getResult("magicButton4"));
  magic4Button.setTransform(menuCanvas.width / 2, 170, 1, 1);
  magic4Button.on("click", function() {console.log("Magic4"); menuView.removeChild(magicMenu); menuView.addChild(combatMenu);});*/
  
  //magicMenu.addChild(magic1Button, magic2Button, magic3Button, magic4Button);
  attackMenu.addChild(attack1Button);
  menuView.addChild(combatMenu);
}


function buttonMaker(x, y, imageName, buttonText, clickEvent)
{
  var buttonContainer = new createjs.Container();
  
  this.button = new createjs.Bitmap(preload.getResult(imageName));
  this.button.setTransform(x, y, 2, 2);
  this.button.on("click", clickEvent);
  
  
  this.text = new createjs.Text(buttonText, "32px VT323", "#000000");
  this.text.setTransform(x, y, 2, 2);
  this.text.textAlign = "center";
  this.text.textBaseline = "middle";
  this.text.x += (this.button.getBounds().width / 2) * this.button.scaleX;
  this.text.y += (this.button.getBounds().height / 2) * this.button.scaleY;
  
  
  buttonContainer.addChild(button, text);
  return buttonContainer;
}

/* Helper functions for the initialized components.
 * This includes some of the more complicated onClick event functions.
 */

function swapMenu(oldView, newView){
  menuView.removeChild(oldView); 
  menuView.addChild(newView);
  menuStage.update();
}

function stageOver(event) {
    if(this.locked)
    this.gotoAndPlay("lockedHighlighted");
  else
    this.gotoAndPlay("highlighted");
}

function stageOut(event) {
  if(this.locked)
    this.gotoAndPlay("lockedDefault");
  else
    this.gotoAndPlay("default");
}

function tweenFinish(tween) {
    //nightmare = tween._target;
}
        
function openChest(event) {
  treasureChest.gotoAndPlay("open");
  encounterView.addChild(loot);
  createjs.Tween.get(loot).to({alpha: 1, y: loot.y - 20}, 1000).call(function(){
    encounterCleanup();
    switchTo(areaView);
  });
}

