import Link from 'next/link';
import { Heart, Activity, Calendar, Users, ArrowRight, Bot } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[#00DB0F] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className="inline-block p-3 bg-gradient-to-br from-[#00DB0F]/10 to-[#00DB0F]/5 rounded-xl">
      <Icon className="w-6 h-6 text-[#00DB0F]" />
    </div>
    <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white"> {/* Ensure background is white */}
      {/* Header */}
      <header className="container mx-auto flex justify-between items-center py-6 px-6">
        <div className="flex items-center gap-2">
          <Bot className="w-8 h-8 text-[#00DB0F]" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00DB0F] to-[#00DB0F] bg-clip-text text-transparent">
            HealthBot
          </h1>
        </div>
        <div className="space-x-4">
          <Link href="/login">
            <button className="text-[#00DB0F] border-2 border-[#00DB0F] py-2 px-6 rounded-full hover:bg-[#00DB0F] hover:text-white transition-all duration-300 font-medium">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="text-white bg-gradient-to-r from-[#00DB0F] to-[#00DB0F] py-2 px-6 rounded-full hover:shadow-lg hover:shadow-[#00DB0F]/50 transition-all duration-300 font-medium">
              Sign Up
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 mt-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#00DB0F] to-[#00DB0F] bg-clip-text text-transparent">
            Your Personal Health Assistant
          </h2>
          <p className="text-gray-600 text-xl mb-8 leading-relaxed">
            HealthBot helps you stay on top of your health by connecting you with nearby doctors, 
            tracking your health metrics, and offering personalized health tips — all in one place.
          </p>
          <Link href="/signup">
            <button className="text-white bg-gradient-to-r from-[#00DB0F] to-[#00DB0F] py-4 px-8 rounded-full hover:shadow-lg hover:shadow-[#00DB0F]/50 transition-all duration-300 text-lg font-medium group">
              Get Started 
              <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 mb-20">
          <FeatureCard 
            icon={Calendar}
            title="Easy Scheduling"
            description="Book appointments with top healthcare providers in your area with just a few clicks."
          />
          <FeatureCard 
            icon={Activity}
            title="Health Tracking"
            description="Monitor your vital signs and health metrics with our intuitive dashboard."
          />
          <FeatureCard 
            icon={Users}
            title="Expert Network"
            description="Access a vast network of verified healthcare professionals and specialists."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-[#00DB0F]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#00DB0F]" />
            <p className="text-gray-600">Developed with By Sarmad and Aalishaan</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="text-[#00DB0F] border-2 border-[#00DB0F] py-2 px-6 rounded-full hover:bg-[#00DB0F] hover:text-white transition-all duration-300 font-medium">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="text-white bg-gradient-to-r from-[#00DB0F] to-[#00DB0F] py-2 px-6 rounded-full hover:shadow-lg hover:shadow-[#00DB0F]/50 transition-all duration-300 font-medium">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-500">© 2024 HealthBot, All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
