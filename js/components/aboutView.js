import { $, $$ } from "../configs/constants.js";
import { baseUrl } from "../configs/configs.js";
let aboutList = $(".about__list");
fetch(`${baseUrl}api/user.php`,{
    credentials:"include",
    method:"GET"
}).then(res=>{
    return res.text().then(res=>{
        if(res){
            let innnerAboutList='';
            let dataRes=JSON.parse(res);
            let name=dataRes.name==null?"Người dùng":dataRes.name;
            let phoneNumber=dataRes.phone_number==null?"Chưa có":dataRes.phone_number;
            let address=dataRes.address==null?"Chưa có":dataRes.address;
            let avatar=dataRes.avatar==null?"./access/imgs/user.png":dataRes.avatar;
            let email=dataRes.email==null?"Chưa có":dataRes.email;
            innnerAboutList=`
            <div class="about__item">
                    <span class="about__item__label">Tên tài khoản</span>
                    <span class="about__item__content">${dataRes.account}</span>
                </div>
                <div class="about__item">
                    <span class="about__item__label">Họ và tên</span>
                    <span class="about__item__content">${name}</span>
                </div>
                <div class="about__item">
                    <span class="about__item__label">Số điện thoại</span>
                    <span class="about__item__content">${phoneNumber}</span>
                </div>
                <div class="about__item">
                    <span class="about__item__label">Địa chỉ</span>
                    <span class="about__item__content">${address}</span>
                </div>
                <div class="about__item">
                    <span class="about__item__label">Ảnh đại diện</span>
                    <span class="about__item__content"
                        ><img src="${baseUrl}store/${avatar}" alt=""
                    /></span>
                </div>
                <div class="about__item">
                    <span class="about__item__label">Email</span>
                    <span class="about__item__content">${email}</span>
                </div>`;
                aboutList.innerHTML=innnerAboutList;
        }
    })
}).catch(err=>{
    alert("có lỗi xảy ra");
})