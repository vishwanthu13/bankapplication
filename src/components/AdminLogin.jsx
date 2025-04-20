import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminLogin.css';  // Ensure you have the CSS file imported

const AdminLogin = ({ onLoggedinChange, onChangeUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);  
    // Simulating a network call with setTimeout
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        console.log('Admin login successful');
        alert('Login successful');
        onChangeUser({ role: 'admin' });
        onLoggedinChange(true);
        navigate("/adminDashboard");
      } else {
        setError('Login failed, please check your credentials');
      }
    }, 1000);  // Simulating a delay of 1 second
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <p className="login-title">Admin Login</p>
      <div className="form-group">
        <label>Username</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <button type="submit" className="submit-button">Login</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default AdminLogin;
