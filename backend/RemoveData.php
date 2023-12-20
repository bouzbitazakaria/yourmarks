<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
require 'vendor/autoload.php';

$mongodata = new MongoDB\Client("mongodb://localhost:27017");
$yourmarksdb = $mongodata->YoumarksDB;
$UserCollection =$yourmarksdb->User;

if($_SERVER["REQUEST_METHOD"]==='POST'){
    $data = json_decode(file_get_contents("php://input"),true);

    $filter = ['$unset'=>['modules.'.$data['modulename']=>1]];
    $filter1 = ["email" =>$data['email']];
    $User = $UserCollection->findOne($filter1);
    $removeModule = $UserCollection->updateOne($filter1,$filter);
    
    echo json_encode(['modules'=>$User['modules']]);
    
}
