// AddServiceCenterForm.js

import React, { useState } from 'react';
import axios from 'axios';


import '../css/styles.css'; // Import the styles.css file
import '../css/CustomerDashboardPage.css';
import logo from '../assets/logo.png';



const AddServiceCenterPage = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  
   const [newServiceCenter, setNewServiceCenter] = useState({
    // Initialize the booking form data
    name: '',
	location: '',
    contactNumber: '',
  });

  const [error, setError] = useState('');
  
  
  const handleSubmit = async (e) => {
	  
    e.preventDefault();
    // Perform form submission logic here (e.g., API call)
    // You can access the form values: name, location, contactNumber
	
	
	
	


      //const response = await fetch('http://localhost:3001/api/admin/service-center', {
    try {
      // Make a POST request to the backend API with the booking data
      const response = await axios.post('http://localhost:3001/api/admin/service-center', newServiceCenter);
      
      // Handle the response as needed

      // Reset the booking form data
      setNewServiceCenter({
        name: '',
	location: '',
    contactNumber: '',
      });
    } catch (error) {
      console.error(error);
    }
	
	
  };
  


const handleChange = (e) => {
    const { name, value } = e.target;
    setNewServiceCenter((prevData) => ({
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
	
      window.location.href = '/admin/login';
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
	  

	
      <h2>ServiceQ : New Service Center</h2>
      {error && <div className="error">{error}</div>}
	  
	  <div className="login-container">
	  
	  
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name"  value={newServiceCenter.name} className="login-input"
			onChange={handleChange} required />

        <label htmlFor="location">Location</label>
        <input type="text" name="location" value={newServiceCenter.location} className="login-input"
			onChange={handleChange} required />

        <label htmlFor="contactNumber">Contact Number</label>
        <input type="text" name="contactNumber" value={newServiceCenter.contactNumber} className="login-input"
			onChange={handleChange} required />

        <button  className="login-button"   type="submit">Add Service Center</button>
      </form>
	       </div>
	  
	  <br/><br/>
	   
	  <div className="navigation-tiles">
        <div className="tile">
		<img src={logo} alt="addbooking" className="logo" /><br/>
          <a href="/admin/dashboard">Dashboard</a>
        </div>
        <div className="tile">
		<img src={logo} alt="viewservicecenters" className="logo" /><br/>
          <a href="/admin/service-centers">View Service Centers</a>
        </div>
        <div className="tile">
			<img src={logo} alt="viewservicepackages" className="logo" /><br/>
          <a href="/admin/service-packages">View Service Packages</a>
        </div>
		<div className="tile">
		<img src={logo} alt="viewservicecenters" className="logo" /><br/>
          <a href="/admin/service-advisor/register">Add Service Advisor</a>
        </div>
        <div className="tile">
			<img src={logo} alt="viewservicepackages" className="logo" /><br/>
          <a href="/admin/admin/register">Add Admin</a>
        </div>
      </div>
	  
	  
	  <br/><br/><br/><br/>
    </div>
  );
};

export default AddServiceCenterPage;
