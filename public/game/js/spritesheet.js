
/* spritesheet.js
 * Author: Anthony Cloudy
 * Because most of the spritesheet declarations are really ugly, 
 * I decided to put them into their own file so that they wouldn't have to muck up the code.
 */ 
function initSpriteSheets () {
  
  stageSelectSheet = new createjs.SpriteSheet({
    "animations":
      {
        "default": [0],
        "highlighted": [1, 3, "highlighted"],
        "lockedDefault": [4],
        "lockedHighlighted": [5, 7, "lockedHighlighted"]
        
      },
        "images": [preload.getResult("stageSelectSprites")],
        "frames": {width:50, height:50, count:8}
  });
  
  nightmareSelectSheet = new createjs.SpriteSheet({
    "animations":
      {
        "default": [0],
        "highlighted": [1, 3, "highlighted"]
      },
        "images": [preload.getResult("monsterSelectSprites")],
        "frames": {width:50, height:50, count:4}
  });
 
  backgroundSheet = new createjs.SpriteSheet({
    "animations":
      {
        "plain": [0],
        "forest": [2]
      },
        "images": [preload.getResult("bgSprites")],
        "frames": {width:257, height:112}
  });
  
  treasureSheet = new createjs.SpriteSheet({
    "animations":
      {
        "closed": [0],
        "open": [1]
      },
        "images": [preload.getResult("treasureChest")],
        "frames": {width:150, height:150}
  });
  
  weaponsSheet = new createjs.SpriteSheet({
    "animations":
      {
        "sword0": [0],
        "sword1": [1],
        "sword2": [2],
        "sword3": [3],
        "sword4": [4],
        "sword5": [5],
        "sword6": [6],
        "sword7": [7],
        "sword8": [8],
        "sword9": [9],
        "sword10": [10],
        "sword11": [11],
        "sword12": [12],
        "sword13": [13],
        
        "dagger0": [0 + 14],
        "dagger1": [1 + 14],
        "dagger2": [2 + 14],
        "dagger3": [3 + 14],
        "dagger4": [4 + 14],
        "dagger5": [5 + 14],
        "dagger6": [6 + 14],
        "dagger7": [7 + 14],
        "dagger8": [8 + 14],
        "dagger9": [9 + 14],
        "dagger10": [10 + 14],
        "dagger11": [11 + 14],
        "dagger12": [12 + 14],
        "dagger13": [13 + 14],
        
        "spear0": [0 + 42],
        "spear1": [1 + 42],
        "spear2": [2 + 42],
        "spear3": [3 + 42],
        "spear4": [4 + 42],
        "spear5": [5 + 42],
        "spear6": [6 + 42],
        "spear7": [7 + 42],
        "spear8": [8 + 42],
        "spear9": [9 + 42],
        "spear10": [10 + 42],
        "spear11": [11 + 42],
        "spear12": [12 + 42],
        "spear13": [13 + 42],
      },
        "images": [preload.getResult("weaponsSprites")],
        "frames": {width:32, height:32}
  });
  
}