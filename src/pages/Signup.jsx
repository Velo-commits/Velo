import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    // We won't add logic here yet, just visual consistency
    navigate('/home')
  }

  return (
    <div className="card">
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p style={{marginTop: '20px', fontSize: '14px'}}>
        Already have an account? <Link to="/" style={{color: '#007bff'}}>Log In</Link>
      </p>
    </div>
  )
}
export default Signup