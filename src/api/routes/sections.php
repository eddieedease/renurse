<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// CONFIG FUNCTIONALITY

// 1 GET SECTIONS


// 2 MAKE NEW SECTION


// 3 EDIT SECTION
//3 ) Edit section
// TODO: Work out
$app->post('/editsection/{sectionid}', function (Request $request, Response $response) {
    $sectionid = $request->getAttribute('sectionid');
    $sectionid = (int)$sectionid;
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    // $sectionname = $parsedBody[name];
    $sectionwysig = $parsedBody[wysig];

    // $sectionname = addcslashes($sectionname, "'");
    $sectionwysig = addcslashes($sectionwysig, "'");
    // UPDATE, I THINKKKK, It's better to make 2 API CALLS, first store the data. If this succeeds, another 'file upload' for thumbnail
    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    

    $sqleditsection = "UPDATE textblocks SET wysig = '$sectionwysig' WHERE id = '$sectionid'";
    $stmteditsection = $dbh->prepare($sqleditsection);
    $stmteditsection->execute();
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resulteditsection);
    $debug = array('status' => 'success', 'editsection' => $sectionname);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});


// 4 DEL SECTION

?>
