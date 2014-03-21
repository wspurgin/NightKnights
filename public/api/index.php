<?
require '../../vendor/autoload.php';
require_once('../../lib/config.php');


session_cache_limiter(false);


$app = new \Slim\Slim();
$app->log->setEnabled(true);

// get all the bootstraped routes from config
foreach ($ROUTES as $route) {
	if($route->type == Route::GET)
		$app->get($route->url, $route->callable);
	elseif ($route->type == Route::POST)
		# code...
	elseif ($route->type == Route::PUT)
		# code...
	elseif ($route->type == Route::DELETE)
		# code...
	else
		// not supported route type
}

$app->run();