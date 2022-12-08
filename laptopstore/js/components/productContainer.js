import { $, $$, httpGetAsync, numberWithComas, validateString,renderCartHeader } from "../configs/constants.js";
import { baseUrl } from "../configs/configs.js";
//get params:
let urlSearchParams = new URLSearchParams(window.location.search);
let params = Object.fromEntries(urlSearchParams.entries());
let urlApi = `${baseUrl}api/products.php`;
let dataRes;
let dataCapacities;
let idProduct;
let idCapacityActive;
let discount;
let quantityRemain;
let quantityAdd=1;
let oldPrice;
let newPrice;
let background;
let model;
let capacityName;
fetch(`${urlApi}?id=${params.id}`,{
    credentials:"include",
    method:"GET"
}).then(res=>{
    if(res.status==200){
            res.text().then(res=>{
                dataRes = JSON.parse(res);
                dataCapacities=dataRes.capacities;
                idProduct=dataRes.id;
                discount=dataRes.discount;
                idCapacityActive=dataRes.capacities[0]["id"];
                quantityRemain=dataRes.capacities[0]["quantity"];
                capacityName=dataRes.capacities[0]["capacity_name"];
                background= dataRes["background"];
                model=dataRes["model"];
                renderProduct();
                renderCapacities();
                document.title="Trang chi tiết sản phẩm - " + validateString(model);
            }
        )
    }
}).catch(err=>{});
function renderProduct(){
    $(".product__heading").innerHTML=validateString(dataRes.model);
    $(".product__about__picture").innerHTML=`<img src="${baseUrl}store/${background}" alt="">`;
    document.getElementById("warranty").innerHTML=validateString(dataRes.warranty);
    let gifsElm = `
    <li class="gif">Balo ${validateString(dataRes.brand)} Office.</li>
    <li class="gif">Túi chống sốc ${validateString(dataRes.brand)}.</li>
    <li class="gif">Chuật không dây LM115G Wireless.</li>
    `;
    $(".gifs").innerHTML=gifsElm;
    let tableElm = `
    <tr>
        <td>Thương hiệu</td>
        <td>${validateString(dataRes.brand)}</td>
    </tr>

    <tr>
        <td>Bảo hành</td>
        <td>${validateString(dataRes.warranty)}</td>
    </tr>

    <tr>
        <td>Model</td>
        <td>${validateString(dataRes.model)}</td>
    </tr>

    <tr>
        <td>CPU</td>
        <td>${validateString(dataRes.CPU)}</td>
    </tr>

    <tr>
        <td>RAM</td>
        <td>${validateString(dataRes.RAM)}</td>
    </tr>

    <tr>
        <td>Ổ cứng</td>
        <td>${validateString(dataRes.hardware)}</td>
    </tr>

    <tr>
        <td>Card đồ họa</td>
        <td>${validateString(dataRes.VGA)}</td>
    </tr>

    <tr>
        <td>Màn hình</td>
        <td>${validateString(dataRes.screen)}</td>
    </tr>

    <tr>
        <td>Cổng quan giao tiếp</td>
        <td>1x USB 3.1, 2x USB 2.0, HDMI, RJ-45</td>
    </tr>

    <tr>
        <td>Ổ quang</td>
        <td>None</td>
    </tr>

    <tr>
        <td>Audio</td>
        <td>Realtek High Definition</td>
    </tr>

    <tr>
        <td>Chuẩn LAN</td>
        <td>10/100/1000 Mbps</td>
    </tr>

    <tr>
        <td>Chuẩn WIFI</td>
        <td>802.11 ac</td>
    </tr>
    <tr>
        <td>Webcam</td>
        <td>HD Webcam</td>
    </tr>
    <tr>
        <td>Bluetooth</td>
        <td>v4.2</td>
    </tr>
    <tr>
        <td>Pin</td>
        <td>3 Cell 36.7 Whr</td>
    </tr>
    <tr>
        <td>Hệ điều hành</td>
        <td>${validateString(dataRes.OS)}</td>
    </tr>
    `;
    $(".product__details__item table").innerHTML=tableElm;
}
function renderCapacities(){
    let selectList ='';
    let aboutPriceElm=$(".product__about__price");
    dataCapacities.forEach(element=>{
        if(element.id==idCapacityActive){
            quantityRemain=element.quantity;
            oldPrice=element.price;
            selectList+=`<li data-id="${element.id}" class="active">${element.capacity_name}</li>`;            
        }else{
            selectList+=`<li data-id="${element.id}" >${element.capacity_name}</li>`;            
        }
    });
    $("ul.select").innerHTML=selectList;
    $$("ul.select li").forEach(element=>{
        let dataIndex= element.dataset.id;
        if(dataIndex!=idCapacityActive){
            element.addEventListener('click',function onChangeCapacity(){
                idCapacityActive=dataIndex;
                dataCapacities.forEach(element=>{
                    if(element.id==idCapacityActive){
                        quantityRemain=element.quantity;
                        capacityName=element["capacity_name"];
                    }
                })
                renderCapacities();
            })
        }
    })
    if(discount>0){
        newPrice=(Number(oldPrice)/100)*(100-Number(discount));
    }else{
        newPrice=oldPrice;
    }
    $(".product__about-quantity").innerHTML=`<p>Số lượng còn: </p><p id="quantity">${quantityRemain}</p>`;
    if(discount>0){
        aboutPriceElm.innerHTML=`
        <div class="old-price">
            <p>Giá cũ: </p><del>${numberWithComas(oldPrice)}<u>đ</u></del>
        </div>
        <div class="current-price">
            <p>Giá KM: </p><span>${numberWithComas(newPrice)}<u>đ</u></span>
        </div>
        `;
    }else{
        aboutPriceElm.innerHTML=`
        <div class="old-price">
        </div>
        <div class="current-price">
            <p>Giá: </p><span>${numberWithComas(oldPrice)}<u>đ</u></span>
        </div>
        `;
    };
    $(".product__about-order").addEventListener('click',onOrders);
}
function onOrders(){
    if(quantityRemain<=1){
        alert("khong du so luong");
    }else{
        // console.log("idCapacityActive "+idCapacityActive);
        // console.log("idProduct "+idProduct);
        // console.log("quantityAdd "+quantityAdd);
        // console.log("discount "+discount);
        // console.log("background "+background);
        // console.log("oldPrice "+oldPrice);
        // console.log("newPrice "+newPrice);
        let dataBody=JSON.stringify({
            discount,background,oldPrice,newPrice,model,capacityName,quantityRemain
        });
        let urlCartApi=`${baseUrl}api/carts.php`;
        fetch(`${urlCartApi}?product_id=${idProduct}&capacity_id=${idCapacityActive}&quantity=${quantityAdd}`,{
            method:"POST",
            credentials:"include",
            body:dataBody
        }).then(res=>{
            if(res.status==203){
                res.text().then(res=>{
                    alert(res);
                })
            }else{
                res.text().then(res=>{
                    alert("Thêm thành công.");
                    let cartsRes = JSON.parse(res);
                    renderCartHeader(cartsRes);
                })
            }
        })
    }
}