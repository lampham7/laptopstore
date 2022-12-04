<?php
    include_once "../../utils/session.php";
    Session::init();
    include_once "../../db/config.php";
    include_once "../../utils/dbhelper.php";
    
    include_once "../../utils/validate.php";
    $http_origin = "";
    if (!empty($_SERVER['HTTP_ORIGIN'])) {
        if (in_array($_SERVER['HTTP_ORIGIN'], allowedOrigins)) {
            $http_origin = $_SERVER['HTTP_ORIGIN'];
        }
    }
    
    header("Access-Control-Allow-Origin: " . $http_origin);
    header("Access-Control-Allow-Methods: GET,POST");
    header("Access-Control-Allow-Credentials: true");
    
    $method = $_SERVER["REQUEST_METHOD"];
    if($method=="GET" && empty($_GET["id"])){//call api
        //get products
        getProducts();
        die();
    }

    function getProducts(){
        $query='select id, background, model, screen, RAM, hardware, OS, CPU, VGA,warranty,discount, color from products';
        $dataRes=executeResult($query);
        echo json_encode($dataRes);
        http_response_code(200);
        
    }
