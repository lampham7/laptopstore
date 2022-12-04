<?php
include_once "../utils/session.php";
Session::init(); //Session::set("carts"=>array());
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
header("Content-Type: application/json");

if (empty(Session::get("user"))) {
    http_response_code(203);
    echo "Yêu cầu đăng nhập để thực hiện chức năng này.";
    die();
}
if ($_SERVER["REQUEST_METHOD"] == "POST" && empty($_GET['crud_req'])) {
    //yêu cầu đặt hàng.
    addToOrders();
    die();
}
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    //xem thông tin order
    viewOrders();
    die();
}
if($_SERVER["REQUEST_METHOD"] == "POST" && $_GET['crud_req'] == "updateOrders"){//change patch to post 
    updateOrders();
}
function addToOrders()
{
    $carts = Session::get("carts");
    if (count($carts) <= 0) {
        http_response_code(203);
        echo "Giỏ hàng trống!";
    } else {
        $idUser = Session::get("user")["id"];
        $query = 'select name, phone_number, address, email from users where id = ' . $idUser . ' ;';
        $aboutUser = executeResult($query, true);
        if (empty($aboutUser["name"]) || empty($aboutUser["phone_number"]) || empty($aboutUser["address"]) || empty($aboutUser["email"])) {
            http_response_code(203);
            echo "Vui lòng cập nhật thông tin họ tên, số điện thoại, địa chỉ, email.";
        } else {
            $idStatus = 1;
            $createdAt = date("Y-m-d h:i:s");
            $updatedAt = date("Y-m-d h:i:s");
            $query = 'insert into orders(user_id,status_id,created_at,updated_at)
            values("' . $idUser . '", "' . $idStatus . '", "' . $createdAt . '", "' . $updatedAt . '") ;';
            execute($query);
            $query = 'select id from orders where user_id = "' . $idUser . '" and status_id= "' . $idStatus . '"
            and created_at= "' . $createdAt . '" and updated_at = "' . $updatedAt . '" limit 1 ;';
            $idOrder = executeResult($query, true)["id"];
            $query = '';
            if (!empty($idOrder)) {
                foreach ($carts as $cart) {
                    $query = $query . ' insert into order_details(order_id, product_id, capacity_id, quantity, price)values(
                    "' . $idOrder . '", "' . $cart["productId"] . '", "' . $cart["capacityId"] . '", "' . $cart["quantity"] . '"
                    , "' . $cart["detail"]["newPrice"] . '") ;';
                    $quantityRemain =  $cart["detail"]["quantityRemain"] - $cart["quantity"];
                    $query = $query . ' update product_capacities set quantity = "' . $quantityRemain . '" where id = "' . $cart["capacityId"] . '" and product_id = "' . $cart["productId"] . '" ;';
                };
                // echo $query;
                execute($query, true);
                Session::set("carts", array());
                echo "Đặt hàng thành công!";
            }
            http_response_code(201);
        }
    }
}
function viewOrders(){
    $idUser = Session::get("user")["id"];
    $query = "select orders.id as orderId,status.id as statusId, status.name as statusName, 
    orders.created_at, orders.updated_at from orders inner join status on orders.status_id = status.id 
    inner join users on users.id = orders.user_id where orders.user_id= ".$idUser ." ORDER BY orders.created_at DESC ;";
    $listDataMain = executeResult($query);
    if(count($listDataMain)<=0){
        echo json_encode(array());
        http_response_code(200);
        die();
    }
    $listIdQuery=' order_details.order_id = '.$listDataMain[0]["orderId"].' ';
    for($i=1;$i<count($listDataMain);$i++){
        $listIdQuery=$listIdQuery.'or order_details.order_id = '.$listDataMain[$i]["orderId"].' ';
    }
    $query='select order_details.order_id as orderId, order_details.product_id as productId, order_details.capacity_id as capacityId, order_details.quantity as quantity, order_details.price as price, 
    product_capacities.capacity_name as capacityName, products.model as model, products.background as background from
    order_details inner join product_capacities on order_details.capacity_id = product_capacities.id inner join
    products on product_capacities.product_id = products.id where '.$listIdQuery.' ;';
    $listDataDetail=executeResult($query);
    
    for($i=0;$i<count($listDataMain);$i++){
        $listDataMain[$i]["orderDetails"]=array();
        for($j=0;$j<count($listDataDetail);$j++){
            if($listDataMain[$i]["orderId"]==$listDataDetail[$j]["orderId"]){
                array_push( $listDataMain[$i]["orderDetails"],$listDataDetail[$j]);
            }
        }
    }
    echo json_encode($listDataMain);
    http_response_code(200);

}
function updateOrders(){
    $idUser = Session::get("user")["id"];
    $dataBody = json_decode(file_get_contents("php://input"),true);
    if(empty($dataBody["statusChange"])||empty($dataBody["orderId"])){
        echo "Cập nhật thất bại!";
        http_response_code(203);
        die();
    }
    $query='update orders set status_id = "'.$dataBody["statusChange"].'" where id = "'.$dataBody["orderId"].'" and user_id = "'.$idUser.'";';
    execute($query);
    http_response_code(201);
}