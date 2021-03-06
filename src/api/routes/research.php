<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API researchS
// researchS researchS

// 1) Create research
// TODO: TEST OUT
$app->post('/createresearch', function (Request $request, Response $response) {
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $researchname = $parsedBody[researchname];
    $researchwysig = $parsedBody[researchwysig];
    //$researchstatus = $parsedBody[researchstatus];
    //$researchinitiative = $parsedBody[researchinitiative];

    $researchname = addcslashes($researchname, "'");
    $researchwysig = addcslashes($researchwysig, "'");
    // $researchstatus = addcslashes($researchstatus, "'");
    // $researchinitiative = addcslashes($researchinitiative, "'");
    // UPDATE, I THINKKKK, It's better to make 2 API CALLS, first store the data. If this succeeds, another 'file upload' for thumbnail
    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqladdresearch = "INSERT INTO research (uname, wysig, status, initiative) VALUES ('$researchname', '$researchwysig', 'open', '')";
    $stmtaddresearch = $dbh->prepare($sqladdresearch);
    $stmtaddresearch->execute();
    $resultaddresearch= $stmtaddresearch->fetchAll(PDO::FETCH_ASSOC);
    $researchID = $dbh->lastInsertId();
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultaddresearch);
    $debug = array('status' => 'success', 'addresearch' => $sqladdresearch, 'insertId' => $researchID);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
}
);

// 2) Get researchs
// TODO: Work OUT
$app->get('/getresearches', function (Request $request, Response $response) {
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlresearches = "SELECT * FROM research";
    $stmtresearches = $dbh->prepare($sqlresearches);
    $stmtresearches->execute();
    $resultresearches = $stmtresearches->fetchAll(PDO::FETCH_ASSOC);
    // debug
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($resultresearches);
    return $response;
});

//3 ) Edit research
// TODO: Work out
$app->post('/editresearch/{researchid}', function (Request $request, Response $response) {
    $researchid = $request->getAttribute('researchid');
    $researchid = (int)$researchid;
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $researchname = $parsedBody[name];
    $researchwysig = $parsedBody[wysig];
    $researchstatus = $parsedBody[researchstatus];
    $researchinitiative = $parsedBody[researchinitiative];

    $researchname = addcslashes($researchname, "'");
    $researchwysig = addcslashes($researchwysig, "'");
    $researchstatus = addcslashes($researchstatus, "'");
    $researchinitiative = addcslashes($researchinitiative, "'");
    // UPDATE, I THINKKKK, It's better to make 2 API CALLS, first store the data. If this succeeds, another 'file upload' for thumbnail
    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    

    $sqleditresearch = "UPDATE research SET uname = '$researchname' , wysig = '$researchwysig' , status = '$researchstatus', initiative = '$researchinitiative' WHERE id = '$researchid'";
    $stmteditresearch = $dbh->prepare($sqleditresearch);
    $stmteditresearch->execute();
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resulteditresearch);
    $debug = array('status' => 'success', 'editresearch' => $researchname);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});

// 4) Delete research
// TODO: Work out
$app->get('/deleteresearch/{researchid}', function (Request $request, Response $response) {
    $researchid = $request->getAttribute('researchid');
    $researchid = (int)$researchid;
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqldeleteresearch = "DELETE FROM research WHERE id = $researchid";
    $stmtdeleteresearch = $dbh->prepare($sqldeleteresearch);
    $stmtdeleteresearch->execute();
    $resultdeleteresearch = $stmtdeleteresearch->fetchAll(PDO::FETCH_ASSOC);
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultdeleteresearch);
    $debug = array('status' => 'success', 'deleted' => $researchid);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});


?>
