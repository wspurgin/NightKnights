<?php
require_once(__DIR__.'/../../lib/session.php');

// 'user_id' is the required session var, 'false' means no guest sessions.
if(!_session("user_id", false))
    header("Location: /html/login.php");