import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import type { Book } from '@/features/books/bookApi'
import type { RootState } from '@/app/store'
type Item = { book:Book; qty:number }
const slice = createSlice({
  name:'cart', initialState:{ items:[] as Item[] },
  reducers:{
    add:(s,a:PayloadAction<{book:Book; qty?:number}>)=>{const{book,qty=1}=a.payload;const i=s.items.findIndex(x=>x.book.id===book.id);i>=0?(s.items[i].qty+=qty):s.items.push({book,qty})},
    remove:(s,a:PayloadAction<number>)=>{s.items=s.items.filter(i=>i.book.id!==a.payload)},
    qty:(s,a:PayloadAction<{id:number; qty:number}>)=>{const i=s.items.findIndex(x=>x.book.id===a.payload.id); if(i>=0) s.items[i].qty=Math.max(1,a.payload.qty)},
    clear:(s)=>{s.items=[]}
  }
})
export const { add, remove, qty, clear } = slice.actions
export default slice.reducer
export const selectCartItems = (s:RootState)=>s.cart.items
export const selectCartCount = createSelector(selectCartItems, it=>it.reduce((a,b)=>a+b.qty,0))
export const selectCartTotal = createSelector(selectCartItems, it=>it.reduce((a,b)=>a+(b.book.salePrice??b.book.price)*b.qty,0))
