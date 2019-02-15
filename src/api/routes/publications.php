<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API PUBLICATIONS
// PUBLICATIONS PUBLICATIONS

// 1) Create publication
// TODO: WORK OUT
$app->post('/createpublication', function (Request $request, Response $response) {
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $pubname = $parsedBody[name];
    $pubwysig = $parsedBody[wysig];

    $pubname = addcslashes($pubname, "'");
    $pubwysig = addcslashes($pubwysig, "'");
    
    // UPDATE, I THINKKKK, It's better to make 2 API CALLS, first store the data. If this succeeds, another 'file upload' for thumbnail
    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqladdpub = "INSERT INTO publications (name, wysig) VALUES ('$pubname', '$pubwysig')";
    $stmtaddpub = $dbh->prepare($sqladdpub);
    $stmtaddpub->execute();
    $resultaddpub= $stmtaddpub->fetchAll(PDO::FETCH_ASSOC);
    $pubID = $dbh->lastInsertId();
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultaddpub);
    $debug = array('status' => 'success', 'addpublication' => $resultaddpub, 'insertId' => $pubID);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
}
);

// 2) Get publications
// TODO: Work OUT
$app->get('/getpublications', function (Request $request, Response $response) {
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlpublications = "SELECT * FROM publications";
    $stmtpublications = $dbh->prepare($sqlpublications);
    $stmtpublications->execute();
    $resultpublications = $stmtpublications->fetchAll(PDO::FETCH_ASSOC);

    // debug
    $data = array('Jsonresponse' => 'item1');
    
    $response = json_encode($resultpublications);
    return $response;
});

//3 ) Edit publication
// TODO: Work out
$app->post('/editpublication/{publicationid}', function (Request $request, Response $response) {
    $publicationid = $request->getAttribute('publicationid');
    $publicationid = (int)$publicationid;
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $publicationname = $parsedBody[name];
    $publicationwysig = $parsedBody[wysig];

    $publicationname = addcslashes($publicationname, "'");
    $publicationwysig = addcslashes($publicationwysig, "'");
    // UPDATE, I THINKKKK, It's better to make 2 API CALLS, first store the data. If this succeeds, another 'file upload' for thumbnail
    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    

    $sqleditpublication = "UPDATE publications SET name = '$publicationname' , wysig = '$publicationwysig' WHERE id = '$publicationid'";
    $stmteditpublication = $dbh->prepare($sqleditpublication);
    $stmteditpublication->execute();
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resulteditpublication);
    $debug = array('status' => 'success', 'editpublication' => $sqleditpublication);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});

// 4) Delete publication
// TODO: Test out
$app->get('/deletepublication/{publicationid}', function (Request $request, Response $response) {
    $publicationid = $request->getAttribute('publicationid');
    $publicationid = (int)$publicationid;

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqldeletepublication = "DELETE FROM publications WHERE id = $publicationid";
    $stmtdeletepublication = $dbh->prepare($sqldeletepublication);
    $stmtdeletepublication->execute();
    $resultdeletepublication = $stmtdeletepublication->fetchAll(PDO::FETCH_ASSOC);
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultdeletepublication);
    $debug = array('status' => 'success', 'deleted' => $publicationid);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});

// 5) set publication cover
// TODO: Work out
$app->post('/setpublicationcover/{pubid}', function (Request $request, Response $response) {
    $pubid = $request->getAttribute('pubid');
    $pubid = (int)$pubid;
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $coverurl = $parsedBody[coverurl];

    // TODO SET POST COVERURL WHERE pubid 

    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});
?>
