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

