import {baseUrl} from "../configs/configs.js";
import {renderCartHeader} from "../configs/constants.js";
fetch(`${baseUrl}api/carts.php`,{
    method:"get",
    credentials:"include"
}).then(res=>{
    res.text().then(res=>{
        renderCartHeader(JSON.parse(res));
    })
})