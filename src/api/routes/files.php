<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API
// FILES FILES FILES FILES FILES
// FILES FILES FILES FILES FILES
// FILES FILES FILES FILES FILES


// 1) UPLOAD A FILE TO A GROUP
// TODO: Work out
$app->post('/filetogroup', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});


// 2) DELETE A FILE FROM A GROUP
// TODO: Work out
$app->get('/removefilefromgroup', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

// 3) EDIT A FILE
// TODO: Work out
$app->post('/editfile', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});


?>
