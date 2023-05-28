import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../css/styles.css'; // Import the styles.css file
import '../css/CustomerDashboardPage.css';
import logo from '../assets/logo.png';

const AddBookingPage = () => {
	
	const [email, setEmail] = useState('');
const [date, setDate] = useState('');
const [serviceAdvisors, setServiceAdvisors] = useState([]);

  useEffect(() => {
    // Retrieve the user ID from localStorage
    const storedEmail = localStorage.getItem('email');
    setEmail(storedEmail);
	
	bookingData.email = email;
	
	fetchServiceAdvisors();
	
	
  }, []);
  
	
  const [bookingData, setBookingData] = useState({
    // Initialize the booking form data
    email: '',
	date: '',
    vehicleRegNumber: '',
    description: '',
	serviceAdvisor: '',
    // Add more fields as needed
  });
  
  console.log(bookingData)
  
   const fetchServiceAdvisors = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/service-advisors');
      setServiceAdvisors(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };
  
  const handleChangeEmail = (e) => {
  setBookingData({ ...bookingData, email: e.target.value });
};

  
  
    const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend API with the booking data
      const response = await axios.post('http://localhost:3001/api/customer/bookings', bookingData);
      
      // Handle the response as needed

      // Reset the booking form data
      setBookingData({
        email: '',
		date: '',
        vehicleRegNumber: '',
        description: '',
		serviceAdvisor: '',
        // Reset more fields as needed
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
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
	  

	
      <h2>ServiceQ : New Booking</h2>
      {error && <div className="error">{error}</div>}
	  
	  <div className="login-container">
	 
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Customer Email:
           <input className="login-input" 
            type="text"
			name="email"
            value={bookingData.email}
			onChange={handleChange} required
			
          />
        </label>
		
		<label>
          Date:<br/>
          <input className="login-input"
            type="date"
			name="date"
            value={bookingData.date}
            onChange={handleChange} required
          />
        </label><br/><br/>

        <label>
          VehicleRegistration Number:
          <input  className="login-input"  
            type="text"
            name="vehicleRegNumber"
            value={bookingData.vehicleRegNumber}
            onChange={handleChange} required
          />
        </label>

        <label>
          Description:
          <input  className="login-input"  
            type="text"
            name="description"
            value={bookingData.description}
            onChange={handleChange} required
          />
        </label>
		
		
		<label>
          Service Advisor:<br/>
          <select name="serviceAdvisor" className="login-input" value={bookingData.serviceAdvisor} onChange={handleChange}>
            <option value="">Select Service Advisor</option>
            {serviceAdvisors.map((serviceAdvisor) => (
              <option key={serviceAdvisor._id} value={serviceAdvisor._id}>
                {serviceAdvisor.name}
              </option>
            ))}
          </select>
        </label><br/><br/>

        
        
        <button  className="login-button"   type="submit">Add Booking</button>
      </form>
	  
	  </div>
	  
	  <br/><br/>
	   
	   <div className="navigation-tiles">
        <div className="tile">
		<img src={logo} alt="addbooking" className="logo" /><br/>
          <a href="/customer/dashboard">Dashboard</a>
        </div>
        <div className="tile">
		<img src={logo} alt="viewservicecenters" className="logo" /><br/>
          <a href="/customer/view-service-centers">View Service Centers</a>
        </div>
        <div className="tile">
			<img src={logo} alt="viewservicepackages" className="logo" /><br/>
          <a href="/customer/view-service-packages">View Service Packages</a>
        </div>
      </div>
	  
	  
	  <br/><br/><br/><br/>
    </div>
  );
};

export default AddBookingPage;
