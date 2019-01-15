<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API researchS
// researchS researchS

// 1) Create research
// TODO: WORK OUT
$app->post('/createresearch', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

// 2) Get researchs
// TODO: Work OUT
$app->get('/getresearches', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

//3 ) Edit research
// TODO: Work out
$app->post('/editresearch', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

// 4) Delete research
// TODO: Work out
$app->get('/deleteresearch', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});
?>
