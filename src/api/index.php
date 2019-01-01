<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\UploadedFileInterface as UploadedFile;

require 'vendor/autoload.php';
// we Want to communicate in JSON
header("Content-Type: application/json");

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    //     cache for 1 day example
    //     header('Access-Control-Max-Age: 86400');
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
}
// Start SLim API
$app = new \Slim\App;

// neededForFileupload
$container = $app->getContainer();
$container['upload_directory'] = __DIR__ . "/../uploads";

// SETTINGS UP TESTCALL
$app->get('/testcall', function (Request $request, Response $response) {
    $debug = array('succes' => 'testcall');
    $response = json_encode($debug);
    return $response;
}
);

require 'routes/users.php';
require 'routes/groups.php';
require 'routes/publications.php';
require 'routes/files.php';
require 'routes/mail.php';
require 'routes/cfg.php';
require 'routes/sections.php';

/* require 'routes/collects.php';
require 'routes/rewards.php';
require 'routes/files.php'; */


$app->run();
