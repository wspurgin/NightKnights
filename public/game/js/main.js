
/* main.js
 * Author: Anthony Cloudy
 * Hosts the main control for the game, as well as the startup code
 */

//[Canvas and View]
var canvas; //Will be linked to the canvas in our index.html page
var stage; //A collection of things to be rendered; we'll add "children" to it that we want to render.
var menuStage;

//[Views and Containers]
var worldView = new createjs.Container();
var areaView = new createjs.Container();
var encounterView = new createjs.Container();
var menuView = new createjs.Container();
var combatMenu = new createjs.Container();
var attackMenu = new createjs.Container();
var magicMenu = new createjs.Container();

//[Miscellaneous]
var loadingText;

function main()
{
  //Grab the canvas from the DOM. We draw on this instead of rendering to the DOM
  bgCanvas = document.getElementById("backgroundCanvas");
  //Set the backgroundCanvas as where we're going to render things
  stage = new createjs.Stage(bgCanvas); 
  
  menuCanvas = document.getElementById("menuCanvas");
  menuStage = new createjs.Stage(menuCanvas); 
  
  //These lines let us use mouse events, which are disabled by default.
  stage.mouseEventsEnabled = true;
  stage.enableMouseOver();
  
   WebFontConfig = {
    google: { families: [ 'VT323::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
  
  //This is the loading text that we'll update later.
  loadingText = new createjs.Text("Loading", "48px VT323", "#000000");
  loadingText.maxWidth = 1000;
  loadingText.textAlign = "center";
  loadingText.x = bgCanvas.width / 2;
  loadingText.y = bgCanvas.height / 2; //The game area is half of the canvas' height
  stage.addChild(loadingText);
  stage.update();   //Update the stage to show the text we just added.
  
  //Declare all of the resources up front, and give each one a unique id so that we can call it later.
  //This is all done in the background, so none of the images or sounds are rendered yet.
  manifest = [
            {src:"backgrounds/raws/TheMasterSheet.png", id:"bgSprites"},
            {src:"backgrounds/WorldMapLines.png", id:"worldMap"},
            {src:"backgrounds/ForestMap.png", id:"forestMap"},
            {src:"sprites/back.png", id:"backButton"},
            {src:"sprites/Button.png", id:"button"},
            {src:"sprites/AttackButton.png", id:"attackButton"},
            {src:"sprites/AttackButton1.png", id:"attackButton1"},
            {src:"sprites/MagicButton.png", id:"magicButton"},
            {src:"sprites/hpBar.png", id:"hpBar"},
            {src:"sprites/hpBarEmpty.png", id:"hpBarEmpty"},
            {src:"sprites/hpBarSmall.png", id:"hpBarSmall"},
            {src:"sprites/hpBarEmptySmall.png", id:"hpBarEmptySmall"},
            {src:"sprites/Dragons/BigSnake.png", id:"testMonster"},
            {src:"sprites/Chest.png", id:"treasureChest"},
            {src:"sprites/LootPlaceholder.png", id:"loot"},
            {src:"backgrounds/BlackBG.png", id:"blackBG"},
            {src:"sprites/stageSelect.png", id:"stageSelectSprites"},
            {src:"sprites/monsterSelect.png", id:"monsterSelectSprites"}
            
        ];
  
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
function updateLoading(event)
{
  loadingText.text = "Loading " + (preload.progress*100|0) + "%"
  stage.update();
}

//What gets called when we're done loading.  
function doneLoading(event) 
{
  //Remove the loading text.
  stage.removeChildAt(0);
  
  //Initialize each of the views of the world. These are the parts that are static and don't change each time.
  initSpriteSheets();
  initMenuView();
  initWorldView();
  initForestView();
  initEncounterView();
  //Once everything is loaded, swap to the world view so that we can start playing the game!
  switchTo(worldView);
}
 
function switchTo(view)
{
  stage.removeChildAt(0);
  stage.addChild(view);
  stage.update();
}

