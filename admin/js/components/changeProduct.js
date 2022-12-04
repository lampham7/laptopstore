import {$,$$} from "../configs/constants.js";
import {baseURL} from "../configs/configs.js";
let id = Object.fromEntries(new URLSearchParams(window.location.search).entries()).id
let product
let brands
//
async function getBrands(){
    try{
        await new Promise((resolve, reject)=>{
            fetch(`${baseURL}admin/controller/brands.php`,{
                method: "GET",
                credentials: "include"
            }).then(res=>{
                if(res.status===200||res.status===201){
                    res.text().then(res=>{
                        brands = JSON.parse(res)
                        resolve()
                    })
                }else{
                    reject()
                }
            })
        })
    }catch(err){
    }
}
async function getProduct(){
    try{
        await new Promise((resolve, reject)=>{
            fetch(`${baseURL}admin/controller/product.php?id=${id}`,{
                method: "GET",
                credentials: "include"
            }).then(res=>{
                if(res.status===200||res.status===201){
                    res.text().then(res=>{
                        product = JSON.parse(res)
                        resolve()
                    })
                }else{
                    reject()
                }
            })
        })
    }catch(err){
    }
}
function renderProduct(){
    let brandsOption = ''
        brands.forEach(brand =>{
            if(brand["id"]==product["brand_id"]){
                brandsOption+=`<option selected value="${brand['id']}">${brand['name']}</option>`;
            } else {
                brandsOption+=`<option value="${brand['id']}">${brand['name']}</option>`;
            }
            
        })
        let formProduct = document.getElementById("form-change-product")
        let background = `${baseURL}store/${product.background}`;
        let formHTML = `
        <label for="brand">Hãng sản xuất</label>
        <select required name="brand_id" id="brand">
            ${brandsOption}
        </select>

        <label for="model">Tên sản phẩm</label>
        <input type="text" required value="${product["model"]}" name="model" id="model" placeholder="Nhập tên sản phẩm">
        
        <label for="screen">Loại màn hình</label>
        <textarea rows="3" id="screen" required name="screen">
        ${product["screen"]}
        </textarea>

        <label for="RAM">Mô tả RAM</label>
        <input type="text" required value="${product["RAM"]}" name="RAM" id="RAM" placeholder="Nhập mô tả RAM">

        <label for="hardware">Mô tả ổ cứng</label>
        <input type="text" required value="${product["hardware"]}" name="hardware" id="hardware" placeholder="Nhập mô tả ổ cứng">

        <label for="OS">Hệ điều hành</label>
        <input type="text" required value="${product["OS"]}" name="OS" id="OS" placeholder="Nhập tên hệ điều hành">

        <label for="CPU">CPU</label>
        <input type="text" required value="${product["CPU"]}" name="CPU" id="CPU" placeholder="Nhập chip xử lý">

        <label for="VGA">VGA</label>
        <textarea rows="3" id="VGA" required name="VGA">
        ${product["VGA"]}
        </textarea>
        <label for="background">Hình ảnh</label>
        <img style="height: 60px" src="${background}" />
        <input type="file" name="background" id="background">

        <label for="warranty">Thời gian bảo hành</label>
        <input type="text" required value="${product["warranty"]}" name="warranty" id="warranty" placeholder="Nhập thời gian bảo hành">

        <label for="discount">Giảm giá</label>
        <input type="number" required value="${product["discount"]}" name="discount" id="discount">

        <label for="color">Màu sắc</label>
        <input type="text" required value="${product["color"]}" name="color" id="color" placeholder="Nhập màu sắc">
        
        <input type="hidden" name="crud_request" value="change-product">
        <button type="submit" style="margin-top: 10px" class="btn">Lưu</button>
        `
        formProduct.innerHTML= formHTML
}
function handleChangeProduct(){
    let form = document.getElementById("form-change-product")
    form.addEventListener("submit",e=>{
        e.preventDefault()
        let formData = new FormData(form)
        fetch(`${baseURL}admin/controller/product.php?id=${id}`,{
            method: "POST",
            credentials: "include",
            body: formData
        }).then(res=>{
            if(res.status===200||res.status===201){
                alert("Cập nhật thành công")
            }else{
                res.text().then(res=>alert(res))
            }
        })
    })
}
async function main(){
    try{
        await getBrands()
        await getProduct()
        renderProduct()
        handleChangeProduct()
    }catch(err){

    }
}
main()