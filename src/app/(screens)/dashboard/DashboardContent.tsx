"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from "@/lib/firebase";
import Header from '@/app/components/Header';
import DoctorAppointmentCard from '@/app/components/DoctorAppointmentCard';
import { MessageSquare, ChevronRight, Calendar } from 'lucide-react';

const doctors = [

    {
        name: 'Dr. Marnus',
        location: 'Block A, Green Street • 2.0 km',
        appointmentDate: '2024-08-14',
        time: '2:30 PM',
        phone: '+1 (555) 234-5678',
        imageUrl: 'https://via.placeholder.com/80?text=Dr2'
    },
    {
        name: 'Dr. Amad Rehman',
        location: 'Main Road, Sector 5 • 3.5 km',
        appointmentDate: '2024-08-15',
        time: '11:15 AM',
        phone: '+1 (555) 345-6789',
        imageUrl: 'https://via.placeholder.com/80?text=Dr3'
    }
];

const DashboardContent = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
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
                        {doctors.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {doctors.map((doctor, i) => (
                                    <DoctorAppointmentCard key={i} doctor={doctor} />
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