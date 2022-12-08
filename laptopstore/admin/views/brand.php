<!-- them moi/sua/lay ra -->
<?php
include_once "../db/config.php";
include_once "../utils/dbhelper.php";
include_once "../utils/session.php";
include_once "../utils/validate.php";

//change-brand&id=6
//new-brand//khong co id

$mode = !empty($_GET["view"]) ? $_GET["view"] : "";
switch ($mode) {
    case "new-brand":
        echo '
                <div class="container__detail__product">
                <form enctype="multipart/form-data" id="form-add-brand" method="POST">
                    <label for="name">Tên hãng</label>
                    <input type="text" required name="name" id="name" placeholder="Nhập tên hãng">
                    <label for="image">Ảnh nền</label>
                    <input type="file" name="image" required id="image" placeholder="Ảnh nền">
                    <button type="submit" class="btn">Lưu</button>
                </form>
            </div>
            <script type="module" src="js/components/addBrand.js"></script>';
        break;
    case "change-brand":
            echo '
                <div class="container__detail__product">
                <form enctype="multipart/form-data" id="form-change-brand" method="POST">
                    <label for="name">Tên hãng</label>
                    <input type="text" required name="name" value="" id="name" placeholder="Nhập tên hãng">
                    <img style="height: 50px; object-fit:cover; margin-top:15px" id="image" src="" />
                    <label for="image">Ảnh nền</label>
                    <input type="file" name="image" id="image" placeholder="Ảnh nền">
                    <button type="submit" class="btn">Lưu</button>
                </form>
            </div>
            <script type="module" src="js/components/changeBrand.js"></script>';
        break;
}

?>
