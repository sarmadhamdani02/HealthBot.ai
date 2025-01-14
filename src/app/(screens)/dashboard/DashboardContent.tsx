"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from "@/lib/firebase";
import Header from '@/app/components/Header';
import DoctorAppointmentCard from '@/app/components/DoctorAppointmentCard';
import { MessageSquare, ChevronRight, Calendar } from 'lucide-react';

// Utility function to get bookings from cookies
const getBookingsFromCookies = () => {
    if (typeof window === 'undefined') return [];

    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('bookings='));

    if (cookieValue) {
        try {
            return JSON.parse(cookieValue.split('=')[1]);
        } catch (error) {
            console.error('Error parsing bookings cookie:', error);
            return [];
        }
    }
    return [];
};

const DashboardContent = () => {
    const router = useRouter();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Get bookings from cookies when component mounts
        const cookieBookings = getBookingsFromCookies();
        console.log('Bookings from cookies:', cookieBookings);
        setBookings(cookieBookings);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
            <Header />

            <main className="container mx-auto px-4 pt-24 pb-8 space-y-8">
                {/* Appointments Section */}
                <section className="bg-white rounded-lg shadow-sm border border-emerald-100 overflow-hidden">
                    <div className="border-b border-emerald-100 p-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-emerald-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
                        </div>
                    </div>
                    <div className="p-4">
                        {bookings && bookings.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {bookings.map((booking, i) => (
                                    <DoctorAppointmentCard key={i} doctor={booking} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white/50 border-dashed border-2 border-emerald-200 rounded-lg">
                                <div className="flex flex-col items-center justify-center py-12">
                                    <Calendar className="w-12 h-12 text-emerald-400 mb-4" />
                                    <h3 className="text-xl font-medium text-gray-600 mb-2">No Upcoming Appointments</h3>
                                    <p className="text-gray-500">Schedule your next appointment with our healthcare providers</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Chat Section */}
                <section className="bg-white rounded-lg shadow-sm border border-emerald-100">
                    <div className="border-b border-emerald-100 p-4">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-6 h-6 text-emerald-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Recent Conversations</h2>
                        </div>
                    </div>
                    <div className="p-4 space-y-3">
                        {['What is computer', 'Chat1', 'Chat1'].map((text, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-gray-700 font-medium">{text}</span>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors">
                                    <span className="text-sm font-medium">Continue</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DashboardContent;