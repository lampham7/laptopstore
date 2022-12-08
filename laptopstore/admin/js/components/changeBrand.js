import {$,$$} from "../configs/constants.js";
import {baseURL} from "../configs/configs.js";
let urlSearchParams = new URLSearchParams(window.location.search)
let params = Object.fromEntries(urlSearchParams.entries())
let idBrand = params.id;
if(idBrand){
    fetch(`${baseURL}admin/controller/brands.php?id=${idBrand}`,{
        method:"GET",
        credentials: "include"
    }).then(res=>{
        res.text().then(res=>{
            let dataRes = JSON.parse(res)
            let inputName = document.getElementById("name");
            let image = document.getElementById("image");
            inputName.value=dataRes.name;
            image.src = `${baseURL}store/${dataRes.image}`;

            let formSubmit = document.getElementById("form-change-brand")
            formSubmit.addEventListener("submit",(e)=>{
                e.preventDefault();
                let formData = new FormData(formSubmit)
                fetch(`${baseURL}admin/controller/brands.php?id=${idBrand}`,{
                    method: "POST",
                    credentials: "include",
                    body: formData
                }).then(res=>{
                    if(res.status===200||res.status===201){
                        alert("Cập nhật thành công");
                    }else{
                        alert("cập nhật thất bại")
                    }
                }).catch(err=>{
                    alert("Có lỗi khi cập nhật")
                })
            })

        })
    })
}

