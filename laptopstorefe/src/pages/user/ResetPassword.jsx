import React, {useEffect} from 'react'
import {commingSoon} from "../../access/data/data"
import {useNavigate} from "react-router-dom"
import {getRoleId} from "../../redux/selectors"
import {useDispatch , useSelector } from "react-redux";
const ResetPassword = () => {
    let navigate = useNavigate()
    let roleId = useSelector(getRoleId)
    useEffect(()=>{
        if(roleId===null){
        navigate('../login')
    }
    })
    
  return (
    <div className='user_reset__password__container disable'>
        <img src={commingSoon} alt="not availble" />
    </div>
  )
}

export default ResetPassword