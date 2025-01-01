import React from 'react';
import { MapPin, Calendar, Clock, Phone, ArrowRight } from 'lucide-react';

interface Doctor {
  name: string;
  imageUrl: string;
  appointmentDate: string;
  time?: string;
  location: string;
  phone?: string;
}

interface DoctorAppointmentCardProps {
  doctor: Doctor;
}

const DoctorAppointmentCard: React.FC<DoctorAppointmentCardProps> = ({ doctor }) => {
  const appointmentDate = new Date(doctor.appointmentDate);
  const formattedDate = appointmentDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  });

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100/50">
      <div className="relative p-6">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-50 to-transparent rounded-tr-2xl" />
        
        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Doctor Image Section */}
          <div className="flex-shrink-0">
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-grow space-y-4">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">
                  {doctor.name}
                </h3>
                <div className="flex gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                    Upcoming
                  </span>
                </div>
              </div>
              <button
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 transition-all duration-300 text-sm font-medium group/btn"
                onClick={() => console.log('Reschedule clicked')}
              >
                <span>Reschedule</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center px-4 py-3 rounded-xl bg-gray-50 hover:bg-emerald-50/50 transition-colors">
                <Calendar className="w-5 h-5 text-emerald-600 mr-3" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Date</p>
                  <p className="text-sm text-gray-700">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-center px-4 py-3 rounded-xl bg-gray-50 hover:bg-emerald-50/50 transition-colors">
                <Clock className="w-5 h-5 text-emerald-600 mr-3" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Time</p>
                  <p className="text-sm text-gray-700">{doctor.time || '10:00 AM'}</p>
                </div>
              </div>
              <div className="flex items-center px-4 py-3 rounded-xl bg-gray-50 hover:bg-emerald-50/50 transition-colors">
                <MapPin className="w-5 h-5 text-emerald-600 mr-3" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Location</p>
                  <p className="text-sm text-gray-700">{doctor.location}</p>
                </div>
              </div>
              <div className="flex items-center px-4 py-3 rounded-xl bg-gray-50 hover:bg-emerald-50/50 transition-colors">
                <Phone className="w-5 h-5 text-emerald-600 mr-3" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Phone</p>
                  <p className="text-sm text-gray-700">{doctor.phone || '+1 (555) 000-0000'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentCard;