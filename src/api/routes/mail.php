<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API MAIL
// MAIL MAIL


// phpmailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// MALING FUNCTIONALITY

// 1) SEND CONTACT FORM
// Sender - message - receiver, all post VARS
$app->post('/sendcontactform', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});
?>
