import {$,$$} from "../configs/constants.js";
import {baseURL} from "../configs/configs.js";
let ordersIdList;
let orderIdActive;//history
let ordersList;
document.title = "Trang quản lý đơn hàng";
async function getOrdersIdList(url){
    await new Promise((resolve,reject)=>{
        fetch(url,{
            credentials:"include",
            method:"GET"
        }).then(res=>{
            if(res.status==200){
                res.text().then(res=>{
                    ordersIdList=JSON.parse(res);
                    resolve();
                })
            }else{
                reject();
            }
        })
    })
}
async function getOrdersList(url){
    await new Promise((resolve,reject)=>{
        fetch(url,{
            credentials:"include",
            method:"GET"
        }).then(res=>{
            if(res.status==200){
                res.text().then(res=>{
                    ordersList=JSON.parse(res);
                    resolve();
                })
            }else{
                reject();
            }
        })
    })
}
function changeParamsUrl(data){
    const url = new URL(window.location);
    url.searchParams.set("id-status", data);
    history.pushState({},"",url);
    orderIdActive=data;
}
function renderStatus(data){
    let actionsElm = document.getElementById("actions");
    let listOptionHtml = '';
    data.forEach(element=>{
        if(orderIdActive==element.id){
            listOptionHtml+=`<option value="${element.id}" selected>${element.name}</option>`;
        }else{
            listOptionHtml+=`<option value="${element.id}">${element.name}</option>`
        }
    });
    actionsElm.innerHTML=listOptionHtml;
    actionsElm.addEventListener("change",onChangeAction);
}
function renderOrders(data){
    let ordersHtml = '';
    data.forEach(element=>{
        ordersHtml+=`<tr>
        <td>${element["orderId"]}</td>
        <td>${element["createAt"]}</td>
        <td>${element["statusName"]}</td>
        <td style="width: 320px">
            <select class="listStatusChange" style="padding:5px; display:inline-block" name="status">
                ${renderListStatusChange(element["statusId"])}
            </select>
            <span class="btn btn-change-status" style="display:inline-block" data-statuscurrent=${element["statusId"]} data-orderid=${element["orderId"]}>Lưu trạng thái</span>
        </td>
        <td>
            <a href="${baseURL}admin/index.php?view=cart&id=${element["orderId"]}" class="btn">Xem</a>
        </td>
    </tr>
</tbody>`;
    });
    $(".container table tbody").innerHTML=ordersHtml;
    $$(".btn-change-status").forEach(element=>{
        element.addEventListener('click',onChangeStatus);
    })
}
function onChangeStatus(){
    let currentElm = this.parentNode.parentNode;
    let statusCurrent12 = this.dataset.statuscurrent;
    let orderId12 = this.dataset.orderid;
    let statusChange12 = this.parentNode.querySelector(".listStatusChange").value;
    if(statusChange12!=statusCurrent12){
        if(confirm("Bạn có muấn lưu thay đổi trạng thái đơn hàng?")){
            let body = JSON.stringify({"statusChange":statusChange12,"orderId":orderId12});
            fetch(`${baseURL}admin/controller/orders.php`,{
                method:"POST",
                credentials:"include",
                body
            }).then(res=>{
                if(res.status==201||res.status==200){
                    currentElm.parentNode.removeChild(currentElm);
                    alert("Thành công");
                }else{
                    res.text().then(res=>alert(res));
                }
            })
        }
    }
}
function renderListStatusChange(statusCurrent){
    let optionHtml ='';
    //ordersList[id-1]->id,name
    if(statusCurrent==1){
        optionHtml+=`<option selected value="${ordersIdList[0]["id"]}">
            ${ordersIdList[0]["name"]}    
        </option>`;
        optionHtml+=`
            <option value="${ordersIdList[1]["id"]}">
            ${ordersIdList[1]["name"]}    
        </option>
        `;
        optionHtml+=`
            <option value="${ordersIdList[9]["id"]}">
            ${ordersIdList[9]["name"]}    
        </option>
        `;
    }else if(statusCurrent>=2&&statusCurrent<=5){
        optionHtml+=`<option selected value="${ordersIdList[statusCurrent-1]["id"]}">
            ${ordersIdList[statusCurrent-1]["name"]}    
        </option>`;
        for(let i=(Number(statusCurrent)+1); i<=6; i++){
            optionHtml+=`
                <option value="${ordersIdList[i-1]["id"]}">
                ${ordersIdList[i-1]["name"]}    
            </option>
            `;
        };
        optionHtml+=`
                <option value="${ordersIdList[11]["id"]}">
                ${ordersIdList[11]["name"]}    
            </option>
            `;
    }else if(statusCurrent==6){
        optionHtml+=`<option selected value="${ordersIdList[statusCurrent-1]["id"]}">
            ${ordersIdList[statusCurrent-1]["name"]}    
        </option>`;
    }else if(statusCurrent==7){
        optionHtml+=`<option selected value="${ordersIdList[statusCurrent-1]["id"]}">
            ${ordersIdList[statusCurrent-1]["name"]}    
        </option>`;
        optionHtml+=`<option value="${ordersIdList[7]["id"]}">
            ${ordersIdList[7]["name"]}    
        </option>`;
        optionHtml+=`<option value="${ordersIdList[10]["id"]}">
            ${ordersIdList[10]["name"]}    
        </option>`;
    }else if(statusCurrent==8){
        optionHtml+=`<option selected value="${ordersIdList[statusCurrent-1]["id"]}">
            ${ordersIdList[statusCurrent-1]["name"]}    
        </option>`;
        optionHtml+=`<option value="${ordersIdList[8]["id"]}">
            ${ordersIdList[8]["name"]}    
        </option>`;
        optionHtml+=`<option value="${ordersIdList[10]["id"]}">
            ${ordersIdList[10]["name"]}    
        </option>`;
    }else{
        optionHtml+=`<option selected value="${ordersIdList[statusCurrent-1]["id"]}">
            ${ordersIdList[statusCurrent-1]["name"]}    
        </option>`;
    }
    return optionHtml;
}
async function onChangeAction(){
    try{
        changeParamsUrl(this.value);
        await getOrdersList(`${baseURL}admin/controller/orders.php?status-id=${orderIdActive}`);
        renderOrders(ordersList);
    }catch(err){
    }
}
async function mainFn(){
    try{
        await getOrdersIdList(`${baseURL}admin/controller/status.php`);
        orderIdActive = new URLSearchParams(window.location.search).get("id-status");
        if(!orderIdActive){
            orderIdActive=1;
        }
        renderStatus(ordersIdList);
        await getOrdersList(`${baseURL}admin/controller/orders.php?status-id=${orderIdActive}`);
        renderOrders(ordersList);
    }catch(err){
    }
}
mainFn();