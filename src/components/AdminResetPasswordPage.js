import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import '../css/styles.css'; // Import the styles.css file
import logo from '../assets/logo.png';

const AdminResetPasswordPage = () => {
  const history = useHistory();
  //const { token } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const resetData = {
	  email,
      password,
    };

    axios
      .patch(`http://localhost:3001/api/admin/reset-password`, resetData) // Update the API endpoint based on the actual backend routes
      .then(() => {
        // Handle successful password reset
        history.push('/admin/login'); // Redirect to the admin login page
      })
      .catch((error) => {
        // Handle password reset error
        setError(error.response.data.message);
      });
  };

  return (
    <div className="login-container">
	  <h1 className="top-topic">ServiceQ</h1>
	  {/*<div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
</div>*/}
      
      <h2>Reset Password (Admin)</h2>
      <form className="login-form" onSubmit={handleSubmit}>
		<div>
          <label>Email:</label>
          <input  className="login-input" type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>New Password:</label>
          <input  className="login-input" type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input  className="login-input" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
        </div>
        {error && <div className="error">{error}</div>}
        <button className="login-button" type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default AdminResetPasswordPage;
