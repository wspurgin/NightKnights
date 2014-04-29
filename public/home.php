<?php require_once('validate.php'); ?>
<!DOCTYPE HTML>
<html lang="en">
<head>
  <title>Night Knights - Home</title>
  
  <link rel="stylesheet" type="text/css" href="/css/home.css">
  <script src="game/js/createjs/easeljs-0.7.1.min.js"></script>
  <script src="game/js/createjs/preloadjs-0.4.1.min.js"></script>
  <?php include("modules/commonHead.html"); ?>
  <script src="game/js/apiLogic.js"></script>
  <script src="js/weapon.js"></script>
  <script src="js/home.js"></script>
</head>

<body onload="main();">

  <?php include("modules/navbar.html"); ?>

  <div class="twocol" id="homewrapper">
    <div class="left" id="homeleft">

      <p class="infocaption">Knight Stats</p>
      <div id="knightstats" class="infobox">
        <div>Energy: <span id="Energy"></span></div>
        <div>Level: <span id="Level"></span></div>
        <div>Experience: <span id="Experience"></span></div>
        <div>XP To Next Level: <span id="xpToNextLevel"></span></div>
      </div>

      <p class="infocaption">Inventory</p>
      <div class="infobox" id="knightinventory">
      </div>
    </div>

    <div class="home-right right">
        <p class="infocaption">Current Weapon</p>
        <div id="knightweapon" class="infobox">
          <canvas id="weaponCanvas" width="64" height="64"></canvas>
          <div>Weapon Name: <span id="weaponName"></span></div>
          <div>Attack: <span id="weaponAttack"></span></div>
          <div>Defense: <span id="weaponDefense"></span></div>
          <div>Magic: <span id="weaponMagic"></span></div>
          <div><button type="button" href="#change" id="changeWeapon"><a href="#change">Change Weapon</a></button></div>
          <div id="change" class="modalDialog">
            <div>
              <a href="#close" title="Close" class="close">X</a>
              <h2>Pick Weapon</h2>
              <div id="modalInventory" class="infobox"></div>
            </div>
          </div>
        </div>
        <p class="infocaption">Messages</p>
        <div id="knightmessages" class="infobox">
          <div><span>No Unread Messages</span></div>
        </div>
      </div>
  </div>


  <?php include("modules/copyright.html"); ?>

</body>
</html>