import { $, $$ } from "../configs/constants.js";
import { baseUrl } from "../configs/configs.js";
let btnSubmit = document.getElementById("btn-submit");
btnSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    let account = document.getElementById("account").value.trim();
    let password = document.getElementById("password").value;
    let accountRegular = /^[a-z0-9]{3,15}$/;
    let passwordRegular = /^\S{3,15}$/;
    let isValidate = true;
    if (!accountRegular.test(account)) {
        isValidate = false;
        alert("tên tài khoản: dài từ 3->15 ký tự, bao gồm số hoặc chữ thường, không chứa ký tự đặc biệt");
    }
    if (!passwordRegular.test(password)) {
        isValidate = false;;
        alert("mật khẩu: dài từ 3->15 ký tự, không được có khoảng trắng");
    }
    if (isValidate == true) {
        let formData = new FormData($("form"));
        fetch(`${baseUrl}api/user.php`, {
            method: "POST",
            credentials: "include",
            body: formData
        }).then(res => {
            if (res.status == 200 || res.status == 201) {
                // window.location.href=`${baseUrl}index.php`;//update here!!
                res.text().then(res => {
                    // role
                    if (Number(res) == 2) {
                        window.location.href = `${baseUrl}admin/`;
                    } else {
                        window.location.href = `${baseUrl}index.php`;
                    }
                })
            } else {
                res.text().then(res => {
                    alert(res);
                })
            }
        }
        ).catch(err => {
            alert("dang ky that bai");
        })
    }

});