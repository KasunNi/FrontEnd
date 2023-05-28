import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../css/CustomerDashboardPage.css';
import logo from '../assets/logo.png';

import addbooking from '../assets/addbooking.jpg';
import viewservicecenters from '../assets/viewservicecenters.jpg';
import viewservicepackages from '../assets/viewservicepackages.jpg';

const ServiceCentersPageServiceAdvisor = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [error, setError] = useState('');
  
      const [serviceAdvisors, setServiceAdvisors] = useState([]);

   useEffect(() => {
    const fetchServiceCenters = async () => {
      try {
        // Check if the user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
          // Token is not available, redirect to login page
          window.location.href = '/admin/login';
          return;
        }
		
		// Retrieve the logged-in customer's email from localStorage
    const email = localStorage.getItem('email');

        // Set the JWT token in the request headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // User is authenticated, fetch serviceCenters
        const serviceCentersResponse = await axios.get('http://localhost:3001/api/admin/service-centers');
		console.log(serviceCentersResponse)
        setServiceCenters(serviceCentersResponse.data.servicecenters);
		console.log(serviceCenters)
		//console.log(serviceCenters.serviceCenters)
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchServiceCenters();
	//fetchServiceAdvisors();
  }, []);
  
  
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
  
    const cancelServiceCenter = async (serviceCenterId) => {
	   console.log(serviceCenterId);
    try {
      await axios.delete(`http://localhost:3001/api/admin/service-center/${serviceCenterId}`);
      // service Center canceled successfully, update the bookings list
      setServiceCenters((prevServiceCenters) => prevServiceCenters.filter((serviceCenters) => serviceCenters._id !== serviceCenterId));
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
	  

	
      <h2>ServiceQ : Service Centers</h2>
      {error && <div className="error">{error}</div>}
	  
	  
	  
	   
	  
      
	  
	  
	  <h3>All Service Centers</h3>
      {Array.isArray(serviceCenters) ? (
        serviceCenters.map((serviceCenters) => (
		
          <div key={serviceCenters.id}>
            <div className="booking-card" key={serviceCenters._id}>
            <div>
              <strong>Service Center ID:</strong> {serviceCenters._id}
            </div>
            
            <div>
              <strong>Name:</strong> {serviceCenters.name}
            </div>
			<div>
              <strong>Location:</strong> {serviceCenters.location}
            </div>
			<div>
              <strong>Contact Number:</strong> {serviceCenters.contactNumber}
            </div>
            
           
			<div className="status-buttons">
             
			  
			   <button onClick={() => cancelServiceCenter(serviceCenters._id)}>Delete Service Center</button>
			  
            </div>
          </div>
          </div>
		  
        ))
      ) : (
        <p>No service centers found.</p>
      )}
	  
	  <br/><br/>
	  <br/>
	  
	  
	  
	  
	  
    </div>
  );
};

export default ServiceCentersPageServiceAdvisor;
