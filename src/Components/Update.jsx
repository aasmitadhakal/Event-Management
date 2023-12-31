import React, { useState } from 'react';
import axios from 'axios';

const YourComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://api.rgsw.com.np/login/', {
        email,
        password,
      });

      // Handle successful login, e.g., set tokens in localStorage, redirect, etc.
      console.log('Login successful', response.data);
    } catch (error) {
      // Handle login error
      if (error.response) {
        // Server responded with a status code outside of 2xx
        setErrorMessage(error.response.data.message); // Replace 'message' with your API error response property
      } else {
        // Something went wrong with the request (e.g., network error)
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default YourComponent;