<!DOCTYPE HTML>
<html lang="en">
<head>
  <title>Night Knights - Home</title>
  
  <link rel="stylesheet" type="text/css" href="../css/home.css">
  <?php include("modules/commonHead.html"); ?>
</head>

<body>

  <?php include("modules/navbar.html"); ?>
  <div class="spacer"></div>


  <div class="twocol" id="homewrapper">
    <div id="homeleft">

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
        <img src="../res/img_s/crazy_husky.jpg" alt="MARF" height="100" width="100">
        <p>Crazy Husky</p>
        <p>Attack: +3</p>
        <p>Defense: -1</p>
        <p>Magic: +1</p>
      </div>
    </div>

    <p class="infocaption">Current Worldbosses</p>
    <div class="infobox" id="worldbosses">
      
    </div>
  </div>


  <div class="spacer"></div>
  <?php include("modules/copyright.html"); ?>

</body>
</html>