$(document).ready(function() {

  getLocalLeaderboard();  //first setup global leaderboard object (synchronous)
  populateLeaderboardTable('topten', 1, 10); //next render top ten

  //then get player's rank
  var id = getMyID();
  var rank = $.inArray(id, leaderboard);
  console.log(rank);

  //last render personal leaderboard (bounds-based error handling happens inside the call)

}); //end of $(document).ready()

/*
* populates the global leaderboard object from the API
*/
function getLocalLeaderboard() {
  $.ajax({
    async: false,
    url: '/api/leaderboard',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',

    error: function(res) {
      data = res.responseJSON;
      if (data.success == false) {
        alert(data.message);
      } else {
        console.log(data);
        alert('start crying...');
      };
    },

    success: function(data) {
      if (data.success) {
        window.leaderboard = data.leaderboard;
      } else {
        console.log(data);
        alert('cry evertim');
      };
    }
  });  //end of AJAX call
} //end of getLocalLeaderboard()

/*
* grabs the currently logged-in user's numerical ID.
*/
function getMyID() {
  var id;

  $.ajax({
    async: false,
    url: '/api/character',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',

    error: function(res) {
      data = res.responseJSON;
      if (data.success == false) {
        alert(data.message);
      } else {
        console.log(data);
        alert('start crying...');
      };
    },

    success: function(data) {
      if(data !== null) {
        id = data.id;
      } else {
        console.log(data);
        alert('cry evertim');
      }
    }
  });
  return id;
  console.log('getMyId() end');
} //end of getMyRank()

/*
* populates the <table> with id=#tableID from the global leaderboard object.
* will render count rows starting from row start.
* 
* tableID = string (eg, "#topten")
* start = integer, minimum 1 (this is a ranking, NOT an array index!)
* count = integer, minimum 1
*/
function populateLeaderboardTable(tableID, start, count) {
  //ensure we even have a leaderboard
  if(window.leaderboard === null) {
    console.log('populateLeaderboardTable(): no leaderboard object found');
    return;
  }

  //validate count input
  if(count < 1) {
    console.log('populateLeaderboardTable(): WARNING: count was invalid; set to 10 by default.');
    count = 10;
  }

  //validate start input
  if(start < 1) {
    console.log('populateLeaderboardTable(): WARNING: start was invalid; set to 1 by default.');
    start = 1;
  }

  //get handle to and validate table to insert into
  var table = document.getElementById(tableID);
  if(table === null) {
    console.log('populateLeaderboardTable(): ERROR: table not found');
    return;
  }

  //super awesome loop control structure for great justice
  var firstIndex = start-1;           //loop from this index
  var finalIndex = start + count - 2; //to this index
  if((window.leaderboard.length - 1) < finalIndex) {
    finalIndex = (window.leaderboard.length - 1);
  }
  for(var i=firstIndex; i<=finalIndex; i++) {
    //get the new row's data in easy-to-use vars
    var rank = i+1;
    var name = window.leaderboard[i].name;
    var level = window.leaderboard[i].level;
    var experience = window.leaderboard[i].experience;
    $(table)
      .append($('<tr>')
        .append($('<td> ')
          .append(rank)
        )
        .append($('<td> ')
          .append(name)
        )
        .append($('<td> ')
          .append(level)
        )
        .append($('<td> ')
          .append(experience)
        )
      );
  }
} //end of populateLeaderboardTable()