"use client"

import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import { Calendar as CalendarIcon, MapPin, Search, Star, Calendar, Clock, X } from 'lucide-react';

// Cookie management functions
const getBookingsFromCookies = () => {
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

const saveBookingsToCookies = (bookings) => {
    document.cookie = `bookings=${JSON.stringify(bookings)}; path=/; max-age=86400`; // Expires in 24 hours
    console.log('Updated bookings in cookies:', bookings);
    console.log('Current cookies:', document.cookie);
};

// Custom Modal Component
const Modal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                    {children}
                </div>
            </div>
        </div>
    );
};

const DoctorContext = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState({
        date: '',
        time: '',
        name: '',
        phone: '',
        email: '',
    });

    const doctors = [
        {
            name: "Dr. Ayesha Khan",
            address: "City Clinic, Main Street",
            rating: 4.8,
            distance: "1.2km",
            specialization: "Dermatologist",
            available: "Today, 3:00 PM",
        },
        {
            name: "Dr. Zafar Malik",
            address: "Modern Health Center, Block C",
            rating: 4.5,
            distance: "2.0km",
            specialization: "Orthopedic Surgeon",
            available: "Tomorrow, 11:00 AM",
        },
        {
            name: "Dr. Maria Ahmed",
            address: "Prime Medical Complex, Street 5",
            rating: 5,
            distance: "1.8km",
            specialization: "Gynecologist",
            available: "Today, 5:00 PM",
        },
        {
            name: "Dr. Ahmed Raza",
            address: "Healing Hands Hospital, Sector B",
            rating: 4.7,
            distance: "3.5km",
            specialization: "Cardiologist",
            available: "Tomorrow, 9:00 AM",
        },
        {
            name: "Dr. Sofia Iqbal",
            address: "Wellness Clinic, Green Avenue",
            rating: 4.9,
            distance: "2.8km",
            specialization: "Pediatrician",
            available: "Today, 1:00 PM",
        },
        {
            name: "Dr. Usman Tariq",
            address: "Care Medical Center, Plaza Road",
            rating: 4.6,
            distance: "1.5km",
            specialization: "Dentist",
            available: "Tomorrow, 2:30 PM",
        },
        {
            name: "Dr. Farah Ali",
            address: "Sunshine Hospital, Old City",
            rating: 4.7,
            distance: "4.0km",
            specialization: "Neurologist",
            available: "Today, 4:30 PM",
        },
        {
            name: "Dr. Saeed Hassan",
            address: "City Health Clinic, Blue Block",
            rating: 4.8,
            distance: "1.0km",
            specialization: "ENT Specialist",
            available: "Tomorrow, 12:00 PM",
        },
        {
            name: "Dr. Samina Shah",
            address: "Health Plus Hospital, Park Lane",
            rating: 5,
            distance: "3.0km",
            specialization: "Endocrinologist",
            available: "Today, 6:00 PM",
        },
        {
            name: "Dr. Khalid Mehmood",
            address: "LifeCare Hospital, Downtown",
            rating: 4.6,
            distance: "2.3km",
            specialization: "Urologist",
            available: "Tomorrow, 10:00 AM",
        },
    ];
    

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

    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleConfirmAppointment = () => {
        if (
            !appointmentDetails.name ||
            !appointmentDetails.date ||
            !appointmentDetails.time ||
            !appointmentDetails.phone ||
            !appointmentDetails.email
        ) {
            alert("Please fill in all the fields before booking.");
            return;
        }
    
        try {
            const selectedDate = new Date(appointmentDetails.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison
    
            // Check if the selected date is in the past or today
            if (selectedDate <= today) {
                alert("Please select a valid date (the date should be tomorrow or later).");
                return;
            }
    
            const newBooking = {
                ...appointmentDetails,
                doctorName: selectedDoctor?.name || "Unknown Doctor",
                specialization: selectedDoctor?.specialization || "Unknown Specialization",
            };
    
            // Get current bookings from cookies
            const currentBookings = getBookingsFromCookies();
            
            // Add new booking to the array
            const updatedBookings = [...currentBookings, newBooking];
            
            // Save updated bookings to cookies
            saveBookingsToCookies(updatedBookings);
    
            setIsModalOpen(false);
            setAppointmentDetails({
                name: "",
                date: "",
                time: "",
                phone: "",
                email: "",
            });
    
            alert("Appointment booked successfully!");
        } catch (error) {
            console.error("Error in handleConfirmAppointment:", error);
            alert("There was an error booking the appointment. Please try again.");
        }
    };
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
            <Header />

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

            <div className="container mx-auto px-4 pb-8">
                <div className="max-w-2xl mx-auto space-y-4">
                    {doctors.map((doctor, i) => (
                        <div key={i} className="bg-white text-black rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-emerald-100">
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
                                            {Array(Math.floor(doctor.rating)).fill(null).map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                                            ))}
                                            {doctor.rating % 1 !== 0 && (
                                                <Star className="w-4 h-4 fill-current text-yellow-400 opacity-50" />
                                            )}
                                        </div>

                                        <div className="mt-4 flex justify-between items-center">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                <span>{doctor.available}</span>
                                            </div>
                                            <button
                                                onClick={() => handleBookAppointment(doctor)}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                                            >
                                                <CalendarIcon className="w-4 h-4" />
                                                <span>Book Appointment</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="relative">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Book an Appointment with {selectedDoctor?.name}</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    value={appointmentDetails.name}
                                    onChange={(e) => setAppointmentDetails({ ...appointmentDetails, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600">Phone Number</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
                                    value={appointmentDetails.phone}
                                    onChange={(e) => setAppointmentDetails({ ...appointmentDetails, phone: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
                                    value={appointmentDetails.email}
                                    onChange={(e) => setAppointmentDetails({ ...appointmentDetails, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600">Appointment Date</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
                                    value={appointmentDetails.date}
                                    onChange={(e) => setAppointmentDetails({ ...appointmentDetails, date: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600">Appointment Time</label>
                                <input
                                    type="time"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700"
                                    value={appointmentDetails.time}
                                    onChange={(e) => setAppointmentDetails({ ...appointmentDetails, time: e.target.value })}
                                />
                            </div>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleConfirmAppointment}
                                    className="w-full px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                                >
                                    Confirm Appointment
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default DoctorContext;