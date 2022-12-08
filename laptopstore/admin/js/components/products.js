import {$,$$} from "../configs/constants.js";
import {baseURL} from "../configs/configs.js";
let productList = document.getElementById("product__list");
document.title = "Trang quản lý sản phẩm";
fetch(`${baseURL}admin/controller/products.php`,{
    method:"GET",
    credentials:"include"
}).then(res=>{
    return res.text().then(resData=>{
        resData = JSON.parse(resData)
        let productsHtml = ""
        if(resData){
            for(let i=0;i<resData.length;i++){
                productsHtml+=`
                <tr>
                        <td>${i+1}</td>
                        <td>${resData[i]['model']}</td>
                        <td><img style="height:50px; object-fit:cover" src="${baseURL}store/${resData[i]['background']}" alt=""></td>
                        <td>${resData[i]['screen']}</td>
                        <td>${resData[i]['RAM']}</td>
                        <td>${resData[i]['hardware']}</td>
                        <td>${resData[i]['OS']}</td>
                        <td>${resData[i]['CPU']}</td>
                        <td>${resData[i]['VGA']}</td>
                        <td>${resData[i]['warranty']}</td>
                        <td>${resData[i]['discount']}</td>
                        <td>${resData[i]['color']}</td>
                        <td>
                            <a href="index.php?view=change-product&id=${resData[i]['id']}" class="btn">Sửa</a>
                            <a href="index.php?view=product&id=${resData[i]['id']}" class="btn">Xem</a> 
                        </td>
                    </tr>`
            }
            productList.innerHTML=productsHtml
        }
    })
})