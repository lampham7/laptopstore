import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getRoleId } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { baseUrlApi, baseUrlImg, nameReg, phoneNumberReg, emailReg  } from "../../configs/configs";
import { anonymousIcon } from "../../access/data/data";
import {useForm } from "react-hook-form"
const About = () => {
    let navigate = useNavigate();
    let roleId = useSelector(getRoleId);
    useEffect(() => {
        if (roleId === null) {
            navigate("../login");
        }
    });

    const {register, formState: {errors}, handleSubmit} = useForm()
    const handleChangeAbout = ()=>{
        let formData = new FormData(changeAboutForm.current)
        fetch(`${baseUrlApi}user.php`,{
            method: "POST",
            credentials: "include",
            body: formData
        }).then((res)=>{
            if(res.status===201||res.status===200){
                res.text().then(res=>{
                    alert(res)
                    setIsShowAbout(true)
                })
            }else{
                res.text().then(res=>{
                    alert(res)
                })
            }
        }).catch(err=>alert("Có lỗi xảy ra!"))
    }
    let changeAboutForm = useRef(null)
    const [isShowAbout, setIsShowAbout] = useState(true);
    const [dataUser, setDataUser] = useState(null);
    useLayoutEffect(() => {
        if (roleId !== null) {
            fetch(`${baseUrlApi}user.php`, {
                method: "GET",
                credentials: "include",
            }).then((res) => {
                if (res.status === 200 || res.status === 201) {
                    res.json().then((res) => setDataUser(res));
                }
            });
        }
    }, [isShowAbout]);
    let showTable = (data) => {
        if (data !== null && roleId !== null && isShowAbout) {
            //show all infor
            return (
                <>
                    <table className="user__about__table" border="1">
                        <tbody>
                            <tr>
                                <td>Tên tài khoản</td>
                                <td>{data.account}</td>
                            </tr>
                            <tr>
                                <td>Họ và tên</td>
                                <td>{data.name}</td>
                            </tr>
                            <tr>
                                <td>Số điện thoại</td>
                                <td>{data.phone_number}</td>
                            </tr>
                            <tr>
                                <td>Địa chỉ</td>
                                <td>{data.address}</td>
                            </tr>
                            <tr>
                                <td>Ảnh đại diện</td>
                                <td>
                                    <img
                                        src={
                                            data.avatar !== null
                                                ? `${baseUrlImg}${data.avatar}`
                                                : anonymousIcon
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{data.email}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="user__about__buttons">
                        <div
                            className="user__btn__action small active"
                            onClick={() => setIsShowAbout(false)}
                        >
                            Thay đổi
                        </div>
                    </div>
                </>
            );
        }
    };
    let showActionChangeTable = (dataUser) => {
        if (!isShowAbout && dataUser!==null) {
            return (//name, phone_number, address, email,avatar
                <>
                    <form className="user__form" ref={changeAboutForm} onSubmit={handleSubmit(handleChangeAbout)}>
                        <div className="user__input__field">
                            <input  type="text" {...register("name",{
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
                                    value: nameReg,
                                    message:"Tên không hợp lệ!"
                                }
                            })} className={errors.name ? "user__input show" : "user__input"} placeholder="Nhập họ tên" defaultValue={dataUser.name} />
                            <span className="user__input__field__icon"><i className='bx bx-user'></i></span>
                            <span className={errors.name ? "user__input__field__error show" : "user__input__field__error"}>{errors.name?errors.name.message:""}</span>
                        </div>
                        <div className="user__input__field">
                            <input type="tel" {...register("phone_number",{
                                required: "Không được bỏ trống!",
                                minLength:{
                                    value: 8,
                                    message: "Dài tối thiểu 8 ký tự"
                                },
                                maxLength:{
                                    value: 12,
                                    message: "Dài tối đa 12 ký tự"
                                },
                                pattern:{
                                    value: phoneNumberReg,
                                    message:"Số điện thoại không hợp lệ!"
                                }
                            })}  className={errors.phone_number?"user__input show":"user__input"} placeholder="Nhập số điện thoại nhận hàng" defaultValue={dataUser.phone_number} />
                            <span className="user__input__field__icon"><i className='bx bx-phone'></i></span>
                            <span className={errors.phone_number?"user__input__field__error show":"user__input__field__error"}>{errors.phone_number?errors.phone_number.message:''}</span>
                        </div>
                        <div className="user__input__field">
                            <input type="text" {...register("address",{
                                required: "Không được bỏ trống!"
                            })} className={errors.address?"user__input show":"user__input"} placeholder="Nhập địa chỉ nhận hàng" defaultValue={dataUser.address} />
                            <span className="user__input__field__icon"><i className='bx bxs-edit-location'></i></span>
                            <span className={errors.address?"user__input__field__error show":"user__input__field__error"}>{errors.address?errors.address.message:''}</span>
                        </div>
                        <div className="user__input__field">
                            <input type="file" name="avatar" className="user__input" placeholder="Ảnh đại diện" />
                            <span className="user__input__field__icon"><i className='bx bxs-image'></i></span>
                            <span className="user__input__field__error show"></span>
                        </div>
                        <div className="user__input__field">
                            <input type="email" {...register("email",{
                                required: "Không được bỏ trống!",
                                pattern:{
                                    value: emailReg,
                                    message:"Email không hợp lệ!"
                                }
                            })} className={errors.email?"user__input show":"user__input"} placeholder="Email của bạn" defaultValue={dataUser.email} />
                            <span className="user__input__field__icon"><i className='bx bx-envelope'></i></span>
                            <span className={errors.email?"user__input__field__error show":"user__input__field__error"}>{errors.email?errors.email.message:''}</span>
                        </div>
                        <input type="hidden" name="crud_req" value="update" />
                        <div className="user__about__buttons">
                        <button className="user__btn__action small active" type="submit">
                            Lưu thay đổi
                        </button>
                        <div
                            className="user__btn__action small active"
                            onClick={() => setIsShowAbout(true)}
                        >
                            Hủy
                        </div>
                    </div>
                    </form>
                    
                </>
            );
        }
    };
    return (
        <div className="user__about__container">
            <h2 className="user__heading">
                {isShowAbout
                    ? "Thông tin cá nhân"
                    : "Chỉnh sửa thông tin cá nhân"}
            </h2>
            {showTable(dataUser)}

            {showActionChangeTable(dataUser)}
        </div>
    );
};

export default About;
