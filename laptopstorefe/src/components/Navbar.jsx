import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_OVERLAY, OPEN_SIDEBAR } from "../redux/constants";
import overlaySlice from "./OverlaySlice";
import sideBarSlice from "./SidebarSlice";
import userSlice, { setUserDataAfterLogout } from "../pages/user/UserSlice";
import { getRoleId, getCarts } from "../redux/selectors";
import { baseUrlApi } from "../configs/configs";

const Navbar = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch();
    const handleOpenSideBar = () => {
        dispatch(overlaySlice.actions[OPEN_OVERLAY]());
        dispatch(sideBarSlice.actions[OPEN_SIDEBAR]());
    };
    const [searchText, setSearchText] = useState("")
    const [isShowSearchInput, setIsShowSearchInput] = useState(false)
    const roleId = useSelector(getRoleId);
    const carts = useSelector(getCarts)
    let params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    // const handleLogout = () => {
    //     dispatch(setUserDataAfterLogout(`${baseUrlApi}user.php`));
    // };
    const handleToggleSearchInputStatus = ()=>{
        setIsShowSearchInput(prev=>!prev)
    }
    const handleChangeSearchInput = (event)=>{
        setSearchText(event.target.value)
    }
    const handleSubmitSearchInput = (event)=>{
        if(event.key==="Enter"&&searchText.trim().length>0){
            if(params["category-name"]||params["search"]){
                window.scrollTo(0,0)
            }else{
                if(document.documentElement.clientWidth<=768){
                    window.scrollTo(0,(document.documentElement.clientWidth/2)+78)
                }else{
                    window.scrollTo(0,((document.documentElement.clientWidth - 270) / 2))
                }
            }
            setSearchText("")
            setIsShowSearchInput(false)
            navigate("/search-products?search="+searchText.trim())
        }
    }
    return (
        <div className="navBar">
            <div className="navBar__openSideBar" onClick={handleOpenSideBar}>
                <i className="bx bx-menu"></i>
            </div>
            <div className="navBar__actions">
                <div className={isShowSearchInput?"navBar__actions__input show":"navBar__actions__input"}>
                    <input type="text" placeholder="Tìm tên sản phẩm" onKeyPress={handleSubmitSearchInput} onChange={handleChangeSearchInput} value={searchText}  name="nameProduct"  />
                </div>
                <ul className="navBar__actions__list">
                    <li onClick={handleToggleSearchInputStatus}>
                        <i className="bx bx-search"></i>
                    </li>
                    <li>
                        <Link to="/user/carts">
                            <i className="bx bx-cart"></i>
                            <span className="sidebar__actions__cart-quantity">
                                {carts.length}
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/about">
                            <i className="bx bx-user-circle"></i>
                        </Link>
                    </li>
                    {/* {roleId !== null ? (
                        <li>
                            <i
                                className="bx bx-log-out"
                                onClick={handleLogout}
                            ></i>
                        </li>
                    ) : (
                        ""
                    )} */}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
