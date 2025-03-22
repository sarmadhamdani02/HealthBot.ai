"use client";

import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/app/components/Header";
import { Bot, ArrowUp, User, Mic } from "lucide-react";

const ChatscreenContext = () => {
    const router = useRouter();
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([
        { type: "bot", content: "Hello! How can I help you today?", symptoms: [] },
    ]);

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
        if (!prompt.trim()) return;

        const userMessage = { type: "user", content: prompt };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setPrompt("");

        try {
            const response = await fetch("http://localhost:5000/healthbot_chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: prompt }),
            });
            const data = await response.json();

            const botMessage = { type: "bot", content: data.answer, symptoms: data.symptoms || [] };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Error ArrowUping message: ", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-16">
            <Header />
            <div className="flex-1 overflow-y-auto p-4">
                <div className="container mx-auto max-w-4xl space-y-4">
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: message.type === "user" ? 50 : -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex items-start gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                        >
                            <div
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.type === "bot"
                                    ? "bg-gradient-to-br from-emerald-400 to-green-300"
                                    : "bg-gradient-to-br from-emerald-600 to-green-500"
                                    }`}
                            >
                                {message.type === "bot" ? (
                                    <Bot className="w-5 h-5 text-white" />
                                ) : (
                                    <User className="w-5 h-5 text-white" />
                                )}
                            </div>

                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.type === "bot"
                                    ? "bg-white shadow-sm text-emerald-800"
                                    : "bg-emerald-600 text-white"
                                    }`}
                            >
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-xl font-semibold">{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-lg font-medium">{children}</h3>,
                                        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                                        em: ({ children }) => <em className="italic">{children}</em>,
                                        p: ({ children }) => <p className="text-sm sm:text-base">{children}</p>,
                                        ul: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
                                        ol: ({ children }) => <ol className="list-decimal list-inside">{children}</ol>,
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
                                    <div className="mt-2 text-sm text-gray-600">
                                        <strong>Extracted Symptoms:</strong> {JSON.stringify(message.symptoms)}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <footer className="border-t backdrop-blur-sm bg-white/30 p-4 sticky bottom-0">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex gap-2">
                        <div className="flex-1 bg-white rounded-xl shadow-sm border border-emerald-100 flex items-center overflow-hidden">
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && ArrowUpMessage()}
                                placeholder="Enter your prompt..."
                                className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
                            />
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="p-3 hover:bg-emerald-50 transition-colors"
                            >
                                <Mic className="w-6 h-6 text-green-500" />
                            </motion.button>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={ArrowUpMessage}
                            className=" bg-green-500 p-3 rounded-xl shadow-sm hover:opacity-90 transition-opacity"
                        >
                            <ArrowUp className="w-6 h-6 text-black" />
                        </motion.button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChatscreenContext;
