<?php
include_once "../utils/session.php";
Session::init();
include_once "../db/config.php";
include_once "../utils/dbhelper.php";
include_once "../utils/validate.php";
include_once "../classes/Product.php";
$http_origin = "";
if (!empty($_SERVER['HTTP_ORIGIN'])) {
    if (in_array($_SERVER['HTTP_ORIGIN'], allowedOrigins)) {
        $http_origin = $_SERVER['HTTP_ORIGIN'];
    }
}

header("Access-Control-Allow-Origin: " . $http_origin);
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
$page = getGET("page")==null?1:getGET("page");//trang hiển thị
$search = getGET("search");//từ khóa tìm kiếm
$categoryName = getGET("category-name");//tên thể loại
$id = getGET("id");//sản phâm duy nhất
$limit = getGET("limit")==null?8:getGET("limit");

if ($_SERVER["REQUEST_METHOD"] == "GET"&& $id!=null) {
    //lay theo id products.php?id=1
    Product::readItem($id);
    die();
}

if ($_SERVER["REQUEST_METHOD"] == "GET"&& $search == null && $categoryName == null && $id==null) {
    //san pham theo page products.php?page=1&limit=8
    Product::readPage($page, $limit, null, null);
    die();
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && $search != null) {
    //tim kiem san pham theo ten+page products.php?search=xr&limit=8&page=1
    Product::readPage($page, $limit, $search, null);
    die();
}

if ($_SERVER["REQUEST_METHOD"] == "GET"&& $categoryName!=null) {
    //tim kiem san pham theo the loai+age  products.php?category-name=xr&limit=8&page=1
    Product::readPage($page, $limit, null, $categoryName);
    die();
}

?>

