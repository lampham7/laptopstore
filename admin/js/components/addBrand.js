import {$,$$} from "../configs/constants.js";
import {baseURL} from "../configs/configs.js";
let formAdd = document.getElementById("form-add-brand")
formAdd.addEventListener("submit",e=>{
    e.preventDefault()
    let formData = new FormData(formAdd)
    fetch(`${baseURL}admin/controller/brands.php`,{
        method: "POST",
        body: formData,
        credentials: "include"
    }).then(res=>{
        if(res.status===200||res.status===201){
            alert("Thêm thành công");
        }
    }).catch(err=>alert("có lỗi xảy ra"))
})