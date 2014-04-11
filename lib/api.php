<?
/**
* NightKnights Api Class
* 
* @author Will Spurgin
*/

require_once(__DIR__ . '/../vendor/autoload.php');
require_once(__DIR__ . '/../init.php');
require_once('db.php');
require_once('password.php');
require_once('session.php');

Class Api
{

    private $db;

    private $session_validation;

    // function for getting session (though disabling guest sessions)
    // and validating the session.
    public function session()
    {
        // 'false' for disabling guest sessions
        return _session($this->session_validation, false);
    }

    public function __construct($session_validation=NULL)
    {
        $dbhost = DB_HOST;
        $dbname = DB_NAME;
        $dbuser = DB_USER;
        $dbpass = DB_PASS;

        $this->db = new Db($dbhost, $dbname, $dbuser, $dbpass);
        $this->session_validation = (array)$session_validation;
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
            if(empty($login))
                throw new Exception("Invalid json: '$body'", 1);
                
            $sql = "SELECT * FROM `Users` WHERE `email`=:email";

            $user = $this->db->select(
                $sql,
                array(":email" => $login->email),
                false # to get only 1 row (as this should only match 1 row)
            );
            if(empty($user))
                throw new Exception("Invalid Credentials", 1);
            else
            {
                $check = Password::check($user->password, $login->password);
                if(!$check)
                    throw new Exception("Invalid Credentials", 1);
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
            $response['success'] = false;
            $app->log->error($e->getMessage());
            $response['message'] = $e->getMessage();

            $app->halt(404, json_encode($response));

        }
        catch(Exception $e)
        {
            $response['success'] = false;
            $app->log->error($e->getMessage());
            $response['message'] = $e->getMessage();
            
            // add message while debugging
            $app->halt(404, json_encode($response));
        }
        echo json_encode($response);
    }

    public function logoutUser()
    {
        $app = \Slim\Slim::getInstance();
        if (!$this->session())
            $app->halt(404);
        try
        {
            destroySession();
            $response['success'] = true;
            $response['message'] = "User logged out.";
        }
        catch(PDOException $e)
        {
            $response['success'] = false;
            $app->log->error($e->getMessage());
            $response['message'] = $e->getMessage();

            $app->halt(404, json_encode($response));

        }
        catch(Exception $e)
        {
            $response['success'] = false;
            $app->log->error($e->getMessage());
            $response['message'] = $e->getMessage();
            
            // add message while debugging
            $app->halt(404, json_encode($response));
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
                $user = $this->db->select(
                    $sql,
                    array(":id" => $_SESSION['user_id']),
                    false # to get only 1 row (as this should only match 1 row)
                );
                if(empty($user))
                    $app->halt(404);
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
                $response['success'] = false;

                // while still debugging
                $response['message'] = $e->getMessage();
                // $response['message'] = "Errors occured";
                
                $app->halt(500, json_encode($response));
            }
            echo json_encode($user);
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
            if($user->username == '' || $user->email == '' || $user->password == '')
                throw new Exception("Invalid Account Information");
            $passwd = new Password($user->password);
            $sql = "INSERT INTO `Users`(`email`, `username`, `password`) VALUES (:email, :username, :password)";
            $args = array(
                ":email"    => $user->email,
                ":username" => $user->username,
                ":password" => $passwd
            );
            

            $user_id = $this->db->insert($sql, $args);

            $sql = "INSERT INTO `Characters`(`id`, `name`) VALUES (:user_id, :username)";
            $args = array(
                ":user_id"  => $user_id,
                ":username" => $user->username
            );
            $this->db->insert($sql, $args);

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
            if($e->getCode() == 23000)
                $response['message'] = "Username or email already exists";
            else
            {
                // while still debugging
                $response['message'] = $e->getMessage();
                // $response['message'] = "Errors occured";
            }
            $app->halt(404, json_encode($response));
        }
        catch(Exception $e)
        {
            $app->log->error($e->getMessage());
            $response['success'] = false;

            // while still debugging
            $response['message'] = $e->getMessage();
            // $response['message'] = "Errors occured";
            
            $app->halt(500, json_encode($response));
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

            $fights = $this->db->select($sql, array(":id" => $_SESSION['user_id']));

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
            $response['success'] = false;

            // while still debugging
            $response['message'] = $e->getMessage();
            // $response['message'] = "Errors occured";
            
            $app->halt(500, json_encode($response));
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
            $args = array(
                ":boss_id" => $fight->boss_id,
                ":id" => $_SESSION['user_id']   
            );
            $this->db->insert($sql, $args);

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
            $response['success'] = false;

            // while still debugging
            $response['message'] = $e->getMessage();
            // $response['message'] = "Errors occured";
            
            $app->halt(500, json_encode($response));
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
            $items = $this->db->select($sql);
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
            $response['success'] = false;

            // while still debugging
            $response['message'] = $e->getMessage();
            // $response['message'] = "Errors occured";
            
            $app->halt(500, json_encode($response));
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

            $monsters = $this->db->select($sql, array(":id" => $id));
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
            $response['success'] = false;

            // while still debugging
            $response['message'] = $e->getMessage();
            // $response['message'] = "Errors occured";
            
            $app->halt(500, json_encode($response));
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
            $areas = $this->db->select($sql);

            $response['success'] = true;
            $response['areas'] = $areas;
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
            $response['success'] = false;

            // while still debugging
            $response['message'] = $e->getMessage();
            // $response['message'] = "Errors occured";
            
            $app->halt(500, json_encode($response));
        }
        echo json_encode($response);
    }
    
    public function getCharacter()
    {
        $app = \Slim\Slim::getInstance();
        $response = array();
        if (!$this->session())
            $app->halt(404);
        try
        {
            $sql = "SELECT name, energy, experience, level FROM `Characters`
                WHERE Characters.id=:id";

            $character = $this->db->select($sql, array(":id" => $_SESSION['user_id']), false);
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
            $response['success'] = false;

            // while still debugging
            $response['message'] = $e->getMessage();
            // $response['message'] = "Errors occured";
            
            $app->halt(500, json_encode($response));
        }
        echo json_encode($response);
    }

    public function getCharacterInventory()
    {
        $app = \Slim\Slim::getInstance();
        $response = array();
        if (!$this->session())
            $app->halt(404);
        try
        {
            $sql = "SELECT Items.name, is_equipped, attack_stat, defense_stat, 
                    magic_stat, classification, img_url
                FROM Characters 
                INNER JOIN Inventories ON Characters.id = Inventories.character_id
                INNER JOIN Items ON Inventories.item_id = Items.id
                WHERE Characters.id=:id";

            $inventory = $this->db->select($sql, array(":id" => $_SESSION['user_id']));

            $response['success'] = true;
            $response['inventory'] = $inventory;
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
            $response['success'] = false;

            // while still debugging
            $response['message'] = $e->getMessage();
            // $response['message'] = "Errors occured";
            
            $app->halt(500, json_encode($response));
        }
        echo json_encode($response);
    }
    
    /**
    *   Get ACTIVE world bosses
    *   active = 1
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
            $bosses = $this->db->select($sql);

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
            $response['success'] = false;

            // while still debugging
            $response['message'] = $e->getMessage();
            // $response['message'] = "Errors occured";
            
            $app->halt(500, json_encode($response));
        }
        echo json_encode($response);
    }
    
    /**
    *   JSON needs item_id key and value
    */
    public function createInventoryItem()
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
            $args = array(
                ":item_id" => $itemAdd->item_id,
                ":id" => $_SESSION['user_id']
            );

            $this->db->insert($sql, $args);

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
            $response['success'] = false;

            // while still debugging
            $response['message'] = $e->getMessage();
            // $response['message'] = "Errors occured";
            
            $app->halt(500, json_encode($response));
        }
        echo json_encode($response);
    }

    /**
    *   JSON needs item_id key and value
    */
    public function equipItem()
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

            $sql = "UPDATE Inventories SET `is_equipped`=1
            WHERE `item_id`=:item_id AND `character_id`=:id";
            $args = array(
                ":item_id" => $itemAdd->item_id,
                ":id" => $_SESSION['user_id']
            );

            $this->db->update($sql, $args);

            $username = $_SESSION['username'];
            $response['success'] = true;
            $response['message'] = "$username equiped an item in their inventory!";
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
            $response['success'] = false;

            // while still debugging
            $response['message'] = $e->getMessage();
            // $response['message'] = "Errors occured";
            
            $app->halt(500, json_encode($response));
        }
        echo json_encode($response);
    }
    
    /**
    *   PUT (ADD) experience
    *   JSON needs experience key and value of experience to be added
    */
    public function updateCharacterExperience()
    {
        $app = \Slim\Slim::getInstance();
        $response = array();
        if (!$this->session())
            $app->halt(404);
        try
        {
            $body = $app->request->getBody();
            $expAdd = json_decode($body);
            if(empty($expAdd))
                throw new Exception("Invlaid json '$body'", 1);

            $sql = "UPDATE Characters 
                SET experience = experience + :exp 
                WHERE Characters.id = :id";
            $args = array(
                ":exp" => $expAdd->experience,
                ":id" => $_SESSION['user_id']
            );

            $this->db->update($sql, $args);

            // get current level
            $sql = "SELECT level FROM Characters WHERE id=:id";

            $level = $this->db->select($sql, array(":id"=>$_SESSION['user_id']), false);

            $response['success'] = true;
            $response['message'] = "character ".$_SESSION['username']." has more experience!";
            $response['level'] = $level->level; # gets the actual level
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
            $response['success'] = false;

            // while still debugging
            $response['message'] = $e->getMessage();
            // $response['message'] = "Errors occured";
            
            $app->halt(500, json_encode($response));
        }
        echo json_encode($response);
    }

    public function updateCharacterEnergy()
    {
        $app = \Slim\Slim::getInstance();
        $response = array();
        if(!$this->session())
            $app->halt(404);
        try
        {
            $body = $app->request->getBody();
            $addtional = json_decode($body);
            if(empty($addtional))
                throw new Exception("Invlaid json '$body'", 1);

            $sql = "UPDATE `Characters` SET `energy`=`energy`+:energy
            WHERE `id`=:id";
            $args = array(
                ":energy" => $addtional->energy,
                ":id" => $_SESSION['user_id']
            );
            $this->db->update($sql, $args);

            $name = $_SESSION['username'];
            $response['success'] = true;
            $response['message'] = "Succesfully added $addtional->energy to $name";
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
            $response['success'] = false;

            // while still debugging
            $response['message'] = $e->getMessage();
            // $response['message'] = "Errors occured";
            
            $app->halt(500, json_encode($response));
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
            $leaderboad = $this->db->select($sql);

            $response['success'] = true;
            $response['leaderboard'] = $leaderboad;
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
            $response['success'] = false;

            // while still debugging
            $response['message'] = $e->getMessage();
            // $response['message'] = "Errors occured";
            
            $app->halt(500, json_encode($response));
        }
        echo json_encode($response);
    }
}
