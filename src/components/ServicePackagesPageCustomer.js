import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../css/CustomerDashboardPage.css';
import logo from '../assets/logo.png';

import addbooking from '../assets/addbooking.jpg';
import viewservicecenters from '../assets/viewservicecenters.jpg';
import viewservicepackages from '../assets/viewservicepackages.jpg';

const ServicePackagesPageCustomer = () => {
  const [servicePackages, setServicePackages] = useState([]);
  const [error, setError] = useState('');
  
      const [serviceAdvisors, setServiceAdvisors] = useState([]);

   useEffect(() => {
    const fetchServicePackages = async () => {
      try {
        // Check if the user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
          // Token is not available, redirect to login page
          window.location.href = '/customer/login';
          return;
        }
		
		// Retrieve the logged-in customer's email from localStorage
    const email = localStorage.getItem('email');

        // Set the JWT token in the request headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // User is authenticated, fetch serviceCenters
        const servicePackagesResponse = await axios.get('http://localhost:3001/api/service-advisor/service-packages');
		console.log(servicePackagesResponse)
        setServicePackages(servicePackagesResponse.data.servicepackages);
		console.log(servicePackages)
		//console.log(servicePackages.servicePackages)
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchServicePackages();
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
	
      window.location.href = '/customer/login';
    } catch (error) {
      console.error(error);	
      // Handle error
    }
  };
  
    const cancelServicePackage = async (servicePackageId) => {
	   console.log(servicePackageId);
    try {
      await axios.delete(`http://localhost:3001/api/service-advisor/service-package/${servicePackageId}`);
      // service Center canceled successfully, update the bookings list
      setServicePackages((prevServicePackages) => prevServicePackages.filter((servicePackages) => servicePackages._id !== servicePackageId));
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
	  

	
      <h2>ServiceQ : Service Packages</h2>
      {error && <div className="error">{error}</div>}
	  
	  
	  
	   
	  
      
	  
	  
	  <h3>All Service Packages</h3>
      {Array.isArray(servicePackages) ? (
        servicePackages.map((servicePackages) => (
		
          <div key={servicePackages.id}>
            <div className="booking-card" key={servicePackages._id}>
            <div>
              <strong>Service Package ID:</strong> {servicePackages._id}
            </div>
            
            <div>
              <strong>Name:</strong> {servicePackages.name}
            </div>
			<div>
              <strong>Description:</strong> {servicePackages.description}
            </div>
			<div>
              <strong>Price:</strong> {servicePackages.price}
            </div>
            
           
			
          </div>
          </div>
		  
        ))
      ) : (
        <p>No service packages found.</p>
      )}
	  
	  <div className="navigation-tiles">
	  <div className="tile">
		<img src={logo} alt="dashboard" className="logo" /><br/>
          <a href="/customer/dashboard">Dashboard</a>
        </div>
        <div className="tile">
		<img src={logo} alt="addbooking" className="logo" /><br/>
          <a href="/customer/add-booking">Add Booking</a>
        </div>
        <div className="tile">
		<img src={logo} alt="viewservicecenters" className="logo" /><br/>
          <a href="/customer/service-centers">View Service Centers</a>
        </div>
        
      </div>
	  
	  
	  <br/><br/><br/><br/>
	  
    </div>
  );
};

export default ServicePackagesPageCustomer;
