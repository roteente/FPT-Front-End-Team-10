import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type User = { id:number; email:string; role:'user'|'admin'; token:string }
const persisted = localStorage.getItem('auth:user')
const slice = createSlice({
  name:'auth',
  initialState:{ user: persisted ? JSON.parse(persisted) as User : null },
  reducers:{
    setUser:(s,a:PayloadAction<User|null>)=>{ s.user=a.payload; a.payload?localStorage.setItem('auth:user',JSON.stringify(a.payload)):localStorage.removeItem('auth:user') },
    logout:(s)=>{ s.user=null; localStorage.removeItem('auth:user') }
  }
})
export const { setUser, logout } = slice.actions
export default slice.reducer
