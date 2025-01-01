"use client"

import React, { useState } from 'react';
import { signOut } from 'firebase/auth'; 
import { auth } from "@/lib/firebase"; 
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';

import {
    Menu,
    LogOut,
    Bot,
    MapPin,
    Search,
    Star,
    Phone,
    Calendar,
    MessageSquare
} from 'lucide-react';

const DoctorContext = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

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
    }

    const doctors = [
        {
            name: "Dr. Kamlesh",
            address: "street no 1 z colony",
            rating: 5,
            distance: "1.5km",
            specialization: "Cardiologist",
            available: "Today, 2:00 PM",
        },
        {
            name: "Dr. Sarah Smith",
            address: "Medical Center, Block B",
            rating: 4,
            distance: "2.3km",
            specialization: "Pediatrician",
            available: "Today, 4:30 PM",
        },
        {
            name: "Dr. John Davis",
            address: "Healthcare Hub, Sector 7",
            rating: 5,
            distance: "3.1km",
            specialization: "Neurologist",
            available: "Tomorrow, 10:00 AM",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
            {/* Header */}
            <Header/>

            {/* Search Section */}
            <div className="container mx-auto px-4 py-6">
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search doctors, specializations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 pl-12 rounded-xl border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white/80 backdrop-blur-sm"
                        />
                        <Search className="w-5 h-5 text-emerald-500 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    </div>
                    
                    <h2 className="text-emerald-700 font-semibold text-lg mt-8 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Nearby Doctors
                    </h2>
                </div>
            </div>

            {/* Doctor Cards */}
            <div className="container mx-auto px-4 pb-8">
                <div className="max-w-2xl mx-auto space-y-4">
                    {doctors.map((doctor, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-emerald-100">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-emerald-400 to-green-300 p-1 flex-shrink-0">
                                        <img
                                            src="https://via.placeholder.com/80"
                                            alt={doctor.name}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-800">{doctor.name}</h2>
                                                <p className="text-emerald-600 text-sm">{doctor.specialization}</p>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                <span>{doctor.distance}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-2 flex items-center text-sm text-gray-600">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            <span>{doctor.address}</span>
                                        </div>
                                        
                                        <div className="mt-2 flex items-center gap-1">
                                            {Array(doctor.rating).fill(null).map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                                            ))}
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                <span>{doctor.available}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors">
                                                    <Phone className="w-4 h-4" />
                                                    <span>Call</span>
                                                </button>
                                                <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                                                    <MessageSquare className="w-4 h-4" />
                                                    <span>Chat</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorContext;