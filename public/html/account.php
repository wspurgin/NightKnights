<?php require_once('validate.php'); ?>
<!doctype html>
<html lang="en">
<head>
  <title>Night Knights - Account Management</title>

  <?php include("modules/commonHead.html"); ?>
</head>
<body>

  <?php include("modules/navbar.html"); ?>

  <div class="spacer"></div>

  <div class="twocol" id="accountwrapper">
    <div class="left" id="accountleft">

      <p class="infocaption">My Night Knights Account</p>
      <div class="infobox" id="accountstats">
        <p>Username: Marf</p>
        <p>Email: bark@marf.com</p>
      </div>

    </div>

    <div class="right" id="accountright">

      <p class="infocaption">Change Password</p>
      <div class="infobox" id="accountpasswordreset">
        <form method="POST" id="passwordresetform">
          <ul>
            <li><label for="oldpassword">Old Password: </label><input type="text" id="oldpassword"></li>
            <li><label for="newpassword">New Password: </label><input type="text" id="newpassword"></li>
            <li><label for="repeatpassword">Repeat New Password: </label><input type="text" id="repeatpassword"></li>
            <li><input type="submit" id="changepassword" method="POST" value="Change Password"></li>
          </ul>
        </form>
      </div>
    </div>
  </div>

  <div class="spacer"></div>

  <?php include("modules/copyright.html"); ?>

</body>
</html>