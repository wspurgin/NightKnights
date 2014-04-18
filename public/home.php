<?php require_once('validate.php'); ?>
<!DOCTYPE HTML>
<html lang="en">
<head>
  <title>Night Knights - Home</title>
  
  <link rel="stylesheet" type="text/css" href="/css/home.css">
  <script src="game/js/createjs/easeljs-0.7.1.min.js"></script>
  <script src="game/js/createjs/preloadjs-0.4.1.min.js"></script>
  <script src="game/js/apiLogic.js"></script>
  <script src="js/weapon.js"></script>
  <?php include("modules/commonHead.html"); ?>
</head>

<body onload="main();">

  <?php include("modules/navbar.html"); ?>


  <div class="twocol" id="homewrapper">
    <div class="left" id="homeleft">

      <p class="infocaption">Knight Stats</p>
      <div id="knightstats" class="infobox">
        <p>Energy: X</p>
        <p>Level: Y</p>
        <p>Experience: Z</p>
        <p>To Next: YYZ</p>
        <p>Rank: 9001</p>
      </div>

      <p class="infocaption">Current Weapon</p>
      <div id="knightweapon" class="infobox">
        <canvas id="weaponCanvas" width="64" height="64"></canvas>
        <p>Crazy Husky</p>
        <p>Attack: +3</p>
        <p>Defense: -1</p>
        <p>Magic: +1</p>
      </div>
    </div>

    <div class="right" id="homeright">
      <p class="infocaption">Current Worldbosses</p>
      <div class="infobox" id="worldbosses">
        <p>This some content</p>
      </div>
    </div>
  </div>


  <?php include("modules/copyright.html"); ?>

</body>
</html>