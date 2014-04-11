 
/* apiLogic.js
 * author: Justin
 * 
 */


/*This function posts the data from the battle to the server, and then
 * returns to the caller whether or not the player has leveled up.
 */
function saveBattleResults(results)
{
    console.log("SAVING BATTLE RESULTS...");
    console.log("val:" + results);
    var expObj = {};
    //expObj.experience = results.experience;
    expObj.experience = results;
    data = JSON.stringify(expObj);

    $.ajax({
            url: '/api/character/experience',
            type: 'PUT',
            data: data,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',

            error: function(res) {
                data = res.responseJSON
                if (data.success == false) {
                    // errors occuerd
                    form[0].reset();
                    console.log(res)
                    alert(data.message)
                } else {
                    // If the error was for some other reason, than what
                    // could be caught, log data, and alert errors. Don't reset
                    console.log(res)
                    alert("Errors occured during your request. Please try again.");
                };
                console.log(res);
            },

            success: function(data) {
                if (data.success) {
                    console.log("Player experience placed and level calculated");
                    console.log("data:" + data.level);
                    console.log(data.message);
                } else {
                    // errors occured
                    alert(data.message);
                    console.log(data);
                };
                console.log(data);
            }

        }); //end of AJAX call

    //player.experience += experience; //This property won't be used eventually. I'll remove it once we implement the real function call.
    player.experience += results; //This property won't be used eventually. I'll remove it once we implement the real function call.
    return player.level + 1; //New level to level up to. Hard coded for the time being.
}
