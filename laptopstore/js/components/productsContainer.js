import { $, $$, httpGetAsync, numberWithComas, validateString } from "../configs/constants.js";
import { baseUrl } from "../configs/configs.js";
//get params:
let urlSearchParams = new URLSearchParams(window.location.search);
let params = Object.fromEntries(urlSearchParams.entries());
let urlApi = `${baseUrl}api/products.php`;
let endPoint={};
let currentPage=1;
let totalPage=1;
let dataProducts=[];
if(params.view=="search"){    
    if(params.type=="brand"){
        endPoint["category-name"]=params.name;
        document.title="Hãng " + params.name;
    }else if(params.type=="products"){
        endPoint["search"]=params.name;
        document.title="Tìm kiếm " + params.name;
    }
    endPoint.page= params.page?params.page:1;
}else{
    endPoint.page= params.page?params.page:1;
}
function endPointString(endPoint){
    let result = "?";
    if(endPoint["category-name"]){
        result+=`category-name=${endPoint["category-name"]}`;
        result+=`&page=${endPoint["page"]}`;
    }else if(endPoint["search"]){
        result+=`search=${endPoint["search"]}`;
        result+=`&page=${endPoint["page"]}`;
    }else{
        result+=`page=${endPoint["page"]}`;
    }
    return result;
}
function endPointState(endPoint){
    let result = {};
    if(endPoint["category-name"]){
        result.view="search";
        result.type="brand";
        result.name=endPoint["category-name"];
        result.page=endPoint["page"];
    }else if(endPoint["search"]){
        result.view="search";
        result.type="products";
        result.name=endPoint["search"];
        result.page=endPoint["page"];
    }else{
        result.page=endPoint["page"];
    }
    return result;
}
function waiting(){
    let productsList = $(".products__list");
    productsList.innerHTML="";
    productsList.classList.add("waiting");
}
function endWaiting(){
    let productsList = $(".products__list");
    productsList.innerHTML="";
    productsList.classList.remove("waiting");
}
function renderProductList(data){
    let productsList = $(".products__list");
    let productItem = ``;
    data.forEach(item=>{
        let srcImg = `${baseUrl}store/${item.background}`;
        if(item.discount!=0){
            let priceDiscount = (Number(item.price)/100)*(100-item.discount);
            productItem+=`
            <div class="discount products__item col col-xs-6 col-sm-6 col-md-3 col-lg-3">
                <a href="index.php?view=product&id=${item.id}" class="products__item__content">
                    <div class="products__item__content-img">
                        <div>
                            <img src="${srcImg}" alt="">
                        </div>
                    </div>
                        <div class="products__item__content__about">
                            <p class="model">${validateString(item.model)}</p>
                            <p class="screen">${validateString(item.screen)}</p>
                            <p class="cpu">${validateString(item.CPU)}</p>
                            <p class="vga">${validateString(item.VGA)}</p>
                            <p class="win">${validateString(item.OS)}</p>
                            <div class="products__item__content__about-view">
                                <span>Click để xem chi tiết</span><br> 
                                <div><span>Đặt hàng</span></div>
                            </div>
                        </div>
                    <div class="products__item__content__name">
                    ${validateString(item.model)}
                    </div>
                    <div class="products__item__content__price">
                        <del>${numberWithComas(item.price)}<u>đ</u></del>
                        <br>
                        <span>${numberWithComas(priceDiscount)}<u>đ</u></span>
                    </div>
                    <div class="products__item__content__sale">
                        <img src="./access/imgs/sale.webp" alt="">
                        <p>${item.discount}%</p>
                    </div>
                </a>
            </div>
            `;
        }else{
            productItem+=`
            <div class="products__item col col-xs-6 col-sm-6 col-md-3 col-lg-3">
                <a href="index.php?view=product&id=${item.id}" class="products__item__content">
                    <div class="products__item__content-img">
                        <div>
                            <img src="${srcImg}" alt="">
                        </div>
                    </div>
                        <div class="products__item__content__about">
                            <p class="model">${validateString(item.model)}</p>
                            <p class="screen">${validateString(item.screen)}</p>
                            <p class="cpu">${validateString(item.CPU)}</p>
                            <p class="vga">${validateString(item.VGA)}</p>
                            <p class="win">${validateString(item.OS)}</p>
                            <div class="products__item__content__about-view">
                                <span>Click để xem chi tiết</span><br> 
                                <div><span>Đặt hàng</span></div>
                            </div>
                        </div>
                    <div class="products__item__content__name">
                        ${validateString(item.model)}
                    </div>
                    <div class="products__item__content__price">
                        <del>14,990,000<u>đ</u></del>
                        <br>
                        <span>${numberWithComas(item.price)}<u>đ</u></span>
                    </div>
                    <div class="products__item__content__sale">
                        <img src="./access/imgs/sale.webp" alt="">
                        <p>30%</p>
                    </div>
                </a>
            </div>
            `;
        }
    })
    productsList.innerHTML=productItem;
}
async function getDataRes(myUrl){
    await new Promise((res, rej)=>{
        httpGetAsync(myUrl,"GET",null,res,rej,waiting);
    }).then(res=>{
        endWaiting();
        if(res.status==200){
            let dataRes = JSON.parse(res.responseText);
            dataProducts=dataRes.data;
            currentPage=dataRes.pagination.currentPage;
            totalPage=dataRes.pagination.totalPage;
        }
    }).catch(err=>{
    });
}
async function onLoadPage(){
    try{
        await getDataRes(`${urlApi}${endPointString(endPoint)}`);
        renderProductList(dataProducts);
        renderNavigation(totalPage,currentPage)
    }catch(err){
    }
}
function changeParamsUrl(data){
    const url = new URL(window.location);
    for(var key in data){
        url.searchParams.set(key, data[key]);
    }
    history.pushState({},"",url);
}
onLoadPage();

function renderNavigation (total, current) {
    let productNavigation = $(".products__container__navigation ul");
    let liTagHTML = "";
    if (total >= 1 && total <= 5) {
        if (current > 1) {
            liTagHTML += `<li data-index="${current - 1}" class="button prev">prev</li>`;
        }
        for (let i = 1; i <= total; i++) {
            if (i == current) {
                liTagHTML += `<li class="numb active">${i}</li>`
            } else {
                liTagHTML += `<li data-index="${i}" class="numb">${i}</li>`
            }
        }
        if (current < total) {
            liTagHTML += `<li data-index="${current + 1}" class="button next">next</li>`;
        }
    } else if (total > 5) {
        let before = current - 1;
        let after = current + 1;
        if (current > 1) {
            liTagHTML += `<li data-index="${current - 1}" class="button prev">prev</li>`;
        }
        if (current > 2) {
            liTagHTML += `<li data-index="${1}" class="numb">1</li>`;
            if (current > 3) {
                liTagHTML += `<li class="dots">...</li>`;
            }
        }
        if (current == 1) {
            before++;
            after++;
        }
        if (current == total) {
            before--;
            after--;
        }
        for (let i = before; i <= after; i++) {
            if (i == current) {
                liTagHTML += `<li class="numb active">${i}</li>`
            } else {
                liTagHTML += `<li data-index="${i}" class="numb">${i}</li>`
            }
        }
        if (current < total - 1) {
            if (current < total - 2) {
                liTagHTML += `<li class="dots">...</li>`;
            }
            liTagHTML += `<li data-index="${total}" class="numb">${total}</li>`;
        }
        if (current < total) {
            liTagHTML += `<li data-index="${current + 1}" class="button next">next</li>`;
        }
    }
    productNavigation.innerHTML = liTagHTML;

    let liTagElement = $$(".products__container__navigation ul li");
    liTagElement.forEach(element => {
        element.onclick = async function () {
            try{
                let index = this.dataset.index;
                if (index) {
                    
                    endPoint.page=Number(index);
                    changeParamsUrl(endPointState(endPoint));
                    await getDataRes(`${urlApi}${endPointString(endPoint)}`);
                    renderProductList(dataProducts);
                    renderNavigation(total, Number(index));
                }
            }catch(err){
                
            }
        }
    })
}