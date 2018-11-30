<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API
// COLLECTS COLLECTS COLLECTS COLLECTS
// COLLECTS COLLECTS COLLECTS COLLECTS
// COLLECTS COLLECTS COLLECTS COLLECTS
// COLLECTS COLLECTS COLLECTS COLLECTS


// CALS
// 1 ) NEW collected
// 2)  GET collected awards
// 3)  GET collected awards of specific id
// 4)  Set collected
// 5*) EDIT collected


// 1 NEW collected
// TODO: Not tested yet
$app->post('/newcollected/{usrid}/{priceid}', function (Request $request, Response $response) {
    $usrid = $request->getAttribute('usrid');
    $priceid = $request->getAttribute('priceid');

    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $rewardname = $parsedBody[rewardname];
    $userrname = $parsedBody[username];
    $rewardprice = $parsedBody[rewardprice];

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
     

    $sqlnewcollected = "INSERT INTO collects (userid, username, rewardid, rewardname, rewardprice) VALUES ('$usrid', '$userrname', '$priceid', '$rewardname', '$rewardprice')";
    $stmtnewcollected= $dbh->prepare($sqlnewcollected);
    $stmtnewcollected->execute();
    $resultnewcollected = $stmtnewcollected->fetchAll(PDO::FETCH_ASSOC);

    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultnewcollected);

    //     convert it all to jSON TODO change result
    $response = json_encode($result);
    return $response;
}
);

// 2 Get collected awards
$app->get('/getcollected', function (Request $request, Response $response) {
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlgetcollected = 'SELECT * FROM collects';
    $stmtgetcollected = $dbh->prepare($sqlgetcollected);
    $stmtgetcollected->execute();
    $resultgetcollected = $stmtgetcollected->fetchAll(PDO::FETCH_ASSOC);

    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultgetcollected);

    //     convert it all to jSON TODO change result
    $response = json_encode($resultgetcollected);
    return $response;
}
);


// 3 GET collected awards of specific userid
// Get the info of the current user
$app->get('/getusercollected/{userid}', function (Request $request, Response $response) {
    $usrid = $request->getAttribute('userid');
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlgetusercollected = "SELECT * FROM collects WHERE userid = $usrid";
    $stmtgetusercollected = $dbh->prepare($sqlgetusercollected);
    $stmtgetusercollected->execute();
    $resultgetusercollected = $stmtgetusercollected->fetchAll(PDO::FETCH_ASSOC);
    // NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultgetusercollected, $sqlgetusercollected );
    //     convert it all to jSON TODO change result
    $response = json_encode($resultgetusercollected);
    return $response;
}
);

// Toggle an collected Item
$app->get('/togglecollected/{collectid}/{prostatus}', function (Request $request, Response $response) {
    $collectid = $request->getAttribute('collectid');
    $prostatus = $request->getAttribute('prostatus');
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqltogglecollected = "UPDATE collects SET processed = $prostatus WHERE id = $collectid";
    $stmttogglecollected = $dbh->prepare($sqltogglecollected);
    $stmttogglecollected->execute();
    $resulttogglecollected = $stmttogglecollected->fetchAll(PDO::FETCH_ASSOC);
    // NOTE colleting everything for converting
    $result = array();
    array_push($result, $resulttogglecollected, $sqltogglecollected );
    //     convert it all to jSON TODO change result
    $response = json_encode($resulttogglecollected);
    return $response;
}
);

?>
