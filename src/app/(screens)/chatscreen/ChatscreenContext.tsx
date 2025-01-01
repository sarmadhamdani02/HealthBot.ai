"use client";

import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';

import {
    Menu,
    LogOut,
    Bot,
    Send,
    User,
    MessageCircle
} from 'lucide-react';

const ChatscreenContext = () => {
    const router = useRouter();
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([
        { type: 'bot', content: 'Hello! How can I help you today?' },
        { type: 'user', content: 'What are the symptoms of flu?' },
        { type: 'bot', content: 'Common flu symptoms include fever, cough, sore throat, body aches, fatigue, and headaches. Would you like me to provide more detailed information about any specific symptom?' }
    ]);

    const handleLogout = async () => {
        try {
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            await signOut(auth);
            router.push('/login');
            console.log("line after signOut");
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('firebase-session'))?.split('=')[1];

    if (!sessionCookie) {
        router.push('/');
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
            {/* Header */}
            <Header/>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="container mx-auto max-w-4xl space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 ${
                                message.type === 'user' ? 'flex-row-reverse' : ''
                            }`}
                        >
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                message.type === 'bot' 
                                    ? 'bg-gradient-to-br from-emerald-400 to-green-300' 
                                    : 'bg-gradient-to-br from-emerald-600 to-green-500'
                            }`}>
                                {message.type === 'bot' ? (
                                    <Bot className="w-5 h-5 text-white" />
                                ) : (
                                    <User className="w-5 h-5 text-white" />
                                )}
                            </div>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                message.type === 'bot'
                                    ? 'bg-white shadow-sm'
                                    : 'bg-emerald-600 text-white'
                            }`}>
                                <p className="text-sm sm:text-base">{message.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Input Section */}
            <footer className="border-t backdrop-blur-sm bg-white/30 p-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex gap-2">
                        <div className="flex-1 bg-white rounded-xl shadow-sm border border-emerald-100 flex items-center overflow-hidden">
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Enter your prompt..."
                                className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
                            />
                            <button className="p-3 hover:bg-emerald-50 transition-colors">
                                <MessageCircle className="w-6 h-6 text-emerald-600" />
                            </button>
                        </div>
                        <button className="bg-gradient-to-r from-emerald-600 to-green-500 p-3 rounded-xl shadow-sm hover:opacity-90 transition-opacity">
                            <Send className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChatscreenContext;