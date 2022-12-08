import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../redux/constants";
import {createSlice} from "@reduxjs/toolkit"
const initState = {
    isOpen: false
}
const sideBarSlice = createSlice({
    name: "sideBar",
    initialState: initState,
    reducers: {
        [OPEN_SIDEBAR] : (state)=>{
            state.isOpen = true;
        },
        [CLOSE_SIDEBAR] : (state)=>{
            state.isOpen = false;
        }
    }
})
export default sideBarSlice