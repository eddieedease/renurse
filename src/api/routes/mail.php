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



// Sender - message - receiver, all post VARS
$app->get('/getadminemail', function (Request $request, Response $response) {
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlgetadminemail = "SELECT adminemail FROM cfg WHERE id = 1";
    $stmtgetadminemail = $dbh->prepare($sqlgetadminemail);
    $stmtgetadminemail->execute();
    $resultgetadminemail = $stmtgetadminemail->fetchAll(PDO::FETCH_ASSOC);
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultgetadminemail);
    $debug = array('status' => 'success', 'adminemail' => $resultgetadminemail);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});

// 1) SEND CONTACT FORM
// Sender - message - receiver, all post VARS
$app->post('/saveadminemail', function (Request $request, Response $response) {

    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $email = $parsedBody[email];

    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqlsavemail = "UPDATE cfg SET adminemail = '$email' WHERE id = 1";
    $stmtsavemail = $dbh->prepare($sqlsavemail);
    $stmtsavemail->execute();
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultsavemail);
    $debug = array('status' => 'success');
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});

?>
