"use client";

import React, { useState, useEffect } from 'react';
import DoctorContext from '../doctorscreen/DoctorContext';
import DashboardContent from './DashboardContent';

const Dashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [showDoctorContext, setShowDoctorContext] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('firebase-session'); // Retrieve the token from cookies/localStorage
        setToken(storedToken);
    }, []);

    const handleUpdateBookings = (newBooking) => {
        setBookings(prev => [...prev, newBooking]);
    };

    const toggleDoctorContext = () => {
        setShowDoctorContext(!showDoctorContext);
    };

    return (
        <div>
            {showDoctorContext ? (
                <DoctorContext 
                    bookings={bookings} 
                    setBookings={handleUpdateBookings}
                    onClose={() => setShowDoctorContext(false)}
                />
            ) : (
                <DashboardContent 
                    token={token}  // Pass token to DashboardContent
                    bookings={bookings} 
                    onBookAppointment={() => setShowDoctorContext(true)}
                />
            )}
        </div>
    );
};

export default Dashboard;
