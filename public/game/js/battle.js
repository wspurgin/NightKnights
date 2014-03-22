
/* battle.js
 * Author: Anthony Cloudy
 * Handles all of the game logic and classes associated with combat.
 */

var player;
var nightmare;

function Combatant()
{
  //[Properties]
  this.energy; //Essentially HP
  this.level;
  this.name;
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
      this.energy = 0;
      this.die();
    }
    console.log(this.name + "took " + damage + " damage and has " + this.energy + " left.");
    this.animateHP();
  }
}

function Player(name, level, energy)
{
  //this.weapon;
  this.name = name;
  this.level = level;
  this.energy = energy;
  this.maxEnergy = energy;
  
  //Hardcoded until I implement weapons.
  this.attackDice = new dice(2,6);
  this.defenceDice = new dice(1,4);
  
    
  this.die = function () {
    console.log("The nightmare sucks the last of your energy, and you pass out.");
  }
  
  this.animateHP = function () {
    createjs.Tween.get(hpBar, {loop: false}).to({scaleX:(this.energy/this.maxEnergy)}, 1000);
  }
}

function Nightmare(name, level, energy, attackStat, defenceStat)
{
  this.sprite;
  
  this.name = name;
  this.level = level;
  this.energy = energy;
  this.maxEnergy = energy;
  
  this.attackDice = new dice(2, 6, attackStat);
  this.defenceDice = new dice(1, 4, defenceStat);
  
  this.die = function () {
    console.log("You have slain the " + this.name + "!");
  }
  
  this.animateHP = function () {
    //createjs.Tween.get(hpBar, {loop: false}).to({scaleX:(energy/maxEnergy)}, 1000);
  }
}

Player.prototype = new Combatant();
Nightmare.prototype = new Combatant();

function startTurn(attackType)
{
  player.attack(nightmare);
  nightmare.attack(player);
}

/*An object to simulate rolling "Dungeons & Dragons" style dice. 
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