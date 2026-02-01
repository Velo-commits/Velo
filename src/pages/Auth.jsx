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
        // Log in existing user
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Register new user
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // If successful, go to the tasks page
      navigate('/home'); 
    } catch (err) {
      // Show user-friendly error messages
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isLogin ? 'Welcome Back' : 'Join the Cloud'}</h1>
        <p className="subtitle">{isLogin ? 'Login to manage your tasks' : 'Create an account to get started'}</p>
        
        {error && <div className="error-banner">{error}</div>}
        
        <form onSubmit={handleAuth}>
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
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
          
          <button type="submit" className="primary-btn">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;