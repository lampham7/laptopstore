<?php
    $isSearch = false;
    if(!empty($_GET["view"])){
        if($_GET["view"]=="search"){
            $isSearch=true;
        }
    }
?>
<!-- start products__container -->
<div class="products__container">
    <!-- start slider -->
    <?php
        if($isSearch==false){
            echo '
                <div class="products__swiper">
                <div class="swiper products-swiper">
                    <div class="swiper-wrapper">
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
            </div>';
        }
    ?>
    <!-- end slider -->

    <!-- start products heading-->
    <div class="products__heading">
        <span class="products__heading-title">Sản phẩm</span>
        <span class="products__heading-sort">
            <p>Sắp xếp theo</p>
            <select name="sort-by" id="sort-by">
                <option value="price-increase">Giá tăng dần</option>
                <option value="price-descending">Giá giảm dần</option>
            </select>
        </span>
    </div>
    <!-- end products heading-->

    <!-- start products list -->
    <div class="products__list row">
        <!-- <div class="discount products__item col col-xs-6 col-sm-6 col-md-3 col-lg-3">
            <a href="index.php?view=product&id=1" class="products__item__content">
                <div class="products__item__content-img">
                    <div>
                        <img src="./access/imgs/product1.png" alt="">
                    </div>
                </div>
                    <div class="products__item__content__about">
                        <p class="model">Acer Aspire 3 A315 56 37DV</p>
                        <p class="screen">LCD 15"FHD</p>
                        <p class="cpu">CPU i3-1005G1</p>
                        <p class="vga">VGA Intel UHD Graphics</p>
                        <p class="win">WIN 10H SL</p>
                        <div class="products__item__content__about-view">
                            <span>Click để xem chi tiết</span><br> 
                            <div><span>Đặt hàng</span></div>
                        </div>
                    </div>
                <div class="products__item__content__name">
                    Laptop Asus VivoBook A415EA EB1750W</p>
                </div>
                <div class="products__item__content__price">
                    <del>14,990,000<u>đ</u></del>
                    <br>
                    <span>11,990,000<u>đ</u></span>
                </div>
                <div class="products__item__content__sale">
                    <img src="./access/imgs/sale.webp" alt="">
                    <p>30%</p>
                </div>
            </a>
        </div>
        <div class="products__item col col-xs-6 col-sm-6 col-md-3 col-lg-3">
            <a href="index.php?view=product&id=1" class="products__item__content">
                <div class="products__item__content-img">
                    <div>
                        <img src="./access/imgs/product1.png" alt="">
                    </div>
                </div>
                    <div class="products__item__content__about">
                        <p class="model">Acer Aspire 3 A315 56 37DV</p>
                        <p class="screen">LCD 15"FHD</p>
                        <p class="cpu">CPU i3-1005G1 - DDR4 4GB</p>
                        <p class="vga">VGA Intel UHD Graphics</p>
                        <p class="win">WIN 10H SL</p>
                        <div class="products__item__content__about-view">
                            <span>Click để xem chi tiết</span><br> 
                            <div><span>Đặt hàng</span></div>
                        </div>
                    </div>
                <div class="products__item__content__name">
                    Laptop Asus VivoBook A415EA EB1750W
                </div>
                <div class="products__item__content__price">
                    <del>14,990,000<u>đ</u></del>
                    <br>
                    <span>11,990,000<u>đ</u></span>
                </div>
                <div class="products__item__content__sale">
                    <img src="./access/imgs/sale.webp" alt="">
                    <p>30%</p>
                </div>
            </a>
        </div> -->
    </div>
    <!-- start products list -->

    <!-- start navigation -->
    <div class="products__container__navigation">
        <ul>
            <!-- <li class="button prev">prev</li>
            <li class="numb">1</li>
            <li class="dots">...</li>
            <li class="numb">3</li>
            <li class="numb active">4</li>
            <li class="numb">5</li>
            <li class="dots">...</li>
            <li class="numb">7</li>
            <li class="button next">next</li> -->
        </ul>
    </div>
    <!-- end navigation -->
</div>
<?php
    if($isSearch==false){
        echo '
        <script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>
        <script type="module" src="./js/components/productsSwiper.js"></script>
        ';
    }
?>

<script type="module" src="./js/components/productsContainer.js"></script>
<!-- end products__container -->