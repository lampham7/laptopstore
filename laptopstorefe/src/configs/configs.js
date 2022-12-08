//configs api
const baseUrlApi = "http://localhost/laptopstore/api/";
const baseUrlApiAdmin = "http://localhost/laptopstore/admin/controller/";
const baseUrlImg = "http://localhost/laptopstore/store/";

// const baseUrlApi = "https://tailaptop.000webhostapp.com/mpa/api/";
// const baseUrlApiAdmin = "https://tailaptop.000webhostapp.com/mpa/admin/controller/";
// const baseUrlImg = "https://tailaptop.000webhostapp.com/mpa/store/";
// configs some regularExpression
//for admin
const regDiscount = "/^[0-9]{0,2}$/"; //0->99
const regPrice = "/^[0-9]{1,}$/"; //1->
const regQuantity = "/^[0-9]{0,}$/"; //0->
//for user
let accountReg = /^[a-z0-9]{3,15}$/;//Tên tài khoản: dài từ 3->15 ký tự, bao gồm số hoặc chữ thường, không chứa ký tự đặc biệt!\n
let passwordReg = /^\S{3,15}$/;//Mật khẩu: dài từ 3->15 ký tự, không được có khoảng trắng!\n
let nameReg = /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u; //name
let phoneNumberReg = /^0{1}[0-9]{8,12}$/; //phone_number
let emailReg =/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //email
// exports
export { baseUrlApi, baseUrlApiAdmin,baseUrlImg };
export {regDiscount, regPrice, regQuantity};
export {accountReg, passwordReg, nameReg, phoneNumberReg, emailReg};
