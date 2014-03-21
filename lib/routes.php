<?
/*
Route
	type GET POST PUT DELETE
	url [string]
	callable [callable] where to go with url
*/

/*

class Route
{
	function __construct($url, $type, $callable)
	{
		if $type not in [Route::GET, Route::POST, Route::PUT, Route::DELETE]
			throw new Exception("Unsupported type", 1);
		else
			$this->type = $type;

		if url is string
			$this->url = $url;
		else
			throw new Exception("Route url must be of type string", 1);
			
		if is_callable($callable)
			$this->$callable = $callable;
		else
			throw new Exception("3rd argument in __construct() must be a callable (return true on 'is_callable()'", 1);
			
	}
}

*/