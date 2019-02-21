<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\UploadedFileInterface as UploadedFile;

// API
// FILES FILES FILES FILES FILES
// FILES FILES FILES FILES FILES
// FILES FILES FILES FILES FILES

// TODO:
// Upload Logo
// Delete logo

// 1) UPLOAD A FILE TO A GROUP
// TODO: Work out
// NEED: GROUPID parameter, filename header
$app->post('/filetogroup/{groupid}', function (Request $request, Response $response) {
    $groupid = $request->getAttribute('groupid');
    $groupid = (int) $groupid;
    // $filename = $request->getHeader('filename');
    $directory = $this->get('upload_directory');
    $uploadedFiles = $request->getUploadedFiles();
    // // handle single input with single file upload
    $uploadedFile = $uploadedFiles[file];
    $nameofuploaded = $uploadedFile->getClientFilename();
    
    // $file = $_FILES[file][tmp_name];
    // list($width, $height) = getimagesize($_FILES[file][tmp_name]);
    $ext = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    
    if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
        $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $nameofuploaded);
        // shoot in the database
        include 'db.php';
        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
        $sqlnewfile = "INSERT INTO files (name, type, togroup, urlloc ) VALUES ('$nameofuploaded','$ext','$groupid','$nameofuploaded')";
        $stmtnewfile = $dbh->prepare($sqlnewfile);
        $stmtnewfile->execute();
        $resultnewfile = $stmtnewfile->fetchAll(PDO::FETCH_ASSOC);
    }
    //$basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
    //$filename = sprintf('%s.%0.8s', $basename, $ext);
    $data = array('status' => 'success', 'filename' => $filename);
    $response = json_encode($data);
    return $response;
});

// 2) DELETE A FILE FROM A GROUP
// TODO: TEST
$app->get('/removefilefromgroup/{fileid}', function (Request $request, Response $response) {

    $fileid = $request->getAttribute('fileid');
    $fileid = (int) $fileid;

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
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

// 4 Get FILES FROM SPECIFIC GROUP
// TODO: Test it out
$app->get('/getfilesfromgroup/{groupid}', function (Request $request, Response $response) {
    $groupid = $request->getAttribute('groupid');
    $groupid = (int)$groupid;
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlfiles = "SELECT * FROM files WHERE togroup = $groupid";
    $stmtfiles = $dbh->prepare($sqlfiles);
    $stmtfiles->execute();
    $resultfiles = $stmtfiles->fetchAll(PDO::FETCH_ASSOC);

    // debug
    $data = array('Jsonresponse' => 'item1');

    $response = json_encode($resultfiles);
    return $response;
});

// GET LOGO's
$app->get('/getlogos', function (Request $request, Response $response) {

    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    //     NOTE 5 pieces --> [0] actions [1] arcades [2] archive [3] highscores [4] teams
    //     a query get all the correct records from the gemeenten table
    $sqlgetlogos = "SELECT * FROM logos";
    $stmtgetlogos = $dbh->prepare($sqlgetlogos);
    $stmtgetlogos->execute();
    $resultgetlogos = $stmtgetlogos->fetchAll(PDO::FETCH_ASSOC);

    // debug
    $data = array('Jsonresponse' => 'item1');

    $response = json_encode($resultgetlogos);
    return $response;
});

// 7) DELETE LOGO
// TODO: Work out
$app->get('/deletelogo', function (Request $request, Response $response) {
    $data = array('Jsonresponse' => 'item1');
    $response = json_encode($data);
    return $response;
});

// 5) set publication cover
// TODO: Work out
$app->post('/uploadthumb/{case}/{id}', function (Request $request, Response $response) {
    // below variables are for making thumbs and such
    // TODO: aren't used yet
    $idd = $request->getAttribute('id');
    $case = $request->getAttribute('case');

    $directory = $this->get('upload_directory');
    $uploadedFiles = $request->getUploadedFiles();
    // // handle single input with single file upload
    $uploadedFile = $uploadedFiles[file];
    $nameofuploaded = $uploadedFile->getClientFilename();
    $file = $_FILES[file][tmp_name];
    list($width, $height) = getimagesize($_FILES[file][tmp_name]);
    $ext = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
    $filename = sprintf('%s.%0.8s', $basename, $ext);

    // check if the lessonsdirectory upload folder is there, otherwise make it
    // NOTE: CONFIRM WORKS!!!
    // if (!file_exists($directory . DIRECTORY_SEPARATOR . $lessonid)) {
    //     mkdir($directory . DIRECTORY_SEPARATOR . $lessonid, 0777, true);
    // }
    switch ($ext) {
        case "png":
            $imageResourceId = imagecreatefrompng($file);
            $targetLayer = imageResize($imageResourceId, $width, $height);
            imagepng($targetLayer, $directory . DIRECTORY_SEPARATOR . $filename);
            break;
        case "PNG":
            $imageResourceId = imagecreatefrompng($file);
            $targetLayer = imageResize($imageResourceId, $width, $height);
            imagepng($targetLayer, $directory . DIRECTORY_SEPARATOR . $filename);
            break;
        case "gif":
            $imageResourceId = imagecreatefromgif($file);
            $targetLayer = imageResize($imageResourceId, $width, $height);
            imagegif($targetLayer, $directory . DIRECTORY_SEPARATOR . $filename);
            break;
        case "GIF":
            $imageResourceId = imagecreatefromgif($file);
            $targetLayer = imageResize($imageResourceId, $width, $height);
            imagegif($targetLayer, $directory . DIRECTORY_SEPARATOR . $filename);
            break;
        case "jpg":
            $imageResourceId = imagecreatefromjpeg($file);
            $targetLayer = imageResize($imageResourceId, $width, $height);
            imagejpeg($targetLayer, $directory . DIRECTORY_SEPARATOR . $filename);
            break;
        case "JPG":
            $imageResourceId = imagecreatefromjpeg($file);
            $targetLayer = imageResize($imageResourceId, $width, $height);
            imagejpeg($targetLayer, $directory . DIRECTORY_SEPARATOR . $filename);
            break;
        case "jpeg":
            $imageResourceId = imagecreatefromjpeg($file);
            $targetLayer = imageResize($imageResourceId, $width, $height);
            imagejpeg($targetLayer, $directory . DIRECTORY_SEPARATOR . $filename);
            break;
        case "JPEG":
            $imageResourceId = imagecreatefromjpeg($file);
            $targetLayer = imageResize($imageResourceId, $width, $height);
            imagejpeg($targetLayer, $directory . DIRECTORY_SEPARATOR . $filename);
            break;
        default:
            echo "Invalid Image type.";
            exit;
            break;
    }
    //if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
    //     $filename = moveUploadedFile($directory, $uploadedFile);
    // $response->write('uploaded ' . $filename . '<br/>');
    include 'db.php';
    $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

    // Case can be 'research' or 'publication' or 'orglogo'
    // UPDATE in the mysql table
    switch ($case) {
        case "research":
            $sqladdfile = "UPDATE research SET coverurl = '$filename' WHERE id = '$idd'";
            break;
        case "publication":
            $sqladdfile = "UPDATE publications SET coverurl = '$filename' WHERE id = '$idd'";
            break;
        case "orglogo":
            $sqladdfile = "INSERT INTO logos (filename) VALUES ('$filename')";
            break;
    }

    // Insert the link into our DATABASE
    $stmtaddfile = $dbh->prepare($sqladdfile);
    $stmtaddfile->execute();
    $resultaddfile = $stmtaddfile->fetchAll(PDO::FETCH_ASSOC);
    // return some thangz

    $cb = array(
        'thumbfileupload' => 'success',
        'case' => $case,
        'id' => $id,
    );
    /*  $debuggerrighthere = array('somethangsz' => 'asda');
    $response = json_encode($debuggerrighthere); */
    $response = json_encode($cb);
    return $response;
});

/**
 * Resizes file
 * to avoid overwriting an existing uploaded file.
 *
 * @param UploadedFile $uploaded file uploaded file to move
 */
function imageResize($file, $width, $height)
{
    $targetWidth = 500;
    $targetHeight = 400;
    if ($width > $height && $targetHeight < $height) {
        $targetHeight = $height / ($width / $targetWidth);
    } else if ($width < $height && $targetWidth < $width) {
        $targetWidth = $width / ($height / $targetHeight);
    } else {
        $newwidth = $width;
        $newheight = $height;
    }
    $targetLayer = imagecreatetruecolor($targetWidth, $targetHeight);
    imagecopyresampled($targetLayer, $file, 0, 0, 0, 0, $targetWidth, $targetHeight, $width, $height);
    return $targetLayer;
};
/**
 * Moves the uploaded file to the upload directory and assigns it a unique name
 * to avoid overwriting an existing uploaded file.
 *
 * @param string $directory directory to which the file is moved
 * @param UploadedFile $uploaded file uploaded file to move
 * @return string filename of moved file
 */
function moveUploadedFile($directory, UploadedFile $uploadedFile, $lessonid)
{
    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
    $filename = sprintf('%s.%0.8s', $basename, $extension);
    // check if the lessonsdirectory upload folder is there, otherwise make it
    // NOTE: CONFIRM WORKS!!!
    if (!file_exists($directory . DIRECTORY_SEPARATOR . $lessonid)) {
        mkdir($directory . DIRECTORY_SEPARATOR . $lessonid, 0777, true);
    }
    $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $lessonid . DIRECTORY_SEPARATOR . $filename);
    return $filename;
};
