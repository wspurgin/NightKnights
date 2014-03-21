<?php
/*
Route
	type GET POST PUT DELETE
	url [string]
	callable [callable] where to go with url
*/


/*
class Route
{
	public var $type;
	public var $url;
	public var $callable;

	//enum stuff
	const GET = 0;
	const POST = 1;
	const PUT = 2;
	const DELETE = 3;
	
	$typeArray = array(Route::GET, Route::POST, Route::PUT, Route::DELETE);

	function __construct($url, $type, $callable)
	{
		if in_array($type, $typeArray)
			throw new Exception("Unsupported type", 1);
		else
			$this->type = $type;

		if is_string($url)
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
?>
