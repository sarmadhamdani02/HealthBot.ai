// components/Logo.tsx
import React from 'react';
import { Bot } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none">
      <div className="p-2 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg">
        <Bot className="w-7 h-7 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">
        Health<span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">Bot</span>
      </h1>
    </div>
  );
};

export default Logo;
