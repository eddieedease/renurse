<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API
// GROUPS GROUPS GROUPS GROUPS GROUPS
// GROUPS GROUPS GROUPS GROUPS GROUPS
// GROUPS GROUPS GROUPS GROUPS GROUPS
// GROUPS GROUPS GROUPS GROUPS GROUPS
// 1) Create group
// TODO: WORK OUT
$app->post('/creategroup', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

// 2) Get groups
// TODO: Work OUT
$app->get('/getgroups', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

//3 ) Edit group
// TODO: Work out
$app->get('/editgroup', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

// 4) Delete group
// TODO: Work out
$app->get('/deletegroup', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

// 5) Add/delete user from group
// TODO: Work out
// NOTE: User can be added or removed
$app->get('/usertogroup', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});



?>
