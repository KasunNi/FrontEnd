import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../css/CustomerDashboardPage.css';
import logo from '../assets/logo.png';

import addbooking from '../assets/addbooking.jpg';
import viewservicecenters from '../assets/viewservicecenters.jpg';
import viewservicepackages from '../assets/viewservicepackages.jpg';

const AdminDashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  
      const [serviceAdvisors, setServiceAdvisors] = useState([]);

   useEffect(() => {
    const fetchBookings = async () => {
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

        // User is authenticated, fetch bookings
        const bookingsResponse = await axios.post('http://localhost:3001/api/admin/getbookings', {email});
		console.log(bookingsResponse)
        setBookings(bookingsResponse.data.bookings);
		console.log(bookings)
		console.log(bookings.bookings)
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchBookings();
	fetchServiceAdvisors();
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
  
    const cancelBooking = async (bookingId) => {
	   console.log(bookingId);
    try {
      await axios.delete(`http://localhost:3001/api/customer/bookings/${bookingId}`);
      // Booking canceled successfully, update the bookings list
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error(error);
      // Handle error
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
  
  
  

  return (
     <div className="customer-dashboard">
	
	
	
      <div className="logout-container">
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
	  

	
      <h2>ServiceQ : Admin Dashboard</h2>
      {error && <div className="error">{error}</div>}
	  
	  
	  
	   <div className="navigation-tiles">
        <div className="tile">
		<img src={logo} alt="addbooking" className="logo" /><br/>
          <a href="/customer/add-booking">Add Service Center</a>
        </div>
        <div className="tile">
		<img src={logo} alt="viewservicecenters" className="logo" /><br/>
          <a href="/customer/view-service-centers">View Service Centers</a>
        </div>
        <div className="tile">
			<img src={logo} alt="viewservicepackages" className="logo" /><br/>
          <a href="/customer/view-service-packages">View Service Packages</a>
        </div>
		<div className="tile">
		<img src={logo} alt="viewservicecenters" className="logo" /><br/>
          <a href="/service-advisor/register">Add Service Advisor</a>
        </div>
        <div className="tile">
			<img src={logo} alt="viewservicepackages" className="logo" /><br/>
          <a href="/admin/register">Add Admin</a>
        </div>
      </div>
	  
      
	  
	  
	  <h3>All Bookings</h3>
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
              <strong>Service Advisor:</strong> {getServiceAdvisorName(booking.serviceAdvisor)}
            </div>
            <div>
              <strong>Status:</strong> {booking.status}
            </div>
           
			<div className="status-buttons">
             
			  
			   <button onClick={() => cancelBooking(booking._id)}>Cancel Booking</button>
			  
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

export default AdminDashboardPage;
