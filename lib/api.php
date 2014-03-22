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

	    return $connection;		
	}

	// function for getting session (though disabling guest sessions)
	// and validating the session.
	public function session()
	{
		$goodSession = true;
		getSession(false); // false for disabling guest sessions

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
		return $goodSession;
	}

	public function __construct($session_validation=NULL)
	{
		$this->db = $this->getConnection();
		$this->session_validation = $session_validation;
	}

	public function __clone()
	{
		return clone $this;
	}

	public function loginUser()
	{
		$app = \Slim\Slim::getInstance();
		$response = array();
		try
		{
			$body = $app->request->getBody();
			$login = json_decode($body);
			$sql = "SELECT * FROM `Users` WHERE `email`=:email";
			$stmt = $this->db->prepare($sql);
			$stmt->bindParam(":email", $login->email);
			$stmt->execute();

			$user = $stmt->fetchObject();
			if(empty($user))
				$app->halt(404);
			else
			{
				if (!Password::check($user->password, $login->password))
					$app->halt(404, (string)Password::check($user->password, $login->password));
				else
				{
					// user authentication completed. Start session
					newSession(md5(SALT.$user->username));
					$_SESSION['user_id'] = $user->id;
					$_SESSION['username'] = $user->username;
					$response['success'] = true;
					$response['message'] = "$user->username logged in successfully";
					$response['session'] = $_SESSION;
				}
			}
		}
		catch(PDOException $e)
		{
			$app->log->error($e->getMessage());
			$app->halt(500);
			// echo $e->getMessage();
		}
		echo json_encode($response);
	}

	public function getCurrentUser()
	{
		$app = \Slim\Slim::getInstance();
		if (!$this->session())
			$app->halt(404);
		else
		{
			try
			{
				$sql = "SELECT `username`, `email` FROM `Users` WHERE `id`=:id";
				$stmt = $this->db->prepare($sql);
				$stmt->bindParam(":id", $_SESSION['user_id']);
				$stmt->execute();
				$user = $stmt->fetchObject();
				if(empty($user))
					$app->halt(404);
				else
					echo json_encode($user);
			}
			catch(PDOException $e)
			{
				$app->log->error($e->getMessage());
				$app->halt(500);
			}
		}
	}

	public function createUser()
	{
		$app = \Slim\Slim::getInstance();
		$response = array();
		try
		{
			#code goes here
		}
		catch(PDOException $e)
		{
			$app->log->error($e->getMessage());
			$app->halt(500);
		}
		echo json_encode($response);
	}
}