import {$,$$} from "../configs/constants.js";
import {baseURL} from "../configs/configs.js";
let brandList = document.getElementById("brand__list");
document.title="Trang quản lý hãng";
fetch(`${baseURL}admin/controller/brands.php`,{
    method:"GET",
    credentials:"include"
}).then(res=>{
    return res.text().then(resData=>{
        let dataRes = JSON.parse(resData);
        let listHtml = '';
        for(let i=0;i<dataRes.length; i++){
            listHtml+=`
            <tr>
                <td>${i+1}</td>
                <td>${dataRes[i]["name"]}</td>
                <td><img style="height:50px; object-fit:cover" src="${baseURL}store/${dataRes[i]["image"]}" alt=""></td>
                <td>
                    <a href="index.php?view=change-brand&id=${dataRes[i]["id"]}" class="btn">Sửa</a> 
                </td>
            </tr>`;
        }
        brandList.innerHTML=listHtml;
    })
})