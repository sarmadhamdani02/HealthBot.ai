"use client";

import React, { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/app/components/Header";
import { Bot, ArrowUp, User, Mic, LoaderCircle, Plus, Stethoscope } from "lucide-react";

const ChatscreenContext = () => {
    const router = useRouter();
    const [prompt, setPrompt] = useState("");
    const [promptLoading, setPromptLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: "bot",
            content: "Hello! I'm your HealthBot assistant. How can I help you today?",
            symptoms: []
        },
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleLogout = async () => {
        try {
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    const sessionCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("firebase-session"))
        ?.split("=")[1];
    if (!sessionCookie) {
        router.push("/");
        return null;
    }

    const ArrowUpMessage = async () => {
        if (!prompt.trim() || promptLoading) return;

        const userMessage = { type: "user", content: prompt, symptoms: [] };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setPrompt("");
        setPromptLoading(true);

        try {
            const response = await fetch("http://localhost:5000/healthbot_chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: prompt }),
            });
            const data = await response.json();

            const botMessage = {
                type: "bot",
                content: data.answer,
                symptoms: data.symptoms || []
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Error sending message: ", error);
            setMessages((prevMessages) => [...prevMessages, {
                type: "bot",
                content: "Sorry, I encountered an error. Please try again.",
                symptoms: []
            }]);
        }

        setPromptLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
            <Header />

            {/* Main chat area */}
            <main className="flex-1 overflow-y-auto p-4 pb-24 mt-12 ">
                <div className="container mx-auto max-w-4xl space-y-4">
                    <AnimatePresence initial={false}>
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className={`flex items-start gap-3 ${message.type === "user" ? "justify-end" : ""}`}
                            >
                                {message.type === "bot" && (
                                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-green-300 flex items-center justify-center shadow-sm">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                )}

                                <motion.div
                                    className={`max-w-[85%] rounded-2xl px-4 py-3 relative ${message.type === "bot"
                                        ? "bg-white shadow-sm text-gray-800"
                                        : "bg-gradient-to-r from-emerald-600 to-green-500 text-white"
                                        }`}
                                    whileHover={{ scale: 1.01 }}
                                >
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h1: ({ children }) => <h1 className="text-2xl font-bold mb-2">{children}</h1>,
                                            h2: ({ children }) => <h2 className="text-xl font-semibold mb-2">{children}</h2>,
                                            h3: ({ children }) => <h3 className="text-lg font-medium mb-2">{children}</h3>,
                                            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                                            em: ({ children }) => <em className="italic">{children}</em>,
                                            p: ({ children }) => <p className="text-sm sm:text-base mb-2 last:mb-0">{children}</p>,
                                            ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-2">{children}</ul>,
                                            ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-2">{children}</ol>,
                                            li: ({ children }) => <li className="ml-4">{children}</li>,
                                            code: ({ children }) => (
                                                <code className="bg-gray-100 p-1 rounded text-sm font-mono">
                                                    {children}
                                                </code>
                                            ),
                                        }}
                                    >
                                        {message.content}
                                    </ReactMarkdown>

                                    {message.type === "bot" && message.symptoms.length > 0 && (
                                        <div className="mt-3 pt-2 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
                                                <Stethoscope className="w-3 h-3" />
                                                <span>Identified symptoms</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {message.symptoms.map((symptom, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs"
                                                    >
                                                        {symptom}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>

                                {message.type === "user" && (
                                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-emerald-600 to-green-500 flex items-center justify-center shadow-sm">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input area */}
            <footer className="fixed bottom-0 left-0 right-0 border-t backdrop-blur-sm bg-white/70 p-4 shadow-sm">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        className="flex gap-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex-1 bg-white rounded-xl shadow-sm border border-emerald-100 flex items-center overflow-hidden">
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && ArrowUpMessage()}
                                placeholder="Describe your symptoms or ask a health question..."
                                className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
                                disabled={promptLoading}
                            />
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                                className="p-3 hover:bg-emerald-50 transition-colors"
                            >
                                <Mic className="w-5 h-5 text-green-500" />
                            </motion.button>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={ArrowUpMessage}
                            disabled={promptLoading || !prompt.trim()}
                            className={`p-3 rounded-xl shadow-sm transition-all ${promptLoading || !prompt.trim()
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-gradient-to-br from-emerald-500 to-green-400 hover:shadow-md"}`}
                        >
                            {promptLoading ? (
                                <LoaderCircle className="w-5 h-5 text-white animate-spin" />
                            ) : (
                                <ArrowUp className="w-5 h-5 text-white" />
                            )}
                        </motion.button>
                    </motion.div>

                    <div className="flex justify-center mt-2">
                        <p className="text-xs text-gray-500">
                            HealthBot provides general health information only. Always consult a doctor.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChatscreenContext;