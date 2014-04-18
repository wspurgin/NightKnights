$(document).ready(function() {

    // attach user specific info
    var character = getPlayerData();
    $("#Energy").append(character.energy);
    $("#Level").append(character.level);
    $("#Experience").append(character.experience);

    // attach weapon specific info
    var inventory = getCharacterInventory();
    // actually attach data, handle empty info :)

});

function getCharacterInventory() {
    $.ajax({
        url: '/api/character/inventory',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',

        error: function(res) {
            data = res.responseJSON
            if (data.success == false) {
                alert(data.message)
            } else {
                // If the error was for some other reason, than what
                // could be caught, log data, and alert errors. Don't reset
                console.log(data)
                alert("Errors occured during your request. Please try again.");
            };
        },

        success: function(data) {
            if (data.success) {
                return data.inventory;
            } else {
                // credintials were bad, reset the form:
                form[0].reset();
                alert(data.message);
            };
        }

    }); //end of AJAX call  
}