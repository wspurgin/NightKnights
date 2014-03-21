<!DOCTYPE HTML>
<html>
<head>
  <title>Welcome to Hibera, Night Knights!</title>
  <meta charset="utf-8" \>

  <link rel="stylesheet" type="text/css" href="../css/master.css">
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

  <footer>
    <?php include("modules/copyright.html"); ?>
  </footer>

</body>
</html>