import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

import '../css/CustomerDashboardPage.css';
import logo from '../assets/logo.png';

import addbooking from '../assets/addbooking.jpg';
import viewservicecenters from '../assets/viewservicecenters.jpg';
import viewservicepackages from '../assets/viewservicepackages.jpg';

const ServiceAdvisorDashboardPage = () => {
  const [error, setError] = useState('');
  const history = useHistory();

  const [bookings, setBookings] = useState([]);
  const serviceAdvisorEmail = localStorage.getItem('email');
  const [serviceAdvisorId, setServiceAdvisorId] = useState('');
  
    const [serviceAdvisors, setServiceAdvisors] = useState([]);

  useEffect(() => {
    const fetchServiceAdvisorId = async () => {
      try {
		  
		  // Check if the user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
          // Token is not available, redirect to login page
          window.location.href = '/customer/login';
          return;
        }
		  
        const response = await axios.post(`http://localhost:3001/api/service-advisor/email`, serviceAdvisorEmail);
        setServiceAdvisorId(response.data.serviceAdvisorId);
      } catch (error) {
        console.error('Error fetching service advisor ID:', error);
      }
    };

    fetchServiceAdvisorId();
  }, [serviceAdvisorEmail]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
		  
		  // Check if the user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
          // Token is not available, redirect to login page
          window.location.href = '/service-advisor/login';
          return;
        }
		  
		  
        //const response = await axios.get(`http://localhost:3001/api/service-advisor/bookings/${serviceAdvisorId}`);
		// User is authenticated, fetch bookings
        const bookingsResponse = await axios.post('http://localhost:3001/api/service-advisor/getbookings', {serviceAdvisorId});
		console.log(bookingsResponse)
        setBookings(bookingsResponse.data.bookings);
		console.log(bookings)
		console.log(bookings.bookings)
		
		
		
		
        //setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (serviceAdvisorId) {
      fetchBookings();
    }
  }, [serviceAdvisorId]);

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await axios.patch(`http://localhost:3001/api/service-advisor/bookings/${bookingId}`, { status });
      // Update the local state to reflect the updated status
      setBookings((prevBookings) =>
        prevBookings.map((booking) => {
          if (booking._id === bookingId) {
            return { ...booking, status };
          }
          return booking;
        })
      );
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };
  
  


const getServiceAdvisorName = (serviceAdvisorId) => {
    const serviceAdvisor = serviceAdvisors.find((advisor) => advisor._id === serviceAdvisorId);
    return serviceAdvisor ? serviceAdvisor.name : 'N/A';
  };
  
   const fetchServiceAdvisors = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/service-advisors');
      setServiceAdvisors(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
   const logout = async () => {
    try {
      await axios.post('http://localhost:3001/api/logout');
      // Handle successful logout
      // For example, redirect to the login page
	  
	  // Remove the JWT token from local storage
    localStorage.removeItem('token');
	
	localStorage.removeItem('email');
	
      window.location.href = '/service-advisor/login';
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
	  

	
      <h2>ServiceQ : Service Advisor Dashboard</h2>
      {error && <div className="error">{error}</div>}
	  
	  
	  
	   <div className="navigation-tiles">
        <div className="tile">
		<img src={logo} alt="addbooking" className="logo" /><br/>
          <a href="/service-advisor/add-service-package">Add Service Packages</a>
        </div>
        <div className="tile">
		<img src={logo} alt="viewservicecenters" className="logo" /><br/>
          <a href="/service-advisor/service-centers">View Service Centers</a>
        </div>
        <div className="tile">
			<img src={logo} alt="viewservicepackages" className="logo" /><br/>
          <a href="/service-advisor/service-packages">View Service Packages</a>
        </div>
      </div>
	  
      
	  
	  
	  <h3>My Bookings</h3>
      {Array.isArray(bookings) ? (
        bookings.map((booking) => (
		
          <div key={booking.id}>
            <div className="booking-card" key={booking._id}>
            <div>
              <strong>Booking ID:</strong> {booking._id}
            </div>
            
            <div>
              <strong>Date:</strong> {booking.date}
            </div>
			<div>
              <strong>Description:</strong> {booking.description}
            </div>
            <div>
              <strong>Status:</strong> {booking.status}
            </div>
           
			<div className="status-buttons">
              <button
                className="status-button"
                onClick={() => updateBookingStatus(booking._id, 'approved')}
              >
                Approve
              </button>
              <button
                className="status-button"
                onClick={() => updateBookingStatus(booking._id, 'rejected')}
              >
                Reject
              </button>
			  
            </div>
          </div>
          </div>
		  
        ))
      ) : (
        <p>No bookings found.</p>
      )}
	  
	  <br/><br/>
	  <br/>
	  
	  
	  
	  
	  
    </div>
  );
};

export default ServiceAdvisorDashboardPage;
