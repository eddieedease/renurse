<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API
// GROUPS GROUPS GROUPS GROUPS GROUPS
// GROUPS GROUPS GROUPS GROUPS GROUPS
// GROUPS GROUPS GROUPS GROUPS GROUPS
// GROUPS GROUPS GROUPS GROUPS GROUPS

// 1) Create group
// TODO: WORK OUT
$app->post('/creategroup', function (Request $request, Response $response) {
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $groupname = $parsedBody[name];
    $groupwysig = $parsedBody[wysig];

    $groupname = addcslashes($groupname, "'");
    $groupwysig = addcslashes($groupwysig, "'");
    
    // UPDATE, I THINKKKK, It's better to make 2 API CALLS, first store the data. If this succeeds, another 'file upload' for thumbnail
    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqladdgroup = "INSERT INTO groups (name, wysig) VALUES ('$groupname', '$groupwysig')";
    $stmtaddgroup = $dbh->prepare($sqladdgroup);
    $stmtaddgroup->execute();
    $resultaddgroup= $stmtaddgroup->fetchAll(PDO::FETCH_ASSOC);
    $groupID = $dbh->lastInsertId();
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultaddgroup);
    $debug = array('status' => 'success', 'addgroup' => $groupname, 'insertId' => $groupID);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
}
);

// 2) Get groups
// TODO: Work OUT
$app->get('/getgroups', function (Request $request, Response $response) {
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlgroups = "SELECT * FROM groups";
    $stmtgroups = $dbh->prepare($sqlgroups);
    $stmtgroups->execute();
    $resultgroups = $stmtgroups->fetchAll(PDO::FETCH_ASSOC);

    // debug
    $data = array('Jsonresponse' => 'item1');
    
    $response = json_encode($resultgroups);
    return $response;
});

// GET SPECIFIC GROUP USERS
$app->get('/getgroupusers/{groupid}', function (Request $request, Response $response) {

    $groupid = $request->getAttribute('groupid');
    $groupid = (int)$groupid;


    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlgroupsusers = "SELECT userid FROM users_to_groups WHERE groupsid = $groupid";
    $stmtgroupsusers = $dbh->prepare($sqlgroupsusers);
    $stmtgroupsusers->execute();
    $resultgroupsusers = $stmtgroupsusers->fetchAll(PDO::FETCH_ASSOC);

    // debug
    $data = array('Jsonresponse' => 'item1');
    
    $response = json_encode($resultgroupsusers);
    return $response;
});

//3 ) Edit group
// TODO: Work out
$app->post('/editgroup/{groupid}', function (Request $request, Response $response) {
    $groupid = $request->getAttribute('groupid');
    $groupid = (int)$groupid;
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $groupname = $parsedBody[name];
    $groupwysig = $parsedBody[wysig];

    $groupname = addcslashes($groupname, "'");
    $groupwysig = addcslashes($groupwysig, "'");
    // UPDATE, I THINKKKK, It's better to make 2 API CALLS, first store the data. If this succeeds, another 'file upload' for thumbnail
    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    

    $sqleditgroup = "UPDATE groups SET name = '$groupname' , wysig = '$groupwysig' WHERE id = '$groupid'";
    $stmteditgroup = $dbh->prepare($sqleditgroup);
    $stmteditgroup->execute();
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resulteditgroup);
    $debug = array('status' => 'success', 'editgroup' => $sqleditgroup);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});

// 4) Delete group
// TODO: TEST
$app->get('/deletegroup/{groupid}', function (Request $request, Response $response) {
    $groupid = $request->getAttribute('groupid');
    $groupid = (int)$groupid;

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqldeletegroup = "DELETE FROM groups WHERE id = $groupid";
    $stmtdeletegroup = $dbh->prepare($sqldeletegroup);
    $stmtdeletegroup->execute();
    $resultdeletegroup = $stmtdeletegroup->fetchAll(PDO::FETCH_ASSOC);
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultdeletegroup);
    $debug = array('status' => 'success', 'deleted' => $groupid);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});


// NOTE: User can be added or removed userfromgroup
$app->get('/usertogroup/{userid}/{groupid}', function (Request $request, Response $response) {
    $userid = $request->getAttribute('userid');
    $userid = (int)$userid;
    $groupid = $request->getAttribute('groupid');
    $groupid = (int)$groupid;

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqlusertogroup = "INSERT INTO users_to_groups (userid, groupsid) VALUES ('$userid','$groupid')";
    $stmtusertogroup = $dbh->prepare($sqlusertogroup);
    $stmtusertogroup->execute();
    $resultusertogroup = $stmtusertogroup->fetchAll(PDO::FETCH_ASSOC);
    
    $data = array('Status' => 'success');
    $response = json_encode($data);
    return $response;
});

// NOTE: User can be added or removed userfromgroup
$app->get('/userfromgroup/{userid}/{groupid}', function (Request $request, Response $response) {
    $userid = $request->getAttribute('userid');
    $userid = (int)$userid;
    $groupid = $request->getAttribute('groupid');
    $groupid = (int)$groupid;

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqluserfromgroup = "DELETE FROM users_to_groups WHERE userid = $userid AND groupsid = $groupid";
    $stmtuserfromgroup = $dbh->prepare($sqluserfromgroup);
    $stmtuserfromgroup->execute();
    $resultuserfromgroup = $stmtuserfromgroup->fetchAll(PDO::FETCH_ASSOC);

    $data = array('Status' => 'success');
    $response = json_encode($data);
    return $response;
});



// 5) set publication cover
// TODO: Work out
$app->post('/setgroupcover/{researchid}', function (Request $request, Response $response) {
    $researchid = $request->getAttribute('researchid');
    $researchid = (int)$researchid;
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $coverurl = $parsedBody[coverurl];


    // TODO SET POST COVERURL WHERE researchid 
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});



?>
