"use client"

import React, { useState } from 'react';
import DoctorContext from '../doctorscreen/DoctorContext';
import DashboardContent from './DashboardContent';

const Dashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [showDoctorContext, setShowDoctorContext] = useState(false);

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
                    bookings={bookings} 
                    onBookAppointment={() => setShowDoctorContext(true)}
                />
            )}
        </div>
    );
};

export default Dashboard;