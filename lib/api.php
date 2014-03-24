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
					$response['request'] = $_SESSION;
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
			$body = $app->request->getBody();
			$user = json_decode($body);
			if(empty($user))
				throw new Exception("Invlaid json '$body'", 1);

			$passwd = new Password($user->password);
			$sql = "INSERT INTO `Users`(`email`, `username`, `password`) VALUES (:email, :username, :password)";
			$stmt = $this->db->prepare($sql);
			$stmt->bindParam(":email", $user->email);
			$stmt->bindParam(":username", $user->username);
			$stmt->bindParam(":password", $passwd);
			$stmt->execute();

			$user_id = $this->db->lastInsertId();

			$sql = "INSERT INTO `Characters`(`id`, `name`) VALUES (:user_id, :username)";
			$stmt = $this->db->prepare($sql);
			$stmt->bindParam(":user_id", $user_id);
			$stmt->bindParam(":username", $user->username);
			$stmt->execute();

			newSession(md5(SALT.$user->username));
			$_SESSION['user_id'] = $user_id;
			$_SESSION['username'] = $user->username;
			$response['success'] = true;
			$response['message'] = "$user->username created successfully, now logged in.";
			$response['request'] = $_SESSION;

		}
		catch(PDOException $e)
		{
			$response['success'] = false;
			$app->log->error($e->getMessage());
			if($e->getCode() == 23505)
				$response['message'] = "Username already exists";
			else
			{
				// while still debugging
				$response['message'] = $e->getMessage();
				// $response['message'] = "Errors occured";
			}

		}
		catch(Exception $e)
		{
			$app->log->error($e->getMessage());
			// add message while debugging
			$app->halt(500, $e);
		}
		echo json_encode($response);
	}

	public function getAcitveUserFights()
	{
		$app = \Slim\Slim::getInstance();
		$response = array();
		if (!$this->session())
			$app->halt(404);
		try
		{
			$sql = "SELECT * FROM `World_Fights` WHERE `character_id`=:id AND `active`=1";
			$stmt = $this->db->prepare($sql);
			$stmt->bindParam(":id", $_SESSION['user_id']);
			$stmt->execute();

			$fights = $stmt->fetchAll(PDO::FETCH_CLASS);

			$response['success'] = true;
			$response['fights'] = $fights;
		}
		catch(PDOException $e)
		{
			$app->log->error($e->getMessage());
			$response['success'] = false;

			// while still debugging
			$response['message'] = $e->getMessage();
			// $response['message'] = "Errors occured";
			
			$app->halt(404, json_encode($response));
		}
		catch(Exception $e)
		{
			$app->log->error($e->getMessage());
			// add message while debugging
			$app->halt(500, $e);
		}
		echo json_encode($response);
	}

	public function createFight()
	{
		$app = \Slim\Slim::getInstance();
		$response = array();
		if (!$this->session())
			$app->halt(404);
		try
		{
			$body = $app->request->getBody();
			$fight = json_decode($body);
			if(empty($fight))
				throw new Exception("Invlaid json '$body'", 1);

			$sql = "INSERT INTO `World_Fights`(`boss_id`, `character_id`) VALUES (:boss_id, :id)";
			$stmt = $this->db->prepare($sql);
			$stmt->bindParam(":boss_id", $fight->boss_id);
			$stmt->bindParam(":id", $_SESSION['user_id']);
			$stmt->execute();

			$fights = $stmt->fetchAll(PDO::FETCH_CLASS);
			$username = $_SESSION['username'];
			$response['success'] = true;
			$response['message'] = "$username has a new fight!";
		}
		catch(PDOException $e)
		{
			$app->log->error($e->getMessage());
			$response['success'] = false;

			// while still debugging
			$response['message'] = $e->getMessage();
			// $response['message'] = "Errors occured";
			
			$app->halt(404, json_encode($response));
		}
		catch(Exception $e)
		{
			$app->log->error($e->getMessage());
			// add message while debugging
			$app->halt(500, $e);
		}
		echo json_encode($response);
	}

	public function getItems()
	{
		$app = \Slim\Slim::getInstance();
		$response = array();
		try
		{
			$sql = "SELECT * FROM `Items`";
			$stmt = $this->db->query($sql);

			$items = $stmt->fetchAll(PDO::FETCH_CLASS);
			$response['success'] = true;
			$response['items'] = $items;
		}
		catch(PDOException $e)
		{
			$app->log->error($e->getMessage());
			$response['success'] = false;

			// while still debugging
			$response['message'] = $e->getMessage();
			// $response['message'] = "Errors occured";
			
			$app->halt(404, json_encode($response));
		}
		catch(Exception $e)
		{
			$app->log->error($e->getMessage());
			// add message while debugging
			$app->halt(500, $e);
		}
		echo json_encode($response);
	}

	public function getAreaMonsters($id)
	{
		$app = \Slim\Slim::getInstance();
		$response = array();
		try
		{
			$sql = "SELECT * FROM `Monsters` m INNER JOIN `Areas_Monsters` a
			ON (m.`id`=a.`monster_id`) WHERE a.`area_id`=:id";
			$stmt = $this->db->prepare($sql);
			$stmt->bindParam(":id", $id);
			$stmt->execute();
			$monsters = $stmt->fetchAll(PDO::FETCH_CLASS);

			$response['success'] = true;
			$response['monsters'] = $monsters;
		}
		catch(PDOException $e)
		{
			$app->log->error($e->getMessage());
			$response['success'] = false;

			// while still debugging
			$response['message'] = $e->getMessage();
			// $response['message'] = "Errors occured";
			
			$app->halt(404, json_encode($response));
		}
		catch(Exception $e)
		{
			$app->log->error($e->getMessage());
			// add message while debugging
			$app->halt(500, $e);
		}
		echo json_encode($response);
	}
	
	public function getAreas()
	{
		$app = \Slim\Slim::getInstance();
		$response = array();
		try
		{
			$sql = "SELECT name, img_url FROM `Areas`";
			$stmt = $this->db->prepare($sql);
			$stmt->execute();
			$areas = $stmt->fetchAll(PDO::FETCH_CLASS);

			$response['success'] = true;
			$response["areas"] = $areas;
		}
		catch(PDOException $e)
		{
			$app->log->error($e->getMessage());
			$response['success'] = false;

			// while still debugging
			$response['message'] = $e->getMessage();
			// $response['message'] = "Errors occured";
			
			$app->halt(404, json_encode($response));
		}
		catch(Exception $e)
		{
			$app->log->error($e->getMessage());
			// add message while debugging
			$app->halt(500, $e);
		}
		echo json_encode($response);
	}
	
	public function getCharacter($id)
	{
		$app = \Slim\Slim::getInstance();
		$response = array();
		try
		{
			$sql = "SELECT name, energy, experience, level FROM `Characters`
				WHERE Characters.id=:id";
			$stmt = $this->db->prepare($sql);
			$stmt->bindParam(":id", $id);
			$stmt->execute();
			$character = $stmt->fetchAll(PDO::FETCH_CLASS);

			$response['success'] = true;
			$response['character'] = $character;
		}
		catch(PDOException $e)
		{
			$app->log->error($e->getMessage());
			$response['success'] = false;

			// while still debugging
			$response['message'] = $e->getMessage();
			// $response['message'] = "Errors occured";
			
			$app->halt(404, json_encode($response));
		}
		catch(Exception $e)
		{
			$app->log->error($e->getMessage());
			// add message while debugging
			$app->halt(500, $e);
		}
		echo json_encode($response);
	}

	public function getCharacterInventory($id)
	{
		$app = \Slim\Slim::getInstance();
		$response = array();
		try
		{
			$sql = "SELECT Items.name, attack_stat, defense_stat, 
					magic_stat, classification, img_url
				FROM Characters 
				INNER JOIN Inventories ON Characters.id = Inventories.character_id
				INNER JOIN Items ON Inventories.item_id = Items.id
				WHERE Characters.id=:id";
			$stmt = $this->db->prepare($sql);
			$stmt->bindParam(":id", $id);
			$stmt->execute();
			$character = $stmt->fetchAll(PDO::FETCH_CLASS);

			$response['success'] = true;
			$response['inventory'] = $character;
		}
		catch(PDOException $e)
		{
			$app->log->error($e->getMessage());
			$response['success'] = false;

			// while still debugging
			$response['message'] = $e->getMessage();
			// $response['message'] = "Errors occured";
			
			$app->halt(404, json_encode($response));
		}
		catch(Exception $e)
		{
			$app->log->error($e->getMessage());
			// add message while debugging
			$app->halt(500, $e);
		}
		echo json_encode($response);
	}
	
	/**
	*	Get ACTIVE world bosses
	*	active = 1
	*/
	public function getBosses()
	{
		$app = \Slim\Slim::getInstance();
		$response = array();
		try
		{
			$sql = "SELECT Monsters.name, img_url, damage_done, boss_health, 
				boss_attack, boss_defense, boss_magic, achievable_item_id 
				FROM World_Fights 
				INNER JOIN World_Bosses ON World_Fights.boss_id = World_Bosses.id
				INNER JOIN Monsters ON World_Bosses.monster_id = Monsters.id
				Where World_Fights.active = 1";
			$stmt = $this->db->prepare($sql);
			$stmt->execute();
			$bosses = $stmt->fetchAll(PDO::FETCH_CLASS);

			$response['success'] = true;
			$response["bosses"] = $bosses;
		}
		catch(PDOException $e)
		{
			$app->log->error($e->getMessage());
			$response['success'] = false;

			// while still debugging
			$response['message'] = $e->getMessage();
			// $response['message'] = "Errors occured";
			
			$app->halt(404, json_encode($response));
		}
		catch(Exception $e)
		{
			$app->log->error($e->getMessage());
			// add message while debugging
			$app->halt(500, $e);
		}
		echo json_encode($response);
	}
	
	/**
	*	JSON needs item_id key and value
	*/
	public function createInventoryItem($id)
	{
		$app = \Slim\Slim::getInstance();
		$response = array();
		if (!$this->session())
			$app->halt(404);
		try
		{
			$body = $app->request->getBody();
			$itemAdd = json_decode($body);
			if(empty($itemAdd))
				throw new Exception("Invlaid json '$body'", 1);

			$sql = "INSERT INTO Inventories(item_id, character_id) VALUES (:item_id, :id)";
			$stmt = $this->db->prepare($sql);
			$stmt->bindParam(":item_id", $itemAdd->item_id);
			$stmt->bindParam(":id", $id);
			$stmt->execute();

			$inventoryResponse = $stmt->fetchAll(PDO::FETCH_CLASS);
			$username = $_SESSION['username'];
			$response['success'] = true;
			$response['message'] = "$username has a new item in inventory!";
		}
		catch(PDOException $e)
		{
			$app->log->error($e->getMessage());
			$response['success'] = false;

			// while still debugging
			$response['message'] = $e->getMessage();
			// $response['message'] = "Errors occured";
			
			$app->halt(404, json_encode($response));
		}
		catch(Exception $e)
		{
			$app->log->error($e->getMessage());
			// add message while debugging
			$app->halt(500, $e);
		}
		echo json_encode($response);
	}
	
	/**
	* 	PUT (ADD) experience
	*	JSON needs experience key and value of experience to be added
	*/
	public function updateCharacterExperience($id)
	{
		$app = \Slim\Slim::getInstance();
		$response = array();
		//if (!$this->session())
		//	$app->halt(404);
		try
		{
			$body = $app->request->getBody();
			$expAdd = json_decode($body);
			if(empty($expAdd))
				throw new Exception("Invlaid json '$body'", 1);

			$sql = "UPDATE Characters 
				SET experience = experience + :exp 
				WHERE Characters.id = :id";
			$stmt = $this->db->prepare($sql);
			$stmt->bindParam(":exp", $expAdd->experience);
			$stmt->bindParam(":id", $id);
			$stmt->execute();

			$experienceResponse = $stmt->fetchAll(PDO::FETCH_CLASS);
			$username = $_SESSION['username'];
			$response['success'] = true;
			$response['message'] = "$username has a new item in inventory!";
		}
		catch(PDOException $e)
		{
			$app->log->error($e->getMessage());
			$response['success'] = false;

			// while still debugging
			$response['message'] = $e->getMessage();
			// $response['message'] = "Errors occured";
			
			$app->halt(404, json_encode($response));
		}
		catch(Exception $e)
		{
			$app->log->error($e->getMessage());
			// add message while debugging
			$app->halt(500, $e);
		}
		echo json_encode($response);
	}

	public function getLeaderboard()
	{
		$app = \Slim\Slim::getInstance();
		$response = array();
		if(!$this->session())
			$app->halt(404);
		try
		{
			$sql = "SELECT * FROM `Characters` ORDER BY `experience` DESC";
			$stmt = $this->db->query($sql);

			$leaderboad = $stmt->fetchAll(PDO::FETCH_CLASS);
			$response['success'] = true;
			$response['leaderboad'] = $leaderboad;
		}
		catch(PDOException $e)
		{
			$app->log->error($e->getMessage());
			$response['success'] = false;

			// while still debugging
			$response['message'] = $e->getMessage();
			// $response['message'] = "Errors occured";
			
			$app->halt(404, json_encode($response));
		}
		catch(Exception $e)
		{
			$app->log->error($e->getMessage());
			// add message while debugging
			$app->halt(500, $e);
		}
		echo json_encode($response);
	}
}
