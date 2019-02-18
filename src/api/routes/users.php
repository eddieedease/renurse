<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

// API
// USERS USERS USERS USERS USERS
// USERS USERS USERS USERS USERS
// USERS USERS USERS USERS USERS
// USERS USERS USERS USERS USERS


// 1) Create user
// TODO: TEST OUT
$app->post('/createuser', function (Request $request, Response $response) {
    $parsedBody = $request->getParsedBody();
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's
    $name = $parsedBody[uname];
    $lastname = $parsedBody[lastname];
    $email = $parsedBody[email];
    $pwd = $parsedBody[pwd];
    // hash it
    // create secret
    $secret = randomSecret();
    
    // UPDATE, I THINKKKK, It's better to make 2 API CALLS, first store the data. If this succeeds, another 'file upload' for thumbnail
    include 'db.php';
    // Insert the link into our DATABASE
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqladdgroup = "INSERT INTO users (uname, lastname, email, pwd, secret) VALUES ('$name', '$lastname','$email', '$pwd', '$secret')";
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


// 2) Get users
// TODO: Work OUT
$app->get('/getusers', function (Request $request, Response $response) {
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlusers = "SELECT * FROM users";
    $stmtusers = $dbh->prepare($sqlusers);
    $stmtusers->execute();
    $resultusers = $stmtusers->fetchAll(PDO::FETCH_ASSOC);

    // debug
    $data = array('Jsonresponse' => 'item1');
    
    $response = json_encode($resultusers);
    return $response;
});

//3 ) Edit user
// TODO: Work out
$app->post('/edituser/{userid}', function (Request $request, Response $response) {
    $userid = $request->getAttribute('userid');
    $userid = (int)$userid;


    $parsedBody = $request->getParsedBody();

    $name = $parsedBody[uname];
    $lastname = $parsedBody[lastname];
    $email = $parsedBody[email];
    $pwd = $parsedBody[pwd];

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    
    // TODO: ADD SOME SALTING RIGHT THERE
    // Some logic to check the pwd's

    $sqledituser = "UPDATE users SET uname = '$name' , lastname = '$lastname', email = '$email', pwd = '$pwd' WHERE id = '$userid'";
    $stmtedituser = $dbh->prepare($sqledituser);
    $stmtedituser->execute();
    // hash it
    $data = array('Jsonresponse' => $resultedituser);
    $response = json_encode($data);
    return $response;
});

// 4) Delete User
// TODO: TEST out
$app->get('/deleteuser/{userid}', function (Request $request, Response $response) {
    $userid = $request->getAttribute('userid');
    $userid = (int)$userid;

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqldeleteuser = "DELETE FROM users WHERE id = $userid";
    $stmtdeleteuser = $dbh->prepare($sqldeleteuser);
    $stmtdeleteuser->execute();
    $resultdeleteuser = $stmtdeleteuser->fetchAll(PDO::FETCH_ASSOC);
    //     NOTE colleting everything for converting
    $result = array();
    array_push($result, $resultdeleteuser);
    $debug = array('status' => 'success', 'deleted' => $userid);
    //     convert it all to jSON TODO change result
    $response = json_encode($debug);
    return $response;
});


// 5) Login functionality
// TODO: TEST Out
$app->post('/login/{usrname}', function (Request $request, Response $response) {
    $usrname = $request->getAttribute('usrname');
    //  get the secret
    $parsedBody = $request->getParsedBody();
    $pwd = $parsedBody[pwd];
    
    
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqllogin = "SELECT id, uname, lastname, pwd, email, secret, type FROM users WHERE email = '$usrname'";
    $stmtlogin = $dbh->prepare($sqllogin);
    $stmtlogin->execute();
    $resultlogin = $stmtlogin->fetchAll(PDO::FETCH_ASSOC);
    $aipassword = $resultlogin[0]['pwd'];
    $aiemail = $resultlogin[0]['email'];
    $ainame = $resultlogin[0]['uname'];
    $ailastname = $resultlogin[0]['lastname'];
    $aiid = $resultlogin[0]['id'];
    $aisecret = $resultlogin[0]['secret'];
    $aitype = $resultlogin[0]['type'];
    //  Match passwords against each other, if succesfull give back secret key for storing in Cookie
    if ($pwd == $aipassword) {
        // debugging Line
        // TODO: We must acces the user to groups, and give that array back to 
        $groupids = [];
        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
        // TODO: check if admin, if it is make query to get all groupID's
        // IF it is user, return active groups for user
        if ($aitype == '1'){
            $sqlgetgroups = "SELECT groupsid FROM users_to_groups WHERE userid = '$aiid'";
        } else {
            $sqlgetgroups = "SELECT id FROM groups";
        }

        $stmtgetgroups = $dbh->prepare($sqlgetgroups);
        $stmtgetgroups->execute();
        $resultgetgroups = $stmtgetgroups->fetchAll(PDO::FETCH_ASSOC);

        // Populate the groupids
        // first construct id string to fetch questions
        // TODO: TODO: TODO: HIER ZIJN
        foreach ($resultgetgroups as $group) {
            array_push($answersIdsToCheck, $answer[qid]);
            array_push($userAnswers, $answer[aid]);
        }


        $cb = array('status' => 'success', 'secret' => $aisecret, 'name' => $ainame, 'lastname' => $ailastname, 'email' => $aiemail, 'usrid' => $aiid, 'type' => $aitype, 'groupids' => $groupid);
    } else {
        // $cb = array('loginError' => $usrname, 'new' => [$pwd, $sqllogin ,$resultlogin]);
        $cb = array('status' => 'failed');
    }
    // debugging Line
    // $debug = array('login' => $sqllogin, 'secret' => $parsedBody[pwd]);
    $response = json_encode($cb);
    //     convert it all to jSON TODO change result
    return $response;
});


// 6) CHANGE PWD of user (user do this self)
// TODO: TEST OUT
$app->post('/changepwd/{requestid}', function (Request $request, Response $response) {
    $requestid = $request->getAttribute('requestid');
    $parsedBody = $request->getParsedBody();
    $oldpwd = $parsedBody[oldpwd];
    // hash it to check against stored one
    $newpwd = $parsedBody[newpwd];
    
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    // first off, get user row info, and compare old and new pwd
    $sqllogin = "SELECT * FROM users WHERE id = '$requestid'";
    $stmtlogin = $dbh->prepare($sqllogin);
    $stmtlogin->execute();
    $resultlogin = $stmtlogin->fetchAll(PDO::FETCH_ASSOC);
    $aipassword = $resultlogin[0]['pwd'];
    if ($oldpwd == $aipassword) {
        // OKE CHANGE STUFF
        // Store new pwd as hash
        $sqlchangepwd = "UPDATE users SET pwd = '$newpwd' WHERE id = '$requestid'";
        $stmtchangepwd = $dbh->prepare($sqlchangepwd);
        $stmtchangepwd->execute();
        $resultchangepwd = $stmtchangepwd->fetchAll(PDO::FETCH_ASSOC);
        $debug = array('status' => 'success');
    } else {
        // is not right, communicatie
        $debug = array('status' => 'failed', 'oldpwd' => $oldpwd, 'dbpassword' => $aipassword);
    }
    $response = json_encode($debug);
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

function randomSecret() {
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
