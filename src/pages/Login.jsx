import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    
    if (email === "admin@admin.com" && password === "1234") {
      navigate('/home')
    } else {
      setError("Invalid email or password!")
    }
  }

  return (
    <div className="auth-container">
      <div className="card">
        <h2>Welcome Back</h2>
        <p style={{color: '#666', marginBottom: '20px'}}>Please enter your details</p>
        
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          
          {error && <p className="error">{error}</p>}
          
          <button type="submit">Log In</button>
        </form>
        
        <p style={{marginTop: '20px', fontSize: '14px'}}>
          Don't have an account? <Link to="/signup" style={{color: '#007bff'}}>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login