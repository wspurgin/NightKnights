
/* init.js
 * Author: Anthony Cloudy
 * Houses the code for initializing the views.
 */

function initWorldView()
{
 worldMap = new createjs.Bitmap(preload.getResult("worldMap"));
 var stageSelect = new createjs.Container();
  
  forest = new createjs.Sprite(stageSelectSheet, "default");
  forest.setTransform(130, 230);
  forest.framerate = 10;
  forest.on("rollover", stageOver);
  forest.on("rollout", stageOut);
  forest.on("click", function() {areaView.addChildAt(forestMap, 0); areaView.addChild(initNightmaresList()); switchTo(areaView);});
  
  mountain = new createjs.Sprite(stageSelectSheet, "default");
  mountain.setTransform(320, 170);
  mountain.framerate = 10;
  mountain.on("rollover", stageOver);
  mountain.on("rollout", stageOut);
  mountain.on("click", function() {
    if(!mountain.locked) {
      areaView.addChildAt(mountainMap, 0); 
      areaView.addChild(initNightmaresList()); 
      switchTo(areaView);}
  });
  mountain.lockLevel = 5;
  if (player.level < 5){
    mountain.locked = true;
    mountain.gotoAndPlay("lockedDefault");
  }
  else {
    mountain.locked = false;
  }
  mountain.unlock = function() {
    mountain.gotoAndPlay("default");
  };
 
  lockList.push(mountain);
  
  castle = new createjs.Sprite(stageSelectSheet, "default");
  castle.setTransform(600, 240);
  castle.framerate = 10;
  castle.on("rollover", stageOver);
  castle.on("rollout", stageOut);
  castle.on("click", function() {
    if(!castle.locked) {
      areaView.addChildAt(castleMap, 0); 
      areaView.addChild(initNightmaresList()); 
      switchTo(areaView);}
  });
  castle.lockLevel = 10;
  if (player.level < castle.lockLevel){
    castle.locked = true;
    castle.gotoAndPlay("lockedDefault");
  }
  else {
    castle.locked = false;
  }
  castle.unlock = function() {
    castle.gotoAndPlay("default");
  };
  
  lockList.push(castle);
  
  stageSelect.addChild(forest, mountain, castle);  
  
  worldView.addChild(worldMap, stageSelect);
}

function initAreaViews()
{
  forestMap = new createjs.Bitmap(preload.getResult("forestMap"));
  mountainMap = new createjs.Bitmap(preload.getResult("mountainMap"));
  castleMap = new createjs.Bitmap(preload.getResult("castleMap"));
  
  backButton = new createjs.Bitmap(preload.getResult("backButton"));
  backButton.setTransform(10, 10);
  backButton.on("click", function() {areaView.removeChildAt(2); areaView.removeChildAt(0); switchTo(worldView);}); //Remove the Monsters, then the background.
  
  areaView.addChild(backButton);
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
  
  playerhp = new createjs.Text("x", "70px VT323", "#000000");
  playerhp.maxWidth = 1000;
  playerhp.textAlign = "left";
  playerhp.x = 70;
  playerhp.y = 260;
  
  energy = new createjs.Bitmap(preload.getResult("energy"));
  energy.setTransform(10, 270, 2, 2);
  
  nightmareDamageText = new createjs.Text("0", "80px VT323", "#FF0000");
  nightmareDamageText.textAlign = "center";
  nightmareDamageText.setTransform(bgCanvas.width /2, 100, 1, 1);
  nightmareDamageText.alpha = 0;
  
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

  
  textContainer.addChild(energy, playerhp, hpBarEmptySmall, hpBarSmall, treasureChest);
  
  encounterView.addChild(background, textContainer);
}
 
//This function initializes the actual entities in the encounter, not the view itself
function initEncounter()
{ 
  playerhp.text = "x" + player.energy;
  hpBarSmall.setTransform(bgCanvas.width /2 - 100, 50, 1, 1);
  hpBarEmptySmall.setTransform(bgCanvas.width /2 - 100, 50, 1, 1);
  
  nightmare = new Nightmare("Big Snake", 50, 5, 5);
  nightmare.initSprite("testMonster");
  
  menuStage.addChild(menuView);
  menuStage.update();
  
  encounterView.addChild(nightmare.sprite, fadeToBlack, nightmareDamageText);
}

//Removes the sprites that were used for the encounter to ready for another battle.
function encounterCleanup()
{
  fadeToBlack.alpha = 0;
  treasureChest.alpha = 0;
  clearLog();
  treasureChest.gotoAndPlay("closed");
  encounterView.removeChild(loot);
  encounterView.removeChild(nightmare.sprite);
  menuStage.removeChild(menuView);
  menuStage.update();
  menuView.alpha = 1;
}
 
function initMenuView()
{
  attackButton = buttonFactory(0, 0, 1, 1, "bigButton", "Melee", "80px", function() {swapMenu(combatMenu, attackMenu);});
  magicButton = buttonFactory(menuCanvas.width / 2, 0, 1, 1, "bigButton", "Magic", "80px", function() {swapMenu(combatMenu, magicMenu);});
  
  combatMenu.addChild(attackButton, magicButton);
  
  normalAttackButton = buttonFactory(0, 0, 1, 1, "bigButton", "< Back", "80px", function() {swapMenu(attackMenu, combatMenu);});
  powerStrikeButton = buttonFactory(menuCanvas.width / 2, 0, 1, 1, "bigButton", "Light", "80px", function() {startTurn("Light"); swapMenu(attackMenu, combatMenu);});
  earthSplitterButton = buttonFactory(0, menuCanvas.height / 2, 1, 1, "bigButton", "Medium", "80px", function() {startTurn("Medium"); swapMenu(attackMenu, combatMenu);});
  armageddonButton = buttonFactory(menuCanvas.width / 2, menuCanvas.height / 2, 1, 1, "bigButton", "Heavy", "80px", function() {startTurn("Heavy"); swapMenu(attackMenu, combatMenu);});
  
  normalMagicButton = buttonFactory(0, 0, 1, 1, "bigButton", "< Back", "80px", function() {swapMenu(magicMenu, combatMenu);});
  blizzardButton = buttonFactory(menuCanvas.width / 2, 0, 1, 1, "bigButton", "Blizzard", "80px", function() {startTurn("blizzard"); swapMenu(magicMenu, combatMenu);});
  thunderBlastButton = buttonFactory(0, menuCanvas.height / 2, 1, 1, "bigButton", "Thunder\nBlast", "80px", function() {startTurn("thunderBlast"); swapMenu(magicMenu, combatMenu);});
  cosmicRayButton = buttonFactory(menuCanvas.width / 2, menuCanvas.height / 2, 1, 1, "bigButton", "Cosmic\nRay", "80px", function() {startTurn("cosmicRay"); swapMenu(magicMenu, combatMenu);});
  
  magicMenu.addChild(normalMagicButton, blizzardButton, thunderBlastButton, cosmicRayButton);
  attackMenu.addChild(normalAttackButton, powerStrikeButton, earthSplitterButton, armageddonButton);
  menuView.addChild(combatMenu);
}


function buttonFactory(x, y, scaleX, scaleY, imageName, buttonText, textSize, clickEvent)
{
  var buttonContainer = new createjs.Container();
  
  this.button = new createjs.Bitmap(preload.getResult(imageName));
  this.button.setTransform(x, y, scaleX, scaleY);
  this.button.on("click", function(){ if (!menuLocked){clickEvent();}});
  
  
  this.text = new createjs.Text(buttonText, textSize + " VT323", "#000000");
  this.text.setTransform(x, y, scaleX, scaleY);
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
        
function openChest(event) {
  treasureChest.gotoAndPlay("open");
  encounterView.addChild(loot);
  createjs.Tween.get(loot).to({alpha: 1, y: loot.y - 20}, 1000).call(function(){
    loot.y += 20;
    encounterCleanup();
    switchTo(areaView);
    menuLocked = false;
  });
}

