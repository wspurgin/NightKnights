<!DOCTYPE html>
<html>
<head>
    <title>Night Knights</title>
    
    <link rel="stylesheet" type="text/css" href="css/gameStyle.css">

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="js/createjs/easeljs-0.7.1.min.js"></script>
    <script src="js/createjs/tweenjs-0.5.1.min.js"></script>
    <script src="js/createjs/soundjs-0.5.2.min.js"></script>
    <script src="js/createjs/preloadjs-0.4.1.min.js"></script>
    <script src="js/createjs/movieclip-0.7.1.min.js"></script>
    <script src="js/apiLogic.js"></script>
    <script src="js/spritesheet.js"></script>
    <script src="js/battle.js"></script>
    <script src="js/init.js"></script>
    <script src="js/help.js"></script>
    <script src="js/console.js"></script>
    <script src="js/main.js"></script>
    
    <!-- <link rel="stylesheet" type="text/css" href="../css/home.css"> -->
    <?php include(__DIR__."/../modules/commonHead.html"); ?>
</head>
<body onload="main();">
    
  <div id="wrapper">
    <?php include(__DIR__."/../modules/navbar.html"); ?>
    
    <div id="Canvases">
      <div class="infobox leftCanvas"><canvas id="backgroundCanvas" height="340" width="765"></canvas></div>
      <div class="infobox rightCanvas"><canvas id="consoleCanvas" height="340" width="250"></canvas></div>
      <div class="infobox leftCanvas"><canvas id="menuCanvas" height="340" width="765"></canvas></div>
      <div class="infobox rightCanvas"><canvas id="helpCanvas" height="340" width="250"></canvas></div>
  </div>
  <!-- <div id="push"></div> -->
</div>



</body>
</html>