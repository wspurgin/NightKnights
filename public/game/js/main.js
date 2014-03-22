//Following a tutorial at 
//http://code.tutsplus.com/tutorials/learn-createjs-by-building-an-html5-pong-game--active-11845
//To learn Canvas.js

var canvas; //Will be linked to the canvas in our index.html page
var bgStage; //Is the equivalent of stage in AS3; we'll add "children" to it
 
var loadingText;

var totalLoaded;

//[Views]
var worldView = new createjs.Container();
var areaView = new createjs.Container();
var encounterView = new createjs.Container();

function main()
{
  bgCanvas = document.getElementById("backgroundCanvas");
  bgStage = new createjs.Stage(bgCanvas);
  bgStage.mouseEventsEnabled = true;
  bgStage.enableMouseOver();
  
  
  loadingText = new createjs.Text("Loading", "bold 24px Arial", "#000000");
  loadingText.maxWidth = 1000;
  loadingText.textAlign = "center";
  loadingText.x = bgCanvas.width / 2;
  loadingText.y = bgCanvas.height / 2;
  bgStage.addChild(loadingText);
  bgStage.update();   //update the stage to show text
  
  //Declare all of the images up front, and give each one a unique id
  manifest = [
            {src:"backgrounds/raws/TheMasterSheet.png", id:"bgSprites"},
            {src:"backgrounds/WorldMapLines.png", id:"worldMap"},
            {src:"backgrounds/ForestMap.png", id:"forestMap"},
            {src:"sprites/stageSelect.png", id:"stageSelectSprites"}
        ];
  
  preload = new createjs.LoadQueue();
  preload.installPlugin(createjs.Sound);
  preload.addEventListener("complete", doneLoading); // add an event listener for when load is completed
  preload.addEventListener("progress", updateLoading);
  preload.loadManifest(manifest);

  
  //Set the FPS of the game and link the stage to it.
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", bgStage);
}

//This function lets us follow the progress of the loading operation.
//We update the loading text with the current progress after each resource is loaded.
function updateLoading(event)
{
  loadingText.text = "Loading " + (preload.progress*100|0) + "%"
  bgStage.update();
}

//What gets called when we're done loading.  
function doneLoading(event) 
{
  //Remove the loading text.
  bgStage.removeChildAt(0);
  initWorldView();
  initForestView();
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
  forest.on("click", function() {switchTo(worldView);});
  
  filler = new createjs.Text("AREA VIEW, YO!", "bold 24px Arial", "#000000");
  filler.maxWidth = 1000;
  filler.textAlign = "center";
  filler.x = bgCanvas.width / 2;
  filler.y = bgCanvas.height / 2;
  
  areaView.addChild(forestMap, forest, filler);
}

function switchTo(view)
{
  bgStage.removeChildAt(0);
  bgStage.addChild(view);
  bgStage.update();
}

function stageOver(event) {
    this.gotoAndPlay("highlighted");
}

function stageOut(event) {
    this.gotoAndPlay("default");
}