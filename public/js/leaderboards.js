$(document).ready(function() {

  getLocalLeaderboard();  //first setup global leaderboard object
  populateLeaderboardTable('topten', 1, 10); //next render top ten

  //then get player's rank

  //last render personal leaderboard

}); //end of $(document).ready()

/*
* populates the global leaderboard object from the API
*/
function getLocalLeaderboard() {
  console.log('getLocalLeaderboard() start');
  $.ajax({
    async: false,
    url: '/api/leaderboard',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',

    error: function(res) {
      console.log('getLocalLeaderboard() error');
      data = res.responseJSON;
      if (data.success == false) {
        alert(data.message);
      } else {
        console.log(data);
        alert('start crying...');
      };
    },

    success: function(data) {
      console.log('getLocalLeaderboard() success');
      if (data.success) {
        window.leaderboard = data.leaderboard;
        console.log(window.leaderboard);
      } else {
        console.log(data);
        alert('cry everytim');
      };
    }
  });  //end of AJAX call
  console.log('getLocalLeaderboard() end');
} //end of getLocalLeaderboard()

/*
* populates the <table> with id=#tableID from the global leaderboard object.
* will render count rows starting from row start.
* 
* tableID = string (eg, "#topten")
* start = integer, minimum 1 (this is a ranking, NOT an array index!)
* count = integer, minimum 1
*/
function populateLeaderboardTable(tableID, start, count) {
  console.log('populateLeaderboardTable() start');

  //ensure we even have a leaderboard
  if(window.leaderboard === null) {
    console.log('populateLeaderboardTable(): no leaderboard object found');
    return;
  }

  //validate start and count inputs
  if(count < 1 | start < 1) {
    console.log('populateLeaderboardTable(): start or count was invalid');
    return;
  }

  //get handle to and validate table to insert into
  var table = document.getElementById(tableID);
  if(table === null) {
    console.log('populateLeaderboardTable(): table not found');
    return;
  }

  //super awesome loop control structure for great justice
  var firstIndex = start-1;           //loop from this index
  var finalIndex = start + count - 2; //to this index
  if((window.leaderboard.length - 1) < finalIndex) {
    finalIndex = (window.leaderboard.length - 1);
  }
  for(var i=firstIndex; i<=finalIndex; i++) {
    console.log(i);
    //build the new row

    //append to the table
  }

  console.log('populateLeaderboardTable() end');
} //end of populateLeaderboardTable()