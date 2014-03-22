<!DOCTYPE HTML>
<html lang="en">
<head>
  <title>Night Knights - Login</title>
  
  <?php include("modules/commonHead.html"); ?>
</head>

<body>

  <header>
    <h1>NIGHT KNIGHTS</h1>
  </header>

  <p class="infocaption">Returning Nights</p>
  <div id="returning" class="infobox center">
    <?php include("modules/login.html"); ?>
  </div>

  <p class="infocaption">New Recruits</p>
  <div id="newbies" class="infobox center">
    <?php include("modules/createAccount.html"); ?>
  </div>

  <p class="infocaption">STORY</p>
  <div id="blurb" class="infobox words center">
    <p>STORY GOES HERE!</p>
  </div>

  <?php include("modules/copyright.html"); ?>

</body>
</html>