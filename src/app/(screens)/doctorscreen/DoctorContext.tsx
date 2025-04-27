"use client";

import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import { Calendar as CalendarIcon, X, Star, MapPin, Clock, Search } from "lucide-react";

// Function to get Firebase token and bookings from cookies
const getBookingsFromCookies = () => {
  const cookie = document.cookie.split("; ").find(row => row.startsWith("firebase-session="));
  const token = cookie ? cookie.split("=")[1] : null;
  if (!token) return [];

  const bookings = localStorage.getItem(token); // Use token as the key in localStorage
  return bookings ? JSON.parse(bookings) : [];
};

// Function to save bookings to localStorage with the Firebase token as the key
const saveBookingsToStorage = (bookings) => {
  const cookie = document.cookie.split("; ").find(row => row.startsWith("firebase-session="));
  const token = cookie ? cookie.split("=")[1] : null;
  if (token) {
    console.log("Saving appointments for user token:", token);
    localStorage.setItem(token, JSON.stringify(bookings)); // Save bookings with token as the key
  } else {
    console.log("No user token found in cookies.");
  }
};

// Custom Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
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
      document.cookie = "firebase-session=; Max-Age=0; path=/"; // Clear the cookie on logout
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
    console.log("Booking appointment for:", doctor.name);
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
      console.log("Current bookings from storage:", currentBookings);

      // Add new booking to the array
      const updatedBookings = [...currentBookings, newBooking];
      console.log("Updated bookings:", updatedBookings);

      // Save updated bookings to localStorage
      saveBookingsToStorage(updatedBookings);

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctors, specializations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm"
            />
          </div>

          <h2 className="text-purple-700 font-semibold text-lg mt-8 mb-4 flex items-center gap-2">
            Nearby Doctors
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-2xl mx-auto space-y-4">
          {doctors.map((doctor, i) => (
            <div
              key={i}
              className="bg-white text-black rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-purple-200"
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-blue-300 p-1 flex-shrink-0">
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
                        <p className="text-purple-600 text-sm">{doctor.specialization}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <button
                        onClick={() => handleBookAppointment(doctor)}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
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
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Book an Appointment with {selectedDoctor?.name}
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-2 rounded-lg border border-gray-300"
                value={appointmentDetails.name}
                onChange={(e) =>
                  setAppointmentDetails({ ...appointmentDetails, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Your Phone Number"
                className="px-4 py-2 rounded-lg border border-gray-300 text-purple-500"
                value={appointmentDetails.phone}
                onChange={(e) =>
                  setAppointmentDetails({ ...appointmentDetails, phone: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 rounded-lg border border-gray-300 text-purple-500"
                value={appointmentDetails.email}
                onChange={(e) =>
                  setAppointmentDetails({ ...appointmentDetails, email: e.target.value })
                }
              />
              <input
                type="date"
                className="px-4 py-2 rounded-lg border border-gray-300 text-purple-500"
                value={appointmentDetails.date}
                onChange={(e) =>
                  setAppointmentDetails({ ...appointmentDetails, date: e.target.value })
                }
              />
              <input
                type="time"
                className="px-4 py-2 rounded-lg border border-gray-300 text-purple-500"
                value={appointmentDetails.time}
                onChange={(e) =>
                  setAppointmentDetails({ ...appointmentDetails, time: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleConfirmAppointment}
                className="mt-4 px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DoctorContext;
