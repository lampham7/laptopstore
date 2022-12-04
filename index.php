<?php
$view = "home";
if (!empty($_GET["view"])) {
    $view = $_GET["view"];
}
switch ($view) {
    case "product":
        include "./views/header.php";
        include "./views/product.php";
        include "./views/footer.php";
        break;
    case "carts":
        require_once "./utils/session.php";
        require_once "./db/config.php";
        Session::init();
        if(empty(Session::get("user"))){
            echo '<script>
                alert("Vui lòng đăng nhập để sử dụng chức năng này.");
                window.location.href="'.baseUrl.'";
            </script>';
        }else{
            include "./views/header.php";
            include "./views/carts.php";
            include "./views/footer.php";
        }
        break;
    case "home":
        include "./views/header.php";
        include "./views/products.php";
        include "./views/footer.php";
        break;
    case "purchased":
        require_once "./utils/session.php";
        require_once "./db/config.php";
        Session::init();
        if(empty(Session::get("user"))){
            echo '<script>
                alert("Vui lòng đăng nhập để sử dụng chức năng này.");
                window.location.href="'.baseUrl.'";
            </script>';
        }else{
            include "./views/header.php";
            include "./views/purchased.php";
            include "./views/footer.php";
        }
        break;
    default:
        include "./views/header.php";
        include "./views/products.php";
        include "./views/footer.php";
        break;
}
