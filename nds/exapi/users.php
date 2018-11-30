<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API
// USERS USERS USERS USERS USERS
// USERS USERS USERS USERS USERS
// USERS USERS USERS USERS USERS
// USERS USERS USERS USERS USERS

// CALS
// 1 ) ADD user
// 2)  GET users
// 3)  DELETE user
// 4)  Edituser user
// 5)   Login
// 6)  Assignpoints
// 7*) BULK CSV Import User
// 8 change pwd for user
// 9 ARCADEINPUTS

// 1 ) ADD user
// StudentID, Name, emailadres
// Add user, generate password, send email to user
// TODO: Send back ID so that the front-end can send email.
$app->get('/adduser/{schoolid}/{email}/{name}', function (Request $request, Response $response) {
    $schoolid = $request->getAttribute('schoolid');
    $email = $request->getAttribute('email');
    $name = $request->getAttribute('name');
    // make random pwd
    $pwd = randomPassword();
    // make random secret
    $secret = randomPassword();
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqladduser = "INSERT INTO users (schoolid, email, name, type, pointsarcade, pointsspend, pwd, secret) VALUES ('$schoolid', '$email', '$name', 0, 0,0, '$pwd', '$secret')";
    $stmtadduser = $dbh->prepare($sqladduser);
    $stmtadduser->execute();
    $resultadduser = $stmtadduser->fetchAll(PDO::FETCH_ASSOC);
    // We want to give back the ID so the front end can send mail
    $usrID = $dbh->lastInsertId();
    //     convert it all to jSON TODO change result
    $debug = array('status' => 'success', 'usrID' => $usrID);
    $response = json_encode($debug);
    return $response;
}
);






// 2)
// NOTE: the getusers API CALL
$app->get('/getusers', function (Request $request, Response $response) {
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlusers = 'SELECT * FROM users';
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

// Get the info of the current user
$app->get('/getuserinfo/{userid}', function (Request $request, Response $response) {
    $usrid = $request->getAttribute('userid');
    $usrid = (int)$usrid;
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlgetuserinfo = "SELECT * FROM users WHERE schoolid = $usrid";
    $stmtgetuserinfo = $dbh->prepare($sqlgetuserinfo);
    $stmtgetuserinfo->execute();
    $resultgetuserinfo = $stmtgetuserinfo->fetchAll(PDO::FETCH_ASSOC);

    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultgetuserinfo);

    //     convert it all to jSON TODO change result
    $response = json_encode($resultgetuserinfo);
    return $response;
}
);



// 3) DELETE user
// NOTE: the getusers API CALL
$app->get('/deleteuser/{usrid}', function (Request $request, Response $response) {
    $usrid = $request->getAttribute('usrid');
    $usrid = (int)$usrid;
    
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqldeleteuser = "DELETE FROM users WHERE id = $usrid";
    $stmtdeleteuser = $dbh->prepare($sqldeleteuser);
    $stmtdeleteuser->execute();
    $resultdeleteuser = $stmtdeleteuser->fetchAll(PDO::FETCH_ASSOC);

    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultdeleteuser);
    $debug = array('status' => 'success', 'deleted' => $usrid, 'sql' => $sqldeleteuser);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
}
);



// 5) Login
//  Login the system for a user,
// NEEDS username witn in post body the password
// give back SECRET + USER_TYPE
$app->post('/login/{schoolid}', function (Request $request, Response $response) {
    $schoolid = $request->getAttribute('schoolid');
    //  get the secret
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $pwd = $parsedBody[pwd];

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    $sqllogin = "SELECT * FROM users WHERE schoolid = '$schoolid'";
    $stmtlogin = $dbh->prepare($sqllogin);
    $stmtlogin->execute();
    $resultlogin = $stmtlogin->fetchAll(PDO::FETCH_ASSOC);
    $aipassword = $resultlogin[0]['pwd'];
    
    $aiid = $resultlogin[0]['id'];
    $aischoolid = $resultlogin[0]['schoolid'];
    $ainame = $resultlogin[0]['name'];
    $aitype = $resultlogin[0]['type'];
   
    $aiemail = $resultlogin[0]['email'];
    $aipoints = $resultlogin[0]['points'];
    $aiordered = $resultlogin[0]['ordered'];
    $aipwd = $resultlogin[0]['pwd'];
    $aisecret = $resultlogin[0]['secret'];
   

    //  Match passwords against each other, if succesfull give back secret key for storing in Cookie client-side
    if (md5($pwd) == $aipassword) {
        // debugging Line
        $cb = array('login' => 'SUCCESS','usrid' => $aiid,'name' => $ainame, 'schoolid' => $aischoolid, 'secret' => $aisecret, 'type' => $aitype, 'email' => $aiemail);
    } else {
        // $cb = array('loginError' => $usrname, 'new' => [$pwd, $sqllogin ,$resultlogin]);
        $cb = array('login' => 'ERROR');
    }

    $response = json_encode($cb);
    //     convert it all to jSON TODO change result
    return $response;
}
);

// NOTE: THIS IS FROM THE ARCADEEEEE
// 6)) Assign points
// gets a userid & arcadepoints number from arcade and store it in db
$app->get('/assignpoints/{usrid}/{arcadepoints}', function (Request $request, Response $response) {
    $usrid = $request->getAttribute('usrid');
    $usrid = (int)$usrid;

    $arcadepoints = $request->getAttribute('arcadepoints');
    $arcadepoints = (int)$arcadepoints;
    
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    $sqlassignpoints = "UPDATE users SET pointsarcade = $arcadepoints WHERE schoolid = $usrid";
    $stmtassignpoints = $dbh->prepare($sqlassignpoints);
    $stmtassignpoints->execute();
    $resultassignpoints = $stmtassignpoints->fetchAll(PDO::FETCH_ASSOC);


    // Alright get the user name
    $sqlgetusername = "SELECT name, email FROM users WHERE schoolid = '$usrid'";
    $stmtgetusername = $dbh->prepare($sqlgetusername);
    $stmtgetusername->execute();
    $resultgetusername = $stmtgetusername->fetchAll(PDO::FETCH_ASSOC);
    $aiusername = $resultgetusername[0]['name'];
    $aiemail = $resultgetusername[0]['email'];
    
    // Now, add new record to the arcade inputs 
    $sqlinsertarcadeinput = "INSERT INTO arcadeinput (userid, username, email, points, datetime) VALUES ('$usrid', '$aiusername', '$aiemail', $arcadepoints, CURDATE())";
    $stmtinsertarcadeinput = $dbh->prepare($sqlinsertarcadeinput);
    $stmtinsertarcadeinput->execute();
    $resultinsertarcadeinput = $stmtinsertarcadeinput->fetchAll(PDO::FETCH_ASSOC);



    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultassignpoints);
    $debug = array('sql1' => $sqlassignpoints, 'sql2' => $sqlgetusername, 'sql3' => $sqlinsertarcadeinput);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
}
);

// TODO: Work this out
// adjusting points
// 2 params, usrid * 'kind' (0 = -1, 1 = +1)
$app->get('/adjustpoints/{usrid}/{kind}', function (Request $request, Response $response) {
    
    $usrid = $request->getAttribute('usrid');
    $usrid = (int)$usrid;
    $kind = $request->getAttribute('kind');
    $kind = (int)$kind;
    
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    
    switch ($kind) {
        case 0:
        $sqladjustpoints = "UPDATE users SET `pointsspend`= `pointsspend`- 1 WHERE schoolid = $usrid";
            break;
        case 1:
        $sqladjustpoints = "UPDATE users SET `pointsspend`= `pointsspend`+ 1 WHERE schoolid = $usrid";
            break;
    }
    

    $stmtadjustpoints = $dbh->prepare($sqladjustpoints);
    $stmtadjustpoints->execute();
    $resultadjustpoints = $stmtadjustpoints->fetchAll(PDO::FETCH_ASSOC);

    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultadjustpoints);

    $debug = array('status' => 'success', 'kind' => $kind, 'usrid' => $usrid, 'sql' => $sqladjustpoints);

    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
}
);


// NOTE: THIS IS FROM THE PLATFORM
// 6b)) Assign points
// gets a userid & arcadepoints number from arcade and store it in db
$app->get('/assignpointsplatform/{usrid}/{spendpoints}', function (Request $request, Response $response) {
    $usrid = $request->getAttribute('usrid');
    $usrid = (int)$usrid;

    $spendpoints = $request->getAttribute('spendpoints');
    $spendpoints = (int)$spendpoints;
    
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    $sqlassignpoints = "UPDATE users SET pointsspend = $spendpoints WHERE schoolid = $usrid";
    $stmtassignpoints = $dbh->prepare($sqlassignpoints);
    $stmtassignpoints->execute();
    $resultassignpoints = $stmtassignpoints->fetchAll(PDO::FETCH_ASSOC);

    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultassignpoints);
    $debug = array('status' => 'success', 'assignedpoints' => $spendpoints, 'sql' => $sqlassignpoints);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
}
);


// ARCADE INPUTS, THIS IS A DIFFERENT TABLE FILLMENT WHICH TRACKS THE TIMES SOMETHING WENT IN
$app->get('/getinputs', function (Request $request, Response $response) {
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlarcadeinput = 'SELECT * FROM arcadeinput';
    $stmtarcadeinput = $dbh->prepare($sqlarcadeinput);
    $stmtarcadeinput->execute();
    $resultarcadeinput = $stmtarcadeinput->fetchAll(PDO::FETCH_ASSOC);

    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultarcadeinput);

    //     convert it all to jSON TODO change result
    $response = json_encode($result);
    return $response;
}
);

// TODO: TODO: GET INPUTS BETWEEN DATES
$app->get('/getinputsbetweendates/{from}/{to}', function (Request $request, Response $response) {

    $from = $request->getAttribute('from');
    $to = $request->getAttribute('to');

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlgetinputsbetween = ("SELECT * FROM arcadeinput WHERE datetime between '$from' AND '$to'");
    $stmtgetinputsbetween = $dbh->prepare($sqlgetinputsbetween);
    $stmtgetinputsbetween->execute();
    $resultgetinputsbetween = $stmtgetinputsbetween->fetchAll(PDO::FETCH_ASSOC);

    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultgetinputsbetween);

    //     convert it all to jSON TODO change result
    $response = json_encode($result);
    return $response;
}
);





// 8)) changepwd user
// TODO: this must be DONE< ONLY TEMPLATE CODE
$app->post('/changepwd/{schoolid}', function (Request $request, Response $response) {
    $schoolid = $request->getAttribute('schoolid');
    //  get the secret
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $pwd = $parsedBody[pwd];

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    $sqllogin = "SELECT * FROM users WHERE schoolid = '$schoolid'";
    $stmtlogin = $dbh->prepare($sqllogin);
    $stmtlogin->execute();
    $resultlogin = $stmtlogin->fetchAll(PDO::FETCH_ASSOC);
    $aipassword = $resultlogin[0]['pwd'];
    
    $aiid = $resultlogin[0]['id'];
    $aischoolid = $resultlogin[0]['schoolid'];
    $ainame = $resultlogin[0]['name'];
    $aitype = $resultlogin[0]['type'];
   
    $aiemail = $resultlogin[0]['email'];
    $aipoints = $resultlogin[0]['points'];
    $aiordered = $resultlogin[0]['ordered'];
    $aipwd = $resultlogin[0]['pwd'];
    $aisecret = $resultlogin[0]['secret'];
   

    //  Match passwords against each other, if succesfull give back secret key for storing in Cookie client-side
    if (md5($pwd) == $aipassword) {
        // debugging Line
        $cb = array('login' => 'SUCCESS','usrid' => $aiid,'name' => $ainame, 'schoolid' => $aischoolid, 'secret' => $aisecret, 'type' => $aitype, 'email' => $aiemail);
    } else {
        // $cb = array('loginError' => $usrname, 'new' => [$pwd, $sqllogin ,$resultlogin]);
        $cb = array('login' => 'ERROR');
    }

    $response = json_encode($cb);
    //     convert it all to jSON TODO change result
    return $response;
}
);

// EXTRA Functions
// create random function
function randomPassword() {
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = array(); //remember to declare $pass as an array
    $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
    for ($i = 0; $i < 16; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass); //turn the array into a string
}
?>
