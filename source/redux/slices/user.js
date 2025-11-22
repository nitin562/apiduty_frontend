import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    refressToken: null,
    username: null,
    email: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setTokens: (state, action) =>{
            const {accessToken, refreshToken} = action.payload
            state.accessToken = accessToken
            state.refressToken = refreshToken
        },
        setUserDetails:(state, action) =>{
            const {username, email} = action.payload
            state.username = username
            state.email = email
        }
    }
})

export default userSlice.reducer
export const {setTokens, setUserDetails} = userSlice.actions
