<!DOCTYPE HTML>
<html lang="en">
<head>
  <title>Night Knights - Login</title>
  
  <link rel="stylesheet" type="text/css" href="../css/login.css">
  <?php include("modules/commonHead.html"); ?>
</head>

<body>
  <header>
    <h1>NIGHT KNIGHTS</h1>
  </header>

  <div class="center" id="logindiv">
    <p class="infocaption">Returning Knights</p>
    <div id="returning" class="infobox">
      <?php include("modules/login.html"); ?>
    </div>
  </div>

  <div class="center" id="accountdiv">
    <p class="infocaption">New Recruits</p>
    <div id="newbies" class="infobox">
      <?php include("modules/createAccount.html"); ?>
    </div>
  </div>

  <div class="center" id="storydiv">
    <p class="infocaption">STORY</p>
    <div id="blurb" class="infobox words">
      <p>STORY GOES HERE!</p>
    </div>
  </div>

  <?php include("modules/copyright.html"); ?>

</body>
</html>