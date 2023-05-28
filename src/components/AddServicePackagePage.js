// AddServicePackageForm.js

import React, { useState } from 'react';

import axios from 'axios';


import '../css/styles.css'; // Import the styles.css file
import '../css/CustomerDashboardPage.css';
import logo from '../assets/logo.png';

const AddServicePackagePage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  
   const [newServicePackage, setnewServicePackage] = useState({
    // Initialize the service package form data
    name: '',
	description: '',
    price: '',
  });

  const [error, setError] = useState('');
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic here (e.g., API call)
    // You can access the form values: name, description, price
	
	

      //const response = await fetch('http://localhost:3001/api/admin/service-center', {
    try {
      // Make a POST request to the backend API with the booking data
      const response = await axios.post('http://localhost:3001/api/service-advisor/service-package', newServicePackage);
      
      // Handle the response as needed

      // Reset the booking form data
      setnewServicePackage({
        name: '',
	description: '',
    price: '',
      });
    } catch (error) {
      console.error(error);
    }
	
  };
  
  
const handleChange = (e) => {
    const { name, value } = e.target;
    setnewServicePackage((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
    const logout = async () => {
    try {
      await axios.post('http://localhost:3001/api/logout');
      // Handle successful logout
      // For example, redirect to the login page
	  
	  // Remove the JWT token from local storage
    localStorage.removeItem('token');
	
	localStorage.removeItem('email');
	
      window.location.href = '/customer/login';
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div className="customer-dashboard">
	
	
	<div className="logout-container">
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
	  

	
      <h2>ServiceQ : New Service Package</h2>
      {error && <div className="error">{error}</div>}
	  
	  <div className="login-container">
	  
	  
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name"  value={newServicePackage.name} className="login-input"
			onChange={handleChange} required />

        <label htmlFor="description">description</label>
        <input type="text" name="description" value={newServicePackage.description} className="login-input"
			onChange={handleChange} required />

        <label htmlFor="price">Price</label>
        <input type="text" name="price" value={newServicePackage.price} className="login-input"
			onChange={handleChange} required />

        <button  className="login-button"   type="submit">Add Service Package</button>
      </form>
	       </div>
	  
	  	   
	   <br/><br/>
	 
	  
	  
	  
	   <div className="navigation-tiles">
	   <div className="tile">
			<img src={logo} alt="viewservicepackages" className="logo" /><br/>
          <a href="/service-advisor/dashboard">Dashboard</a>
        </div>
        <div className="tile">
		<img src={logo} alt="addbooking" className="logo" /><br/>
          <a href="/service-advisor/service-packages">View Service Packages</a>
        </div>
        <div className="tile">
		<img src={logo} alt="viewservicecenters" className="logo" /><br/>
          <a href="/admin/view-service-centers">View Service Centers</a>
        </div>
        
      </div>
	  
	  <br/><br/><br/><br/>
    </div>
  );
};

export default AddServicePackagePage;
