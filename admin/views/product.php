<?php
    include_once "../db/config.php";
    include_once "../utils/dbhelper.php";
    include_once "../utils/session.php";
    include_once "../utils/validate.php";
    if($_GET["view"]=="new-product"){
        echo '
            <div class="container__detail__product">
            <form id="form-add-product" enctype="multipart/form-data" method="POST">
                <label for="brand">Hãng sản xuất</label>
                <select required name="brand_id" id="brand">
                </select>
        
                <label for="model">Tên sản phẩm</label>
                <input type="text" required name="model" id="model" placeholder="Nhập tên sản phẩm">
                
                <label for="screen">Loại màn hình</label>
                <textarea rows="3" id="screen" required name="screen">
                </textarea>

                <label for="RAM">Mô tả RAM</label>
                <input type="text" required name="RAM" id="RAM" placeholder="Nhập mô tả RAM">

                <label for="hardware">Mô tả ổ cứng</label>
                <input type="text" required name="hardware" id="hardware" placeholder="Nhập mô tả ổ cứng">

                <label for="OS">Hệ điều hành</label>
                <input type="text" required name="OS" id="OS" placeholder="Nhập tên hệ điều hành">
        
                <label for="CPU">CPU</label>
                <input type="text" required name="CPU" id="CPU" placeholder="Nhập chip xử lý">
        
                <label for="VGA">VGA</label>
                <textarea rows="3" id="VGA" required name="VGA">
                </textarea>
        
                <label for="background">Hình ảnh</label>
                <input type="file" required name="background" id="background">
        
                <label for="warranty">Thời gian bảo hành</label>
                <input type="text" required name="warranty" id="warranty" placeholder="Nhập thời gian bảo hành">
        
                <label for="discount">Giảm giá</label>
                <input type="number" required name="discount" id="discount">
        
                <label for="color">Màu sắc</label>
                <input type="text" required name="color" id="color" placeholder="Nhập màu sắc">
                
                <label for="capacity_name">Dung lượng Ram/ hard_drive bán</label>
                <input type="text" required name="capacity_name" id="capacity_name" placeholder="Nhập dung lượng Ram/ hard_drive">
        
                <label for="price">Giá bán</label>
                <input type="number" required name="price" id="price">
        
                <label for="quantity">Số lượng bán</label>
                <input type="number" required name="quantity" id="quantity">
                <input type="hidden" name="crud_request" value="add-newproduct">
                <button type="submit" style="margin-top: 10px" class="btn">Lưu</button>
            </form>
        </div>
        <script type="module" src="js/components/addProduct.js"></script>';
    }elseif($_GET["view"]=="product"){
        echo '
        <div class="container" id="product-container">
            
        </div>
        <script type="module" src="js/components/product.js"></script>';
    }else if($_GET["view"]=="change-capacity-product" && !empty($_GET["id"])){
        echo '
        <div class="container">
            <form id="form-change-capacity" method="POST">
                <label for="capacity_name">Dung lượng Ram/ hard_drive bán</label>
                <input type="text" required name="capacity_name" value="" id="capacity_name" placeholder="Nhập dung lượng Ram/ hard_drive">
        
                <label for="price">Giá bán</label>
                <input type="number" value="" required name="price" id="price">
        
                <label for="quantity">Số lượng bán</label>
                <input type="number" value="" required name="quantity" id="quantity">
                <input type="hidden" name="crud_request" value="change-capacity-product">
                <button type="submit" style="margin-top: 10px" class="btn">Lưu</button>
            </form>
        </div>
        <script type="module" src="js/components/changeCapacityProduct.js"></script>';
    }else if($_GET["view"]=="add-capacity-product" && !empty($_GET["id-product"])){
        echo '
        <div class="container">
            <form id="form-add-capacity" method="POST">
                <label for="capacity_name">Dung lượng Ram/ hard_drive bán</label>
                <input type="text" required name="capacity_name"  id="capacity_name" placeholder="Nhập dung lượng Ram/ hard_drive">
        
                <label for="price">Giá bán</label>
                <input type="number"  required name="price" id="price">
        
                <label for="quantity">Số lượng bán</label>
                <input type="number"  required name="quantity" id="quantity">
                <input type="hidden" name="crud_request" value="add-capacity-product">
                <button type="submit" style="margin-top: 10px" class="btn">Lưu</button>
            </form>
        </div>
        <script type="module" src="js/components/addCapacityProduct.js"></script>';
    }else if($_GET["view"]=="change-product" && !empty($_GET["id"])){
        echo '
            <div class="container__detail__product">
            <form id="form-change-product" enctype="multipart/form-data" method="POST">
                
            </form>
        </div>
        <script type="module" src="js/components/changeProduct.js"></script>';
    }
?>
