<?php

require_once "./utils/session.php";
require_once "./db/config.php";
Session::init();
if(empty(Session::get("user"))){
    echo '<script>
        alert("Vui lòng đăng nhập để sử dụng chức năng này.");
        window.location.href="'.baseUrl.'";
    </script>';
    die();
}

$view = "";
if(!empty($_GET["view"])){
    $view=$_GET["view"];
};
switch($view){
    case "change":
        include "./views/aboutHeader.php" ;
        include "./views/aboutChange.php";
        include "./views/aboutFooter.php";
    break;
    default:
        include "./views/aboutHeader.php" ;
        include "./views/aboutView.php";
        include "./views/aboutFooter.php";
    break;
}

?>