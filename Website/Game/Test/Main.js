//Following a tutorial at 
//http://code.tutsplus.com/tutorials/learn-createjs-by-building-an-html5-pong-game--active-11845
//To learn Canvas.js

var canvas; //Will be linked to the canvas in our index.html page
var stage; //Is the equivalent of stage in AS3; we'll add "children" to it
 
// Graphics
//[Background]
 
var bg; //The background graphic
 
//[Title View]
  
 
var main; //The Main Background
var startB; //The Start button in the main menu
var creditsB; //The credits button in the main menu
 
//[Credits]
 
 
var credits; //The Credits screen
 
//[Game View]
 
 
var player; //The player paddle graphic
var ball; //The ball graphic
var cpu; //The CPU paddle
var win; //The winning popup
var lose; //The losing popup

//[Score]
 
var playerScore; //The main player score
var cpuScore; //The CPU score
var cpuSpeed=6; //The speed of the CPU paddle; the faster it is the harder the game is

// Variables
 
var xSpeed = 5;
var ySpeed = 5;

var tkr = new Object;

//preloader
var preloader;
var manifest;
var totalLoaded = 0;

var TitleView = new Container();

function Main()
{
  canvas = document.getElementById('PongStage');
  stage = new Stage(canvas);
  stage.mouseEventsEnabled = true;
  
  //Declare all of the images up front, and give each one a unique id
  manifest = [
            {src:"bg.png", id:"bg"},
            {src:"main.png", id:"main"},
            {src:"startB.png", id:"startB"},
            {src:"creditsB.png", id:"creditsB"},
            {src:"credits.png", id:"credits"},
            {src:"paddle.png", id:"cpu"},
            {src:"paddle.png", id:"player"},
            {src:"ball.png", id:"ball"},
            {src:"win.png", id:"win"},
            {src:"lose.png", id:"lose"},
            {src:"playerScore.mp3|playerScore.ogg", id:"playerScore"},
            {src:"enemyScore.mp3|enemyScore.ogg", id:"enemyScore"},
            {src:"hit.mp3|hit.ogg", id:"hit"},
            {src:"wall.mp3|wall.ogg", id:"wall"}
        ];
	
  //The preloader here handles the resource loading, and then lets us load the items from the manifest.
  preloader = new PreloadJS();
  preloader.installPlugin(SoundJS);
  preloader.onProgress = handleProgress;
  preloader.onComplete = handleComplete;
  preloader.onFileLoad = handleFileLoad;
  preloader.loadManifest(manifest);
  
  //Set the FPS of the game and link the stage to it.
  Ticker.setFPS(30);
  Ticker.addListener(stage); 
}

//This function lets us follow the progress of the loading operation.
//We can make a progress bar in here!
function handleProgress(event)
{
  //use event.loaded to get the percentage of the loading
}

//What gets called when we're done loading.  
function handleComplete(event) 
{
  totalLoaded++;
  
  if(manifest.length==totalLoaded)
  {
    addTitleView();
  }
}
 
//Allows us to discern the files we're loading, and do something different for each.
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
}

