function main() {
    //Grab the canvas from the DOM. We draw on this instead of rendering to the DOM
    bgCanvas = document.getElementById("weaponCanvas");
    //Set the backgroundCanvas as where we're going to render things
    stage = new createjs.Stage(bgCanvas);

    //Declare all of the resources up front, and give each one a unique id so that we can call it later.
    //This is all done in the background, so none of the images or sounds are rendered yet.
    manifest = [{
        src: "../game/sprites/Weapons.png",
        id: "weaponsSprites"
    }];

    //This is the preloader, which lets us load the images beforehand and keeps track of all of the resources.
    preload = new createjs.LoadQueue();
    //Add event listeners for when events are fired during and after the loading process.
    preload.addEventListener("complete", doneLoading);
    preload.loadManifest(manifest);

    //Set the FPS of the game and link the stage to it.
    createjs.Ticker.setFPS(1);
    createjs.Ticker.addEventListener("tick", stage);
}

//What gets called when we're done loading.  
function doneLoading(event) {
    initSpritesheet();
    setWeapon("dagger0");
    stage.addChild(weapon);
    stage.update(); //Update the stage to show the text we just added.
}

function setWeapon(weaponName) {
    weapon = new createjs.Sprite(weaponsSheet, weaponName);
    weapon.setTransform(0, 0, 2, 2); //Set to top left corner of canvas, scale x and y by 2.
    weapon.framerate = 1;
}

function changeWeapon(weaponName) {
    weapon.gotoAndPlay(weaponName);
}

function initSpritesheet() {
    weaponsSheet = new createjs.SpriteSheet({
        "animations": {
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
        "frames": {
            width: 32,
            height: 32
        }
    });
}