import {
    createSlice
} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    address: null,
    order: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeUser: (state, action) => {
            state.user = action.payload
        },
        storeUserInfo: (state, action) => {
            state.user = action.payload.user
     
        },
        removeUser: (state) => {
            state.user = null
          
        },

    },
})

// Action creators are generated for each case reducer function
export const {
    storeUser,
    storeUserInfo,
    removeUser
} = userSlice.actions

export default userSlice.reducer