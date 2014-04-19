
/* init.js
 * Author: Anthony Cloudy
 * Houses the code for initializing the views.
 */

var currentArea;
function initStatsView()
{
  nameText = new createjs.Text("Name: " + player.name, "60px VT323", "#FFFFFF");
  nameText.maxWidth = 1000;
  nameText.textAlign = "left";
  nameText.x = 200;
  nameText.y = 10; //The game area is half of the canvas' height
  
  knight = new createjs.Bitmap(preload.getResult("knight"));
  knight.setTransform(10, 10, 0.5, 0.5);    
  
  energyIcon = new createjs.Bitmap(preload.getResult("energy"));
  energyIcon.setTransform(200, 75, 2, 2);
  
  currentEnergy = new createjs.Text("x" + player.energy, "60px VT323", "#FFFFFF");
  currentEnergy.maxWidth = 1000;
  currentEnergy.textAlign = "left";
  currentEnergy.x = 270;
  currentEnergy.y = 75;  
  
  levelText = new createjs.Text("Level: " + player.level, "60px VT323", "#FFFFFF");
  levelText.maxWidth = 1000;
  levelText.textAlign = "left";
  levelText.x = 500;
  levelText.y = 75;  
  
  experienceText = new createjs.Text("Exp: " + player.experience + "/" + calculateNextLevel(), "60px VT323", "#FFFFFF");
  experienceText.maxWidth = 1000;
  experienceText.textAlign = "left";
  experienceText.x = 200;
  experienceText.y = 140;  
  
  statsView.addChild(nameText, knight, energyIcon, currentEnergy, levelText, experienceText);
}

function updateStatsView()
{
  currentEnergy.text = "x" + player.energy;
  levelText.text = "Level: " + player.level;
  experienceText.text = "Exp: " + player.experience + "/" + calculateNextLevel();
  menuStage.update();
}

function initGameOverView()
{
  gameOverText = new createjs.Text("GAME OVER", "84px VT323", "#FFFFFF");
  gameOverText.maxWidth = 1000;
  gameOverText.textAlign = "center";
  gameOverText.x = bgCanvas.width / 2;
  gameOverText.y = bgCanvas.height / 2; //The game area is half of the canvas' height
  
  moreEnergyText = new createjs.Text("Get some rest tonight and earn more energy!", "48px VT323", "#FFFFFF");
  moreEnergyText.maxWidth = 765;
  moreEnergyText.textAlign = "center";
  moreEnergyText.x = bgCanvas.width / 2;
  moreEnergyText.y = bgCanvas.height / 2 + 70; //The game area is half of the canvas' height

  
  gameOverView.addChild(gameOverText, moreEnergyText);
}

function initWorldView()
{
 worldMap = new createjs.Bitmap(preload.getResult("worldMap"));
 var stageSelect = new createjs.Container();
  
  forest = new createjs.Sprite(stageSelectSheet, "default");
  forest.setTransform(130, 230);
  forest.framerate = 10;
  forest.on("rollover", stageOver);
  forest.on("rollout", stageOut);
  forest.on("click", function() {
    currentArea = "forest";
    areaView.addChildAt(forestMap, 0); 
    areaView.addChild(initNightmaresList()); 
    switchTo(areaView);
  });
  
  mountain = new createjs.Sprite(stageSelectSheet, "default");
  mountain.setTransform(320, 170);
  mountain.framerate = 10;
  mountain.on("rollover", stageOver);
  mountain.on("rollout", stageOut);
  mountain.on("click", function() {
    if(!mountain.locked) {
      currentArea = "mountain";
      areaView.addChildAt(mountainMap, 0); 
      areaView.addChild(initNightmaresList()); 
      switchTo(areaView);
    }
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
      currentArea = "castle";
      areaView.addChildAt(castleMap, 0); 
      areaView.addChild(initNightmaresList()); 
      switchTo(areaView);
    }
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
  
  worldBossButton = new createjs.Sprite(worldBossSelectSheet, "default");
  worldBossButton.setTransform(700, 10);
  worldBossButton.framerate = 10;
  worldBossButton.on("rollover", stageOver);
  worldBossButton.on("rollout", stageOut);
  
  worldBossText = new createjs.Text("World\nBosses", "22px VT323", "#000000");
  worldBossText.maxWidth = 1000;
  worldBossText.textAlign = "center";
  worldBossText.x = 725;
  worldBossText.y = 50;
  
  lockList.push(castle);
  
  stageSelect.addChild(forest, mountain, castle, worldBossButton, worldBossText);  
  
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
  background = new createjs.Sprite(backgroundSheet, "forest0");
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
  
  background.gotoAndPlay(currentArea + Math.floor((Math.random()*7)));
  playerhp.text = "x" + player.energy;
  hpBarSmall.setTransform(bgCanvas.width /2 - 100, 50, 1, 1);
  hpBarEmptySmall.setTransform(bgCanvas.width /2 - 100, 50, 1, 1);
  
  var areaNumber;
  if (currentArea == "forest")
    areaNumber = 1;
  else if (currentArea == "mountain")
    areaNumber = 2;
  else if (currentArea == "castle")
    areaNumber = 3;
  var newMonster = getRandomMonster(areaNumber);
  nightmare = new Nightmare(newMonster.name, newMonster.health_seed, newMonster.attack_seed, newMonster.defense_seed);
  nightmare.initSprite(newMonster.img_url);
  
  switchToMenu(menuView); 
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
  switchToMenu(statsView);
  menuView.alpha = 1;
}
 
function initMenuView()
{
  attackButton = buttonFactory(0, 0, 1, 1, "bigButton", "Melee", "80px", function() {swapMenu(combatMenu, attackMenu);});
  magicButton = buttonFactory(menuCanvas.width / 2, 0, 1, 1, "bigButton", "Skills", "80px", function() {swapMenu(combatMenu, magicMenu);});
  
  combatMenu.addChild(attackButton, magicButton);
  
  normalAttackButton = buttonFactory(0, 0, 1, 1, "bigButton", "< Back", "80px", function() {swapMenu(attackMenu, combatMenu);});
  powerStrikeButton = buttonFactory(menuCanvas.width / 2, 0, 1, 1, "bigButton", "Light", "80px", function() {startTurn("Light"); swapMenu(attackMenu, combatMenu);});
  earthSplitterButton = buttonFactory(0, menuCanvas.height / 2, 1, 1, "bigButton", "Medium", "80px", function() {startTurn("Medium"); swapMenu(attackMenu, combatMenu);});
  armageddonButton = buttonFactory(menuCanvas.width / 2, menuCanvas.height / 2, 1, 1, "bigButton", "Heavy", "80px", function() {startTurn("Heavy"); swapMenu(attackMenu, combatMenu);});
  
  normalMagicButton = buttonFactory(0, 0, 1, 1, "bigButton", "< Back", "80px", function() {swapMenu(magicMenu, combatMenu);});
  blizzardButton = buttonFactory(menuCanvas.width / 2, 0, 1, 1, "bigButton", "Iron Skin", "80px", function() {startTurn("defSkill"); swapMenu(magicMenu, combatMenu);});
  thunderBlastButton = buttonFactory(0, menuCanvas.height / 2, 1, 1, "bigButton", "Bezerk", "80px", function() {startTurn("attSkill"); swapMenu(magicMenu, combatMenu);});
  cosmicRayButton = buttonFactory(menuCanvas.width / 2, menuCanvas.height / 2, 1, 1, "bigButton", "Overload", "80px", function() {startTurn("uberSkill"); swapMenu(magicMenu, combatMenu);});
  
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

