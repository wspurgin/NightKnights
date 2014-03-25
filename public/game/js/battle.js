
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
    console.log(this.name + " took " + damage + " damage and has " + this.energy + " left.");
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
    endCombat(false);
  }
  
  this.animateHP = function () {
    createjs.Tween.get(hpBar, {loop: false}).to({scaleX:(this.energy/this.maxEnergy)}, 1000);
  }
}

function Nightmare(name, level, energy, attackStat, defenceStat, spriteName)
{
  this.sprite;
  
  this.isDead = false;
  this.name = name;
  this.level = level;
  this.energy = energy;
  this.maxEnergy = energy;
  
  this.attackDice = new dice(2, 3, attackStat);
  this.defenceDice = new dice(1, 4, defenceStat);
  
  this.initSprite = function (spriteName) {
    nightmare.sprite = new createjs.Bitmap(preload.getResult(spriteName));
    nightmare.sprite.x = bgCanvas.width / 2;
    nightmare.sprite.y = bgCanvas.height / 2;
    //Tell the sprite to calculate its canvas position from the center of the sprite.
    nightmare.sprite.regX = nightmare.sprite.getBounds().width / 2;
    nightmare.sprite.regY = nightmare.sprite.getBounds().height / 2;
    //Idle animation. This is what makes the nightmare bob up and down.
    createjs.Tween.get(nightmare.sprite, {loop:true}).to({y:160}, 1000).to({y:170}, 1000).to({y:180}, 1000).to({y:170}, 1000);
  }
  
  this.die = function () {
    console.log("You have slain the " + this.name + "!");
    this.isDead = true;
    endCombat(true);
  }
  
  this.animateHP = function () {
    createjs.Tween.get(hpBarSmall, {loop: false}).to({scaleX:(this.energy/this.maxEnergy)}, 1000).call(function() {
      if(nightmare.isDead)
        createjs.Tween.get(nightmare.sprite).to({scaleX:0, scaleY:0}, 750);
      else
        nightmare.attack(player);
    });
  }
}

Player.prototype = new Combatant();
Nightmare.prototype = new Combatant();

function startTurn(attackType)
{
  player.attack(nightmare);
}

function endCombat(playerWon)
{
  if (playerWon){
    
  }
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