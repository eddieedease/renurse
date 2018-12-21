<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API
// USERS USERS USERS USERS USERS
// USERS USERS USERS USERS USERS
// USERS USERS USERS USERS USERS
// USERS USERS USERS USERS USERS
$app->get('/testcall', function (Request $request, Response $response) {
    /* $lessontitle = $request->getAttribute('lessontitle');
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqladdlesson = "INSERT INTO lessons (name) VALUES ('$lessontitle')";
    $stmtaddlesson = $dbh->prepare($sqladdlesson);
    $stmtaddlesson->execute();
    $resultaddlesson = $stmtaddlesson->fetchAll(PDO::FETCH_ASSOC);
    $test = $dbh->lastInsertId(); */
    $debug = array('succes' => 'testcall');
    $response = json_encode($test);
    return $response;
}
);


// EXTRA Functions
// create random function
function randomPassword() {
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 16; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}
?>
