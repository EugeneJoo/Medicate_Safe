//login.js
import React, { useState } from 'react';

const Login = ({ onLogin, onSwitchToRegister }) => {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
  
    const handleSubmit = async(event) => {
      event.preventDefault();
  
      try {
        // Call the registration API
        const response = await fetch('http://localhost:5001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({Username, Password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Handle success (e.g., display a success message, or call `onRegister`)
          setSuccessMessage('Logged in!');
          setErrorMessage('');
          // Optionally, call the `onRegister` function after successful registration
          onLogin(data);
        } else {
          // Handle error response (e.g., user already exists)
          setErrorMessage(data.message || 'Login failed');
          setSuccessMessage('');
        }
      } catch (error) {
        // Handle network or other errors
        setErrorMessage('Error: Unable to login. Please try again.');
        setSuccessMessage('');
      }
      };
  
    return (
      <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
          </div>
          <button type="submit" style={{ padding: '0.75rem', width: '100%', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            Login
          </button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          Don't have an account? <button onClick={onSwitchToRegister} style={{ color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }}>Create Account</button>
        </p>
      </div>
    );
  };
  

export default Login;