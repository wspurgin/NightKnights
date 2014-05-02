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
      <p class="infocaption">The Story So Far</p>
      <div id="blurb" class="infobox words">
        <p>Welcome to Hiberia, a sleepy little kingdom in a faraway land. Things seem idyllic here, but all is not well; terrible Nightmares have been terrorizing the land, wreaking havoc upon the Hiber Nation.</p>
        <br>
        <p>But all is not lost! The bravest and strongest Hiberions have banded together to form the Night Knights!</p>
        <br>
        <p>With their powerful skills and shining armaments, the Night Knights hope to push back against the rising tide of Nightmares, find out where they're coming from, and take them out for good.</p>
        <br>
        <p>However, the Knights must expend their Energy to perform skills and defend against the Nightmares, and only a good night's sleep can restore lost Energy.</p>
        <br>
        <p>Rest up, brave Knight: only by sleeping well can you defeat the Nightmares and reclaim Hiberia for the Hiberions!</p>
      </div>
    </div>
    <div id="push"></div>
  </div>
  <?php include("modules/copyright.html"); ?>

</body>
</html>