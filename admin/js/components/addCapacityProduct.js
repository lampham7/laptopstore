import {$,$$} from "../configs/constants.js";
import {baseURL} from "../configs/configs.js";
let idProduct = Object.fromEntries(new URLSearchParams(window.location.search).entries())['id-product']
if(Number(idProduct) > 0){
    let form = document.getElementById("form-add-capacity")
    form.addEventListener("submit",(e)=>{
        let formData = new FormData(form)
        e.preventDefault()
        fetch(`${baseURL}admin/controller/capacities.php?id-product=${idProduct}`,{
            method: "POST",
            credentials: "include",
            body: formData
        }).then(res=>{
            if(res.status===200||res.status===201){
                res.text().then(res=>alert(res))
            }else{
                res.text().then(res=>alert(res))
            }
        }).catch(err=>alert(err))
    })
}
