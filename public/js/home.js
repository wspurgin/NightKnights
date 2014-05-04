function setSessionInfo() {

    // attach user specific info
    var character = getPlayerData();
    $("#Energy").append(character.energy);
    $("#Level").append(character.level);
    $("#Experience").append(character.experience);
    $("#xpToNextLevel").append((25 * Number(character.level) * (1 + Number(character.level))) - Number(character.experience));

    // attach weapon specific info
    inventory = getCharacterInventory();
    // console.log(inventory);
    if (!isEmpty(inventory)) {
        var container = $("#knightinventory");
        for (item in inventory) {
            item = inventory[item];
            if (item.is_equipped == true) {
                setWeapon(item, $("#knightweapon"));
                continue;
            };
            container.append('<div class="infobox" id=item_' + item.id + ' ></div>');
            var well = $("#item_" + item.id);
            for (prop in item) {
                if (prop != "id" && prop != "img_url") {
                    var html = "<div data-for=" + prop + ">" + prop + ": " + item[prop] + "</div>"
                    well.append(html);
                };
            };
        };
    }
    var container = $("#modalInventory");
    if (container.data("built") !== true) {
        for (var i in inventory) {
            var item = inventory[i];
            var html = '<div class="infobox" data-itemid="' + item.id + '"><div>Name: <div class="infocontent">' + item.name + '</div></div>';
            html += '<div>Attack: <div class="infocontent">' + item.attack_stat + '</div></div>';
            html += '<div>Defense: <div class="infocontent">' + item.defense_stat + '</div></div>';
            html += '<div>Skill: <div class="infocontent">' + item.magic_stat + '</div></div>';
            html += '<div><input type="button" id="change_item_' + item.id + '" value="I Choose You!"/></div>'
            container.append(html);
            var selector = '#change_item_' + item.id
            container.on('click', selector, changeButtonModal);
        };
        container.data("built", true);
    };

    var messages = getMessages();
    if (messages.length > 0) { // user has messages
        var container = $("#knightmessages");
        container.empty(); // empty container of default value.
        for (var i = 0; i < messages.length; i++) {
            var message = messages[i];
            var selector = 'mark_as_read_' + String(i);
            var html = '<div class="infobox" data-date_created="' + message.date_created + '">';
            html += '<div><input type="button" id="' + selector + '" value="Mark As Read"/></div>'
            html += '<div>Message: ' + message.message + '</div></div>';
            container.append(html);
            container.on('click', '#' + selector, markAsRead);
        };
    }
}

function getMessages() {
    var messages = [];

    $.ajax({
        url: '/api/messages',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        async: false,

        error: function(res) {
            if (res.responseJSON !== undefined) {
                console.log(res.responseJSON.message);
            } else {
                //If no response. log response for now.
                console.log(res);
            }
        },

        success: function(data) {
            if (data.success) {
                messages = data.messages;
            }
        }
    });
    return messages;
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

// if container has no children or all are children are hidden, append the html
function checkContainer(container, htmlToAppend) {
    htmlToAppend = (typeof htmlToAppend === "undefined") ? "" : htmlToAppend;

    var all_children_hidden = true
    container.children().each(function() {
        if ($(this).css('display') != 'none') {
            all_children_hidden = false;
        }
    });
    if (container.children().length === 0 || all_children_hidden) {
        container.append(htmlToAppend);
    }
}

function markAsRead(event) {
    var message = {};
    var parent = $(this).parent().parent(); // gets parent div of input div
    message.date_created = parent.data("date_created");
    var res = markMessagesRead([message]); // send individual message as array.
    if (res === true) {
        parent.hide();
        checkContainer(parent.parent(), '<div><span>No Unread Messages</span></div>');
    }
}

function markMessagesRead(messages) {
    var response = false;
    $.ajax({
        url: '/api/messages',
        type: 'PUT',
        dataType: 'json',
        data: JSON.stringify(messages),
        contentType: 'application/json; charset=utf-8',
        async: false,

        error: function(res) {
            data = res.responseJSON
            if (data.success === false) {
                alert(data.message)
            } else {
                // If the error was for some other reason, than what
                // could be caught, log data, and alert errors. Don't reset.
                console.log(data)
                alert("Errors occured during your request. Please try again.");
            };
        },

        success: function(data) {
            if (data.success) {
                response = true;
            } else {
                alert(data.message);
            };
        }

    });
    return response;
}

function isEmpty(obj) {
    for (pro in obj) {
        return false
    }
    return true
}

$(document).ready(function() {

    //I cannot believe this was the simplest way to do this. buttons hate me.
    $('#changeWeapon').click(function() {
        window.location.hash = 'change';
    });

});