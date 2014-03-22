
function Combatant()
{
  this.sprite;
  this.health;
  this.attackStat;
  this.defenseStat;
  this.magicStat;
  this.level;
  this.attack = function (combatant) {
    
  }
}


function dice()
{
  this.init = function (numberOfDice, numberOfSides, bonusModifier) {
    this.sides = numberOfSides;
    this.quantity = numberOfDice;
    this.modifier = bonusModifier;
    if (this.modifier === undefined){
      this.modifier = 0;
    }
  };
  
  this.roll = function ()
  {
    var sum = 0;
    for (var i = 0; i < this.quantity; i++){
    sum += Math.floor((Math.random() * this.sides) + this.modifier + 1); //+1 to get in the standard range
    }
    return sum;
  }
  
}