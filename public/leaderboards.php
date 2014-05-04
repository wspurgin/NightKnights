<?php require_once('validate.php'); ?>
<!DOCTYPE HTML>
<html lang="en">
<head>
  <title>Night Knights - Leaderboards</title>

  <?php include("modules/commonHead.html"); ?>
  <link rel="stylesheet" type="text/css" href="/css/leaderboards.css">
  <script src="/js/leaderboards.js"></script>
</head>
<body>

  <div id="wrapper">
    <?php include("modules/navbar.html"); ?>

    <div class="twocol">

      <div class="left">
        <p class="infocaption">Top Ten Knights</p>
        <div class="infobox">
          <table id="topten" class="infotable">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Name</th>
                <th scope="col">Level</th>
                <th scope="col">Experience</th>
              </tr>
            </thead>
          </table></div>
        </div>

        <div class="right">
          <p class="infocaption">My Ranking</p>
          <div class="infobox">
            <table id="myrank" class="infotable">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Name</th>
                  <th scope="col">Level</th>
                  <th scope="col">Experience</th>
                </tr>
              </thead>
            </table></div>
          </div>

        </div>
        <div id="push"></div>
      </div>
      <?php include("modules/copyright.html"); ?>

    </body>
    </html>