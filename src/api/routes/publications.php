<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API PUBLICATIONS
// PUBLICATIONS PUBLICATIONS

// 1) Create publication
// TODO: WORK OUT
$app->post('/createpublication', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

// 2) Get publications
// TODO: Work OUT
$app->get('/getpublications', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

//3 ) Edit publication
// TODO: Work out
$app->post('/editpublication', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

// 4) Delete publication
// TODO: Work out
$app->get('/deletepublication', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});
?>
