 
/* apiLogic.js
 * author: Justin
 * 
 */


/*This function posts the data from the battle to the server, and then
 * returns to the caller whether or not the player has leveled up.
 */
function saveBattleResults(experience)
{
  player.experience += experience; //This property won't be used eventually. I'll remove it once we implement the real function call.
  return true; 
}
