import { useAuthVM } from '@/features/auth/hooks/useAuthVM'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { loginSuccess } from '@/features/auth/model/authSlice'

export default function DebugAuth() {
  const { user, isAuthenticated } = useAuthVM()
  const token = useAppSelector(state => state.auth.token)
  const dispatch = useAppDispatch()

  const handleQuickLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test2@example.com',
          password: '123456'
        })
      })
      
      const result = await response.json()
      
      if (result.accessToken) {
        // Parse JWT to get user info
        const payload = JSON.parse(atob(result.accessToken.split('.')[1]))
        
        const userInfo = {
          id: parseInt(payload.sub),
          email: payload.email,
          name: 'Test User',
          role: 'user' as const
        }
        
        dispatch(loginSuccess({
          user: userInfo,
          token: result.accessToken
        }))
        
        alert('✅ Đã đăng nhập thành công!')
      }
    } catch (error) {
      console.error('Quick login error:', error)
      alert('❌ Lỗi đăng nhập: ' + error)
    }
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.9)', 
      color: 'white', 
      padding: '15px', 
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      minWidth: '200px'
    }}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>🔐 Auth Debug:</div>
      <div>✅ Authenticated: {isAuthenticated ? 'YES' : 'NO'}</div>
      <div>👤 User: {user ? user.email : 'None'}</div>
      <div>🎫 Token: {token ? 'YES' : 'NO'}</div>
      
      {!isAuthenticated && (
        <button
          onClick={handleQuickLogin}
          style={{
            marginTop: '10px',
            padding: '5px 10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px'
          }}
        >
          🚀 Quick Login
        </button>
      )}
    </div>
  )
}
