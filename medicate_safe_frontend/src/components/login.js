import React, { useState } from 'react';
import './modals.css'; // Import the CSS file

const Login = ({ onLogin, onSwitchToRegister, onClose }) => {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    const handleSubmit = async(event) => {
      event.preventDefault();
  
      try {
        const response = await fetch('http://localhost:5001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({Username, Password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setSuccessMessage('Logged in!');
          setErrorMessage('');
          onLogin(data);
        } else {
          setErrorMessage(data.message || 'Login failed');
          setSuccessMessage('');
        }
      } catch (error) {
        setErrorMessage('Error: Unable to login. Please try again.');
        setSuccessMessage('');
      }
      };
  
    return (
      <div className="login-container">
        <h2>Login</h2>
        <button className="close-button" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <button className="switch-button" onClick={onSwitchToRegister}>Create Account</button>
        </p>
      </div>
    );
  };

export default Login;