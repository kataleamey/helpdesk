import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, X, Send, ChevronDown } from 'lucide-react';

const TiledeskChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Add a welcome message when the component mounts
    setMessages([
      {
        id: 1,
        text: "Hello! How can I help you today?",
        sender: 'bot',
      },
    ]);
  }, []);

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessage = {
        id: Date.now(),
        text: inputValue,
        sender: 'user',
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      // Placeholder for bot response
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: "Thanks for your message. I'm connecting you to an agent.",
          sender: 'bot',
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open chat"
      >
        <Bot size={24} />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed bottom-4 right-4 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50"
      >
        {/* Header */}
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bot size={32} />
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-blue-600"></span>
            </div>
            <div>
              <p className="font-bold text-lg">AI Assistant</p>
              <p className="text-sm opacity-80">Online • Typically replies instantly</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-white/10" aria-label="Close chat">
            <ChevronDown size={20} />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot size={20} className="text-gray-600" />
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-lg'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-lg'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </motion.div>
                 {msg.sender === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User size={20} className="text-blue-600" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <footer className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
            />
            <button
              type="submit"
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </form>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};

export default TiledeskChat;