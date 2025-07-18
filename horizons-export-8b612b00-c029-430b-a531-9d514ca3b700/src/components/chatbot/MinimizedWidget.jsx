
import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const MinimizedWidget = ({ onMaximize }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="bg-blue-600 text-white p-4 rounded-xl shadow-xl cursor-pointer"
      onClick={onMaximize}
    >
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-medium">AI Assistant</h3>
          <p className="text-xs text-blue-100">Click to continue chat</p>
        </div>
      </div>
    </motion.div>
  );
};

export default MinimizedWidget;
