import {$,$$,numberWithComas,validateString} from "../configs/constants.js";
import {baseURL} from "../configs/configs.js";
let params = new URLSearchParams(window.location.search);
let idOrder = params.get("id");
let cartData ;
document.title = "Trang quản lý đơn hàng";
async function getCartData(url){
    await new Promise((resolve, reject)=>{
        fetch(url,{
            credentials: "include",
            method:"GET"
        }).then(res=>{
            if(res.status==200||res.status==201){
                res.text().then(res=>{
                    cartData = JSON.parse(res);
                    resolve();
                })
            }else{
                reject();
            }
        }).catch(err=>{});
    })
}
function renderOrder(data){
    let totalMany=0;
    let totalQuantity=0;
    let cartDetailHtml = '';
    data.orderDetails.forEach(element=>{
        totalQuantity+=Number(element.quantity);
        totalMany+=(Number(element.quantity)*Number(element.price))
        cartDetailHtml+=`
        <tr>
            <td>${validateString(element.model)}</td>
            <td><img src="${baseURL}store/${element.background}" /></td>
            <td>${validateString(element.capacityName)}</td>
            <td>${numberWithComas(element.price)}<sup>đ</sup></td>
            <td>${element.quantity}</td>
            <td><a class="btn" href="${baseURL}admin/index.php?view=product&id=${element.productId}">Xem</a></td>
        </tr>
        `
    });
    let cartMainHtml = `
    <tr>
        <td>${data.orderId}</td>
        <td>${data.statusName}</td>
        <td>${data.created_at}</td>
        <td>${data.userName}</td>
        <td>${data.userPhoneNumber}</td>
        <td>${data.userAddress}</td>
        <td>${data.userEmail}</td>
        <td>${numberWithComas(totalMany)}<sup>đ</sup></td>
        <td>${totalQuantity}</td>
    </tr>
    `;
    $(".cartMain").innerHTML = cartMainHtml;
    $(".cartDetail").innerHTML=cartDetailHtml;

}
async function mainFn(){
    try{
        await getCartData(`${baseURL}admin/controller/orders.php?id=${idOrder}`);
        renderOrder(cartData);
    }catch(err){
    }
}
mainFn();