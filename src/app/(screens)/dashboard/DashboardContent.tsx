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
  Bot
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
        <div className="min-h-screen bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE]">
            {/* Header */}
          <Header/>

            <main className="container mx-auto px-6  pb-16 space-y-8 pt-24">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-3xl p-8 text-white">
                    <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
                    <p className="opacity-90">You have {bookings.length} upcoming appointment{bookings.length !== 1 ? 's' : ''}</p>
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
                            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-[#6366F1]/40 transition-all">
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
                                    <button className="mt-4 flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-[#6366F1]/40 transition-all">
                                        Book Now
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Chat Section */}
                <section className="bg-gradient-to-br from-white/80 to-white/20 backdrop-blur-sm rounded-3xl border border-white/20 shadow-sm overflow-hidden">
                    <div className="border-b border-white/20 p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl">
                                <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Recent Conversations</h2>
                        </div>
                    </div>
                    <div className="p-6 space-y-3">
                        {['Medication Inquiry', 'Symptom Check', 'Diet Plan'].map((text, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-4 rounded-xl bg-white/50 hover:bg-white/90 transition-colors duration-200 border border-white/30"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-gray-700 font-medium">{text}</span>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 text-[#6366F1] hover:shadow-sm transition-all">
                                    <span className="text-sm font-medium">Continue</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="container mx-auto px-6 py-8">
                <div className="border-t border-white/20 pt-8 text-center">
                    <p className="text-gray-600">© {new Date().getFullYear()} HealthBot. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default DashboardContent;