<?php
ini_set('display_errors', 0);

if (!isset($_SESSION)) {
    $lifetime=36000;
    session_set_cookie_params($lifetime);
    session_start();
}

$db_host = 'localhost';
$db_name = 'reactjs_home_repairs';
$db_user = 'root';
$db_pass = '';
$db_port = 3306;

if ($isProduction) {
    // online DB config
    $db_name = '';
    $db_user = '';
    $db_pass = '';
}


// Try and connect using the info above.
try {
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);
}
catch (Exception $e) {
    echo 'Failed to connect to MySql';
    echo '<pre>';
    print_r($e);
    echo '</pre>';
    die;
}
