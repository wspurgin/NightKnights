<?php require_once(__DIR__.'/../lib/session.php'); 
if(_session('user_id', false))
  header("Location: /home.php");
?>
<!DOCTYPE HTML>
<html lang="en">
<head>
  <title>Night Knights - Login</title>
  
  <?php include("modules/commonHead.html"); ?>

  <link rel="stylesheet" type="text/css" href="/css/login.css">
  <script type="text/javascript" src="/js/login.js" ></script>
</head>

<body>
  <div id="wrapper">
    <p class="heading">NIGHT KNIGHTS</p>
  <div class="twocol">
      <div class="left" id="logindiv">
        <p class="infocaption">Returning Knights</p>
        <div id="returning" class="infobox">
          <?php include("modules/login.html"); ?>
        </div>
      </div>
    
      <div class="right" id="accountdiv">
        <p class="infocaption">New Recruits</p>
        <div id="newbies" class="infobox">
          <?php include("modules/createAccount.html"); ?>
        </div>
      </div>
    </div>

    <div class="center" id="storydiv">
      <p class="infocaption">STORY</p>
      <div id="blurb" class="infobox words">
        <p>STORY GOES HERE!</p>
      </div>
    </div>
    <div id="push"></div>
  </div>
  <?php include("modules/copyright.html"); ?>

</body>
</html>