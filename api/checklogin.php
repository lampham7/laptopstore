<?php
    include_once "../utils/session.php";
    Session::init();
    include_once "../db/config.php";
    include_once "../utils/dbhelper.php";
    include_once "../utils/validate.php";
    $http_origin = "";
    if (!empty($_SERVER['HTTP_ORIGIN'])) {
        if (in_array($_SERVER['HTTP_ORIGIN'], allowedOrigins)) {
            $http_origin = $_SERVER['HTTP_ORIGIN'];
        }
    }
    header("Access-Control-Allow-Origin: " . $http_origin);
    header("Access-Control-Allow-Methods: GET,POST,PATCH,DELETE");
    header("Access-Control-Allow-Credentials: true");
    
    //dữ liệu được gửi toàn bộ từ form\
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        check();
        die();
    }
    function check(){
        $dataRes = false;
        if(!empty(Session::get("user"))){
            $dataRes = array("user"=>Session::get("user"),"carts"=>Session::get("carts"));
            echo json_encode($dataRes);
            http_response_code(200);
        }else {
            echo $dataRes;
            http_response_code(203);
        }
    }
?>