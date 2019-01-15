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
// TODO: TEST
$app->get('/removefilefromgroup/{fileid}', function (Request $request, Response $response) {
    
    $fileid = $request->getAttribute('fileid');
    $fileid = (int)$fileid;

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqldeletefile = "DELETE FROM files WHERE id = $fileid";
    $stmtdeletefile = $dbh->prepare($sqldeletefile);
    $stmtdeletefile->execute();
    $resultdeletefile = $stmtdeletefile->fetchAll(PDO::FETCH_ASSOC);
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultdeletefile);
    $debug = array('status' => 'success', 'deleted' => $fileid);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});

// 3) EDIT A FILE
// TODO: Work out
$app->post('/editfile', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

// 4 Get FILES FROM SPECIFIC GROUP
// TODO: Test it out
$app->get('/getfilesfromgroup/{groupid}', function (Request $request, Response $response) {
    $groupid = $request->getAttribute('groupid');
    $groupid = (int)$groupid;
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlfileses = "SELECT * FROM files WHERE togroup = '$groupid'";
    $stmtfiles = $dbh->prepare($sqlfiles);
    $stmtfiles->execute();
    $resultfiles = $stmtfiles->fetchAll(PDO::FETCH_ASSOC);

    // debug
    $data = array('Jsonresponse' => 'item1');
    
    $response = json_encode($resultfiles);
    return $response;
});


?>
