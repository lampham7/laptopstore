export let $ = document.querySelector.bind(document);
export let $$ = document.querySelectorAll.bind(document);
import {baseUrl} from "./configs.js";
export let httpGetAsync = function(url, method, data=null, resolve, reject, waiting=null){
    let http = new XMLHttpRequest();
    http.onreadystatechange=function(){
        if (http.readyState == 4 && http.status < 300) {
            resolve(http);
        }
        if (http.readyState == 2 || http.readyState == 3) {
            if (waiting !== null) {
                waiting();
            }
        }
        if (http.readyState == 4 && http.status > 400) {
            reject();
        }
        
    }
    http.withCredentials="true";
    http.open(method, url, true);
    http.send(data);
}
export let numberWithComas = function(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export let validateString = function(data){
    return data.trim();
}
export let renderCartHeader = function(data){
    let cartQuantities = 0;
    let cartItemHtml = '';
    data.forEach(element=>{
        cartQuantities+=Number(element.quantity);
        let background = `${baseUrl}store/${element.detail.background}`;
        cartItemHtml+=`<div class="item">
        <div class="item__img">
            <img
                src="${background}"
                alt=""
            />
        </div>
        <div class="item__detail">
            <p class="item__detail-title">
                ${element.detail.model}
            </p>
            <div class="item__detail-price">
                <span> <sup>đ</sup>${numberWithComas(element.detail.newPrice)} </span>
                <span>x ${element.quantity}</span>
            </div>
        </div>
    </div>`;
    });
    $(".navbar__item__user__logged-cart-quantity").innerHTML=cartQuantities;
    $(".navbar__item__user__logged-cart-detail session").innerHTML=cartItemHtml;
}