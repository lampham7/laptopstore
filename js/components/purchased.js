import { $, $$, numberWithComas, validateString } from "../configs/constants.js";
import { baseUrl } from "../configs/configs.js";
let urlApi = `${baseUrl}/api/orders.php`;
let listDataOrders;
document.title = "Trang sản phẩm đã mua";
async function getListDataOrders (urlApi) {
    await new Promise((resolve, reject) => {
        fetch(`${urlApi}`, {
            credentials: 'include',
            method: "GET"
        }).then(res => {
            if (res.status == 200 || res.status == 201) {
                res.text().then(res => {
                    listDataOrders = JSON.parse(res);
                    resolve();
                })
            } else {
                res.text().then(res => {
                    reject(res);
                })
            }
        })
    })
}
function renderListOrders (data) {
    let purchasedLists = '';
    if (data.length > 0) {
        data.forEach(element => {
            let totalPrice = 0;
            purchasedLists += `
            <div class="purchased__list">
                <div class="purchased__list__status">
                    <p>
                        Mã đơn hàng: ${element["orderId"]}
                    </p>
                    <p>
                        <span class="purchased__list__status-icon"><i class='bx bx-car'></i></span>
                        <span class="purchased__list__status-description">${element["statusName"]}</span>
                    </p>
                </div>`;
            element["orderDetails"].forEach(item => {
                totalPrice += Number(item["price"]) * Number(item["quantity"]);
                purchasedLists += `
                    <a href="${baseUrl}index.php?view=product&id=${item["productId"]}" class="purchased__list__item">
                    <div class="purchased__list__item-image">
                        <img src="${baseUrl}store/${item["background"]}" alt="">
                    </div>
                    <div class="purchased__list__item__detail">
                        <div class="purchased__list__item__detail__about">
                            <div class="purchased__list__item__detail__about-name">
                                <span>${item["model"]}</span>
                            </div>
                            <div class="purchased__list__item__detail__about-category">
                                <span>Phân loại hàng: ${item["capacityName"]}</span>
                            </div>
                            <div class="purchased__list__item__detail__about-quantity">
                                <span>x${item["quantity"]}</span>
                            </div>
                        </div>
                        <div class="purchased__list__item__detail__price">
                            <span class="current-price">${numberWithComas(item["price"])}<u>đ</u></span>
                        </div>
                    </div>
                </a>
                `;
            });
            let btnActions = '';
            if (element["statusId"] == 1) {
                btnActions += `<span data-change="10" data-orderid="${element["orderId"]}" class="change-status active action">Hủy đơn hàng</span>`
            }
            if (element["statusId"] == 6) {
                btnActions += `<span data-change="7" data-orderid="${element["orderId"]}" class="change-status active action">Trả hàng</span>`
            }
            purchasedLists += `<div class="purchased__list__totalprice">
                    Tổng tiền:<span>${numberWithComas(totalPrice)}<u>đ</u></span>
                </div>
                <div class="purchased__list__actions">${btnActions}</div>
            </div>`;
        });
    }
    $(".purchased__container").innerHTML = purchasedLists;
    $$(".change-status").forEach(element=>{
        element.addEventListener("click",onChangeStatus);
    })
}
function onChangeStatus () {
    let orderId12 = this.dataset.orderid;
    let statusChange12 = this.dataset.change;
    if (confirm("Bạn có muấn lưu thay đổi trạng thái đơn hàng?")) {
        let body = JSON.stringify({ "statusChange": statusChange12, "orderId": orderId12 });
        fetch(`${baseUrl}api/orders.php?crud_req=updateOrders`, {
            method: "POST",
            credentials: "include",
            body
        }).then(res => {
            if (res.status == 201 || res.status == 200) {
                alert("Thành công");
                window.location.reload();
            } else {
                res.text().then(res => alert(res));
            }
        })
    }
}
async function mainFn () {
    try {
        await getListDataOrders(urlApi);
        renderListOrders(listDataOrders);
    } catch {

    }
}

mainFn();