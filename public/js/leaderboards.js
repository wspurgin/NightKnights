$(document).ready(function() {

    getLocalLeaderboard(); //first, setup global leaderboard object (synchronous)
    var rank = getRankByID(getMe().id); //next, get player's rank
    populateLeaderboardTable('topten', 1, 10); //then, render top ten
    populateLeaderboardTable('myrank', rank - 4, 10); //last, render personal leaderboard

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
    }); //end of AJAX call
} //end of getLocalLeaderboard()

/*
 * grabs the currently logged-in user's character object
 */
function getMe() {
    var player;

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
            if (data !== null) {
                player = data.character;
            } else {
                console.log(data);
                alert('cry evertim');
            }
        }
    });
    return player;
} //end of getMe()

/*
 * uses the global leaderboard object and the id of a user to return
 * the numeric rank of that user
 */
function getRankByID(id) {
    var lb = window.leaderboard;
    var len = lb.length;

    for (var i = 0; i < len; i++) {
        if (lb[i].id === id)
            return i + 1; //rank 1 = index 0, rank 5 = index 4, etc.
    }
    return -1; //error
} //end of getRankByID()

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
    if (window.leaderboard === null) {
        console.log('populateLeaderboardTable(): no leaderboard object found');
        return;
    }

    //validate count input
    if (count < 1) {
        console.log('populateLeaderboardTable(): WARNING: count was invalid; set to 10 by default.');
        count = 10;
    }

    //validate start input
    if (start < 1) {
        console.log('populateLeaderboardTable(): WARNING: start was invalid; set to 1 by default.');
        start = 1;
    }

    //get handle to and validate table to insert into
    var table = document.getElementById(tableID);
    if (table === null) {
        console.log('populateLeaderboardTable(): ERROR: table not found');
        return;
    }

    //super awesome loop control structure for great justice
    var firstIndex = start - 1; //loop from this index
    var finalIndex = start + count - 2; //to this index
    if ((window.leaderboard.length - 1) < finalIndex) {
        finalIndex = (window.leaderboard.length - 1);
    }
    for (var i = firstIndex; i <= finalIndex; i++) {
        //get the new row's data in easy-to-use vars
        var rank = i + 1;
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