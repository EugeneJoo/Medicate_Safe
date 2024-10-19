import React, { useState } from 'react';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your registration logic here, e.g., calling an API to create an account
    onRegister({ username, password });
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.75rem', width: '100%', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Create Account
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Already have an account? <button onClick={onSwitchToLogin} style={{ color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }}>Log In</button>
      </p>
    </div>
  );
};

export default Register;