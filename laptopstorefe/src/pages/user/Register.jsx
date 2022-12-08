import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { baseUrlApi, accountReg, passwordReg } from "../../configs/configs";
import {getRoleId} from "../../redux/selectors"
import {useDispatch , useSelector } from "react-redux";
const Register = () => {
    let navigate = useNavigate()
    let roleId = useSelector(getRoleId)
    useEffect(()=>{
        if(roleId!==null){
        navigate('../about')
    }
    })
    
    const {register, formState: {errors}, handleSubmit} = useForm()
    
    const handleLogin = ()=>{
        let formData = new FormData(loginForm.current)
        fetch(`${baseUrlApi}user.php`,{
            method:"POST",
            credentials: 'include',
            body: formData
        }).then(res=>{
            if(res.status===200||res.status===201){
                //success redirect login form.
                navigate("../login")
            }else{//failed
                res.text().then(res=>{
                    alert(res);
                })
            }
        })
    }
    let loginForm = useRef(null)
    //đăng nhập thành công->call api lấy thông tin user đã đăng nhập rồi lưu vào store
    return (
        <div className="user__register__container">
            <h2 className="user__heading">Đăng ký</h2>
            <form
                className="user__form"
                ref={loginForm}
                onSubmit={handleSubmit(handleLogin)}
                action=""
            >
                <div className="user__input__field">
                    <input
                        {...register("account", {
                            required: "Không được bỏ trống!",
                            minLength: {
                                value: 5,
                                message: "Dài tối thiểu 5 ký tự",
                            },
                            maxLength: {
                                value: 18,
                                message: "Dài tối đa 18 ký tự",
                            },
                            pattern: {
                                value: accountReg,
                                message:
                                    "Tên tài khoản chỉ bao gồm số và chữ thường!",
                            },
                        })}
                        type="text"
                        className={
                            errors.account ? "user__input show" : "user__input"
                        }
                        placeholder="Enter your account"
                        id=""
                    />
                    <span className="user__input__field__icon">
                        <i className="bx bx-user"></i>
                    </span>
                    <span
                        className={
                            errors.account
                                ? "user__input__field__error show"
                                : "user__input__field__error"
                        }
                    >
                        {errors.account ? errors.account.message : ""}
                    </span>
                </div>
                <div className="user__input__field">
                    <input
                        {...register("password", {
                            required: "Không được bỏ trống!",
                            minLength: {
                                value: 5,
                                message: "Dài tối thiểu 15 ký tự",
                            },
                            maxLength: {
                                value: 18,
                                message: "Dài tối đa 20 ký tự",
                            },
                            pattern: {
                                value: passwordReg,
                                message:
                                    "Mật khẩu không được chứa khoảng trắng",
                            },
                        })}
                        type="password"
                        className={
                            errors.password ? "user__input show" : "user__input"
                        }
                        placeholder="Enter your password"
                        id=""
                    />
                    <span className="user__input__field__icon">
                        <i className="bx bx-lock-alt"></i>
                    </span>
                    <span
                        className={
                            errors.password
                                ? "user__input__field__error show"
                                : "user__input__field__error"
                        }
                    >
                        {errors.password ? errors.password.message : ""}
                    </span>
                </div>
                <input type="hidden" name="crud_req" value="register" />
                <button
                    className={
                        Object.keys(errors).length > 0
                            ? "user__btn__action"
                            : "user__btn__action active"
                    }
                >
                    Đăng ký
                </button>
            </form>
            <div className="user__register__forgotPassword">
                <Link to="../reset-password">Quên mật khẩu?</Link>
            </div>
            <div className="user__register__more__actions">
                <div className="user__register__more__actions__createAccount">
                    <Link to="../login">Đăng nhập</Link>
                    <Link to="../need-help">Cần giúp đỡ?</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
