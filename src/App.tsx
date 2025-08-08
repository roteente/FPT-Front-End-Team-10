import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auth from './component/Auth/Auth.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Auth></Auth>
    </>
  )
}

export default App
