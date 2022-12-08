import overlaySlice from "../components/OverlaySlice"
import sideBarSlice from "../components/SidebarSlice"
import userSlice from "../pages/user/UserSlice"
import brandsSlice from "../pages/home/brandsSlice"
import { configureStore } from "@reduxjs/toolkit"
const store = configureStore({
    reducer : {
        sideBar: sideBarSlice.reducer,
        overlay: overlaySlice.reducer,
        user: userSlice.reducer,
        brands: brandsSlice.reducer
    }
})
export default store;