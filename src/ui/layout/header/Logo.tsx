import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/tiki-logo.svg" 
        alt="Tiki" 
        width="96"
        height="40"
        className="object-contain"
      />
    </Link>
  )
}
