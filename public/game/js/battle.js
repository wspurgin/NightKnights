
/* battle.js
 * Author: Anthony Cloudy
 * Handles all of the game logic and classes associated with combat.
 */

var player;
var nightmare;
var inventory = [];
var menuLocked;
var defSkillCounter = 0;
var attSkillCounter = 0;
var uberSkillCounter = 0;

function Weapon(name, attack, defence, img_url)
{
  this.name = name;
  this.attack_stat = attack;
  this.defense_stat = defence;
  this.img_url = img_url;
  this.is_equipped = false;
}

function Combatant()
{
  //[Properties]
  this.weapon = new Weapon("None", 0, 0, "none");
  this.energy; //Essentially HP
  this.level;
  this.name;
  this.attackDice;
  this.defenceDice;
  this.textColor;
  this.attackMod = 1;
  this.defenceMod = 1;
  
  //[Functions]
  this.attack = function (victim) {
    var netDamage = parseInt((this.attackDice.roll() + this.weapon.attack_stat) * this.attackMod) - parseInt((victim.defenceDice.roll() + victim.weapon.defense_stat) * victim.defenceMod);
    if (netDamage <= 0)
    {
      log(victim.name + " blocked " + this.name + "'s attack!", "#FF6600");
      victim.animateHP(0);
    }
    else 
      victim.hurt(netDamage);
  }
  
  this.hurt = function (damage) {
    this.energy -= damage;
    if (this.energy <= 0) {
      this.energy = 0;
      createjs.Sound.play(this.dieSound);
      this.die();
    }
    if(!this.isDead)
      log(this.name + " took " + damage + " damage and has " + this.energy + " left.", this.textColor);
    createjs.Sound.play(this.hurtSound);
    this.animateHP(damage);
  }
}

function Player(name, level, energy, experience, weapon)
{
  if (weapon !== undefined)
    this.weapon = weapon;
  this.textColor = "#FF0000";
  this.isDead = false;
  this.name = name;
  this.level = level;
  this.experience = experience;
  this.energy = energy;
  this.maxEnergy = energy;
  
  this.hurtSound = "playerHit";
  this.dieSound = "playerDie";
  
  //Hardcoded until I implement weapons.
  this.attackDice = new dice(this.level, 10 , 0);
  this.defenceDice = new dice(this.level, 5, 0);
  
  this.levelUp = function() {
    this.attackDice = new dice(this.level, 10 , 0);
    this.defenceDice = new dice(this.level, 5, 0);
  }
  
  this.die = function () {
    menuStage.update();
    log("The nightmare sucks the last of your energy, and you pass out.", "#FF0000");
    this.isDead = true;
  }
  
  this.animateHP = function (damage) {
    playerhp.text = "x" + this.energy;
    if(player.isDead)
    {
      createjs.Tween.get(fadeToBlack).to({alpha: 1}, 2000).call(endCombat, [false]);
    }
    else
    {
      menuLocked = false;
      menuView.alpha = 1;
      menuStage.update();
    }
  }
}

function Nightmare(name, energy, attackStat, defenceStat, spriteName)
{
  this.sprite;
  
  this.textColor = "#0000FF";
  this.isDead = false;
  this.name = name;
  this.energy = energy;
  this.maxEnergy = energy;
  
  this.hurtSound = "enemyHit";
  this.dieSound = "enemyDie";
  
  this.attackDice = new dice(2, attackStat, 0);
  this.defenceDice = new dice(1, defenceStat, 0);
  
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
    log("You have slain the " + this.name + "!", "#00FF00");
    this.isDead = true;
  }
  
    
  this.hurtOff = function() {
    nightmare.sprite.filters = [new createjs.ColorFilter(1,1,1,1, 0,0,0,0)];
    nightmare.sprite.cache(0, 0, 300, 300);
  }
  
  this.hurtOn = function() {
    nightmare.sprite.filters = [new createjs.ColorFilter(1,1,1,1, 255,0,0,0)];
    nightmare.sprite.cache(0, 0, 300, 300);
  }
  
  this.animateHP = function (damage) {
    nightmareDamageText.text = (-1 * damage);
    createjs.Tween.get(nightmareDamageText).to({alpha: 1, y: nightmareDamageText.y - 20}, 1000).call(function(){
    nightmareDamageText.y += 20;
    nightmareDamageText.alpha = 0;
    });
    createjs.Tween.get(nightmare.sprite).call(this.hurtOn).wait(300).call(this.hurtOff).wait(300).call(this.hurtOn).wait(300).call(this.hurtOff);
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
  player.attackMod = 1;
  player.defenceMod = 1;
  menuLocked = true;
  menuView.alpha = .5;
  menuStage.update();
  if (attackType === "Light")
  {
    player.attackMod = 0.5;
    player.defenceMod = 2;
    player.attack(nightmare);
  }
  else if (attackType === "Medium")
  {
    player.attackMod = 1;
    player.defenceMod = 1;
    player.attack(nightmare);
  }
  else if (attackType === "Heavy")
  {
    player.attackMod = 2;
    player.defenceMod = 0.5;
    player.attack(nightmare);
  }
  else if (attackType === "defSkill")
  {
    defSkillCounter = 3;
    log(player.name + " focused on defence!", "#6E00C9");
    nightmare.attack(player);
  }
  else if (attackType === "attSkill")
  {
    attSkillCounter = 3;
    log(player.name + " became enraged!", "#E8E800");
    nightmare.attack(player);
  }
  else if (attackType === "uberSkill")
  {
    uberSkillCounter = 3;
    log(player.name + " broke all limits!", "#7FFF00");
    nightmare.attack(player);
  }
  if (defSkillCounter > 0)
  {
    defSkillCounter--;
    player.defenceMod *= 2;
  }
  if (attSkillCounter > 0)
  {
    attSkillCounter--;
    player.attackMod *= 2;
  }
  if (uberSkillCounter > 0)
  {
    uberSkillCounter--;
    player.attackMod *= 2;
    player.defenceMod *= 2;
  }
}


/*A function to control the logic of ending the battle.
 * We check to see who won, then take care of the results depending on who won.
 */
function endCombat(playerWon)
{
  menuLocked = true;
  menuView.alpha = .5;
  results = {};
  results.experience = getExpFromNightmare(nightmare);
  results.energy = player.energy - playerStartEnergy;
  saveBattleResults(results.experience, results.energy);
  if (inWorldBossEncounter)
  {
    saveFight(nightmare.id, nightmare.maxEnergy - nightmare.energy);
  }
  if (playerWon){
    menuStage.update();
    createjs.Tween.get(treasureChest).to({alpha: 1}, 750);
    player.maxEnergy = player.energy;
  }
  else {
    encounterCleanup();
    areaView.removeChildAt(2); //Remove the monsters from the area.
    menuStage.removeAllChildren();
    playMusic("");
    switchTo(gameOverView);
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
  
  this.min = function ()
  {
    return (this.quantity + this.modifier);
  }
  
  this.max = function ()
  {
    return ((this.quantity * this.sides) + this.modifier);
  }
}

/*This function calculates the experience a monster will give you
 * upon its defeat. 
 */
function getExpFromNightmare(nightmare)
{
  if (inWorldBossEncounter)
    return 0
  else
    return parseInt(nightmare.maxEnergy / 2);
}
  
function equip(weapon)
{
  inventory.forEach(function(element, index, array) {
    inventory[index].is_equipped = false;
  });
  console.log("Swapped for " + weapon.name);
  if (player.weapon !== undefined)
    player.weapon.is_equipped = false;
  player.weapon = weapon;
  weapon.is_equipped = true;
  equipItem(weapon.id);
}