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

  useEffect(() => {
    // Fetch all bookings
    axios
      .get('/api/admin/bookings') // Update the API endpoint based on the actual backend routes
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);

  const handleApproveBooking = (bookingId) => {
    axios
      .patch(`/api/admin/bookings/${bookingId}`, { status: 'Approved' }) // Update the API endpoint based on the actual backend routes
      .then(() => {
        // Handle successful booking approval
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId ? { ...booking, status: 'Approved' } : booking
          )
        );
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const handleRejectBooking = (bookingId) => {
    axios
      .patch(`/api/admin/bookings/${bookingId}`, { status: 'Rejected' }) // Update the API endpoint based on the actual backend routes
      .then(() => {
        // Handle successful booking rejection
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId ? { ...booking, status: 'Rejected' } : booking
          )
        );
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
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
                <div>
                  <button onClick={() => handleApproveBooking(booking._id)}>Approve</button>
                  <button onClick={() => handleRejectBooking(booking._id)}>Reject</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboardPage;
