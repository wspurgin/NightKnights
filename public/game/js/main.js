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

var TitleView = new createjs.Container();

function main()
{
  
  canvas = document.getElementById("gameCanvas");
  stage = new createjs.Stage(canvas);
  messageField = new createjs.Text("Loading", "bold 24px Arial", "#000000");
  messageField.maxWidth = 1000;
  messageField.textAlign = "center";
  messageField.x = canvas.width / 2;
  messageField.y = canvas.height / 2;
  stage.mouseEventsEnabled = true;
  stage.addChild(messageField);
  stage.update();   //update the stage to show text
  
  //Declare all of the images up front, and give each one a unique id
  manifest = [
            {src:"backgrounds/Castle1.png", id:"bg"}
            /*{src:"main.png", id:"main"},
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
            {src:"wall.mp3|wall.ogg", id:"wall"}*/
        ];
	
        
   var data = {
     images: ["backgrounds/raws/TheMasterSheet.png"],
     frames: {width:765, height:336},
     //animations: {run:[0,4], jump:[5,8,"run"]}
  };
  var spriteSheet = new createjs.SpriteSheet(data);
  //var animation = new createjs.Sprite(spriteSheet, "run");
  
  
  preload = new createjs.LoadQueue();
  preload.installPlugin(createjs.Sound);
  preload.addEventListener("complete", doneLoading); // add an event listener for when load is completed
  preload.addEventListener("progress", updateLoading);
  preload.loadManifest(manifest);

  
  //Set the FPS of the game and link the stage to it.
  createjs.Ticker.addEventListener("tick", stage);
}

//This function lets us follow the progress of the loading operation.
//We can make a progress bar in here!
function updateLoading(event)
{
  messageField.text = "Loading " + (preload.progress*100|0) + "%"
  stage.update();
}

//What gets called when we're done loading.  
function doneLoading(event) 
{
  totalLoaded++;
  
  if(manifest.length==totalLoaded)
  {
    //Display the title screen
    addTitleView();
  }
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
  /*var bg = queue.getResult("myImage");
  //The x is written like this for clarity, so we know the offset
  bg.x = 0;
  bg.y = 0; 
    
  //Title view is a container that holds all of our elements to be displayed.
  //It acts just like a view, and in order to display it, we simply add it to the stage.
  TitleView.addChild(bg);
  stage.addChild(bg, TitleView);
  stage.update();
    
  // Button Listeners
  // For these events, you put in the name of the function: the function object to call.
  //startB.onPress = tweenTitleView;
  //creditsB.onPress = showCredits;*/
}
/*
function showCredits()
{
  // Show Credits
	
  credits.x = 480;
	
  stage.addChild(credits);
  stage.update();
  //Animates via Tween
  Tween.get(credits).to({x:0}, 300);
  //When you click on the screen, hide the credits
  credits.onPress = hideCredits;
}
 
// Hide Credits
 
function hideCredits(e)
{
  Tween.get(credits).to({x:480}, 300).call(rmvCredits);
}
 
// Remove Credits
 
function rmvCredits()
{
  stage.removeChild(credits);
}
 
// Tween Title View
 
function tweenTitleView()
{       
  // Start Game
	
  Tween.get(TitleView).to({y:-320}, 300).call(addGameView);
}

function addGameView()
{
    // Destroy Menu & Credits screen
    //This is how we stop rendering the current view
    stage.removeChild(TitleView);
    //Since we aren't using these again, we destruct them.
    TitleView = null;
    credits = null;
     
    // Add Game View
     
    player.x = 2;
    player.y = 160 - 37.5;
    cpu.x = 480 - 25;
    cpu.y = 160 - 37.5;
    ball.x = 240 - 15;
    ball.y = 160 - 15;
     
    // Score
     
    playerScore = new Text('0', 'bold 20px Arial', '#A3FF24');
    playerScore.x = 211;
    playerScore.y = 20;
     
    cpuScore = new Text('0', 'bold 20px Arial', '#A3FF24');
    cpuScore.x = 262;
    cpuScore.y = 20;
     
    stage.addChild(playerScore, cpuScore, player, cpu, ball);
    stage.update();
     
    // Start Listener 
     
    bg.onPress = startGame;
}*/