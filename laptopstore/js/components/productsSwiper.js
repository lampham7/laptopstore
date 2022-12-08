import { $, $$ } from "../configs/constants.js";
import { baseUrl } from "../configs/configs.js";
//render swiper item
fetch(`${baseUrl}api/brands.php`,{
    method:"GET"
}).then(res=>{
    res.text().then(resData=>{
        let data = JSON.parse(resData).data;
        let htmlText = '';
        data.forEach(element=>{
            htmlText+=`
            <a href="index.php?view=search&type=brand&name=${element.name}" class="swiper-slide">
                <img src="store/${element.image}" alt="">
            </a>`;
        });
        let swiper_wrapper = $(".products__swiper .swiper-wrapper");
        swiper_wrapper.innerHTML=htmlText;
        const swiper = new Swiper(".products-swiper", {
            loop: true,
            pagination: {//cái hình tròn nhỏ
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {//mũi tên next
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            }
        })
    })
})