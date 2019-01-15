<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API
// USERS USERS USERS USERS USERS
// USERS USERS USERS USERS USERS
// USERS USERS USERS USERS USERS
// USERS USERS USERS USERS USERS


// 1) Create user
// TODO: WORK OUT
$app->post('/createuser', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

// 2) Get users
// TODO: Work OUT
$app->get('/getusers', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

//3 ) Edit user
// TODO: Work out
$app->post('/edituser', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

// 4) Delete User
// TODO: Work out
$app->get('/deleteuser', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});


// 5) Login functionality
// TODO: Work out
$app->get('/login', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});







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
