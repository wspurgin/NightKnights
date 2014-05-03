/* main.js
 * Author: Anthony Cloudy
 * Hosts the main control for the game, as well as the startup code
 */
//[Canvas and View]
var canvas; //Will be linked to the canvas in our index.html page
var stage; //A collection of things to be rendered; we'll add "children" to it that we want to render.
var menuStage;
var consoleStage;
var player;
var volume = 1;

//[Views and Containers]
var worldView = new createjs.Container();
var areaView = new createjs.Container();
var encounterView = new createjs.Container();
var menuView = new createjs.Container();
var combatMenu = new createjs.Container();
var attackMenu = new createjs.Container();
var magicMenu = new createjs.Container();
var gameOverView = new createjs.Container();
var statsView = new createjs.Container();
var worldBossView = new createjs.Container();
var inventoryView = new createjs.Container();

//[Miscellaneous]
var loadingText;
var lockList = [];

function main() {
  //Grab the canvas from the DOM. We draw on this instead of rendering to the DOM
  bgCanvas = document.getElementById("backgroundCanvas");
  //Set the backgroundCanvas as where we're going to render things
  stage = new createjs.Stage(bgCanvas);

  menuCanvas = document.getElementById("menuCanvas");
  menuStage = new createjs.Stage(menuCanvas);

  //These lines let us use mouse events, which are disabled by default.
  stage.mouseEventsEnabled = true;
  stage.enableMouseOver();
  menuStage.mouseEventsEnabled = true;
  menuStage.enableMouseOver();

  //Grabbing the web font from google
  WebFontConfig = {
    google: {
      families: ['VT323::latin']
    }
  };
  (function () {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

  //This is the loading text that we'll update later.
  loadingText = new createjs.Text("Loading", "48px VT323", "#FFFFFF");
  loadingText.maxWidth = 1000;
  loadingText.textAlign = "center";
  loadingText.x = bgCanvas.width / 2;
  loadingText.y = bgCanvas.height / 2; //The game area is half of the canvas' height
  stage.addChild(loadingText);
  stage.update(); //Update the stage to show the text we just added.

  initializeMonsterArray(); //Initialize the monster array
  //Declare all of the resources up front, and give each one a unique id so that we can call it later.
  //This is all done in the background, so none of the images or sounds are rendered yet.
  manifest = [
            {src:"backgrounds/raws/TheMasterSheet.png", id:"bgSprites"},
            {src:"backgrounds/WorldMapLines.png", id:"worldMap"},
            {src:"backgrounds/WorldBossMap.png", id:"worldBossMap"},
            {src:"backgrounds/ForestMap.png", id:"forestMap"},
            {src:"backgrounds/MountainMap.png", id:"mountainMap"},
            {src:"backgrounds/CastleMap.png", id:"castleMap"},
            {src:"backgrounds/BlackBG.png", id:"blackBG"},
            {src:"sprites/back.png", id:"backButton"},
            {src:"sprites/Button.png", id:"button"},
            {src:"sprites/bigButton.png", id:"bigButton"},            
            {src:"sprites/lockedButton.png", id:"lockedButton"},     
            {src:"sprites/equipButton.png", id:"equipButton"},
            {src:"sprites/hpBar.png", id:"hpBar"},
            {src:"sprites/hpBarEmpty.png", id:"hpBarEmpty"},
            {src:"sprites/hpBarSmall.png", id:"hpBarSmall"},
            {src:"sprites/hpBarEmptySmall.png", id:"hpBarEmptySmall"},
            {src:"sprites/Dragons/BigSnake.png", id:"testMonster"},
            {src:"sprites/Chest.png", id:"treasureChest"},
            {src:"sprites/LootPlaceholder.png", id:"loot"},
            {src:"sprites/stageSelect.png", id:"stageSelectSprites"},
            {src:"sprites/monsterSelect.png", id:"monsterSelectSprites"},
            {src:"sprites/Energy.png", id:"energy"},
            {src:"sprites/Attack.png", id:"attack"},
            {src:"sprites/Defence.png", id:"defence"},
            {src:"sprites/Knight.png", id:"knight"},
            {src:"sprites/Weapons.png", id:"weaponsSprites"}, 
            {src:"sprites/worldBossButton.png", id:"worldBossButtonSprites"},
            {src:"sprites/selectButton.png", id:"selectButton"},
            {src:"sprites/runAway.png", id:"runAway"},     
            
            //SOUNDS
            {id:"enemyHit", src:"audio/Oracle_Enemy_Hit.wav"},
            {id:"enemyDie", src:"audio/Oracle_Enemy_Die.wav"},
            {id:"bossHit", src:"audio/Oracle_Boss_Hit.wav"},
            {id:"bossDie", src:"audio/Oracle_Boss_Die.wav"},
            {id:"playerHit", src:"audio/Oracle_Link_Hurt.wav"},
            {id:"playerDie", src:"audio/Oracle_Link_Dying.wav"},
            {id:"itemFind", src:"audio/itemFind.mp3"},
            {id:"menuMusic", src:"audio/questForGlory.mp3"},
            {id:"battleMusic", src:"audio/letMySoulBurn.mp3"},
            {id:"worldBossMusic", src:"audio/raiseThySword.mp3"},
            {id:"buttonPress", src:"audio/Oracle_Menu_Select.wav"},
            {id:"skillSound", src:"audio/Oracle_Sword_Charge.wav"},
  ];

  //Add all of the monster images to the manifest
  monsters.forEach(function (element, index, array) {
    element.forEach(function (element, index, array) {
      manifest.push({
        src: element.img_url,
        id: element.img_url
      });
    });
  });


  //This is the preloader, which lets us load the images beforehand and keeps track of all of the resources.
  preload = new createjs.LoadQueue();
  preload.installPlugin(createjs.Sound);
  //Add event listeners for when events are fired during and after the loading process.
  preload.addEventListener("progress", updateLoading);
  preload.addEventListener("complete", doneLoading);
  preload.loadManifest(manifest);




  //Set the FPS of the game and link the stage to it.
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", stage);
}

//This function lets us follow the progress of the loading operation.
//We update the loading text with the current progress after each resource is loaded.
function updateLoading(event) {
  loadingText.text = "Loading " + (preload.progress * 100 | 0) + "%"
  stage.update();
}

//What gets called when we're done loading.  
function doneLoading(event) {
  initSpriteSheets();
  //Remove the loading text.
  stage.removeChildAt(0);

  //Initialize the inventory. We'll need an api call for this later.
  initInventory();

  //Create the player object. This is where we would use the data we got from the DB.
  var character = getPlayerData();
  player = new Player(character.name, character.level, character.energy, character.experience, inventory[0]);


  //Initialize each of the views of the world. These are the parts that are static and don't change each time.
  initMenuView();
  initWorldView();
  initAreaViews();
  initEncounterView();
  initHelp();
  initConsole();
  initGameOverView();
  initStatsView();
  initInventoryView();

  inventory.forEach(function (element, index, array) {
    if (inventory[index].is_equipped) {
      equip(inventory[index]);
      checkForEquip();
    }
  });
  //Once everything is loaded, swap to the world view so that we can start playing the game!
  if (player.energy <= 0) {
    switchTo(gameOverView);
  } else {
    playMusic("menuMusic");
    switchTo(worldView);
    switchToMenu(statsView);
    checkUnlocks();
  }
}

function switchTo(view) {
  stage.removeChildAt(0);
  stage.addChild(view);
  stage.update();
}

function switchToMenu(view) {
  updateStatsView();
  menuStage.removeChildAt(0);
  menuStage.addChild(view);
  menuStage.update();
}

function playerUpdate(updateObject) {
  player.experience = updateObject.experience;
  if (player.level < updateObject.level) {
    player.level = updateObject.level;
    console.log("LEVEL UP to " + player.level);
    checkUnlocks();
    player.levelUp();
  }
  updateStatsView();
}

function checkUnlocks() {
  lockList.forEach(function (element, index, array) {
    if (player.level >= element.lockLevel) {
      element.locked = false;
      element.unlock();
    }
  });
}

function calculateNextLevel() {
  var x = Number(player.level);
  return (25 * x * (1 + x));
}

function calculateExpTo(level) {
  var x = Number(level);
  return (25 * x * (1 + x));
}