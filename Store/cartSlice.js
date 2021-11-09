import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    totalQty: 0,
    totalPrice: 0,
    cartItems: {
        item: [],
     
   
    }
}
const cartSlice= createSlice({
    name: "cart",
    initialState,
    reducers:{
        addCartItems: (state, action) => {
            const newItem = action.payload
            const existingItem = state.cartItems.item.find(item => item.id === newItem.id)
            state.totalQty += 1
            const savedPrice =Math.round(action.payload.price * 100) / 100
            const savedTotalPrice =state.totalPrice + savedPrice
            state.totalPrice = Math.round(savedTotalPrice * 100) / 100 
           if( !existingItem){
            state.cartItems.item.push({ id : newItem.id ,title : newItem.title, qty : 1, price : newItem.price,itemTotalPrice : newItem.price,image: newItem.image })
            
           }
           else{
            existingItem.qty ++
            const savedPrice =Math.round(action.payload.price * 100) / 100
            const  existingItemTotal    = existingItem.itemTotalPrice+ savedPrice
            existingItem.itemTotalPrice= Math.round(existingItemTotal * 100) / 100
           }
        },
        removeCartItems: (state, action) => {
            const id = action.payload.id
            const existingItem = state.cartItems.item.find(item => item.id === id)
            state.totalQty -= 1
            const savedPrice =Math.round(action.payload.price * 100) / 100
            const savedTotalPrice =state.totalPrice - savedPrice
            state.totalPrice = Math.round(savedTotalPrice * 100) / 100
            if( existingItem.qty===1){
                state.cartItems.item= state.cartItems.item.filter(item => item.id !== id)
            
            }
  
            else{
                existingItem.qty --
                const savedPrice =Math.round(action.payload.price * 100) / 100
                const  existingItemTotal    = existingItem.itemTotalPrice - savedPrice
                existingItem.itemTotalPrice= Math.round(existingItemTotal * 100) / 100
            }
        }
    }
})
export const {addCartItems,removeCartItems} =cartSlice.actions
export default cartSlice.reducer
