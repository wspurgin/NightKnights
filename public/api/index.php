<?
require '../../vendor/autoload.php';
require_once('../../lib/routes.php');
require_once('../../lib/api.php');

session_cache_limiter(false);


$app = new \Slim\Slim();
$app->log->setEnabled(true);

// get all routes from routes.php

$app->run();