//Following a tutorial at 
//http://code.tutsplus.com/tutorials/learn-createjs-by-building-an-html5-pong-game--active-11845
//To learn Canvas.js

var canvas; //Will be linked to the canvas in our index.html page
var stage; //Is the equivalent of stage in AS3; we'll add "children" to it
 
var loadingText;
  
 
var totalLoaded;

//[Views]
var TitleView = new createjs.Container();
var WorldView = new createjs.Container();
var AreaView = new createjs.Container();
var EncounterView = new createjs.Container();

function main()
{
  canvas = document.getElementById("backgroundCanvas");
  stage = new createjs.Stage(canvas);
  loadingText = new createjs.Text("Loading", "bold 24px Arial", "#000000");
  loadingText.maxWidth = 1000;
  loadingText.textAlign = "center";
  loadingText.x = canvas.width / 2;
  loadingText.y = canvas.height / 2;
  stage.mouseEventsEnabled = true;
  stage.addChild(loadingText);
  stage.update();   //update the stage to show text
  
  //Declare all of the images up front, and give each one a unique id
  manifest = [
            {src:"backgrounds/raws/TheMasterSheet.png", id:"bgSprites"},
            {src:"backgrounds/WorldMap.png", id:"worldMap"},
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
  worldView();
}
 
/*Allows us to discern the files we're loading, and do something different for each.
function handleFileLoad(event) 
{
  //triggered when an individual file completes loading
      
  switch(event.type)
  {
    case PreloadJS.IMAGE:
    //image loaded
      var img = new Image();
      img.src = event.src;
      img.onload = handleLoadComplete;
      window[event.id] = new Bitmap(img);
    break;

    case PreloadJS.SOUND:
    //sound loaded
    handleLoadComplete();
    break;
  }
  
}*/
 function handleFileLoad(event) {
     var item = event.item; // A reference to the item that was passed in to the LoadQueue
     var type = item.type;

     // Add any images to the page body.
     if (type == createjs.LoadQueue.IMAGE) {
      document.body.appendChild(event.result);
     }
 }
 
function worldView()
{
 stage.enableMouseOver();
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
  stageSelect.addChild(forest);  

  stage.addChild(worldMap, stageSelect);
  stage.update();
}

function stageOver(event) {
    console.log("In");
    this.gotoAndPlay("highlighted");
}

function stageOut(event) {
    console.log("out");
    this.gotoAndPlay("default");
}