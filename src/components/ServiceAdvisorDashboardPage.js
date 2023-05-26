import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

import '../css/CustomerDashboardPage.css';
import logo from '../assets/logo.png';

import addbooking from '../assets/addbooking.jpg';
import viewservicecenters from '../assets/viewservicecenters.jpg';
import viewservicepackages from '../assets/viewservicepackages.jpg';

const ServiceAdvisorDashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Fetch all bookings
    axios
      .get('/api/service-advisor/bookings') // Update the API endpoint based on the actual backend routes
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);

  const handleEditBooking = (bookingId) => {
    // Redirect to the booking edit page or implement the edit functionality as needed
    // Example:
    
	history.push(`/service-advisor/bookings/${bookingId}/edit`);
  };

  return (
    <div>
      <h2>Service Advisor Dashboard</h2>
      {error && <div className="error">{error}</div>}
      <h3>All Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <p>Booking ID: {booking._id}</p>
              <p>Service: {booking.service}</p>
              <p>Status: {booking.status}</p>
              {booking.status === 'Pending' && (
                <button onClick={() => handleEditBooking(booking._id)}>Edit</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceAdvisorDashboardPage;
