import { Button, Form, Input, message } from 'antd'
import { setUser } from '@/features/auth/authSlice'
import { useAppDispatch } from '@/app/hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Login(){
  const d = useAppDispatch(); const nav = useNavigate(); const [p] = useSearchParams()
  const redirect = p.get('redirect') || '/'
  const onFinish = async (v:any)=>{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email: v.email, password: v.password })
    })
    if(!res.ok) return message.error('Sai email hoặc mật khẩu')
    const data = await res.json() // { accessToken, user }
    d(setUser({ id:data.user.id, email:data.user.email, role:data.user.role, token:data.accessToken }))
    message.success('Đăng nhập thành công'); nav(redirect)
  }
  return (<div style={{maxWidth:420}}>
    <h2>Đăng nhập</h2>
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item name="email" label="Email" rules={[{required:true, type:'email'}]}><Input/></Form.Item>
      <Form.Item name="password" label="Mật khẩu" rules={[{required:true}]}><Input.Password/></Form.Item>
      <Button type="primary" htmlType="submit">Đăng nhập</Button>
    </Form>
  </div>)
}
