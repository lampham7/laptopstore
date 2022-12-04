<?php
require_once "./utils/session.php";
require_once "./db/config.php";
if(empty(Session::get("user"))){
    echo '<script>
        alert("Vui lòng đăng nhập để sử dụng chức năng này.");
        window.location.href="'.baseUrl.'";
    </script>';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thay đổi mật khẩu</title>
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
            <h3>Đổi mật khẩu</h3>
            <form class="form__register" id="changePasswordForm" action="" method="POST">
                <label for="account">Tên tài khoản</label>
                <input required type="text" required placeholder="Nhập tên tài khoản" name="account" id="account" />
                <label for="password">Mật khẩu cũ</label>
                <input required type="password"required  placeholder="Nhập mật khẩu" name="password" id="password" />
                <label for="newPassword">Mật khẩu mới</label>
                <input required type="password"required  placeholder="Nhập mật khẩu" name="newPassword" id="newPassword" />
                <label for="confirmNewPassword">Nhập lại khẩu mới</label>
                <input required type="password"required  placeholder="Nhập mật khẩu" name="confirmNewPassword" id="confirmNewPassword" />
                <input type="hidden" name="crud_req" value="changePassword">
                <button type="submit" id="btn-submit">Đổi mật khẩu</button>
            </form>
            <div class="login">
                <span>Trở về?</span>
                <a href="about.php">Thông tin cá nhân</a>
            </div>
        </div>
    </div>
    <script type="module" src="./js/pages/change_password.js"></script>
</body>
</html>