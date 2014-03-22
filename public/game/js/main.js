//Following a tutorial at 
//http://code.tutsplus.com/tutorials/learn-createjs-by-building-an-html5-pong-game--active-11845
//To learn Canvas.js

var canvas; //Will be linked to the canvas in our index.html page
var stage; //Is the equivalent of stage in AS3; we'll add "children" to it
 
var loadingText;

var totalLoaded;

//[Views and Containers]
var worldView = new createjs.Container();
var areaView = new createjs.Container();
var encounterView = new createjs.Container();
var combatMenu = new createjs.Container();
var attackMenu = new createjs.Container();
var magicMenu = new createjs.Container();

function main()
{
  bgCanvas = document.getElementById("backgroundCanvas");
  stage = new createjs.Stage(bgCanvas);
  stage.mouseEventsEnabled = true;
  stage.enableMouseOver();
  
  
  loadingText = new createjs.Text("Loading", "bold 24px Arial", "#000000");
  loadingText.maxWidth = 1000;
  loadingText.textAlign = "center";
  loadingText.x = bgCanvas.width / 2;
  loadingText.y = bgCanvas.height / 4;
  stage.addChild(loadingText);
  stage.update();   //update the stage to show text
  
  //Declare all of the images up front, and give each one a unique id
  manifest = [
            {src:"backgrounds/raws/TheMasterSheet.png", id:"bgSprites"},
            {src:"backgrounds/WorldMapLines.png", id:"worldMap"},
            {src:"backgrounds/ForestMap.png", id:"forestMap"},
            {src:"sprites/back.png", id:"backButton"},
            {src:"sprites/Button.png", id:"button"},
            {src:"sprites/AttackButton.png", id:"attackButton"},
            {src:"sprites/AttackButton1.png", id:"attackButton1"},
            {src:"sprites/AttackButton2.png", id:"attackButton2"},
            {src:"sprites/AttackButton3.png", id:"attackButton3"},
            {src:"sprites/AttackButton4.png", id:"attackButton4"},
            {src:"sprites/MagicButton.png", id:"magicButton"},
            {src:"sprites/MagicButton1.png", id:"magicButton1"},
            {src:"sprites/MagicButton2.png", id:"magicButton2"},
            {src:"sprites/MagicButton3.png", id:"magicButton3"},
            {src:"sprites/MagicButton4.png", id:"magicButton4"},
            {src:"sprites/stageSelect.png", id:"stageSelectSprites"}
        ];
  
  preload = new createjs.LoadQueue();
  preload.installPlugin(createjs.Sound);
  preload.addEventListener("complete", doneLoading); // add an event listener for when load is completed
  preload.addEventListener("progress", updateLoading);
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
  initWorldView();
  initForestView();
  initEncounterView();
  switchTo(worldView);
}

//What gets called each time we load something.
function handleFileLoad(event) {
    var item = event.item; // A reference to the item that was passed in to the LoadQueue
    var type = item.type;

    // Add any images to the page body.
    if (type == createjs.LoadQueue.IMAGE) {
    document.body.appendChild(event.result);
    }
}
 
function initWorldView()
{
 worldMap = new createjs.Bitmap(preload.getResult("worldMap"));
 var stageSelect = new createjs.Container();
 
 var stageSelectSheet = new createjs.SpriteSheet({
    "animations":
      {
        "default": [0],
        "highlighted": [1, 3, "highlighted"]
      },
        "images": [preload.getResult("stageSelectSprites")],
        "frames": {width:50, height:50, count:4}
  });
  
  var forest = new createjs.Sprite(stageSelectSheet, "default");
  forest.setTransform(130, 230);
  forest.framerate = 10;
  forest.on("rollover", stageOver);
  forest.on("rollout", stageOut);
  forest.on("click", function() {switchTo(areaView);});
  
  var mountain = new createjs.Sprite(stageSelectSheet, "default");
  mountain.setTransform(320, 170);
  mountain.framerate = 10;
  mountain.on("rollover", stageOver);
  mountain.on("rollout", stageOut);
  
  var castle = new createjs.Sprite(stageSelectSheet, "default");
  castle.setTransform(600, 240);
  castle.framerate = 10;
  castle.on("rollover", stageOver);
  castle.on("rollout", stageOut);
  
  stageSelect.addChild(forest, mountain, castle);  
  
  worldView.addChild(worldMap, stageSelect);
}

function initForestView()
{
  forestMap = new createjs.Bitmap(preload.getResult("forestMap"));
  
  //This is here temporarily for testing purposes.
   var stageSelectSheet = new createjs.SpriteSheet({
    "animations":
      {
        "default": [0],
        "highlighted": [1, 3, "highlighted"]
      },
        "images": [preload.getResult("stageSelectSprites")],
        "frames": {width:50, height:50, count:4}
  });
  
  var forest = new createjs.Sprite(stageSelectSheet, "default");
  forest.setTransform(130, 230);
  forest.framerate = 10;
  forest.on("rollover", stageOver);
  forest.on("rollout", stageOut);
  forest.on("click", function() {switchTo(encounterView);});
  
  backButton = new createjs.Bitmap(preload.getResult("backButton"));
  backButton.setTransform(10, 10);
  backButton.on("click", function() {switchTo(worldView);});
  
  filler = new createjs.Text("AREA VIEW, YO!", "bold 24px Arial", "#000000");
  filler.maxWidth = 1000;
  filler.textAlign = "center";
  filler.x = bgCanvas.width / 2;
  filler.y = bgCanvas.height / 4;
  
  areaView.addChild(forestMap, forest, filler, backButton);
}

function initEncounterView()
{
   var backgroundSheet = new createjs.SpriteSheet({
    "animations":
      {
        "normal": [0]
      },
        "images": [preload.getResult("bgSprites")],
        "frames": {width:255, height:112}
  });
  
  var background = new createjs.Sprite(backgroundSheet, "normal");
  background.scaleX = 3;
  background.scaleY = 3;
  
  backButton = new createjs.Bitmap(preload.getResult("backButton"));
  backButton.setTransform(10, 10);
  backButton.on("click", function() {switchTo(areaView);});
  
  filler = new createjs.Text("ENCOUNTER VIEW, BRO!", "bold 24px Arial", "#000000");
  filler.maxWidth = 1000;
  filler.textAlign = "center";
  filler.x = bgCanvas.width / 2;
  filler.y = bgCanvas.height / 4;
  
  //These buttons are really ugly right now, but the code is solid.
  attackButton = new createjs.Bitmap(preload.getResult("attackButton"));
  attackButton.setTransform(0, 350, 2, 2);
  attackButton.on("click", function() {encounterView.removeChildAt(3); encounterView.addChild(attackMenu);});
  
  magicButton = new createjs.Bitmap(preload.getResult("magicButton"));
  magicButton.setTransform(bgCanvas.width / 2, 350, 2, 2);
  magicButton.on("click", function() {encounterView.removeChildAt(3); encounterView.addChild(magicMenu);});
  
  combatMenu.addChild(attackButton, magicButton);
  
  //Temporary fix. I don't know if I can use the same object, or create the children via some function
  attack1Button = new createjs.Bitmap(preload.getResult("attackButton1"));
  attack1Button.setTransform(0, 340, 1, 1);
  attack1Button.on("click", function() {console.log("Attack1"); encounterView.removeChildAt(3); encounterView.addChild(combatMenu);});
  
  attack2Button = new createjs.Bitmap(preload.getResult("attackButton2"));
  attack2Button.setTransform(0, 510, 1, 1);
  attack2Button.on("click", function() {console.log("Attack2"); encounterView.removeChildAt(3); encounterView.addChild(combatMenu);});
  
  attack3Button = new createjs.Bitmap(preload.getResult("attackButton3"));
  attack3Button.setTransform(bgCanvas.width / 2, 340, 1, 1);
  attack3Button.on("click", function() {console.log("Attack3"); encounterView.removeChildAt(3); encounterView.addChild(combatMenu);});
  
  attack4Button = new createjs.Bitmap(preload.getResult("attackButton4"));
  attack4Button.setTransform(bgCanvas.width / 2, 510, 1, 1);
  attack4Button.on("click", function() {console.log("Attack4"); encounterView.removeChildAt(3); encounterView.addChild(combatMenu);});
  
  attackMenu.addChild(attack1Button, attack2Button, attack3Button, attack4Button);
  
  magic1Button = new createjs.Bitmap(preload.getResult("magicButton1"));
  magic1Button.setTransform(0, 340, 1, 1);
  magic1Button.on("click", function() {console.log("Magic1"); encounterView.removeChildAt(3); encounterView.addChild(combatMenu);});
  
  magic2Button = new createjs.Bitmap(preload.getResult("magicButton2"));
  magic2Button.setTransform(0, 510, 1, 1);
  magic2Button.on("click", function() {console.log("Magic2"); encounterView.removeChildAt(3); encounterView.addChild(combatMenu);});
  
  magic3Button = new createjs.Bitmap(preload.getResult("magicButton3"));
  magic3Button.setTransform(bgCanvas.width / 2, 340, 1, 1);
  magic3Button.on("click", function() {console.log("Magic3"); encounterView.removeChildAt(3); encounterView.addChild(combatMenu);});
  
  magic4Button = new createjs.Bitmap(preload.getResult("magicButton4"));
  magic4Button.setTransform(bgCanvas.width / 2, 510, 1, 1);
  magic4Button.on("click", function() {console.log("Magic4"); encounterView.removeChildAt(3); encounterView.addChild(combatMenu);});
  
  magicMenu.addChild(magic1Button, magic2Button, magic3Button, magic4Button);
  
  combatMenu.addChild(attackButton, magicButton);
  
  encounterView.addChild(background, filler, backButton, combatMenu);
}

function switchTo(view)
{
  stage.removeChildAt(0);
  stage.addChild(view);
  stage.update();
}

function stageOver(event) {
    this.gotoAndPlay("highlighted");
}

function stageOut(event) {
    this.gotoAndPlay("default");
}