"use client"

import Link from 'next/link';
import { Heart, Activity, Calendar, Users, ArrowRight, Bot, ShieldCheck, Stethoscope, AlarmCheck, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl border border-[#00DB0F] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
  >
    <div className="inline-block p-3 bg-gradient-to-br from-[#00DB0F]/10 to-[#00DB0F]/5 rounded-xl">
      <Icon className="w-6 h-6 text-[#00DB0F]" />
    </div>
    <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0FFF4] to-[#DFFFE6]">
      {/* Header */}
      <header className="container mx-auto flex justify-between items-center py-6 px-6">
        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2">
          <Bot className="w-8 h-8 text-[#00DB0F]" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00DB0F] to-[#00DB0F] bg-clip-text text-transparent">HealthBot</h1>
        </motion.div>
        <div className="space-x-4">
          <Link href="/login">
            <motion.button whileTap={{ scale: 0.9 }} className="text-[#00DB0F] border-2 border-[#00DB0F] py-2 px-6 rounded-full hover:bg-[#00DB0F] hover:text-white transition-all duration-300 font-medium">Login</motion.button>
          </Link>
          <Link href="/signup">
            <motion.button whileTap={{ scale: 0.9 }} className="text-white bg-[#00DB0F] py-2 px-6 rounded-full hover:shadow-lg hover:shadow-[#00DB0F]/50 transition-all duration-300 font-medium">Sign Up</motion.button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 mt-12 text-center">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#00DB0F] to-[#00DB0F] bg-clip-text text-transparent">Your AI Health Companion</h2>
          <p className="text-gray-600 text-xl mb-8 leading-relaxed">
            Analyze symptoms, find the best doctors, book appointments, and access emergency assistance instantly—powered by AI.
          </p>
          <Link href="/signup">
            <motion.button whileTap={{ scale: 0.9 }} className="text-white bg-[#00DB0F] py-4 px-8 rounded-full hover:shadow-lg hover:shadow-[#00DB0F]/50 transition-all duration-300 text-lg font-medium group">
              Get Started <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </Link>
        </motion.div>
      </main>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 mb-20 px-6 container mx-auto">
        <FeatureCard icon={Stethoscope} title="AI Symptom Analysis" description="Enter your symptoms, and our AI will recommend the best doctors and treatments." />
        <FeatureCard icon={Calendar} title="Appointment Booking" description="Schedule doctor visits seamlessly within seconds." />
        <FeatureCard icon={ShieldCheck} title="Emergency Assistance" description="Instantly connect with hospitals and emergency services when needed." />
        <FeatureCard icon={Users} title="Top Doctor Recommendations" description="AI-curated list of the best doctors near you, based on reviews and expertise." />
        <FeatureCard icon={LineChart} title="Personalized Health Plans" description="Get diet, exercise, and wellness recommendations based on your health data." />
        <FeatureCard icon={AlarmCheck} title="Health Alerts & Reminders" description="Receive reminders for medications, doctor visits, and health check-ups." />
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-[#00DB0F] text-center">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 flex items-center justify-center gap-1">Developed with <Heart className="w-5 h-5 text-[#00DB0F] hover:text-red-500 cursor-pointer" /> by Sarmad and Aalishaan</p>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <motion.button whileTap={{ scale: 0.9 }} className="text-[#00DB0F] border-2 border-[#00DB0F] py-2 px-6 rounded-full hover:bg-[#00DB0F] hover:text-white transition-all duration-300 font-medium">Login</motion.button>
            </Link>
            <Link href="/signup">
              <motion.button whileTap={{ scale: 0.9 }} className="text-white bg-[#00DB0F] py-2 px-6 rounded-full hover:shadow-lg hover:shadow-[#00DB0F]/50 transition-all duration-300 font-medium">Sign Up</motion.button>
            </Link>
          </div>
        </div>
        <p className="text-gray-500 mt-8">© 2025 HealthBot, All Rights Reserved.</p>
      </footer>
    </div>
  );
}
