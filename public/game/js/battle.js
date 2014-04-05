
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
    if (netDamage <= 0)
    {
      console.log(victim.name + " dodged " + this.name + "'s attack!");
      victim.animateHP();
    }
    else 
      victim.hurt(netDamage);
  }
  
  this.hurt = function (damage) {
    this.energy -= damage;
    if (this.energy <= 0) {
      this.energy = 0;
      this.die();
    }
    console.log(this.name + " took " + damage + " damage and has " + this.energy + " left.");
    this.animateHP(damage);
  }
}

function Player(name, level, energy)
{
  //this.weapon;
  this.isDead = false;
  this.name = name;
  this.level = level;
  this.energy = energy;
  this.maxEnergy = energy;
  
  //Hardcoded until I implement weapons.
  this.attackDice = new dice(2,15,3);
  this.defenceDice = new dice(1,4,5);
  
    
  this.die = function () {
    console.log("The nightmare sucks the last of your energy, and you pass out.");
    this.isDead = true;
  }
  
  this.animateHP = function () {
    createjs.Tween.get(hpBar).to({scaleX:(this.energy/this.maxEnergy)}, 1000).call(function() {
      if(player.isDead){
        createjs.Tween.get(fadeToBlack).to({alpha: 1}, 2000).call(endCombat, [false]);
      }
    });
  }
}

function Nightmare(name, energy, attackStat, defenceStat, spriteName)
{
  this.sprite;
  
  this.isDead = false;
  this.name = name;
  this.energy = energy;
  this.maxEnergy = energy;
  
  this.attackDice = new dice(2, 10, attackStat);
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
  }
  
  this.animateHP = function (damage) {
    nightmareDamageText.text = (-1 * damage);
    createjs.Tween.get(nightmareDamageText).to({alpha: 1, y: nightmareDamageText.y - 20}, 1000).call(function(){
    nightmareDamageText.y += 20;
    nightmareDamageText.alpha = 0;
    });
    createjs.Tween.get(hpBarSmall).to({scaleX:(this.energy/this.maxEnergy)}, 1000).call(function() {
      if(nightmare.isDead)
        createjs.Tween.get(nightmare.sprite).to({scaleX:0, scaleY:0}, 750).call(endCombat, [true]);
      else
        nightmare.attack(player);
    });
  }
}

Player.prototype = new Combatant();
Nightmare.prototype = new Combatant();

function startTurn(attackType)
{
  console.log("Player HP: " + player.energy + "/" + player.maxEnergy);
  console.log("Nightmare HP: " + nightmare.energy + "/" + nightmare.maxEnergy);
  player.attack(nightmare);
}


/*A function to control the logic of ending the battle.
 * We check to see who won, then take care of the results depending on who won.
 */
function endCombat(playerWon)
{
  if (playerWon){
    createjs.Tween.get(treasureChest).to({alpha: 1}, 750);
    player.maxEnergy = player.energy;
    if(saveBattleResults(getExpFromNightmare(nightmare))){
      levelUp();
    }
  }
  else {
    encounterCleanup();
    areaView.removeChildAt(2); //Remove the monsters from the area.
    switchTo(worldView);
    player.energy = 250;
    player.maxEnergy = 250;
    player.isDead = false;
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