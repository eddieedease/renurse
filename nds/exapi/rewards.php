<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\UploadedFileInterface as UploadedFile;
// API
// REWARDS REWARDS REWARDS REWARDS
// REWARDS REWARDS REWARDS REWARDS
// REWARDS REWARDS REWARDS REWARDS
// REWARDS REWARDS REWARDS REWARDS

// CALS
// 1) GET rewards
// 2) ADD reward
// 2) DELETE reward
// 3) SET ACTIVE
// 4) EDIT AWARD


// 1 GET REWARDS
$app->get('/getrewards', function (Request $request, Response $response) {
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlusers = 'SELECT * FROM rewards';
    $stmtusers = $dbh->prepare($sqlusers);
    $stmtusers->execute();
    $resultusers = $stmtusers->fetchAll(PDO::FETCH_ASSOC);
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultusers);

    //     convert it all to jSON TODO change result
    $response = json_encode($result);
    return $response;
}
);

$app->get('/getactiverewards', function (Request $request, Response $response) {
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlusers = 'SELECT * FROM rewards WHERE active = 1';
    $stmtusers = $dbh->prepare($sqlusers);
    $stmtusers->execute();
    $resultusers = $stmtusers->fetchAll(PDO::FETCH_ASSOC);
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultusers);

    //     convert it all to jSON TODO change result
    $response = json_encode($result);
    return $response;
}
);



// 2 new REWARD
// TODO: MEE BEZIG MEE BEZIG MEE BEZIG MEE BEZIG
$app->post('/newreward', function (Request $request, Response $response) {
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $rewardname = $parsedBody[rewardname];
    $rewardinfo = $parsedBody[rewardinfo];
    $rewardprice = $parsedBody[rewardprice];
    
    
    // UPDATE, I THINKKKK, It's better to make 2 API CALLS, first store the data. If this succeeds, another 'file upload' for thumbnail

    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqladdreward = "INSERT INTO rewards (name, info,price, active) VALUES ('$rewardname', '$rewardinfo','$rewardprice',  1  )";
    $stmtaddreward = $dbh->prepare($sqladdreward);
    $stmtaddreward->execute();
    $resultaddreward= $stmtaddreward->fetchAll(PDO::FETCH_ASSOC);
    $rewardID = $dbh->lastInsertId();


    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultaddreward);
    $debug = array('status' => 'success', 'addreward' => $rewardname, 'sql' => $sqladdreward, 'insertId' => $rewardID);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
}
);

// 2 new REWARD
// TODO: MEE BEZIG MEE BEZIG MEE BEZIG MEE BEZIG
$app->post('/editreward/{rewardid}', function (Request $request, Response $response) {
    $rewardid = $request->getAttribute('rewardid');
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $rewardname = $parsedBody[rewardname];
    $rewardinfo = $parsedBody[rewardinfo];
    $rewardprice = $parsedBody[rewardprice];
    // UPDATE, I THINKKKK, It's better to make 2 API CALLS, first store the data. If this succeeds, another 'file upload' for thumbnail

    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    $sqleditreward = "UPDATE rewards SET name = '$rewardname', info = '$rewardinfo', price = $rewardprice WHERE id = '$rewardid'";
    $stmteditreward = $dbh->prepare($sqleditreward);
    $stmteditreward->execute();
    $resulteditreward= $stmteditreward->fetchAll(PDO::FETCH_ASSOC);
    // $rewardID = $dbh->lastInsertId();

    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resulteditreward);
    $debug = array('status' => 'success', 'editreward' => $rewardname, 'sql' => $sqleditreward, 'awardid' => $rewardid);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
}
);

$app->get('/setrewardactive/{rewardid}/{active}', function (Request $request, Response $response) {
    // Active can either be 0 or 1, 0 is not active, 1 is active
    $rewardid = $request->getAttribute('rewardid');
    $active = $request->getAttribute('active');

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqlsetrewardactive = "UPDATE rewards SET active = $active WHERE id = $rewardid";
    $stmtsetrewardactive = $dbh->prepare($sqlsetrewardactive);
    $stmtsetrewardactive->execute();
    $resultsetrewardactive = $stmtsetrewardactive->fetchAll(PDO::FETCH_ASSOC);
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultsetrewardactive);

    //     convert it all to jSON TODO change result
    $response = json_encode($resultsetrewardactive);
    return $response;
}
);

?>
