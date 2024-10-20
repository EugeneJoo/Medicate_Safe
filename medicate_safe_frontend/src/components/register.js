// Register.js
import React, { useState } from 'react';
import './modals.css'; // Reusing the CSS file for styling

const Register = ({ onRegister, onSwitchToLogin, onClose }) => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Username, Password}),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Account created successfully!');
        setErrorMessage('');
        onRegister(data);
      } else {
        setErrorMessage(data.message || 'Registration failed');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error: Unable to register. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="login-container"> {/* Changed to use CSS class */}
      <h2>Create Account</h2>
      <button className="close-button" onClick={onClose}>X</button> {/* Changed to use CSS class */}
      <form onSubmit={handleSubmit}>
        <div className="form-group"> {/* Changed to use CSS class */}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
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
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">
          Create Account
        </button>
      </form>
      <p>
        Already have an account? <button className="switch-button" onClick={onSwitchToLogin}>Log In</button> {/* Changed to use CSS class */}
      </p>
    </div>
  );
};

export default Register;