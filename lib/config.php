<?
require_once('api.php');
require_once('routes.php');

$session_validator = array("user_id");
$api = new Api($session_validator);

/*
Example route
    $myroute = new Route([url], [route request method type (e.g. Route::GET)], [callable (i.e 'foo' for function foo]);
*/

// Initalizing routes for application
$ROUTES = array(
    new Route('/session', Route::GET, array($api, 'getSession')),
    new Route('/character', Route::GET, array($api, 'getCurrentCharacter')),
    new Route('/user', Route::PATCH, array($api, 'updateUserInfo')),
    new Route('/login', Route::POST, array($api, 'loginUser')),
    new Route('/logout', Route::GET, array($api, 'logoutUser')),
    new Route('/users', Route::POST, array($api, 'createUser')),
    new Route('/reset', Route::PATCH, array($api, 'userPasswordReset')),
    new Route('/fights', Route::GET, array($api, 'getAcitveUserFights')),
    new Route('/fights', Route::PUT, array($api, 'saveFight')),
    new Route('/areas/:id/monsters', Route::GET, array($api, 'getAreaMonsters')),
    new Route('/items', Route::GET, array($api, 'getItems')),
    new Route('/areas', Route::GET, array($api, 'getAreas')),
    new Route('/character/', Route::GET, array($api, 'getCharacter')),
    new Route('/character/inventory', Route::GET, array($api, 'getCharacterInventory')),
    new Route('/bosses', Route::GET, array($api, 'getBosses')),
    new Route('/character/inventory', Route::POST, array($api, 'createInventoryItem')),
    new Route('/character/inventory', Route::PUT, array($api, 'equipItem')),
    new Route('/character/experience', Route::PUT, array($api, 'updateCharacterExperience')),
    new Route('/character/energy', Route::PUT, array($api, 'updateCharacterEnergy')),
    new Route('/leaderboard', Route::GET, array($api, 'getLeaderboard')),
    new Route('/user/password', Route::PATCH, array($api, 'userChangePassword')),
    new Route('/messages', Route::GET, array($api, 'getUnreadMessages')),
    new Route('/messages', Route::PUT, array($api, 'markMessagesRead'))
);
