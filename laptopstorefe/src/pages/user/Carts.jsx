import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoleId } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { baseUrlApi, baseUrlImg } from "../../configs/configs";
import { Link } from "react-router-dom";
const Carts = () => {
    let navigate = useNavigate();
    let roleId = useSelector(getRoleId);
    useEffect(() => {
        if (roleId === null) {
            navigate("../login");
        }
    });
    const [carts, setCarts] = useState();
    useEffect(() => {
        fetch(`${baseUrlApi}carts.php`, {
            method: "GET",
            credentials: "include",
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then((res) => setCarts(res));
            } else {
                alert("Phiên làm việc đã hết hạn, vui lòng đăng nhập lại!");
            }
        });
    }, []);
    const handleDeleteCart = (productId, capacityId)=>{
        let indexDelete = 0;
        for(var i=0;i<carts.length; i++){
            if(Number(carts[i].productId) === Number(productId) && Number(carts[i].capacityId) === Number(capacityId)){
                break;
            }else{
                indexDelete++;
            }
        }
        carts.splice(indexDelete,1)
        setCarts([...carts]);
    }
    return (
        <>
            <div>
                <div className="user__heading">Giỏ hàng</div>
                <div className="userCarts">
                    <table border="1">
                        <tr>
                            <td>Hình ảnh</td>
                            <td>Tên sản phẩm</td>
                            <td>Phân loại</td>
                            <td>Số lượng</td>
                            <td>Giá tiền</td>
                            <td>Xóa</td>
                        </tr>
                        {carts &&
                            carts.map((cart) => (
                                <tr key={cart.productId+"*"+cart.capacityid}>
                                    <td>
                                        <Link to={"/product-detail/"+cart.productId}>
                                            <img src={`${baseUrlImg}${cart.detail.background}`} alt="" />
                                        </Link>
                                    </td>
                                    <td>{cart.detail.model}</td>
                                    <td>{cart.detail.capacityName}</td>
                                    <td>{cart.quantity}</td>
                                    <td>{Number(cart.quantity)*Number(cart.detail.newPrice)}</td>
                                    <td>
                                        <i onClick={()=>{handleDeleteCart(cart.productId,cart.capacityId)}} className="bx bx-trash"></i>
                                    </td>
                                </tr>
                            ))}
                        {/* <tr>
                                <td><Link to="/product-detail/18"><img src="" alt="" /></Link></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><i className="bx bx-trash"></i></td>
                            </tr> */}
                    </table>
                </div>
            </div>
        </>
    );
};

export default Carts;
