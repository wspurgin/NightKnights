function setSessionInfo() {

    // attach user specific info
    var character = getPlayerData();
    $("#Energy").append(character.energy);
    $("#Level").append(character.level);
    $("#Experience").append(character.experience);
    $("#xpToNextLevel").append((25 * character.level * (1 + character.level)) - character.experience);

    // attach weapon specific info
    inventory = getCharacterInventory();
    console.log(inventory);
    if (!isEmpty(inventory)) {
        var container = $("#knightinventory");
        for (item in inventory) {
            item = inventory[item];
            container.append('<div class="infobox" id=item_' + item.id + ' ></div>');
            var well = $("#item_" + item.id);
            for (prop in item) {
                if (prop != "id" && prop != "img_url") {
                    var html = "<div data-for=" + prop + ">" + prop + ": " + item[prop] + "</div>"
                    well.append(html);
                };
            };
            if (item.is_equipped == true) {
                setWeapon(item, $("#knightweapon"));
            }
        };
    }
    var container = $("#modalInventory");
    if (container.data("built") !== true) {
        for (var i in inventory) {
            var item = inventory[i];
            var html = '<div class="infobox" data-itemid="' + item.id + '"><div>Name: ' + item.name + '</div>';
            html += '<div>Attack: ' + item.attack_stat + '</div>';
            html += '<div>Defense: ' + item.defense_stat + '</div>';
            html += '<div>Magic: ' + item.magic_stat + '</div>';
            html += '<div><input type="button" id="change_item_' + item.id + '" value="I Choose You!"/></div>'
            container.append(html);
            var selector = '#change_item_' + item.id
            container.on('click', selector, changeButtonModal);
        };
        container.data("built", true);
    };
}

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

function changeButtonModal(event) {
    var item = {};
    item.item_id = $(this).parent().parent().data("itemid");
    var data = JSON.stringify(item);
    $.ajax({
        url: '/api/character/inventory',
        type: 'PUT',
        dataType: 'json',
        data: data,
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
                window.location.hash = "close";
                for (var i in inventory) {
                    if (item.item_id == inventory[i].id) {
                        changeWeapon(inventory[i], $("#knightweapon"));
                        break;
                    }
                }
            } else {
                alert(data.message);
            };
        }

    }); //end of AJAX call
}

function isEmpty(obj) {
    for (pro in obj) {
        return false
    }
    return true
}