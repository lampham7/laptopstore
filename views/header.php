<?php
require_once "./utils/session.php";
Session::init();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Trang chủ</title>
    <link rel="stylesheet" href="./css/base/grid.css" />
    <link rel="stylesheet" href="./css/base/reset.css" />
    <link href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css" />
    <link rel="stylesheet" href="./css/pages/home/home.css" />

</head>

<body>
    <!-- start navbar -->
    <div class="navbar">
        <div class="navbar__control-mobile">
            <i class="bx bx-menu"></i>
        </div>
        <div class="navbar__content__mobile">
            <span class="navbar__content__mobile__close"><i class="bx bx-window-close"></i></span>
            <a href="index.php" class="navbar__content__mobile__logo"><img src="./access/imgs/logo.png" alt="" /></a>
            <form action="" method="get" class="navbar__content__mobile__search">
                <input type="text" placeholder="Tìm kiếm sản phẩm" name="search" />
                <button type="submit"><i class="bx bx-search"></i></button>
            </form>
        </div>
        <div class="navbar__content__mobile__overlay"></div>

        <div class="navbar__item logo">
            <a href="index.php" class="navbar__item__logo-link">
                <img src="./access/imgs/logo.png" alt="" />
            </a>
        </div>
        <div class="navbar__item search">
            <form action="" method="GET" class="navbar__item__search">
                <input type="text" name="name" placeholder="Tìm kiểm sản phẩm" class="navbar__item__search-input" id="" />
                <button type="submit" class="navbar__item__search-submit">
                    <i class="bx bx-search"></i>
                </button>
                <!-- index.php?view=search&type=name&name=DELL -->
            </form>
        </div>
        <div class="navbar__item user">
            <?php
            if (!empty(Session::get("user"))) { //logged
                $id = Session::get("user")["id"];
                $name = Session::get("user")["name"];
                $avatar = Session::get("user")["avatar"];
                if (!isset($name)) {
                    $name = "Tên người dùng";
                };
                if (!isset($avatar)) {
                    $avatar = "./access/imgs/user.png";
                } else {
                    $avatar = "./store/" . $avatar;
                }
                echo '
                <div class="navbar__item__user__logged">
                    <a href="about.php" class="navbar__item__user__logged-infor">
                        <img src="' . $avatar . '" alt="" />
                        <p>' . $name . '</p>
                    </a>
                    <div class="navbar__item__user__logged-cart">
                        <div class="navbar__item__user__logged-cart-icon">
                            <i class="bx bxs-cart"></i>
                        </div>
                        <div class="navbar__item__user__logged-cart-quantity">
                            3
                        </div>

                        <div class="navbar__item__user__logged-cart-detail">
                            <header>Thông tin giỏ hàng</header>
                            <session>
                                <div class="item">
                                    <div class="item__img">
                                        <img
                                            src="./access/imgs/OIP.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div class="item__detail">
                                        <p class="item__detail-title">
                                            Simple Open Source icons carefully
                                            crafted for designers & developers
                                        </p>
                                        <div class="item__detail-price">
                                            <span> <sup>đ</sup>500.000 </span>
                                            <span>x 50</span>
                                        </div>
                                    </div>
                                </div>
                            </session>
                            <footer><a href="index.php?view=carts">giỏ hàng</a></footer>
                        </div>
                    </div>
                    <div class="navbar__item__user__logged-loggout"
                        ><p id="btn-logout">đăng xuất</p>
                        <i class="bx bx-log-out"></i
                    ></div>
                </div>';
                echo '<script type="module" src="./js/components/cartHeader.js"></script>';
            } else { //not logged
                echo '
        <div class="navbar__item__user__not__logged">
            <a href="register.php" class="navbar__item__user__not__logged-registor">đăng ký</a>
            <span></span>
            <a href="login.php" class="navbar__item__user__not__logged-loggin">đăng nhập</a>
        </div>';
            }
            ?>
            <!-- start when logged -->
            <!-- <div class="navbar__item__user__logged">
                    <a href="about.php" class="navbar__item__user__logged-infor">
                        <img src="./access/imgs/user.png" alt="" />
                        <p>tovantai</p>
                    </a>
                    <div class="navbar__item__user__logged-cart">
                        <div class="navbar__item__user__logged-cart-icon">
                            <i class="bx bxs-cart"></i>
                        </div>
                        <div class="navbar__item__user__logged-cart-quantity">
                            3
                        </div>

                        <div class="navbar__item__user__logged-cart-detail">
                            <header>Thông tin giỏ hàng</header>
                            <session>
                                <div class="item">
                                    <div class="item__img">
                                        <img
                                            src="./access/imgs/OIP.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div class="item__detail">
                                        <p class="item__detail-title">
                                            Simple Open Source icons carefully
                                            crafted for designers & developers
                                        </p>
                                        <div class="item__detail-price">
                                            <span> <sup>đ</sup>500.000 </span>
                                            <span>x 50</span>
                                        </div>
                                    </div>
                                </div>
                            </session>
                            <footer><a href="index.php?view=carts">giỏ hàng</a></footer>
                        </div>
                    </div>
                    <a href="#" class="navbar__item__user__logged-loggout"
                        ><p>đăng xuất</p>
                        <i class="bx bx-log-out"></i
                    ></a>
                </div> -->

            <!-- end when logged -->

            <!-- start when not logged -->
            <!-- <div class="navbar__item__user__not__logged">
                    <a href="register.php" class="navbar__item__user__not__logged-registor">đăng ký</a>
                    <span></span>
                    <a href="login.php" class="navbar__item__user__not__logged-loggin">đăng nhập</a>
                </div> -->
            <!-- end when not logged -->
        </div>
    </div>
    <script type="module" src="./js/components/navbar.js"></script>
    <!-- end navbar -->