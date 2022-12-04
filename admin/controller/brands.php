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

if ($method == "POST" && empty($_GET["id"])) {
    addNewBrand();
    die();
}
if ($method == "GET" && empty($_GET["id"])) {
    getBrands();
    die();
}
if ($method == "GET") {
    getBrand();
    die();
}
if ($method == "POST" && !empty($_GET["id"])) {
    updateBrands($_GET["id"]);
    die();
}
function addNewBrand()//change to api
{
    $name = getPOST("name");
    $files = $_FILES["image"];
    if (validateFile($files) == "" && $name != null) {
        $nameFile = time() . $files["name"];
        $from = $files["tmp_name"];
        $to = "../../store/" . $nameFile;
        $created_at = $updated_at = date("Y-m-d h:i:s");
        $created_by = Session::get("user")["id"];
        $role = Session::get("user")["role"];
        if ($role == 2) {
            if (move_uploaded_file($from, $to)) {
                $query = "insert into brands(name, image, created_by, created_at, updated_at) values(
                    '" . $name . "','" . $nameFile . "','" . $created_by . "','" . $created_at . "','" . $updated_at . "'
                );";
                execute($query);
                http_response_code(200);  
            }
        }
    }
}
function getBrands()
{
    $query = 'select * from brands';
    $dataRes = executeResult($query);
    echo json_encode($dataRes);
    http_response_code(200);
    // if (count($dataRes) >= 1) {
    //     $i = 1;
    //     foreach ($dataRes as $item) {
    //         $image = baseUrl . 'store/' . $item['image'];
    //         echo '
    //                 <tr>
    //                     <td>' . $i . '</td>
    //                     <td>' . $item['name'] . '</td>
    //                     <td><img style="height:50px; object-fit:cover" src="' . $image . '" alt=""></td>
    //                     <td>
    //                         <a href="index.php?view=change-brand&id=' . $item['id'] . '" class="btn">Sửa</a> 
    //                     </td>
    //                 </tr>';
    //         $i++;
    //     }
    // }
}
function getBrand()
{
    $id = getGET("id");
    $query = 'select * from brands where id = ' . $id . ' limit 1';
    $resData = executeResult($query,true);
    echo json_encode($resData);
    http_response_code(200);
}
// function deleteBrands($id){

//     $query = 'select * from brands where id = '.$id.' limit 1';
//     $idInfor = executeResult($query,true);
//     $image=$idInfor['image'];
//     unlink("../../store/".$image);
//     $query='DELETE from brands where id = '.$id.' ;';
//     execute($query);
//     http_response_code(201);
// }
function updateBrands($id)
{
    //có hình ảnh
    $name = $_POST["name"];
    if (!empty($_FILES["image"]["name"])) {
        $role = Session::get("user")["role"];
        if ($role == 2) {
            $query = 'select * from brands where id = ' . $id . ' limit 1';
            $idInfor = executeResult($query, true);
            $image = $idInfor['image'];
            unlink("../../store/" . $image);
            //thêm hình ảnh vào store rồi update data;
            $files = $_FILES["image"];
            if (validateFile($files) == "" && $name != null) {
                $nameFile = time() . $files["name"];
                $from = $files["tmp_name"];
                $to = "../../store/" . $nameFile;
                $updated_at = date("Y-m-d h:i:s");
                $created_by = Session::get("user")["id"];
                if (move_uploaded_file($from, $to)) {
                    $query = "update brands set name = '" . $name . "',image = '" . $nameFile . "', created_by = '" . $created_by . "', updated_at = '" . $updated_at . "' where id = " . $id . " ;";
                    execute($query);
                    http_response_code(200);
                }
            }
        }
    } else {
        $role = Session::get("user")["role"];
        if ($role == 2) {
            $updated_at = date("Y-m-d h:i:s");
            $created_by = Session::get("user")["id"];
            $query = "update brands set name = '" . $name . "',created_by = '" . $created_by . "',updated_at = '" . $updated_at . "' where id = " . $id . " ; ";
            execute($query);
            http_response_code(200);
        }
    }

    //khong có hình ảnh
}
