
/* battle.js
 * Author: Anthony Cloudy
 * Handles all of the game logic and classes associated with combat.
 */

var player;
var nightmare;

function Combatant()
{
  //[Properties]
  this.isAlive = true;
  this.energy; //Essentially HP
  this.level;
  this.attackDice;
  this.defenceDice;
  
  //[Functions]
  this.attack = function (victim) {
    var netDamage = this.attackDice.roll() - victim.defenceDice.roll();
    if (netDamage < 0)
      netDamage = 0;
    if (netDamage)
      victim.hurt(netDamage);
  }
  
  this.hurt = function (damage) {
    this.energy -= damage;
    if (this.energy <= 0) {
      this.isAlive = false;
    }
  }
}

function Player()
{
  //this.weapon;
  this.energy = 10;
  this.attackDice = new dice(2,6);
  this.defenceDice = new dice(1,4);
}

function Nightmare()
{
  this.sprite;
  this.energy = 10;
  this.attackDice = new dice(2,6);
  this.defenceDice = new dice(1,4);
}

Player.prototype = new Combatant();
Nightmare.prototype = new Combatant();

/*A function to simulate rolling "Dungeons & Dragons" style dice. 
 * This lets us build more a normalized random function through the use of multiple rolls
 */
function dice(numberOfDice, numberOfSides, bonusModifier)
{
  this.sides = numberOfSides;
  this.quantity = numberOfDice;
  this.modifier = bonusModifier;
  if (this.modifier === undefined){
    this.modifier = 0;
  }
  
  this.roll = function ()
  {
    var sum = 0;
    for (var i = 0; i < this.quantity; i++){
    sum += Math.floor((Math.random() * this.sides) + this.modifier + 1); //+1 to get in the standard range
    }
    return sum;
  }
  
}