import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../css/CustomerDashboardPage.css';
import logo from '../assets/logo.png';

import addbooking from '../assets/addbooking.jpg';
import viewservicecenters from '../assets/viewservicecenters.jpg';
import viewservicepackages from '../assets/viewservicepackages.jpg';

const CustomerDashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

 useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Check if the user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
          // Token is not available, redirect to login page
          window.location.href = '/customer/login';
          return;
        }

        // Set the JWT token in the request headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // User is authenticated, fetch bookings
        const bookingsResponse = await axios.get('http://localhost:3001/api/customer/bookings');
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchBookings();
  }, []);
  
   /*useEffect(() => {
    // Fetch bookings data from the backend
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/customer/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchBookings();
  }, []);*/
  
  const logout = async () => {
    try {
      await axios.post('http://localhost:3001/api/logout');
      // Handle successful logout
      // For example, redirect to the login page
	  
	  // Remove the JWT token from local storage
    localStorage.removeItem('token');
	
      window.location.href = '/customer/login';
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  
  
   const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/customer/bookings/${bookingId}`);
      // Booking canceled successfully, update the bookings list
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
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
	  

	
      <h2>ServiceQ : Customer Dashboard</h2>
      {error && <div className="error">{error}</div>}
	  
	  
	  
	   <div className="navigation-tiles">
        <div className="tile">
		<img src={logo} alt="addbooking" className="logo" /><br/>
          <a href="/customer/add-booking">Add Booking</a>
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
	  
      <h3>My Bookings</h3>
      {Array.isArray(bookings) ? (
        bookings.map((booking) => (
          <div key={booking.id}>
            <div className="booking-card" key={booking.id}>
            <div>
              <strong>Booking ID:</strong> {booking.id}
            </div>
            <div>
              <strong>Service:</strong> {booking.service}
            </div>
            <div>
              <strong>Date:</strong> {booking.date}
            </div>
            <div>
              <strong>Status:</strong> {booking.status}
            </div>
            <button onClick={() => cancelBooking(booking.id)}>Cancel Booking</button>
          </div>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
	  
	  
	
    </div>
  );
};

export default CustomerDashboardPage;
