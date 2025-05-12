"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from "@/lib/firebase";
import {
    MessageSquare,
    ChevronRight,
    Calendar,
    User,
    LogOut,
    Plus,
    Bot,
    Sparkles
} from 'lucide-react';
import DoctorAppointmentCard from '@/app/components/DoctorAppointmentCard';
import Header from '@/app/components/Header';

const getBookingsFromLocalStorage = (token) => {
    if (typeof window === 'undefined') return [];

    const storedAppointments = localStorage.getItem(token);
    if (storedAppointments) {
        try {
            return JSON.parse(storedAppointments);
        } catch (error) {
            console.error('Error parsing appointments:', error);
            return [];
        }
    }
    return [];
};

const DashboardContent = () => {
    const router = useRouter();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('firebase-session='))?.split('=')[1];
        if (token) {
            const userBookings = getBookingsFromLocalStorage(token);
            setBookings(userBookings);
        }
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
        <div className="min-h-screen bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] relative">
            {/* Floating AI Chat Button */}
            <button 
                onClick={() => router.push('/chatscreen')}
                className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
                style={{
                    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 30%, #EC4899 70%, #F97316 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientPulse 6s ease infinite',
                }}
            >
                <div className="relative">
                    <Bot className="w-6 h-6 text-white" />
                    <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse" />
                </div>
                <span className="text-white font-semibold text-lg">Chat With HealthBot AI</span>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
            </button>

            {/* Header */}
            <Header />

            <main className="container mx-auto px-6 pb-16 space-y-8 pt-24">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10"></div>
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5"></div>
                    <h2 className="text-2xl font-bold mb-2 relative z-10">Welcome back!</h2>
                    <p className="opacity-90 relative z-10">You have {bookings.length} upcoming appointment{bookings.length !== 1 ? 's' : ''}</p>
                </div>

                {/* Appointments Section */}
                <section className="bg-gradient-to-br from-white/80 to-white/20 backdrop-blur-sm rounded-3xl border border-white/20 shadow-sm overflow-hidden">
                    <div className="border-b border-white/20 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl">
                                    <Calendar className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                            </div>
                            <button 
                            onClick={() => router.push('/doctorscreen')}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-[#6366F1]/40 transition-all">
                                <Plus className="w-4 h-4" />
                                New Appointment
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        {bookings.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {bookings.map((booking, i) => (
                                    <DoctorAppointmentCard key={i} doctor={booking} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white/50 border-dashed border-2 border-[#6366F1]/20 rounded-xl">
                                <div className="flex flex-col items-center justify-center py-12">
                                    <Calendar className="w-12 h-12 text-[#8B5CF6] mb-4" />
                                    <h3 className="text-xl font-medium text-gray-700 mb-2">No Upcoming Appointments</h3>
                                    <p className="text-gray-500 max-w-md text-center">Schedule your next appointment with our healthcare providers</p>
                                    <button
                                        onClick={() => router.push('/doctorscreen')}
                                        className="mt-4 flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-[#6366F1]/40 transition-all">
                                        Book Now
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="container mx-auto px-6 py-8">
                <div className="border-t border-white/20 pt-8 text-center">
                    <p className="text-gray-600">© {new Date().getFullYear()} HealthBot. All rights reserved.</p>
                </div>
            </footer>

            {/* Add the animation style */}
            <style jsx>{`
                @keyframes gradientPulse {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
};

export default DashboardContent;