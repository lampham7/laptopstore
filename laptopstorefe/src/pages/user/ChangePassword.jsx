import React, {useRef, useEffect} from 'react'
import {useForm} from "react-hook-form"
import {Link,useNavigate} from "react-router-dom"
import {baseUrlApi,accountReg, passwordReg} from "../../configs/configs"
import {getRoleId} from "../../redux/selectors"
import userSlice from "./UserSlice"
import { RESET_USER } from '../../redux/constants'
import {useDispatch , useSelector } from "react-redux";
const ChangePassword = () => {
    let navigate = useNavigate()
    let roleId = useSelector(getRoleId)
    useEffect(()=>{
        if(roleId===null){
        navigate('../login')
    }
    })
    
    const {register, formState: {errors}, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const handleChangePassword = ()=>{
        let formData = new FormData(registerForm.current)
        fetch(`${baseUrlApi}user.php`,{
            method: "POST",
            credentials: "include",
            body: formData
        }).then((res)=>{
            if(res.status===200 || res.status===201){
                res.text().then(res=>{
                    alert(res)
                    dispatch(userSlice.actions[RESET_USER]())
                    //success
                })
            }else{
                res.text().then(res=>{
                    alert(res)
                })
            }
        })
    }
    let registerForm = useRef(null)
    return <div className="user__changePassword__container">
        <h2 className="user__heading">
            Đổi mật khẩu
        </h2>
        <form className="user__form" ref={registerForm} onSubmit={handleSubmit(handleChangePassword)} action="">
            <div className="user__input__field">
                <input {...register("account",{
                    required: "Không được bỏ trống!",
                    minLength:{
                        value: 5,
                        message: "Dài tối thiểu 5 ký tự"
                    },
                    maxLength:{
                        value: 18,
                        message: "Dài tối đa 18 ký tự"
                    },
                    pattern:{
                        value: accountReg,
                        message:"Tên tài khoản chỉ bao gồm số và chữ thường!"
                    }
                })} type="text" className={errors.account ? 'user__input show':'user__input'} placeholder="Nhập tài khoản hiện tại" id="" />
                <span className="user__input__field__icon"><i className='bx bx-user'></i></span>
                <span className={errors.account?'user__input__field__error show':'user__input__field__error'}>{errors.account?errors.account.message:''}</span>
            </div>
            <div className="user__input__field">
                <input {...register("password",{
                    required:"Không được bỏ trống!",
                    minLength:{
                        value: 5,
                        message: "Dài tối thiểu 15 ký tự"
                    },
                    maxLength:{
                        value: 18,
                        message: "Dài tối đa 20 ký tự"
                    },
                    pattern: {
                        value: passwordReg,
                        message: "Mật khẩu không được chứa khoảng trắng"
                    }
                
                })} type="password" className={errors.password ? 'user__input show':'user__input'} placeholder="Nhập mật khẩu hiện tại" id="" />
                <span className="user__input__field__icon"><i className='bx bx-lock-alt'></i></span>
                <span className={errors.password ? 'user__input__field__error show':'user__input__field__error'}>{errors.password?errors.password.message:''}</span>
            </div>
            <div className="user__input__field">
                <input {...register("newPassword",{
                    required:"Không được bỏ trống!",
                    minLength:{
                        value: 5,
                        message: "Dài tối thiểu 15 ký tự"
                    },
                    maxLength:{
                        value: 18,
                        message: "Dài tối đa 20 ký tự"
                    },
                    pattern: {
                        value: passwordReg,
                        message: "Mật khẩu không được chứa khoảng trắng"
                    }
                
                })} type="password" className={errors.newPassword ? 'user__input show':'user__input'} placeholder="Nhập mật khẩu mới" id="" />
                <span className="user__input__field__icon"><i className='bx bx-lock-alt'></i></span>
                <span className={errors.newPassword ? 'user__input__field__error show':'user__input__field__error'}>{errors.newPassword?errors.newPassword.message:''}</span>
            </div>
            <input type="hidden" name="crud_req" value="changePassword" />
            <button className={(Object.keys(errors).length > 0)?'user__btn__action':'user__btn__action active'}>Đổi mật khẩu</button>
        </form>
        <div className="user__login__forgotPassword">
        </div>
        <div className="user__login__more__actions">
            <div className="user__login__more__actions__createAccount">
                <Link to="../need-help">Cần giúp đỡ?</Link>
            </div>
        </div>
    </div>;
}

export default ChangePassword