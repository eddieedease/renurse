<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API whoiswho
// whoiswho whoiswho

// 1) Create who
// TODO: WORK OUT
$app->post('/createwho', function (Request $request, Response $response) {
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $whoname = $parsedBody[name];
    $whowysig = $parsedBody[wysig];
    $ttype = $parsedBody[ttype];

    $whoname = addcslashes($whoname, "'");
    $whowysig = addcslashes($whowysig, "'");
    
    // UPDATE, I THINKKKK, It's better to make 2 API CALLS, first store the data. If this succeeds, another 'file upload' for thumbnail
    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqladdwho = "INSERT INTO whoiswho (name, type, wysig) VALUES ('$whoname', $ttype , '$whowysig')";
    $stmtaddwho = $dbh->prepare($sqladdwho);
    $stmtaddwho->execute();
    $resultaddwho= $stmtaddwho->fetchAll(PDO::FETCH_ASSOC);
    $whoID = $dbh->lastInsertId();
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultaddwho);
    $debug = array('status' => 'success', 'addwho' => $resultaddwho, 'insertId' => $whoID);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
}
);

// 2) Get whoiswho
// TODO: Work OUT
$app->get('/getwhoiswho', function (Request $request, Response $response) {
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlwhoiswho = "SELECT * FROM whoiswho";
    $stmtwhoiswho = $dbh->prepare($sqlwhoiswho);
    $stmtwhoiswho->execute();
    $resultwhoiswho = $stmtwhoiswho->fetchAll(PDO::FETCH_ASSOC);

    // debug
    $data = array('Jsonresponse' => 'item1');
    
    $response = json_encode($resultwhoiswho);
    return $response;
});

//3 ) Edit who
// TODO: Work out
$app->post('/editwho/{whoid}', function (Request $request, Response $response) {
    $whoid = $request->getAttribute('whoid');
    $whoid = (int)$whoid;
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $whoname = $parsedBody[name];
    $whowysig = $parsedBody[wysig];
    $whowtype = $parsedBody[ttype];

    $whoname = addcslashes($whoname, "'");
    $whowysig = addcslashes($whowysig, "'");
    // UPDATE, I THINKKKK, It's better to make 2 API CALLS, first store the data. If this succeeds, another 'file upload' for thumbnail
    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    

    $sqleditwho = "UPDATE whoiswho SET name = '$whoname' , type = $whowtype,  wysig = '$whowysig' WHERE id = '$whoid'";
    $stmteditwho = $dbh->prepare($sqleditwho);
    $stmteditwho->execute();
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resulteditwho);
    $debug = array('status' => 'success', 'editwho' => $sqleditwho);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});

// 4) Delete who
// TODO: Test out
$app->get('/deletewho/{whoid}', function (Request $request, Response $response) {
    $whoid = $request->getAttribute('whoid');
    $whoid = (int)$whoid;

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqldeletewho = "DELETE FROM whoiswho WHERE id = $whoid";
    $stmtdeletewho = $dbh->prepare($sqldeletewho);
    $stmtdeletewho->execute();
    $resultdeletewho = $stmtdeletewho->fetchAll(PDO::FETCH_ASSOC);
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultdeletewho);
    $debug = array('status' => 'success', 'deleted' => $whoid);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});

// 5) set who cover
// TODO: Work out
$app->post('/setwhocover/{whoid}', function (Request $request, Response $response) {
    $whoid = $request->getAttribute('whoid');
    $whoid = (int)$whoid;
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $coverurl = $parsedBody[coverurl];

    // TODO SET POST COVERURL WHERE whoid 

    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});
?>
