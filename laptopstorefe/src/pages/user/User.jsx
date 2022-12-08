import React from "react";
import { Outlet } from "react-router-dom";
import { userBackground } from "../../access/data/data";
import "../../css/pages/user/user.css"
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getRoleId}from "../../redux/selectors"
import {setUserDataAfterLogout} from "./UserSlice"
import {baseUrlApi} from "../../configs/configs"
const User = () => {
    let roleId = useSelector(getRoleId)
    const dispatch = useDispatch()
    let handleLogout = ()=>{
        dispatch(setUserDataAfterLogout(`${baseUrlApi}user.php`))
    }
    let renderNavLinks = (roleId)=>{
        if(roleId===null){
            return (
                <ul className="user__sidebar">
                    <NavLink to="register" className={({isActive})=>isActive?'user__sidebar__item active':'user__sidebar__item'}>
                        <i className='bx bx-user-plus user__sidebar__item__main-icon'></i>
                        <p className="user__sidebar__item__title">
                            Đăng ký
                        </p>
                    </NavLink>
                    <NavLink to="login" className={({isActive})=>isActive?'user__sidebar__item active':'user__sidebar__item'}>
                        <i className='bx bx-log-in user__sidebar__item__main-icon'></i>
                        <p className="user__sidebar__item__title">
                            Đăng nhập
                        </p>
                    </NavLink>
                    <div to="change-password" className="user__sidebar__item disable">
                        <i className='bx bx-lock-open user__sidebar__item__main-icon'></i>
                        <p className="user__sidebar__item__title">
                            Đổi mật khẩu
                        </p>
                    </div>
                    <div to="about" className="user__sidebar__item disable">
                        <i className='bx bxs-user-account user__sidebar__item__main-icon'></i>
                        <p className="user__sidebar__item__title">
                            Cá nhân
                        </p>
                    </div>
                    <div to="carts" className="user__sidebar__item disable">
                        <i className='bx bx-cart user__sidebar__item__main-icon'></i>
                        <p className="user__sidebar__item__title">
                            Giỏ hàng
                        </p>
                    </div>
                    <div to="purchased" className="user__sidebar__item disable">
                        <i className='bx bx-purchase-tag user__sidebar__item__main-icon'></i>
                        <p className="user__sidebar__item__title">
                            Đã mua
                        </p>
                    </div>
                </ul>
            )
        }else{
            return (
                <ul className="user__sidebar">
                    {/* <div to="register" className="user__sidebar__item disable">
                        <i className='bx bx-user-plus user__sidebar__item__main-icon'></i>
                        <p className="user__sidebar__item__title">
                            Đăng ký
                        </p>
                    </div> */}
                    <div onClick={handleLogout} className="user__sidebar__item">
                        <i className='bx bx-log-out user__sidebar__item__main-icon'></i>
                        <p className="user__sidebar__item__title">
                            Đăng xuất
                        </p>
                    </div>
                    <NavLink to="change-password" className={({isActive})=>isActive?'user__sidebar__item active':'user__sidebar__item'}>
                        <i className='bx bx-lock-open user__sidebar__item__main-icon'></i>
                        <p className="user__sidebar__item__title">
                            Đổi mật khẩu
                        </p>
                    </NavLink>
                    <NavLink to="about" className={({isActive})=>isActive?'user__sidebar__item active':'user__sidebar__item'}>
                        <i className='bx bxs-user-account user__sidebar__item__main-icon'></i>
                        <p className="user__sidebar__item__title">
                            Cá nhân
                        </p>
                    </NavLink>
                    <NavLink to="carts" className={({isActive})=>isActive?'user__sidebar__item active':'user__sidebar__item'}>
                        <i className='bx bx-cart user__sidebar__item__main-icon'></i>
                        <p className="user__sidebar__item__title">
                            Giỏ hàng
                        </p>
                    </NavLink>
                    <NavLink to="purchased" className={({isActive})=>isActive?'user__sidebar__item active':'user__sidebar__item'}>
                        <i className='bx bx-purchase-tag user__sidebar__item__main-icon'></i>
                        <p className="user__sidebar__item__title">
                            Đã mua
                        </p>
                    </NavLink>
                </ul>
            )
        }
    }
    return (
        <div
            className="user__container"
            style={{ backgroundImage: `radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.35) 90%), url(${userBackground})` }}
        >
            <div className="user__container__content">
                {renderNavLinks(roleId)}
                <ul className="user__content">
                    <Outlet />
                </ul>
            </div>
        </div>
    );
};

export default User;
