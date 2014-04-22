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

  <?php include("modules/navbar.html"); ?>
  <div class="spacer"></div>


  <div class="twocol" id="leaderwrapper">

    <div class="left">
      <p class="infocaption">Top Ten Knights</p>
        <table id="topten" class="infotable">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Name</th>
                  <th scope="col">Level</th>
                  <th scope="col">Experience</th>
                </tr>
              </thead>
              <tbody>
                <tr id="blankrow"><!--Test--></tr>
              </tbody>
            </table>
    </div>

    <div class="right">
      <p class="infocaption">My Ranking</p>
      <table id="myrank" class="infotable">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Name</th>
                  <th scope="col">Level</th>
                  <th scope="col">Experience</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Marf</td>
                  <td>Marf</td>
                  <td>Marf</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Marf</td>
                  <td>Marf</td>
                  <td>Marf</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Marf</td>
                  <td>Marf</td>
                  <td>Marf</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Marf</td>
                  <td>Marf</td>
                  <td>Marf</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Marf</td>
                  <td>Marf</td>
                  <td>Marf</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Marf</td>
                  <td>Marf</td>
                  <td>Marf</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Marf</td>
                  <td>Marf</td>
                  <td>Marf</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Marf</td>
                  <td>Marf</td>
                  <td>Marf</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Marf</td>
                  <td>Marf</td>
                  <td>Marf</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Marf</td>
                  <td>Marf</td>
                  <td>Marf</td>
                </tr>
              </tbody>
            </table>
    </div>

  </div>  <!--This is the end of div #leaderwrapper-->


  <div class="spacer"></div>
  <?php include("modules/copyright.html"); ?>

</body>
</html>