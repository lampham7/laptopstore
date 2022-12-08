<?php
    require_once "./utils/session.php";
    require_once "./db/config.php";
    if(!empty(Session::get("user"))){
        echo '<script>
            alert("Bạn đã đăng nhập.");
            window.location.href="'.baseUrl.'";
        </script>';
        die();
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng nhập tài khoản</title>
    <link rel="stylesheet" href="./css/base/grid.css" />
    <link rel="stylesheet" href="./css/base/reset.css" />
    <link
            href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
            rel="stylesheet"
        />
    <link rel="stylesheet" href="./css/pages/login/login.css">
</head>
<body>
    <div class="container">
        <div class="container__registor">
            <h3>Đăng nhập</h3>
            <form class="form__register" action="" method="POST">
                <label for="account">Tên tài khoản</label>
                <input type="text" required placeholder="Nhập tên tài khoản" name="account" id="account" />
                <label for="password">Mật khẩu</label>
                <input type="password"required  placeholder="Nhập mật khẩu" name="password" id="password" />
                <input type="hidden" name="crud_req" value="login">
                <button type="submit" id="btn-submit">Đăng nhập</button>
            </form>
            <div class="login">
                <span>Nếu bạn chưa có tài khoản?</span>
                <a href="register.php">Đăng ký</a>
            </div>
        </div>
    </div>
    <script type="module" src="./js/pages/login.js"></script>
</body>
</html>