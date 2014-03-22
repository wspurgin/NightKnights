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
	new Route('/login', Route::POST, array($api, 'loginUser'))	
);
