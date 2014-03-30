<?php

/*
Will Spurgin
Session handlers in friendly function form
Made 2/28/2014
*/

// function for getting session and validating the session.
function _session($session_validation=NULL, $guest=true)
{
    $session_validation = (array)$session_validation;
    $goodSession = true;
    if(!getSession($guest))
        return false;
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

function getSession($set_guest=true)
{
    //if there is no active session
    if(!isset($_SESSION))
    {
        if(isset($_COOKIE))
        {
            reset($_COOKIE);
            $name = key($_COOKIE);
        }
        if(!isset($name) && $set_guest)
        {
            $name = sha1("GUEST".time());
            newSession($name);
        }
        else if (!isset($name))
        {
            //do not activate session
            return false;
        }
        else
        {
            session_name($name); // set session name
            session_start(); // resume session
        }
        $_SESSION['last_access'] = time();
    }
    return true;
}

// this function will destory any active sessions
// and delete any site-cookies that are already set
function newSession($name)
{
    // clear all site-cookies (unless the cookie id is name)
    // otherwise the new session cookie will get deleted right
    // after we create it
    foreach ($_COOKIE as $c_id => $c_value)
    {
        if($c_id != $name)
        {
            $params = session_get_cookie_params();
            setcookie($c_id, NULL, 1,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]);
        }
    }
    if(isset($_SESSION))
        destroySession();

    session_name($name); // set session name
    session_start(); // start session
    $_SESSION['last_access'] = time();
}

// Session must be active
function destroySession()
{
    // destroying active session
    session_unset();
    if (ini_get("session.use_cookies"))
    {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', 1,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]);
    }
    session_destroy();
}

// where $key and $value are the key and value pair to be checked in $_SESSION
// If looking only for existence of $key, Usage validateSession($key);
function validateSession($key, $value=NULL)
{
    $is_good = false;
    if(isset($_SESSION))
    {
        if(isset($_SESSION[$key]))
        {
            if(!isset($value))
                $is_good = true;
            else
            {
                if($_SESSION[$key] == $value)
                    $is_good = true;
            }
        }
    }

    return $is_good;
}
