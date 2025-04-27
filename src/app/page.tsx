'use client';

import Link from 'next/link';
import { 
  Heart, 
  Activity, 
  Calendar, 
  Users, 
  ArrowRight, 
  Bot, 
  Stethoscope, 
  Pulse, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import React from 'react';
import Logo from './components/logo';

// Define the icon components map to ensure they're always available
const iconComponents = {
  Heart,
  Activity,
  Calendar,
  Users,
  ArrowRight,
  Bot,
  Stethoscope,
  Pulse,
  ShieldCheck,
  Sparkles
};

interface FeatureCardProps {
  icon: keyof typeof iconComponents;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  const IconComponent = iconComponents[icon];
  
  if (!IconComponent) {
    console.error(`Icon "${icon}" not found`);
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-white/80 to-white/20 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:bg-white/90 group">
      <div className="inline-block p-4 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-2xl group-hover:rotate-6 transition-transform duration-300">
        <IconComponent className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE]">
      {/* Header */}
      <header className="container mx-auto flex justify-between items-center py-8 px-6">
        <Logo/>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className="text-[#6366F1] font-medium hover:text-[#8B5CF6] transition-colors duration-300">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] py-2.5 px-6 rounded-full hover:shadow-lg hover:shadow-[#6366F1]/40 transition-all duration-300 font-medium hover:from-[#7173f0] hover:to-[#9a6cf6]">
              Sign Up
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 mt-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white mb-6">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            <span className="text-sm font-medium bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              Revolutionizing Healthcare
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">
            AI-Powered <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">Health Assistant</span> 
            <br />For Everyone
          </h2>
          <p className="text-gray-700 text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
            HealthBot combines artificial intelligence with medical expertise to provide personalized health guidance, connect you with doctors, and help you achieve your wellness goals.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <button className="text-white bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] py-4 px-10 rounded-full hover:shadow-lg hover:shadow-[#6366F1]/40 transition-all duration-300 text-lg font-medium group flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
            <Link href="/login">
              <button className="text-[#6366F1] border-2 border-[#6366F1]/40 py-4 px-8 rounded-full hover:bg-[#6366F1]/5 transition-all duration-300 text-lg font-medium">
                See Demo
              </button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-28 mb-28">
          <FeatureCard 
            icon="Calendar"
            title="Smart Scheduling"
            description="AI-powered appointment booking that finds the perfect time for you and your doctor."
          />
          <FeatureCard 
            icon="Pulse"
            title="Health Insights"
            description="Advanced analytics and tracking for all your health metrics in one dashboard."
          />
          <FeatureCard 
            icon="Stethoscope"
            title="Doctor Network"
            description="Access to thousands of verified healthcare professionals across all specialties."
          />
          <FeatureCard 
            icon="Activity"
            title="Wellness Plans"
            description="Personalized health plans tailored to your specific needs and goals."
          />
          <FeatureCard 
            icon="ShieldCheck"
            title="Privacy First"
            description="Military-grade encryption to keep your health data completely secure."
          />
          <FeatureCard 
            icon="Users"
            title="Family Care"
            description="Manage health profiles for your entire family from one account."
          />
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-3xl p-12 text-center mb-28">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to take control of your health?</h3>
          <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of users who are already improving their health with HealthBot's smart assistance.
          </p>
          <Link href="/signup">
            <button className="text-[#6366F1] bg-white py-4 px-10 rounded-full hover:shadow-lg hover:bg-white/95 transition-all duration-300 text-lg font-medium group flex items-center gap-2 mx-auto">
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-700">Developed with <Heart className="w-4 h-4 inline text-[#8B5CF6]" /> by Sarmad and Aalishaan</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact Us</Link>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-gray-600">© {new Date().getFullYear()} HealthBot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}