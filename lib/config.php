<?
require_once('api.php');
require_once('routes.php');

$session_validator = "user_id";
$api = new Api($session_validator);

/*
Example route
	$myroute = new Route([url], [route request method type (e.g. Route::GET)], [callable (i.e 'foo' for function foo]);
*/

// Initalizing routes for application
$ROUTES = array(
	new Route('/user', Route::GET, array($api, 'getCurrentUser')),
	new Route('/login', Route::POST, array($api, 'loginUser')),
	new Route('/users', Route::POST, array($api, 'createUser')),
	new Route('/fights', Route::GET, array($api, 'getAcitveUserFights')),
	new Route('/fights', Route::POST, array($api, 'createFight')),
	new Route('/areas/:id/monsters', Route::GET, array($api, 'getAreaMonsters')),
	new Route('/items', Route::GET, array($api, 'getItems')),
	new Route('/areas', Route::GET, array($api, 'getAreas')),
	new Route('/characters/:id', Route::GET, array($api, 'getCharacter')),
	new Route('/characters/:id/inventory', Route::GET, array($api, 'getCharacterInventory')),
	new Route('/bosses', Route::GET, array($api, 'getBosses')),
	new Route('/characters/:id/inventory', Route::POST, array($api, 'createInventoryItem')),
	new Route('/characters/:id/experience', Route::PUT, array($api, 'updateCharacterExperience')),
	new Route('/characters/:id/energy', Route::PUT, array($api, 'updateCharacterEnergy')),
	new Route('/leaderboard', Route::GET, array($api, 'getLeaderboard'))
);
