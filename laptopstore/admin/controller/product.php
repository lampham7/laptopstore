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
if ($method == "POST" && !empty($_POST["crud_request"]) && $_POST["crud_request"] == "add-newproduct") {
    addNewProduct();
    die();
}
if ($method == "GET" && !empty($_GET["id"])) {
    getProduct();
    die();
}

if ($method == "POST"  && !empty($_POST["crud_request"]) && $_POST["crud_request"] == "change-product" && !empty($_GET["id"])) {
    changeProduct();//oke
}

function addNewProduct()
{
    $isValidate = true;
    $brand_id = getPOST("brand_id");
    $model = getPOST("model");
    $screen = getPOST("screen");
    $RAM = getPOST("RAM");
    $hardware = getPOST("hardware");
    $OS = getPOST("OS");
    $CPU = getPOST("CPU");
    $VGA = getPOST("VGA");
    $warranty = getPOST("warranty");
    $discount = getPOST("discount"); //*
    $color = getPOST("color");
    $capacity_name = getPOST("capacity_name");
    $quantity = getPOST("quantity"); //*
    $price = getPOST("price"); //*
    $errMessage = "";
    $regDiscount = "/^[0-9]{0,2}$/"; //0->
    $regPrice = "/^[0-9]{1,}$/"; //
    $regQuantity = "/^[0-9]{0,}$/"; //
    $files = !empty($_FILES["background"]["name"]) ? $_FILES["background"] : null;
    if ($files == null || $brand_id == null || $model == null || $screen == null || $RAM == null || $hardware == null || $OS == null || $CPU == null || $VGA == null || $warranty == null || $color == null || $capacity_name == null) {
        $errMessage = "Vui lòng điền đầy đủ các trường. ";
        $isValidate = false;
    }
    if (!preg_match($regDiscount, $discount)) {
        $isValidate = false;
        $errMessage = $errMessage . "Giảm giá chưa đúng định dạng. ";
    }
    if (!preg_match($regQuantity, $quantity)) {
        $isValidate = false;
        $errMessage = $errMessage . "Số lượng chưa đúng định dạng. ";
    }
    if (!preg_match($regPrice, $price)) {
        $isValidate = false;
        $errMessage = $errMessage . "Giá chưa đúng định dạng. ";
    }
    if ($files != null && validateFile($files) != "") {
        $isValidate = false;
        $errMessage = $errMessage . validateFile($files);
    }
    if ($isValidate == false) {
        echo $errMessage;
        echo 'Thêm thất bại do " . $errMessage . "';
        http_response_code(203);
    } else {
        $nameFile = time() . $files["name"];
        $from = $files["tmp_name"];
        $to = "../../store/" . $nameFile;
        $created_at = $updated_at = date("Y-m-d h:i:s");
        $created_by = Session::get("user")["id"];
        $role = Session::get("user")["role"];
        if ($role == 2) {
            if (move_uploaded_file($from, $to)) {
                $query =  "INSERT INTO `products` (`brand_id`, `model`, `screen`, `RAM`, `hardware`, `OS`,
                `CPU`, `VGA`, `background`, `warranty`, `discount`, `color`, `created_by`,
                `created_at`, `updated_at`)
                VALUES ('" . $brand_id . "', '" . $model . "', '" . $screen . "', '" . $RAM . "','" . $hardware . "','" . $OS . "', 
                '" . $CPU . "', '" . $VGA . "', '" . $nameFile . "', '" . $warranty . "', '" . $discount . "', '" . $color . "', 
                '" . $created_by . "', '" . $created_at . "', '" . $updated_at . "');";
                execute($query);
                $query = "select id from products where created_by = '" . $created_by . "' and background = '" . $nameFile . "' limit 1 ;";
                $idNewProduct = executeResult($query)[0]["id"];
                if (!empty($idNewProduct)) {
                    $query = "INSERT INTO `product_capacities` 
                    (`product_id`, `capacity_name`, `price`, `quantity`) VALUES 
                    ('" . $idNewProduct . "', '" . $capacity_name . "', '" . $price . "', '" . $quantity . "');";
                    execute($query);
                    echo "Thêm thành công";
                    http_response_code(200);
                } else {
                    echo "Thêm thất bại";
                    http_response_code(203);
                }
            }
        }
    }
}
function changeProduct()
{
    $role = Session::get("user")["role"];
    if ($role == 2) {
        $id = getGET("id");
        $isValidate = true;
        $brand_id = getPOST("brand_id");
        $model = getPOST("model");
        $screen = getPOST("screen");
        $RAM = getPOST("RAM");
        $hardware = getPOST("hardware");
        $OS = getPOST("OS");
        $CPU = getPOST("CPU");
        $VGA = getPOST("VGA");
        $warranty = getPOST("warranty");
        $discount = getPOST("discount"); //*
        $color = getPOST("color");
        $errMessage = "";
        $regDiscount = "/^[0-9]{0,2}$/";
        $files = !empty($_FILES["background"]["name"]) ? $_FILES["background"] : null;
        if ($brand_id == null || $model == null || $screen == null || $RAM == null || $hardware == null || $OS == null || $CPU == null || $VGA == null || $warranty == null || $color == null) {
            $errMessage = "Vui lòng điền đầy đủ các trường. ";
            $isValidate = false;
        }
        if (!preg_match($regDiscount, $discount)) {
            $isValidate = false;
            $errMessage = $errMessage . "Giảm giá chưa đúng định dạng. ";
        }
        if ($files != null && validateFile($files) != "") {
            $isValidate = false;
            $errMessage = $errMessage . validateFile($files);
        }
        if ($isValidate == false) {
            echo "Cập nhật thất bại do ".$errMessage;
            http_response_code(203);
        } else {
            if ($files == null) {
                $updated_at = date("Y-m-d h:i:s");
                $query = "UPDATE `products` SET 
            `brand_id` = '" . $brand_id . "', `model` = '" . $model . "', `screen` = '" . $screen . "', 
            `RAM` = '" . $RAM . "', `hardware` = '" . $hardware . "', `OS` = '" . $OS . "', `CPU` = '" . $CPU . "', 
            `VGA` = '" . $VGA . "', `warranty` = '" . $warranty . "', `updated_at` = '" . $updated_at . "'  WHERE `products`.`id` = '" . $id . "'";
                execute($query);
                http_response_code(200);
            } else {
                $query = "select background from products where id = " . $id . " ";
                $queryResult = executeResult($query);
                $background = count($queryResult) >= 1 ? $queryResult[0]["background"] : null;
                if ($background != null) {
                    unlink("../../store/" . $background);
                };
                $nameFile = time() . $files["name"];
                $from = $files["tmp_name"];
                $to = "../../store/" . $nameFile;
                $updated_at = date("Y-m-d h:i:s");
                if (move_uploaded_file($from, $to)) {
                    $query = "UPDATE `products` SET 
                    `brand_id` = '" . $brand_id . "', `model` = '" . $model . "', `screen` = '" . $screen . "', 
                    `RAM` = '" . $RAM . "', `hardware` = '" . $hardware . "', `OS` = '" . $OS . "', `CPU` = '" . $CPU . "', 
                    `VGA` = '" . $VGA . "', `warranty` = '" . $warranty . "', `background` = '" . $nameFile . "', `updated_at` = '" . $updated_at . "'  WHERE `products`.`id` = '" . $id . "'";
                    execute($query);
                    http_response_code(200);
                }
            }
        }
    }
}
function getProduct()
{
    $id = getGET("id");
    $query = 'select products.brand_id, model,  brands.name as "nameBrand", screen, RAM, hardware, OS, CPU,
    VGA, background, warranty, discount, color, users.name as "nameUser"
    from brands inner join products on brands.id = products.brand_id inner join
    users on products.created_by = users.id where products.id = '.$id.' limit 1;';
    $queryProductResult = executeResult($query, true);
    echo json_encode($queryProductResult);
    http_response_code(200);
}
