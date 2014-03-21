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
            {src:"backgrounds/raws/TheMasterSheet.png", id:"bgSprites"}
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
  addTitleView();
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

function addTitleView()
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
  background.z = -10;
  stage.addChildAt(background, stage.getChildIndex(loadingText));
  stage.update();
}