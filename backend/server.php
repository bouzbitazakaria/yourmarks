<?php
// permettre le partage de ressources entre différentes origines.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

//charger automatiquement les classes du pilote MongoDB pour php
require 'vendor/autoload.php';

//cree une nouvelle instance de client MongoDB
$mongodata = new MongoDB\Client("mongodb://localhost:27017");
$yourmarksdb = $mongodata->YoumarksDB;
$UserCollection =$yourmarksdb->User;

if ($_SERVER['REQUEST_METHOD']=='POST'){
    $data = json_decode(file_get_contents("php://input"),true);

    ;

    if (!empty($data['name']) && !empty($data['email']) && !empty($data['password']) ){
        $UserCollection->insertOne($data);
        echo json_encode(["message"=>'SignUp Succes']);
    }else{
        echo json_encode(["message"=>'SignUp Faild']);
    }
    }
    

if ($_SERVER["REQUEST_METHOD"]==='GET'){
   $email=$_GET['email']??null;
    $password =$_GET['password']?? null;

    $filter = ["email" =>$email,"password"=>$password];
    $User = $UserCollection->findOne($filter);

    if($User){
        if (isset($User['modules']) && !empty($User['modules'])) {
            echo json_encode(["name"=>$User['name'],"email"=>$User['email'],"modules"=>$User['modules']]);
        } else {
            echo json_encode(["name"=>$User['name'],"email"=>$User['email'],"modules"=>'']);
        }
       
    }
}