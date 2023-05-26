import React from 'react';
import { Link } from 'react-router-dom';
import '../css/WelcomePage.css';

const WelcomePage = () => {
  return (
    <div className="welcome">
      <h1><br/></h1>
      <div className="welcome-links">
        <Link to="/customer/login" className="link">
          Login
        </Link>
        <Link to="/register" className="link">
          Register
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
