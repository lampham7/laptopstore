import { $, $$ } from "../configs/constants.js";
import { baseUrl } from "../configs/configs.js";
let btnSubmit = document.getElementById("btn-submit");
btnSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    let formData = new URLSearchParams(new FormData($("form")));
    const params = Object.fromEntries(formData.entries());
    let {account, password, newPassword, confirmNewPassword,crud_req}=params;
    let accountRegular = /^[a-z0-9]{3,15}$/;
    let passwordRegular = /^\S{3,15}$/;
    let isValidate = true;
    let messageErr="";
    if (!accountRegular.test(account)) {
        isValidate = false;
        messageErr+="Tên tài khoản: dài từ 3->15 ký tự, bao gồm số hoặc chữ thường, không chứa ký tự đặc biệt!\n";
    }
    if (!passwordRegular.test(password)||!passwordRegular.test(newPassword)||!passwordRegular.test(confirmNewPassword)) {
        isValidate = false;
        messageErr+= "Mật khẩu: dài từ 3->15 ký tự, không được có khoảng trắng!\n";
    }
    if(password==newPassword){
        isValidate = false;
        messageErr+= "Mật khẩu mới không được giống mật khẩu cũ!\n";
    }
    if(newPassword!=confirmNewPassword){
        isValidate = false;
        messageErr+= "Mật khẩu không khớp!\n" ;
    }

    if(isValidate==false){
        alert(messageErr);
    }else if (isValidate == true&&crud_req=="changePassword") {
        let body= new FormData(document.getElementById("changePasswordForm"));
        fetch(`${baseUrl}api/user.php`, {
            method: "POST",
            credentials: "include",
            body
        }).then(res => 
            {
                if(res.status==200||res.status==201){
                    res.text().then(res=>{
                        alert(res);
                        window.location.href=baseUrl;
                    })
                }else{
                    res.text().then(res=>{
                        alert(res);
                    })
                }
            }
        ).catch(err=>{
            alert("Đổi mật khẩu thất bại");
        })
    }

});