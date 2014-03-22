<?

/**
* Password type that handles hashing and checking hashed passwords for
* validity using Anthony Ferrara password functions.
* @author Will Spurgin 
*/

require_once('password_fun.php');

class Password
{
	public static function check($hashed_password, $unhashed_password)
	{
		if ($hashed_password == password_hash($unhashed_password, PASSWORD_DEFAULT))
			return "true";
		else
			return "false";
	}
}