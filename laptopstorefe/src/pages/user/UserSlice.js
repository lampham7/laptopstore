import {RESET_USER
} from "../../redux/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
let initState = {
    carts: [],//for login
    userAbout: {},//for login
    purchased: [],//for login
    roleId: null,//for login
};
let userSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        [RESET_USER] : (state, action)=>{
            state.carts = initState.carts
            state.userAbout = initState.userAbout
            state.purchased = initState.purchased
            state.roleId = initState.roleId
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDataAfterLoged.fulfilled, (state, action) => {
                state.carts=action.payload.carts
                state.userAbout=action.payload.user
                state.roleId=Number(action.payload.user.role)
            })
            .addCase(getUserDataAfterLoged.rejected, (state) => {
                state = initState;
            })
            .addCase(setUserDataAfterLogout.fulfilled, (state)=>{
                state.carts = initState.carts
                state.userAbout = initState.userAbout
                state.purchased = initState.purchased
                state.roleId = initState.roleId
            })
            .addCase(getUserDataOnFirstLoad.fulfilled, (state, action)=>{
                if(action.payload!==null){
                    state.carts=action.payload.carts
                    state.userAbout=action.payload.user
                    state.roleId=Number(action.payload.user.role)
                }
            })
            ;
    },
});
const getUserDataAfterLoged = createAsyncThunk(
    "user/addUserDataAfterLoged",
    async (url) => {
        let dataRes = null;
        await new Promise((resolve, reject) => {
            fetch(url, {
                method: "GET",
                credentials: "include",
            })
                .then((res) => {
                    if (res.status === 203) {
                    } else {
                        res.text().then((res) => {
                            dataRes = JSON.parse(res);
                            resolve();
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject();
                });
        });
        return dataRes;
    }
);
const setUserDataAfterLogout = createAsyncThunk("user/setUserDataAfterLogout", async (url)=>{
    let dataRes = true;
        await new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                credentials: "include",
            })
                .then((res) => {
                    if(res.status===200){
                        resolve()
                    }else{
                        dataRes = false
                        reject()
                    }
                })
                .catch((err) => {
                    console.log(err);
                        dataRes = false
                        reject()
                });
        });
        return dataRes;
})
const getUserDataOnFirstLoad = createAsyncThunk("user/getUserDataOnFirstLoad", async(url)=>{
    let dataRes = null;
        await new Promise((resolve, reject) => {
            fetch(url, {
                method: "GET",
                credentials: "include",
            })
                .then((res) => {
                    if (res.status === 203) {
                    } else {
                        res.text().then((res) => {
                            dataRes = JSON.parse(res);
                            resolve();
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject();
                });
        });
        return dataRes;
})

export { getUserDataAfterLoged, setUserDataAfterLogout, getUserDataOnFirstLoad };
export default userSlice;
