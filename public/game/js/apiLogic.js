 /* apiLogic.js
  * author: Justin
  * note: it's been fun, thanks guys!
  */

 var monsters = [];
 var items = [];

 /**
    initializes the monsters array
    also calls the getitems() method to create
    a global items array so other methods can
    access them.
*/
 function initializeMonsterArray() {
     areas = getAreas();
     var i = 0;
     while (areas[i]) {
         //console.log("Da Areas:", areas[i]);
         monsters.push(getAreaMonsters(i + 1));
         i++;
     }
     //console.log("Monsters:", monsters);

     items = getItems();
 }

 /**
    Send an area integer and funciton returns 
    a monster associated with that area
*/
 function getRandomMonster(area) {
     var roll = Math.floor(Math.random() * (monsters[area - 1].length));
     //console.log("roll:", roll);
     var chosen = monsters[area - 1][roll];
     //console.log("chosen monster:", chosen);
     return chosen;
 }

 /**
    returns a random item (not op ones)
*/
 function getRandomItem() {
     var roll = Math.floor(Math.random() * (items.length-2));
     console.log("roll:", roll);
     var chosen = items[roll+2];
     console.log("chosen item:", chosen);

     check = createItem(chosen.id);
     if (check == "weapon") {
         return chosen.img_url;
     } else {
         return "experience";
     }
 }

/**
    gets a specific user's character's inventory
*/
 function getCharacterInventory() {
     var inventory = {}
     $.ajax({
         url: '/api/character/inventory',
         type: 'GET',
         dataType: 'json',
         contentType: 'application/json; charset=utf-8',
         async: false,

         error: function(res) {
             data = res.responseJSON
             if (data.success == false) {
                 alert(data.message)
             } else {
                 // If the error was for some other reason, than what
                 // could be caught, log data, and alert errors. Don't reset
                 console.log(data)
                 alert("Errors occured during your request. Please try again.");
             };
         },

         success: function(data) {
             if (data.success) {
                 inventory = data.inventory;
             } else {
                 alert(data.message);
             };
         }

     }); //end of AJAX call
     return inventory;
 }

 /**
  * This function posts the data from the battle to the server, and then
  * returns to the caller whether or not the player has leveled up.
  * Runs TWO ajax calls.
  */
 function saveBattleResults(experience, energy) {
     console.log("SAVING BATTLE RESULTS...");

     var expObj = {};
     //expObj.experience = results.experience;
     expObj.experience = experience;
     data = JSON.stringify(expObj);

     $.ajax({
         url: '/api/character/experience',
         type: 'PUT',
         data: data,
         dataType: 'json',
         contentType: 'application/json; charset=utf-8',

         error: function(res) {
             data = res.responseJSON
             if (data.success == false) {
                 // errors occuerd
                 form[0].reset();
                 console.log(res)
                 alert(data.message)
             } else {
                 // If the error was for some other reason, than what
                 // could be caught, log data, and alert errors. Don't reset
                 console.log(res)
                 alert("Errors occured during your request. Please try again.");
             };
             console.log(res);
         },

         success: function(data) {
             if (data.success) {
                 console.log("Player experience placed and level calculated");
                 //console.log("level:" + data.level);
                 //console.log("experience:" + data.experience);
                 console.log(data.message);

                 //successful api call
                 playerUpdate(data);

             } else {
                 // errors occured
                 alert(data.message);
                 console.log(data);
             };
             console.log(data);
         }

     }); //end of AJAX call

     var energyObj = {};
     energyObj.energy = energy;
     data = JSON.stringify(energyObj);

     $.ajax({
         url: '/api/character/energy',
         type: 'PUT',
         data: data,
         dataType: 'json',
         contentType: 'application/json; charset=utf-8',

         error: function(res) {
             data = res.responseJSON
             if (data.success == false) {
                 // errors occuerd
                 form[0].reset();
                 console.log(res)
                 alert(data.message)
             } else {
                 // If the error was for some other reason, than what
                 // could be caught, log data, and alert errors. Don't reset
                 console.log(res)
                 alert("Errors occured during your request. Please try again.");
             };
             console.log(res);
         },

         success: function(data) {
             if (data.success) {
                 console.log("Player energy placed");
                 //console.log("level:" + data.level);
                 //console.log("experience:" + data.experience);
                 console.log(data.message);

                 //successful api call
                 //playerUpdate(data);

             } else {
                 // errors occured
                 alert(data.message);
                 console.log(data);
             };
             console.log(data);
         }

     }); //end of AJAX call
 }

 /**
    Get's a user's character object
    important data being given are name, experience, energy, and level
    also gives id
 */
 
 function getPlayerData() {
     console.log("GETTING PLAYER DATA...");

     var character = {};

     $.ajax({
         url: '/api/character',
         type: 'GET',
         async: false,

         error: function(res) {
             data = res.responseJSON
             if (data.success == false) {
                 // errors occuerd
                 form[0].reset();
                 console.log(res)
                 alert(data.message)
             } else {
                 // If the error was for some other reason, than what
                 // could be caught, log data, and alert errors. Don't reset
                 console.log(res)
                 alert("Errors occured during your request. Please try again.");
             };
             console.log(res);
         },

         success: function(data) {
             if (data.success) {
                 console.log("Character found");
                 //console.log("Character:", data);

                 console.log(data.message);

                 //successful api call

                 character = data.character;

             } else {
                 // errors occured
                 alert(data.message);
                 console.log(data);
             };
             console.log(data);
         }

     }); //end of AJAX call
     return character;
 }

 /**
  *   function returns all areas in the database
  */
 function getAreas() {
     console.log("GETTING MONSTER INFO BY AREA...");

     var areas = {};

     $.ajax({
         url: '/api/areas',
         type: 'GET',
         async: false,

         error: function(res) {
             data = res.responseJSON
             if (data.success == false) {
                 // errors occuerd
                 form[0].reset();
                 console.log(res)
                 alert(data.message)
             } else {
                 // If the error was for some other reason, than what
                 // could be caught, log data, and alert errors. Don't reset
                 console.log(res)
                 alert("Errors occured during your request. Please try again.");
             };
             console.log(res);
         },

         success: function(data) {
             if (data.success) {
                 console.log("Areas found");
                 //console.log("Areas:", data);

                 //console.log(data.message);

                 //successful api call

                 areas = data.areas;

             } else {
                 // errors occured
                 alert(data.message);
                 console.log(data);
             };
             //console.log(data);
         }

     }); //end of AJAX call
     return areas; //save return for when creating area/monster data structure
 }

 /**
    given an iteger (area_id) returns all the monsters associated with that area
    returns all monster data too
 */
 function getAreaMonsters(area) {
     console.log("GETTING MONSTER INFO BY AREA...");
     //console.log("val:" + area);
     var areaObj = {};
     areaObj.id = area;
     //expObj.experience = results.experience;
     //expObj.experience = results;
     data = JSON.stringify(areaObj);

     var monsters = {};

     $.ajax({
         url: '/api/areas/' + area + '/monsters',
         type: 'GET',
         data: data,
         dataType: 'json',
         contentType: 'application/json; charset=utf-8',
         async: false,

         error: function(res) {
             data = res.responseJSON
             if (data.success == false) {
                 // errors occuerd
                 form[0].reset();
                 console.log(res)
                 alert(data.message)
             } else {
                 // If the error was for some other reason, than what
                 // could be caught, log data, and alert errors. Don't reset
                 console.log(res)
                 alert("Errors occured during your request. Please try again.");
             };
             console.log(res);
         },

         success: function(data) {
             if (data.success) {
                 console.log("Monsters found");
                 //console.log("monsters:" + data.monsters);
                 //console.log(data.message);

                 //successful api call
                 monsters = data.monsters;

             } else {
                 // errors occured
                 alert(data.message);
                 console.log(data);
             };
             //console.log(data);
         }

     }); //end of AJAX call
     return monsters;
 }

 /**
  *   funciton returns all items in the database
  */
 function getItems() {
     console.log("GETTING ITEMS...");

     var items = {};

     $.ajax({
         url: '/api/items',
         type: 'GET',
         async: false,

         error: function(res) {
             data = res.responseJSON
             if (data.success == false) {
                 // errors occuerd
                 console.log(res)
                 alert(data.message)
             } else {
                 // If the error was for some other reason, than what
                 // could be caught, log data, and alert errors. Don't reset
                 console.log(res)
                 alert("Errors occured during your request. Please try again.");
             };
             console.log(res);
         },

         success: function(data) {
             if (data.success) {
                 console.log("Items found");
                 //console.log("Items:", data.items);

                 //console.log(data.message);

                 //successful api call

                 items = data.items;

             } else {
                 // errors occured
                 alert(data.message);
                 console.log(data);
             };
             //console.log(data);
         }

     }); //end of AJAX call
     return items;
 }

 /**
  *   funciton creates a given item (id) in the users inventory
  */
 function createItem(id) {
     //check for the same item
     //if not, create new item
     //if same, turn into experience

     inventory = getCharacterInventory();
     console.log(inventory);

     for (var i = 0; i < inventory.length; i++) {
         if (inventory[i].id == id) {
             //item is already in inventory
             return "energy";
         }
     }

     console.log("Creating Item...");

     var addItem = {};
     addItem.item_id = id;
     //console.out(addItem);
     data = JSON.stringify(addItem);

     $.ajax({
         url: '/api/character/inventory',
         type: 'POST',
         data: data,
         dataType: 'json',
         contentType: 'application/json; charset=utf-8',
         async: false,

         error: function(res) {
             data = res.responseJSON
             if (data.success == false) {
                 // errors occuerd
                 console.log(res)
                 alert(data.message)
             } else {
                 // If the error was for some other reason, than what
                 // could be caught, log data, and alert errors. Don't reset
                 console.log(res)
                 alert("Errors occured during your request. Please try again.");
             };
             console.log(res);
         },

         success: function(data) {
             if (data.success) {
                 console.log("Created Item");
                 //console.log("Areas:", data);

                 //console.log(data.message);

                 //successful api call
                 console.log(data);

             } else {
                 // errors occured
                 alert(data.message);
                 console.log(data);
             };
             //console.log(data);
         }

     }); //end of AJAX call
     return "weapon";
 }

 /**
  *   funciton equips an item from the users inventory
  */
 function equipItem(id) {
     console.log("Equiping Item...");

     var equipItem = {};
     equipItem.item_id = id;
     //console.out(addItem);
     data = JSON.stringify(equipItem);

     $.ajax({
         url: '/api/character/inventory',
         type: 'PUT',
         data: data,
         dataType: 'json',
         contentType: 'application/json; charset=utf-8',
         async: false,

         error: function(res) {
             data = res.responseJSON
             if (data.success == false) {
                 // errors occuerd
                 console.log(res)
                 alert(data.message)
             } else {
                 // If the error was for some other reason, than what
                 // could be caught, log data, and alert errors. Don't reset
                 console.log(res)
                 alert("Errors occured during your request. Please try again.");
             };
             console.log(res);
         },

         success: function(data) {
             if (data.success) {
                 console.log("Equipted Item");
                 //console.log("Areas:", data);

                 //console.log(data.message);

                 //successful api call
                 console.log(data);

             } else {
                 // errors occured
                 alert(data.message);
                 console.log(data);
             };
             //console.log(data);
         }

     }); //end of AJAX call
 }

 /**
  *   funciton returns all bosses in the database
  */
 function getBosses() {
     console.log("GETTING BOSSES...");

     var bosses = {};

     $.ajax({
         url: '/api/bosses',
         type: 'GET',
         async: false,

         error: function(res) {
             data = res.responseJSON
             if (data.success == false) {
                 // errors occuerd
                 console.log(res)
                 alert(data.message)
             } else {
                 // If the error was for some other reason, than what
                 // could be caught, log data, and alert errors. Don't reset
                 console.log(res)
                 alert("Errors occured during your request. Please try again.");
             };
             console.log(res);
         },

         success: function(data) {
             if (data.success) {
                 console.log("Bosses found");
                 //console.log("Items:", data.items);

                 //console.log(data.message);

                 //successful api call

                 bosses = data;

             } else {
                 // errors occured
                 alert(data.message);
                 console.log(data);
             };
             //console.log(data);
         }

     }); //end of AJAX call
     return bosses;
 }

 /**
  *   function to save a boss fight
  *   requires a boss id and a damage done value
  *   damage done should be negative
  */
 function saveFight(id, damage) {
     console.log("SAVING BOSS FIGHT...");

     var bossData = {};
     bossData.boss_id = id;
     bossData.damage_done = damage;
     var data = JSON.stringify(bossData);
     //console.log(data);

     $.ajax({
         url: '/api/fights',
         type: 'PUT',
         data: data,
         dataType: 'json',
         contentType: 'application/json; charset=utf-8',
         async: false,

         error: function(res) {
             data = res.responseJSON
             if (data.success == false) {
                 // errors occuerd
                 console.log(res)
                 alert(data.message)
             } else {
                 // If the error was for some other reason, than what
                 // could be caught, log data, and alert errors. Don't reset
                 console.log(res)
                 alert("Errors occured during your request. Please try again.");
             };
             console.log(res);
         },

         success: function(data) {
             if (data.success) {
                 console.log("fight saved");

             } else {
                 // errors occured
                 alert(data.message);
                 console.log(data);
             };
             //console.log(data);
         }

     }); //end of AJAX call
 }