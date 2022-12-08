import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import {getRoleId} from "../../redux/selectors"
import {useDispatch , useSelector } from "react-redux";
const Purchased = () => {
    let navigate = useNavigate()
    let roleId = useSelector(getRoleId)
    useEffect(()=>{
        if(roleId===null){
        navigate('../login')
    }
    })
    
  return (
    <div>Purchased</div>
  )
}

export default Purchased