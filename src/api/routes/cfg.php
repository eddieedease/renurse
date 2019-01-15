<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;


// CONFIG FUNCTIONALITY
// 1 GET CONFIG
// TODO: Work out
$app->get('/getconfig', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

// 2 ADJUST CONFIG
$app->post('/editconfig', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

// 3 SET ADMIN Password
$app->post('/editadmnpwd', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

?>
