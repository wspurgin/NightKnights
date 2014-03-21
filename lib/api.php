<?
/**
* NightKnights Api Class
* 
* @author Will Spurgin
*/

require_once('../../vendor/autoload.php');
require_once('../../init.php');
require_once('password.php');
require_once('session.php');

Class Api
{

	private $db;

	private $session_validation;

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

	// function for getting session (though disabling guest sessions)
	// and validating the session.
	private function session()
	{
		$goodSession = getSession(false); // false for disabling guest sessions

		// validate session if validation is required
		if (isset($session_validation))
		{
			foreach ($session_validation as $key => $validator)
			{
				if (is_array($validator))
					$goodSession = validateSession($validator["key"], $validator["value"]);
				else
					$goodSession = validateSession($validator);

				// if the session is invalid
				if (!$goodSession)
					return false;
			}
		}
	}

	public function __contruct($session_validation=NULL)
	{
		$this->db = getConnection();
		$this->session_validation = $session_validation;
	}

	public function __clone()
	{
		return clone $this;
	}

	public function getCurrentUser()
	{
		if (!$this->session())
			echo "Bad session";
		else
			echo json_encode('{ "user": "current_user" }');
	}
}