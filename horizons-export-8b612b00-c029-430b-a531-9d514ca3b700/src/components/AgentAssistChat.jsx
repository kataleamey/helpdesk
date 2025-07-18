import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, X, Send, Sparkles, Search } from 'lucide-react';

const AgentAssistChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: 1,
          text: "I'm your AI Agent Assist. How can I help you support your customer?",
          sender: 'bot',
        },
      ]);
    }
  }, [isOpen]);

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: "Here is a suggested response you can use.",
          sender: 'bot',
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 right-0 w-[400px] h-full bg-white rounded-l-2xl shadow-2xl flex flex-col overflow-hidden border-l border-gray-200 z-50"
        >
          <header className="bg-white p-4 flex justify-between items-center border-b">
            <div className="flex items-center space-x-3">
               <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
                <Bot size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-lg">AI Agent Assist</p>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close chat">
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bot size={20} className="text-blue-600" />
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
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={20} className="text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
            <div className="p-4 bg-white border-t">
                 <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-start space-x-2">
                        <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <p className="font-semibold text-blue-800">Suggested Follow-up</p>
                            <p className="text-sm text-gray-700 mt-1">"Hi Mark, just wanted to follow up and see if you received the tracking information for your order. Please let me know if there's anything else I can help with!"</p>
                            <button className="text-sm font-semibold text-blue-600 mt-2">Use this follow-up</button>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-semibold text-gray-800">Knowledge Base</p>
                     <div className="relative mt-2">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Search articles..." className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div className="mt-2 text-sm text-gray-600 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                        How to track an order
                    </div>
                </div>
            </div>

          <footer className="p-4 bg-white border-t">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask AI Assist..."
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
      )}
    </AnimatePresence>
  );
};

export default AgentAssistChat;