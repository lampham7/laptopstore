import { $, $$, httpGetAsync, numberWithComas, validateString,renderCartHeader } from "../configs/constants.js";
import { baseUrl } from "../configs/configs.js";
let urlApiCarts = `${baseUrl}api/carts.php`;
let dataCarts;
let isReadyBuyCarts = true;
document.title="Trang giỏ hàng";
async function getCartsData(url){
    await new Promise((resolve,reject)=>{
        fetch(url,{
            method:"GET",
            credentials:"include"
            })
            .then(res=>{
                if(res.status==200){
                    res.text().then(res=>{
                        resolve(JSON.parse(res));
                    })
                }else{
                    res.text().then(res=>{
                        reject(res);
                    })
                }
            })
        }).then(res=>{
            dataCarts=res;
        }).catch(err=>{
            alert(err);
        });
}
async function test(){
    try{
        await getCartsData(urlApiCarts);
        renderCartList(dataCarts);
    }catch{
    }
}
test();
function getTotalPrice(data){
    let result =0;
    data.forEach(element=>{
        result+=element.quantity*element["detail"]["newPrice"];
    });
    return result;
}
function renderCartList(data){
    // start render carts
    let result ="";
    let totalPrice=getTotalPrice(data);
    data.forEach(element=>{
        let urlBackground=`${baseUrl}store/${element["detail"]["background"]}`;
        let model = validateString(`${element["detail"]["model"]}`);
        let linkProduct=`${baseUrl}index.php?view=product&id=${element["productId"]}`;
        result+=`
            <tr class="cart__item">
                <td>
                    <a href="${linkProduct}">
                        <img src="${urlBackground}" alt="">
                    </a>
                </td>
                <td>
                    <a href="${linkProduct}">
                        <p>${model}</p>
                    </a>
                </td>
                <td>${element["detail"]["capacityName"]}</td>
                <td>
                    <input type="number" class="cart__item__quantity" name="quantity" data-product="${element["productId"]}" data-capacity="${element["capacityId"]}" value="${element["quantity"]}">
                </td>
                <td>
                    ${numberWithComas(element["detail"]["newPrice"])}<u>đ</u>
                </td>
                <td>
                    <span class="cart__del" data-product="${element["productId"]}" data-capacity="${element["capacityId"]}"><i class='bx bx-trash' ></i></span>
                </td>
            </tr>
        `;
    });
    $(".carts__table").innerHTML = `
        <tr>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Phân loại</th>
            <th>Số lượng</th>
            <th>Giá tiền</th>
            <th>Xóa</th>
        </tr>
        ${result}
        `;
    $(".carts__total-total").innerHTML=`
        ${numberWithComas(totalPrice)}<u>đ</u>
    `;
    // end render carts
    // start addEvent for input quantity 
    $$(".cart__item__quantity").forEach(element=>{
        element.addEventListener('change',function onChangeQuantity(){
            
            let quantityOld = Number(this.value);
            let productIdChange = this.dataset.product;
            let capacityIdChange = this.dataset.capacity;
            let quantityRemain=Number(dataCarts.find((elm)=>elm.productId==productIdChange&&elm.capacityId==capacityIdChange)["detail"]["quantityRemain"]);
            

            if(quantityOld>=quantityRemain){
                this.value=quantityRemain-1;
                quantityOld=quantityRemain-1;
            }else if(quantityOld<=0){
                this.value=1;
                quantityOld=1;
            }else{
                for(let i=0;i<dataCarts.length;i++){
                    if(dataCarts[i]["productId"]==productIdChange&&dataCarts[i]["capacityId"]==capacityIdChange){
                        dataCarts[i].quantity=quantityOld;
                        $(".carts__total-total").innerHTML=`
                            ${numberWithComas(getTotalPrice(dataCarts))}<u>đ</u>
                        `;
                        isReadyBuyCarts=false;
                        break;
                    }
                }
            }
            
        })
    })
    // end addEvent for input quantity 

    //start addEvent for btn del cartItem
    $$(".cart__del").forEach(element=>{
        element.addEventListener('click',function onDeleteCart(){
            let productIdChange = this.dataset.product;
            let capacityIdChange = this.dataset.capacity;
            let indexDel = dataCarts.findIndex(element=>element["productId"]==productIdChange&&element["capacityId"]==capacityIdChange);
            if(confirm("Bạn có muấn xóa sản phẩm này khỏi giỏ hàng?")){
                dataCarts.splice(indexDel,1);
                isReadyBuyCarts=false;
                renderCartList(dataCarts);
            }
        })
    })
    //start addEvent for btn del cartItem
}
//on update carts
$(".carts__btn-update").addEventListener('click',function onUpdateCarts(){
    if(confirm("Bạn có muấn cập nhật giỏ hàng lên máy chủ?")){
        let dataBody = JSON.stringify(dataCarts);
        fetch(`${baseUrl}api/carts.php?crud_req=updateCarts`,{
            method:"POST",
            credentials:"include",
            body:dataBody
        }).then(res=>{
            if(res.status==200||res.status==201){
                res.text().then(res=>{
                    alert("Cập nhật giỏ hàng thành công.");
                    dataCarts=JSON.parse(res);
                    renderCartHeader(dataCarts);
                    isReadyBuyCarts=true;
                })
            }else{
                // console.log("Cập nhật thất bại.");
            }
        })
    }
})
//on pay carts
$(".carts__btn-pay").addEventListener('click',function onPayCarts(){
    if(isReadyBuyCarts==false){
        alert("Vui lòng click 'cập nhật' giỏ hàng!");
    }else{
        if(!dataCarts||dataCarts.length==0){
            alert("Giỏ hàng đang trống");
        }else{
            fetch(`${baseUrl}api/orders.php`,{
                method:"POST",
                credentials:"include"
            }).then(res=>{
                if(res.status==203){
                    res.text().then(res=>{
                        alert(res);
                    })
                }else if(res.status==201||res.status==200){
                    res.text().then(res=>{
                        alert(res);
                        // console.log(res);
                        window.location.href=`${baseUrl}index.php?view=purchased`;
                    })
                }
            })
        }
    }
})
