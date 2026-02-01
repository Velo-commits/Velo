import { useState } from 'react';
import { auth } from '../db/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/home'); 
    } catch (err) {
      console.error("Auth Error:", err.code);
      if (err.code === 'auth/invalid-credential') setError("Incorrect email or password.");
      else if (err.code === 'auth/email-already-in-use') setError("Email already exists. Try logging in.");
      else if (err.code === 'auth/weak-password') setError("Password must be at least 6 characters.");
      else setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isLogin ? 'Welcome Back' : 'Get Started'}</h1>
        <p className="subtitle">
          {isLogin ? 'Login to manage your tasks' : 'Create an account to join CloudTask'}
        </p>
        
        {error && <div className="error-banner">{error}</div>}
        
        <form onSubmit={handleAuth}>
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="primary-btn" style={{width: '100%', marginTop: '10px'}}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <p onClick={() => setIsLogin(!isLogin)} className="toggle-link">
          {isLogin ? "New here? Create an account" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Auth;