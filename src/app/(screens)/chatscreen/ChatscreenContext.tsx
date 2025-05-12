"use client";

import React, { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/app/components/Header";
import { Bot, ArrowUp, User, Mic, LoaderCircle, Stethoscope, Sparkles, Lightbulb, Sparkle, ClipboardPlus, Volume2, X } from "lucide-react";

const ChatscreenContext = () => {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [doctorList, setDoctorList] = useState([]);

    const [isSpeaking, setIsSpeaking] = useState(false);
    const [currentSpeechId, setCurrentSpeechId] = useState<number | null>(null);

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

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleLogout = async () => {
        try {
            document.cookie.split(";").forEach((c) => {
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    const sessionCookie = document.cookie.split("; ").find((row) => row.startsWith("firebase-session"))?.split("=")[1];
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: prompt }),
            });
            const data = await response.json();

            const botMessage = {
                type: "bot",
                content: data.answer,
                symptoms: data.symptoms || [],
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Error sending message: ", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: "bot", content: "Sorry, I encountered an error. Please try again.", symptoms: [] },
            ]);
        }

        setPromptLoading(false);
    };

    // Add this function to your component
    const speakMessage = (text: string) => {
        if ('speechSynthesis' in window) {
            setIsSpeaking(true);
            const utterance = new SpeechSynthesisUtterance(text);
            const speechId = Date.now();
            setCurrentSpeechId(speechId);

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => {
                if (currentSpeechId === speechId) {
                    setIsSpeaking(false);
                }
            };
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
    };

    // Add cleanup
    useEffect(() => {
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const showDoctorRecommendation = async () => {
        setShowModal(true);
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:5000/scrape", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    city: "attock", // make dynamic if needed
                    doctor: "general-physician"
                })
            });
            const data = await res.json();
            setDoctorList(data);
            setDoctorList(data.slice(0, 6));
        } catch (err) {
            console.error("Error fetching doctors:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE]">


            <Header />
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 relative">
                        <button
                            className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>

                        <h2 className="text-lg font-semibold mb-4 text-center text-indigo-600 flex items-center justify-center">
                            <ClipboardPlus /> Recommended Doctors nearby
                        </h2>

                        {isLoading ? (
                            <div className="text-center py-10 text-indigo-500 flex items-center justify-center">
                                <p className="  text-indigo-500 flex items-center justify-center"> Finding Best Doctors for you <Sparkle className=" animate-spin ml-3" /></p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {doctorList.map((doc, index) => (
                                    <a
                                        href={doc.profileLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={index}
                                        className="border rounded-lg p-4 flex gap-3 hover:shadow-md transition"
                                    >
                                        {doc.image ? (
                                            <img
                                                src={doc.image}
                                                alt={doc.name}
                                                className="w-16 h-16 object-cover rounded-full"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                                                N/A
                                            </div>
                                        )}

                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm text-gray-800">{doc.name}</h3>
                                            <p className="text-xs text-gray-500">{doc.speciality}</p>
                                            <p className="text-xs text-gray-400">{doc.experience}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <main className="flex-1 overflow-y-auto p-4 pt-10 pb-24 mt-12">
                <div className="container mx-auto max-w-4xl space-y-4">
                    <AnimatePresence initial={false}>
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className={`flex items-start gap-3 ${message.type === "user" ? "justify-end" : ""}`}
                            >
                                {message.type === "bot" && (
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-md">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                )}


                                {message.type === "bot" && (
                                    <div className="flex items-center gap-2 text-xs text-[#6366F1] font-medium mt-3">
                                        <button
                                            onClick={() => {
                                                if (isSpeaking) {
                                                    window.speechSynthesis.cancel();
                                                    setIsSpeaking(false);
                                                } else {
                                                    speakMessage(message.content);
                                                }
                                            }}
                                            className="p-1 hover:bg-[#6366F1]/10 rounded-full"
                                            aria-label={isSpeaking ? "Stop speaking" : "Read aloud"}
                                        >
                                            {isSpeaking ? (
                                                <X className="w-4 h-4" />
                                            ) : (
                                                <Volume2 className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                )}

                                <motion.div
                                    className={`max-w-[85%] rounded-2xl px-4 py-3 relative ${message.type === "bot"
                                        ? "bg-white shadow-md text-gray-800 border border-white/30"
                                        : "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white"
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {message.type === "bot" && index === 0 && (
                                        <div className="absolute -top-2 -right-2">
                                            <div className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full border border-white/30 shadow-sm sticky">
                                                <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
                                                <span className="text-xs font-medium bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                                                    AI Assistant
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
                                            h2: ({ children }) => <h2 className="text-lg font-semibold mb-2">{children}</h2>,
                                            h3: ({ children }) => <h3 className="text-md font-medium mb-2">{children}</h3>,
                                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                            em: ({ children }) => <em className="italic">{children}</em>,
                                            p: ({ children }) => <p className="text-sm mb-2 last:mb-0">{children}</p>,
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
                                        <div className="mt-3 pt-2 border-t border-gray-200">



                                            <div className="flex items-center gap-2 text-xs text-[#6366F1] font-medium mt-3">
                                                <Stethoscope className="w-4 h-4" />
                                                <span>Identified symptoms</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {message.symptoms.map((symptom, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-1 bg-[#6366F1]/10 text-[#6366F1] rounded-full text-xs"
                                                    >
                                                        {symptom}
                                                    </span>
                                                ))}
                                            </div>

                                        </div>
                                    )}

                                    {message.type === "bot" && index !== 0 && (
                                        <div className="mt-3 pt-2 border-t border-gray-200">

                                            <button className=" cursor-pointer" onClick={() => { showDoctorRecommendation() }}>
                                                <div className="flex items-center gap-2 text-xs text-[#6366F1] font-medium hover:underline">
                                                    <Lightbulb className="w-4 h-4 mr-3" />
                                                    <span>Recommend Doctors?</span>
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </motion.div>

                                {message.type === "user" && (
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-md">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 border-t backdrop-blur-sm bg-white/70 p-4 shadow-md">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        className="flex gap-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex-1 bg-white rounded-xl shadow-md border border-[#6366F1]/20 flex items-center overflow-hidden">
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
                                className="p-3 hover:bg-[#6366F1]/10 transition-colors"
                            >
                                <Mic className="w-5 h-5 text-[#6366F1]" />
                            </motion.button>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={ArrowUpMessage}
                            disabled={promptLoading || !prompt.trim()}
                            className={`p-3 rounded-xl shadow-md transition-all ${promptLoading || !prompt.trim()
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] hover:shadow-[#6366F1]/40"}`}
                        >
                            {promptLoading ? (
                                <Sparkle className="w-5 h-5 text-white animate-spin" />
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