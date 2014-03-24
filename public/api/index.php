<?
require_once(__DIR__ . '/../../vendor/autoload.php');
require_once(__DIR__ . '/../../lib/config.php');


session_cache_limiter(false);


$app = new \Slim\Slim();
$app->log->setEnabled(true);
$app->contentType('application/json');

// get all the bootstraped routes from config
foreach ($ROUTES as $route) {
	if($route->type == Route::GET)
		$app->get($route->url, $route->callable);
	elseif ($route->type == Route::POST)
		$app->post($route->url, $route->callable);
	elseif ($route->type == Route::PUT)
		$app->put($route->url, $route->callable);
	elseif ($route->type == Route::DELETE)
		$app->delete($route->url, $route->callable);
	else
		$app->log("Unsupported route type for '$route->type', on Route $route");
}

$app->run();