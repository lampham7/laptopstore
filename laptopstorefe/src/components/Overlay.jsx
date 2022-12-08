import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {CLOSE_OVERLAY, CLOSE_SIDEBAR} from "../redux/constants"
import sideBarSlice from "./SidebarSlice"
import overlaySlice from "./OverlaySlice"
import {overlayStatusSelector} from "../redux/selectors"
const Overlay = () => {
    const overlayStatus = useSelector(overlayStatusSelector)
    const dispatch = useDispatch()
    const handleClickOverlay = ()=>{
        dispatch(sideBarSlice.actions[CLOSE_SIDEBAR]())
        dispatch(overlaySlice.actions[CLOSE_OVERLAY]())
    }
  return (
    <div className={overlayStatus ? 'overlay show' : 'overlay'} onClick={handleClickOverlay}></div>
  )
}

export default Overlay