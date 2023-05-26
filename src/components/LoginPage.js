import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

import '../css/styles.css'; // Import the styles.css file
import logo from '../assets/logo.png';

const LoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const credentials = {
      email,
      password,
    };

    axios
      .post('http://localhost:3001/api/customer/login', credentials) // Update the API endpoint based on the actual backend routes
      .then((response) => {
		  console.log(response);
        // Handle successful login
        localStorage.setItem('token', response.data.token); // Store the token in local storage
        history.push('/customer/dashboard'); // Redirect to the customer dashboard page
      })
      .catch((error) => {
        // Handle login error
        setError(error.response.data.message);
      });
  };

  return (
    <div className="login-container">
	  <h1 className="top-topic">ServiceQ</h1>
	  {/*<div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
</div>*/}
      <h2>Customer Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input className="login-input"  type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input className="login-input"  type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        {error && <div className="error">{error}</div>}
        <button className="login-button"  type="submit">Login</button>
      </form>
      <div>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
        <p>Forgot your password? <Link to="/customer/reset-password">Reset Password</Link></p>
      </div>
	  
	  <br/>
	  
	  <div>
        <p>Login as Service Advisor? <Link to="/service-advisor/login">Service Advisor Login</Link></p>
      </div>
	  
	  <div>
        <p>Login as Admin? <Link to="/admin/login">Admin Login</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
