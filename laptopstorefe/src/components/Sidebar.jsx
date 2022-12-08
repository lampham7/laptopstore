import React, {useState} from "react";
import { logo } from "../access/data/data";
import { Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sidebarStatusSelector } from "../redux/selectors";
import sideBarSlice from "../components/SidebarSlice.js";
import overlaySlice from "../components/OverlaySlice";
import { CLOSE_OVERLAY, CLOSE_SIDEBAR } from "../redux/constants";
import userSlice, { setUserDataAfterLogout } from "../pages/user/UserSlice";
import { getRoleId, getBrands, getCarts } from "../redux/selectors";
import { baseUrlApi } from "../configs/configs";
const SideBar = () => {
    let navigate = useNavigate()
    const sidebarStatus = useSelector(sidebarStatusSelector);
    const dispatch = useDispatch();
    const roleId = useSelector(getRoleId);
    const brands = useSelector(getBrands);
    const carts = useSelector(getCarts);
    const handleCloseSideBar = () => {
        dispatch(sideBarSlice.actions[CLOSE_SIDEBAR]());
        dispatch(overlaySlice.actions[CLOSE_OVERLAY]());
    };
    const handleLogout = () => {
        dispatch(setUserDataAfterLogout(`${baseUrlApi}user.php`));
    };
    const [searchText, setSearchText] = useState("")
    const [isShowSearchInput, setIsShowSearchInput] = useState(false)
    let params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
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
        <>
            <div className={sidebarStatus ? "sidebar show" : "sidebar"}>
                <div
                    className="sidebar__icon__close"
                    onClick={handleCloseSideBar}
                >
                    <i className="bx bx-window-close"></i>
                </div>
                <div className="sidebar__logo">
                    <div className="sidebar__logo__image">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                </div>
                <ul className="sidebar__actions">
                    <li className="" onClick={handleToggleSearchInputStatus}>
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
                    {roleId !== null ? (
                        <li>
                            <i
                                className="bx bx-log-out"
                                onClick={handleLogout}
                            ></i>
                        </li>
                    ) : (
                        ""
                    )}
                </ul>
                <ul className="sidebar__brands">
                    {/* <li className="sidebar__brands__item">
                <Link to="search-products?brands=sfsf">
                    Dell
                </Link>
            </li> */}
                    {brands.data &&
                        brands.data.map((brand) => (
                            <li
                                key={brand.id}
                                className="sidebar__brands__item"
                            >
                                <Link
                                    to={
                                        "search-products?category-name=" +
                                        brand.name
                                    }
                                >
                                    {brand.name}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
            <div className={isShowSearchInput?"searchInput__mobile show":"searchInput__mobile"}>
                <div className="searchInput__mobile__content">
                    <input type="text" placeholder="Enter để tìm" onKeyPress={handleSubmitSearchInput} onChange={handleChangeSearchInput} value={searchText}  name="nameProduct"  />
                </div>
            </div>
        </>
    );
};

export default SideBar;
