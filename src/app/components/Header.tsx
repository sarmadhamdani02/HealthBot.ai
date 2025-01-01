"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  ArrowLeft,
  LogOut,
  MessageSquare,
  User,
  Bot,
  Home,
  Settings,
  HelpCircle,
  X
} from "lucide-react";

const Header: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { href: "/chatscreen", label: "Chat Screen", icon: <MessageSquare className="w-5 h-5" /> },
    { href: "/doctorscreen", label: "Doctor Screen", icon: <User className="w-5 h-5" /> },
    { href: "/profile", label: "Profile", icon: <Settings className="w-5 h-5" /> },
    { href: "/login", label: "Login", icon: <LogOut className="w-5 h-5" /> },
    { href: "/signup", label: "Signup", icon: <User className="w-5 h-5" /> },
    { href: "/OTP", label: "OTP Screen", icon: <MessageSquare className="w-5 h-5" /> },
  ];

  // Close sidebar when route changes
  useEffect(() => {
    setShowDrawer(false);
  }, [pathname]);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.getElementById('menu-button');
      
      if (sidebar && 
          !sidebar.contains(event.target as Node) && 
          menuButton && 
          !menuButton.contains(event.target as Node)) {
        setShowDrawer(false);
      }
    };

    if (showDrawer) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDrawer]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-sm bg-white/30">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Menu Button */}
          <button
            id="menu-button"
            onClick={() => setShowDrawer(!showDrawer)}
            className="p-2 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            {showDrawer ? (
              <ArrowLeft className="w-6 h-6 text-emerald-600" />
            ) : (
              <Menu className="w-6 h-6 text-emerald-600" />
            )}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-emerald-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              HealthBot
            </h1>
          </div>

          {/* Logout */}
          <button
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-emerald-600 hover:bg-emerald-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Overlay */}
      {showDrawer && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          showDrawer ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-emerald-600" />
            <h2 className="text-lg font-semibold text-emerald-700">Navigation</h2>
          </div>
          <button
            onClick={() => setShowDrawer(false)}
            className="p-1 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-emerald-600" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors ${
                pathname === link.href 
                  ? 'bg-emerald-50 text-emerald-600 border-r-4 border-emerald-600' 
                  : ''
              }`}
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Link
            href="/help"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Help & Support</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Header;