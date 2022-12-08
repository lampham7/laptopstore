import {OPEN_OVERLAY, CLOSE_OVERLAY} from "../redux/constants"
import { createSlice } from "@reduxjs/toolkit"
const initState = {
    isOpen: false
}
const overlaySlice = createSlice({
    name: "overlay",
    initialState: initState,
    reducers: {
        [OPEN_OVERLAY]: (state)=>{
            state.isOpen = true;
        },
        [CLOSE_OVERLAY]: (state)=>{
            state.isOpen = false;
        }
    }
})
export default overlaySlice