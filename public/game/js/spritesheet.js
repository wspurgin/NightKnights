
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
        "highlighted": [1, 3, "highlighted"]
      },
        "images": [preload.getResult("stageSelectSprites")],
        "frames": {width:50, height:50, count:4}
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
}