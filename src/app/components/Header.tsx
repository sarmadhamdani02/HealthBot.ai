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
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import Logo from "./Logo";

const Header: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { href: "/chatscreen", label: "Chat Screen", icon: <MessageSquare className="w-5 h-5" /> },
    { href: "/doctorscreen", label: "Doctor Screen", icon: <User className="w-5 h-5" /> },
    { href: "/login", label: "Login", icon: <LogOut className="w-5 h-5" /> },
    { href: "/signup", label: "Signup", icon: <User className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser({ name: user.displayName || "Guest" });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setShowDrawer(false);
  }, [pathname]);

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
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/20 backdrop-blur-sm bg-white/30">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Menu Button */}
          <button
            id="menu-button"
            onClick={() => setShowDrawer(!showDrawer)}
            className="p-2 hover:bg-[#6366F1]/10 rounded-lg transition-colors"
          >
            {showDrawer ? (
              <ArrowLeft className="w-6 h-6 text-[#6366F1]" />
            ) : (
              <Menu className="w-6 h-6 text-[#6366F1]" />
            )}
          </button>

          {/* Logo */}
          <Logo />

          {/* Logout */}
          <button
            onClick={async () => {
              try {
                await signOut(auth);
                router.push("/login");
              } catch (error) {
                console.error("Error signing out: ", error);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#6366F1] hover:bg-[#6366F1]/10 transition-colors"
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
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-sm shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${showDrawer ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Hello, {user ? user.name : "Guest"}
            </h2>
          </div>
          <button
            onClick={() => setShowDrawer(false)}
            className="p-1 hover:bg-[#6366F1]/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#6366F1]" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-[#6366F1]/10 hover:text-[#6366F1] transition-colors ${pathname === link.href ? 'bg-[#6366F1]/10 text-[#6366F1] border-r-4 border-[#6366F1]' : ''}`}
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
          <Link
            href="/help"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-[#6366F1]/10 hover:text-[#6366F1] rounded-lg transition-colors"
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