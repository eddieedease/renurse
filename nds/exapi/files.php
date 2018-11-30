<?php
use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\UploadedFileInterface as UploadedFile;



// API
// UPLOADING UPLOADING UPLOADING UPLOADING
// MEDIA MEDIA MEDIA MEDIA MEDIA

/**
 * Uploads a thumbnail for lesson
 * TODO: haven't been tested yet
 */
$app->post('/uploadpricethumb/{rewardid}', function(Request $request, Response $response)
{
    // below variables are for making thumbs and such
    // TODO: aren't used yet
    $rewardid       = $request->getAttribute('rewardid');
    $directory      = $this->get('upload_directory');
    $uploadedFiles  = $request->getUploadedFiles();
    // // handle single input with single file upload
    $uploadedFile   = $uploadedFiles[file];
    $nameofuploaded = $uploadedFile->getClientFilename();

    $file = $_FILES[file][tmp_name];
    
    list($width, $height) = getimagesize($_FILES[file][tmp_name]);
    
    $ext = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $basename  = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
    $filename  = sprintf('%s.%0.8s', $basename, $ext);
    // check if the lessonsdirectory upload folder is there, otherwise make it
    // NOTE: CONFIRM WORKS!!!
    
    //if (!file_exists($directory . DIRECTORY_SEPARATOR. $rewardid)) {
    //    mkdir($directory . DIRECTORY_SEPARATOR . $rewardid, 0777, true);
    //}
    
    switch ($ext) {
          case "png":
              $imageResourceId = imagecreatefrompng($file); 
              $targetLayer = imageResize($imageResourceId,$width,$height);
              imagepng($targetLayer,$directory . DIRECTORY_SEPARATOR . $filename);
              break;
              case "PNG":
              $imageResourceId = imagecreatefrompng($file); 
              $targetLayer = imageResize($imageResourceId,$width,$height);
              imagepng($targetLayer,$directory . DIRECTORY_SEPARATOR . $filename);
              break;
          case "gif":
              $imageResourceId = imagecreatefromgif($file); 
              $targetLayer = imageResize($imageResourceId,$width,$height);
              imagegif($targetLayer,$directory . DIRECTORY_SEPARATOR . $filename);
              break;
          case "jpg":
              $imageResourceId = imagecreatefromjpeg($file); 
              $targetLayer = imageResize($imageResourceId,$width,$height);
              imagejpeg($targetLayer,$directory . DIRECTORY_SEPARATOR . $filename);
              break;
              case "JPEG":
              $imageResourceId = imagecreatefromjpeg($file); 
              $targetLayer = imageResize($imageResourceId,$width,$height);
              imagejpeg($targetLayer,$directory . DIRECTORY_SEPARATOR . $filename);
              break;
              case "jpeg":
              $imageResourceId = imagecreatefromjpeg($file); 
              $targetLayer = imageResize($imageResourceId,$width,$height);
              imagejpeg($targetLayer,$directory . DIRECTORY_SEPARATOR . $filename);
              break;
          default:
              echo "Invalid Image type.";
              exit;
              break;
      }
    
     //if ($uploadedFile->getError() === UPLOAD_ERR_OK) {
    //     $filename = moveUploadedFile($directory, $uploadedFile);
    // $response->write('uploaded ' . $filename . '<br/>');
    // }
    include 'db.php';
    // Insert the link into our DATABASE
    $dbh         = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
    $sqladdfile  = "UPDATE rewards SET imgurl = '$filename' WHERE id = '$rewardid'";
    $stmtaddfile = $dbh->prepare($sqladdfile);
    $stmtaddfile->execute();
    $resultaddfile = $stmtaddfile->fetchAll(PDO::FETCH_ASSOC);
    // return some thangz
    $cb       = array(
        'thumbfileupload' => 'success',
        'sql' => $sqladdfile,
        'tolesson' => $rewardid,
        'imgurl' => $filename,
        'oriwidth' => $width
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
function imageResize($file,$width,$height) {
    $targetWidth =500;
    $targetHeight =400;

    if($width > $height && $targetHeight < $height){
        $targetHeight = $height / ($width / $targetWidth);
    } else if ($width < $height && $targetWidth < $width) {
        $targetWidth = $width / ($height / $targetHeight);    
    } else {
        $newwidth = $width;
        $newheight = $height;
    }
    $targetLayer=imagecreatetruecolor($targetWidth,$targetHeight);
    imagecopyresampled($targetLayer,$file,0,0,0,0,$targetWidth,$targetHeight, $width,$height);
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
function moveUploadedFile($directory, UploadedFile $uploadedFile, $rewardid)
{
    $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
    $basename  = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
    $filename  = sprintf('%s.%0.8s', $basename, $extension);

    // check if the lessonsdirectory upload folder is there, otherwise make it
    // NOTE: CONFIRM WORKS!!!
    if (!file_exists($directory . DIRECTORY_SEPARATOR. $rewardid)) {
        mkdir($directory . DIRECTORY_SEPARATOR . $rewardid, 0777, true);
    }

    $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR. $rewardid . DIRECTORY_SEPARATOR . $filename);
    return $filename;
};


?>