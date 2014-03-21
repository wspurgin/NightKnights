<?
/**
* NightKnights Api Class
* 
* @author Will Spurgin
*/

require_once(__DIR__ . '/../vendor/autoload.php');
require_once(__DIR__ . '/../init.php');
require_once('password.php');
require_once('session.php');

Class Api
{

	private $db;

	private function getConnection()
	{
	    $dbhost = DB_HOST;
	    $dbname = DB_NAME;
	    $dbuser = DB_USER;
	    $dbpass = DB_PASS;

	    $dbset = "mysql:host=$dbhost;dbname=$dbname;";

	    $connection = new PDO($dbset, $dbuser, $dbpass);
	    $connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	    return $db;		
	}

	public function __contruct()
	{
		$this->db = getConnection();
	}

	public function __clone()
	{
		return clone $this;
	}

	public function getCurrentUser()
	{
		echo json_encode('{ "user": "current_user" }');
	}
}