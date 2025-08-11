import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { qty, remove, selectCartItems, selectCartTotal } from '@/features/cart/cartSlice'
import { Button, InputNumber, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
export default function Cart(){
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const d = useAppDispatch(); const nav = useNavigate()
  const rows = items.map(i=>({ key:i.book.id, title:i.book.title, qty:i.qty,
    price:i.book.salePrice??i.book.price, total:(i.book.salePrice??i.book.price)*i.qty }))
  return (
    <div>
      <h2>Giỏ hàng</h2>
      <Table pagination={false} dataSource={rows} columns={[
        { title:'Sách', dataIndex:'title' },
        { title:'SL', dataIndex:'qty', render:(_:any,r:any)=>(<InputNumber min={1} value={r.qty} onChange={v=>d(qty({id:r.key, qty:Number(v)}))}/>) },
        { title:'Đơn giá', dataIndex:'price', render:(v:number)=>v.toLocaleString()+' ₫' },
        { title:'Thành tiền', dataIndex:'total', render:(v:number)=>v.toLocaleString()+' ₫' },
        { title:'', render:(_:any,r:any)=>(<Button danger onClick={()=>d(remove(r.key))}>Xóa</Button>) },
      ]}/>
      <div style={{display:'flex', justifyContent:'flex-end', gap:12, marginTop:12}}>
        <b>Tổng: {total.toLocaleString()} ₫</b>
        <Button type="primary" onClick={()=>nav('/checkout')} disabled={!items.length}>Thanh toán</Button>
      </div>
    </div>
  )
}
