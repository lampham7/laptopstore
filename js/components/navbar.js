import { $ } from "../configs/constants.js";
import { baseUrl } from "../configs/configs.js";
// navbar for mobile
let navbarOverlay = $(".navbar__content__mobile__overlay")
let navbarContentMobile = $(".navbar__content__mobile")
let btnCloseNavbarMobile = $(".navbar__content__mobile__close")
let btnOpenNavbarMobile = $(".navbar__control-mobile")
function openNavbarMobile () {
    navbarOverlay.classList.add("open")
    navbarContentMobile.classList.add("open")
}
function closeNavbarMobile () {
    navbarOverlay.classList.remove("open")
    navbarContentMobile.classList.remove("open")
}
btnCloseNavbarMobile.onclick = closeNavbarMobile;
navbarOverlay.onclick = closeNavbarMobile;
btnOpenNavbarMobile.onclick = openNavbarMobile;
// end navbar for mobile

let btnLogout = $(".navbar__item__user__logged-loggout");
if (btnLogout!=null) {
    btnLogout.addEventListener("click", function () {
        fetch(`${baseUrl}api/user.php?crud_req=logout`, {
            credentials: "include",
            method: "POST"
        }).then(res => {
            if (res.status == 200 || res.status == 201) {
                window.location.reload();
            } else {
                alert("ban chua dang nhap");
            }
        })
    })
}
//when search
let btnSearh = $(".navbar__item__search-submit");
btnSearh.addEventListener("click",function(event){
    event.preventDefault();
    let name = $(".navbar__item__search-input").value.trim();
    if(name.length > 0){
        window.location.href=`${baseUrl}index.php?view=search&type=products&name=${name}`;
    }
})
let btnSearchMobile = $(".navbar__content__mobile__search button");
btnSearchMobile.addEventListener("click",function(event){
    event.preventDefault();
    let name = $(".navbar__content__mobile__search input").value.trim();
    if(name.length > 0){
        window.location.href=`${baseUrl}index.php?view=search&type=products&name=${name}`;
    }
})