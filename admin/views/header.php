<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang quản lý sản phẩm</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <div class="header__title">
            <a  href="index.php">ADMIN</a>
        </div>
        <?php
            $viewMode = isset($_GET["view"])?$_GET["view"]:"products";
            if ($viewMode == "products"||$viewMode == "product" || $viewMode == "change-product" || $viewMode == "new-product" || $viewMode == "change-capacity-product"|| $viewMode == "add-capacity-product") {
                $viewMode = "product";
            }elseif($viewMode == "brands"||$viewMode == "brand" || $viewMode == "change-brand" || $viewMode == "new-brand"){
                $viewMode = "brand";
            }elseif($viewMode=="carts"||$viewMode=="cart"){
                $viewMode = "cart";
            }
        ?>
        <div class="header__list__link">
            <a href="index.php" class="header__link <?= $viewMode=="product"?"active":"" ?>">quản lý sản phẩm</a>
            <a href="index.php?view=brands" class="header__link <?= $viewMode=="brand"?"active":"" ?>" >quản lý hãng sản xuất</a>
            <a href="index.php?view=carts" class="header__link <?= $viewMode=="cart"?"active":"" ?>">quản lý đơn hàng</a>
        </div>
    </header>