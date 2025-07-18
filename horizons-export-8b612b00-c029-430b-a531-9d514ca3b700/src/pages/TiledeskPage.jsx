import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Bot, User, Send, Search, Plus, ChevronDown, Clock, Star, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const conversations = [
  { id: 1, name: 'General Support', preview: 'Hello! How can I help you today?', avatar: <Bot />, active: true },
  { id: 2, name: 'Billing Inquiry', preview: 'I have a question about my recent...', avatar: <User />, active: false },
  { id: 3, name: 'Technical Issue', preview: 'The app is crashing on startup...', avatar: <User />, active: false },
];

const initialMessages = [
  { id: 1, text: "Hi Mark, I've just checked for you. Your order has shipped! The tracking number is XYZ123. Please let us know if there's anything else we can help with.", sender: 'bot' },
  { id: 2, text: "Hi, I was wondering about the status of my recent order?", sender: 'user', time: "3h ago" },
];

const ConversationItem = ({ item, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={cn(
      'p-3 cursor-pointer border-l-4 flex items-start space-x-3',
      isActive ? 'bg-blue-50 border-blue-500' : 'border-transparent hover:bg-gray-100'
    )}
  >
    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-gray-200 text-gray-600">
      {item.avatar}
    </div>
    <div className="flex-1 overflow-hidden">
      <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
      <p className="text-xs text-gray-500 truncate">{item.preview}</p>
    </div>
  </div>
);

const ChatMessage = ({ msg }) => (
  <div className={`flex items-start gap-3 my-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
    {msg.sender === 'bot' && (
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
        <Bot size={20} className="text-gray-600" />
      </div>
    )}
     <div className="flex flex-col gap-1 w-full max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`p-3 rounded-lg ${
          msg.sender === 'user'
            ? 'bg-gray-200 text-gray-800'
            : 'bg-blue-600 text-white'
        }`}
      >
        <p className="text-sm">{msg.text}</p>
      </motion.div>
      {msg.time && <p className="text-xs text-gray-400 self-end">{msg.time}</p>}
     </div>
    {msg.sender === 'user' && (
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
        <User size={20} className="text-blue-600" />
      </div>
    )}
  </div>
);

function TiledeskPage() {
  const [activeConversation, setActiveConversation] = useState(1);
  const [messages, setMessages] = useState(initialMessages.slice().reverse());
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessage = { id: Date.now(), text: inputValue, sender: 'bot' };
      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      
      toast({
        title: "Connecting to Tiledesk...",
        description: "🚧 This UI is ready! The next step is to connect it to your Tiledesk API. You can request this in your next prompt! 🚀",
      });

      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: "This is a placeholder response.",
          sender: 'user',
          time: "1s ago"
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  const selectedConversation = conversations.find(c => c.id === activeConversation);

  return (
    <>
      <Helmet>
        <title>Tiledesk Chat - Help Desk</title>
        <meta name="description" content="Engage in conversations using the Tiledesk integration." />
      </Helmet>
      <div className="flex w-full h-full bg-gray-50">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-1/4 min-w-[280px] max-w-[320px] bg-white border-r border-gray-200 flex flex-col"
        >
          <div className="p-3 border-b border-gray-200 flex-shrink-0">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">1 Pending</h2>
                <Button variant="ghost" size="sm">
                    Recent <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
            </div>
            <div className="bg-orange-100 border border-orange-200 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 flex-shrink-0 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">S</div>
                    <div>
                        <p className="font-semibold text-sm">support@example.com</p>
                        <p className="text-xs text-gray-600">Re: Shipping status?</p>
                    </div>
                </div>
                <p className="text-xs text-gray-700 mt-2">We've sent the tracking info. Pl...</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map(convo => (
              <ConversationItem
                key={convo.id}
                item={convo}
                isActive={activeConversation === convo.id}
                onClick={() => setActiveConversation(convo.id)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 flex flex-col"
        >
          <header className="p-4 border-b border-gray-200 bg-white flex justify-between items-center flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div>
                <p className="font-bold text-lg">Mark Johnson</p>
                <p className="text-sm text-gray-500">support@example.com</p>
              </div>
              <Button variant="ghost" size="icon"><Star className="w-5 h-5" /></Button>
            </div>
             <Button variant="outline" size="sm">
                <X className="w-4 h-4 mr-2" />
                Close
             </Button>
          </header>

          <main className="flex-1 px-6 pt-6 pb-2 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg) => <ChatMessage key={msg.id} msg={msg} />)}
               <div className="my-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                    <div className="flex items-start space-x-3">
                        <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                            <p className="font-semibold text-yellow-800">AI Summary of Pending Status</p>
                            <div className="text-sm text-gray-700 mt-2 space-y-2">
                                <p><strong>Current Situation</strong><br/>The agent has provided the customer with their shipping tracking information and is now awaiting the customer's confirmation that the issue is resolved.</p>
                                <p><strong>Next Steps</strong></p>
                                <ul className="list-disc list-inside">
                                    <li>Wait for customer to reply.</li>
                                    <li>If no reply in 48 hours, send a follow-up message.</li>
                                    <li>Close the ticket upon customer confirmation.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
              <div ref={messagesEndRef} />
            </div>
          </main>

          <footer className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="text-center text-xs text-gray-500 mb-2 flex items-center justify-center">
                <Clock className="w-3 h-3 mr-1" />
                This conversation is pending customer reply.
            </div>
            <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
              />
              <Button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                disabled={!inputValue.trim()}
                aria-label="Send message"
              >
                <Send size={20} />
              </Button>
            </form>
          </footer>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-1/4 min-w-[280px] max-w-[350px] bg-white border-l border-gray-200 flex flex-col p-4 space-y-4"
        >
             <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center justify-between">
                    <p className="font-bold text-blue-800">AI Agent Assist</p>
                    <span className="text-xs font-semibold bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full">Beta</span>
                </div>
                <div className="mt-4">
                    <div className="flex items-start space-x-2">
                        <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <p className="font-semibold text-blue-800">Suggested Follow-up</p>
                            <p className="text-sm text-gray-700 mt-1">"Hi Mark, just wanted to follow up and see if you received the tracking information for your order. Please let me know if there's anything else I can help with!"</p>
                            <Button variant="link" className="text-sm font-semibold text-blue-600 mt-1 p-0 h-auto">Use this follow-up</Button>
                        </div>
                    </div>
                </div>
            </div>
             <div className="p-4 rounded-lg bg-white border border-gray-200 flex-1">
                 <p className="font-bold text-gray-800">Knowledge Base</p>
                 <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search articles..." className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div className="mt-2 text-sm text-gray-600 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
                    How to track an order
                </div>
             </div>
             <div className="p-4 rounded-lg bg-white border border-gray-200">
                 <p className="font-bold text-gray-800">Customer Details</p>
                 <div className="text-sm mt-2 space-y-1">
                    <p><strong className="font-medium">Name:</strong> Mark Johnson</p>
                    <p><strong className="font-medium">Plan:</strong> Free Tier</p>
                    <p><strong className="font-medium">Joined:</strong> 2 months ago</p>
                 </div>
             </div>
        </motion.div>
      </div>
    </>
  );
}

export default TiledeskPage;