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
  <script src="js/account.js"></script>
</head>

<body onload="main();">
  <div id="wrapper">
    <?php include("modules/navbar.html"); ?>

    <div class="twocol" id="homewrapper">
      <div class="left" id="homeleft">

        <p class="infocaption">Knight Stats</p>
        <div id="knightstats" class="infobox">
          <div>Energy: <div class="infocontent" id="Energy"></div></div>
          <div>Level: <div class="infocontent" id="Level"></div></div>
          <div>Experience: <div class="infocontent" id="Experience"></div></div>
          <div>XP To Next Level: <div class="infocontent" id="xpToNextLevel"></div></div>
        </div>

        <p class="infocaption">My Account</p>
        <div class="infobox" id="accountstats">
          <div>Username: <div class="infocontent"><?php echo $_SESSION['username']; ?></div></div>
          <div>Email: <div class="infocontent" ><?php echo $_SESSION['email']; ?></div></div>
        </div>

        <p class="infocaption">Change Password</p>
        <div class="infobox" id="accountpasswordreset">
          <form method="" id="passwordresetform">
            <ul>
              <li><label for="password">New Password: </label><input type="password" id="password" name="password" required></li>
              <li><label for="repeatpassword">Repeat: </label><input type="password" id="repeatpassword" name="repeatpassword" required></li>
              <li><input type="submit" id="changepassword" value="Change Password"></li>
            </ul>
          </form>
        </div>
      </div>

      <div class="right" id="homeright">

        <p class="infocaption">Current Weapon</p>
        <div id="knightweapon" class="infobox">
          <canvas id="weaponCanvas" width="64" height="64"></canvas>
          <div>Weapon Name: <div class="infocontent" id="weaponName"></div></div>
          <div>Attack: <div class="infocontent" id="weaponAttack"></div></div>
          <div>Defense: <div class="infocontent" id="weaponDefense"></div></div>
          <div>Magic: <div class="infocontent" id="weaponMagic"></div></div>
          <div><button id="changeWeapon">Change Equipped Weapon</button></div>
        </div>

        <p class="infocaption">Messages</p>
        <div id="knightmessages" class="infobox">
          <div>Messages: <div class="infocontent" id="messageContent">No Unread Messages</div></div>
        </div>

      </div>
    </div>
    <div id="push"></div>
  </div>
  <?php include("modules/copyright.html"); ?>
  <?php include('modules/changeInventory.html'); ?>
</body>
</html>