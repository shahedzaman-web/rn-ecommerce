import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null,

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        storeUserToken: (state, action) => {

            state.token = action.payload
        },
        logoutUser: (state) => {
            state.token = null
        },

    },
})

// Action creators are generated for each case reducer function
export const { storeUserToken, logoutUser } = authSlice.actions

export default authSlice.reducer