<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API news
// news news

// 1) Create news
// TODO: WORK OUT
$app->post('/createnews', function (Request $request, Response $response) {
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $newsname = $parsedBody[name];
    $newswysig = $parsedBody[wysig];

    $newsname = addcslashes($newsname, "'");
    $newswysig = addcslashes($newswysig, "'");
    
    // UPDATE, I THINKKKK, It's better to make 2 API CALLS, first store the data. If this succeeds, another 'file upload' for thumbnail
    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqladdnews = "INSERT INTO news (name, wysig) VALUES ('$newsname', '$newswysig')";
    $stmtaddnews = $dbh->prepare($sqladdnews);
    $stmtaddnews->execute();
    $resultaddnews= $stmtaddnews->fetchAll(PDO::FETCH_ASSOC);
    $newsID = $dbh->lastInsertId();
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultaddnews);
    $debug = array('status' => 'success', 'addnews' => $resultaddnews, 'insertId' => $newsID);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
}
);

// 2) Get news
// TODO: Work OUT
$app->get('/getnews', function (Request $request, Response $response) {
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlnews = "SELECT * FROM news";
    $stmtnews = $dbh->prepare($sqlnews);
    $stmtnews->execute();
    $resultnews = $stmtnews->fetchAll(PDO::FETCH_ASSOC);

    // debug
    $data = array('Jsonresponse' => 'item1');
    
    $response = json_encode($resultnews);
    return $response;
});

//3 ) Edit news
// TODO: Work out
$app->post('/editnews/{newsid}', function (Request $request, Response $response) {
    $newsid = $request->getAttribute('newsid');
    $newsid = (int)$newsid;
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $newsname = $parsedBody[name];
    $newswysig = $parsedBody[wysig];

    $newsname = addcslashes($newsname, "'");
    $newswysig = addcslashes($newswysig, "'");
    // UPDATE, I THINKKKK, It's better to make 2 API CALLS, first store the data. If this succeeds, another 'file upload' for thumbnail
    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    

    $sqleditnews = "UPDATE news SET name = '$newsname' , wysig = '$newswysig' WHERE id = $newsid";
    $stmteditnews = $dbh->prepare($sqleditnews);
    $stmteditnews->execute();
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resulteditnews);
    $debug = array('status' => 'success', 'editnews' => $sqleditnews);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});

// 4) Delete news
// TODO: Test out
$app->get('/deletenews/{newsid}', function (Request $request, Response $response) {
    $newsid = $request->getAttribute('newsid');
    $newsid = (int)$newsid;

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqldeletenews = "DELETE FROM news WHERE id = $newsid";
    $stmtdeletenews = $dbh->prepare($sqldeletenews);
    $stmtdeletenews->execute();
    $resultdeletenews = $stmtdeletenews->fetchAll(PDO::FETCH_ASSOC);
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultdeletenews);
    $debug = array('status' => 'success', 'deleted' => $newsid);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});

// 5) set news cover
// TODO: Work out
$app->post('/setnewscover/{newsid}', function (Request $request, Response $response) {
    $newsid = $request->getAttribute('newsid');
    $newsid = (int)$newsid;
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $coverurl = $parsedBody[coverurl];

    // TODO SET POST COVERURL WHERE newsid 

    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});
?>
