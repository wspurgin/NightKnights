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
        <script src="js/main.js"></script>
        
        <link rel="stylesheet" type="text/css" href="../css/home.css">
        <?php include("../html/modules/commonHead.html"); ?>
    </head>
    <body onload="main();">
      <?php include("../html/modules/navbar.html"); ?>
        <canvas id="backgroundCanvas" width="765" height="340"></canvas>
        <canvas id="menuCanvas" width="765" height="340"></canvas>
      <?php include("../html/modules/copyright.html"); ?>
    </body>
</html>