<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
require 'vendor/autoload.php';

$mongodata = new MongoDB\Client("mongodb://localhost:27017");
$yourmarksdb = $mongodata->YoumarksDB;
$UserCollection =$yourmarksdb->User;

if($_SERVER["REQUEST_METHOD"]==='POST'){
    $data=json_decode(file_get_contents("php://input"),true);

    $filter = ["email" =>$data['email']];
    $User = $UserCollection->findOne($filter);

    if($User){
        $newModule = [
            'modulename' => $data['nomModule']['modulename'],
            'CoeffModule' => $data['nomModule']['CoeffModule'],
            'CC1' => $data['nomModule']['CC1'],
            'CC2' => $data['nomModule']['CC2'],
            'CC3' => $data['nomModule']['CC3'],
            'EFM' => $data['nomModule']['EFM'],

        ];

        $modules = $User['modules'] ?? [];
        $modules[$data['nomModule']['modulename']] = $newModule;

        $update = ['$set' => ['modules.' . $data['nomModule']['modulename'] => $newModule]];


        $UserCollection->updateOne($filter,$update);

        echo json_encode(['message'=>'add with succes',"modules"=>$User['modules']]);
    }
}