import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ChevronDown, Star, MoreHorizontal, RefreshCw, Paperclip, Send, Plus, Bot, User, FileText, Link as LinkIcon, MessageSquare, Users, Briefcase, Tag, Languages, Workflow, Calendar, UserPlus, Clock, X, Zap, BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const conversations = [
  {
    id: 1,
    from: 'support@example.com',
    title: 'Re: Shipping status?',
    preview: 'We\'ve sent the tracking info. Pl...',
    avatar: 'S',
    avatarBg: 'bg-orange-500',
  },
];

const ConversationItem = ({ item, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={cn(
      'p-3 cursor-pointer border-l-2',
      isActive ? 'bg-blue-50 border-blue-500' : 'border-transparent hover:bg-gray-50'
    )}
  >
    <div className="flex items-start space-x-3">
      <div className={cn('w-8 h-8 rounded-md flex-shrink-0 flex items-center justify-center text-white font-bold', item.avatarBg)}>
        <Clock className="w-5 h-5" />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-800 truncate">{item.from}</p>
        </div>
        <p className="text-sm text-gray-600 truncate">{item.title}</p>
        <p className="text-xs text-gray-400 truncate">{item.preview}</p>
      </div>
    </div>
  </div>
);

const ChatMessage = ({ sender, text, time, isUser, seen }) => (
  <div className={cn('flex mb-4', isUser ? 'justify-end' : 'justify-start')}>
    <div className={cn('flex items-end gap-2 max-w-md', isUser && 'flex-row-reverse')}>
      {!isUser && <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>}
      <div>
        <div className={cn('px-4 py-2 rounded-lg', isUser ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800')}>
          <p>{text}</p>
        </div>
        <p className="text-xs text-gray-400 mt-1 px-1">{time}</p>
      </div>
    </div>
  </div>
);

const AiSummary = () => (
  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 my-4">
    <div className="flex items-center gap-2 mb-2">
      <Bot className="w-5 h-5 text-orange-600" />
      <h3 className="font-bold text-sm text-orange-800">AI Summary of Pending Status</h3>
    </div>
    <div>
      <h4 className="font-semibold text-sm text-gray-800">Current Situation</h4>
      <p className="text-sm text-gray-600 mb-2">The agent has provided the customer with their shipping tracking information and is now awaiting the customer's confirmation that the issue is resolved.</p>
      <h4 className="font-semibold text-sm text-gray-800">Next Steps</h4>
      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        <li>Wait for customer to reply.</li>
        <li>If no reply in 48 hours, send a follow-up message.</li>
        <li>Close the ticket upon customer confirmation.</li>
      </ul>
    </div>
  </div>
);

const AiAgentAssistPanel = () => {
  const handleAction = (action) => {
    toast({
      title: `AI Assist Action: ${action}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            AI Agent Assist
          </h3>
          <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-semibold">Beta</span>
        </div>
      </div>
      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        <div>
          <h4 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            Suggested Follow-up
          </h4>
          <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700">
            <p>"Hi Mark, just wanted to follow up and see if you received the tracking information for your order. Please let me know if there's anything else I can help with!"</p>
          </div>
          <Button size="sm" variant="outline" className="mt-2 w-full" onClick={() => handleAction('Use Follow-up')}>Use this follow-up</Button>
        </div>

        <div>
          <h4 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-green-500" />
            Knowledge Base
          </h4>
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search articles..." className="w-full pl-9 p-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="space-y-2">
            <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm hover:bg-gray-50 cursor-pointer" onClick={() => handleAction('View Article')}>
              <p className="font-semibold text-gray-800">How to track an order</p>
              <p className="text-xs text-gray-500 truncate">Provide the customer with the tracking link sent to their email...</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-500" />
            Customer Details
          </h4>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Name:</span>
              <span className="font-medium text-gray-800">Mark Johnson</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Plan:</span>
              <span className="font-medium text-gray-800">Free Tier</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Joined:</span>
              <span className="font-medium text-gray-800">2 months ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function PendingTickets() {
  const [activeConversation, setActiveConversation] = useState(1);

  const handleAction = (action) => {
    toast({
      title: `Action: ${action}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Pending Tickets - Help Desk</title>
        <meta name="description" content="View and manage all pending customer conversations." />
      </Helmet>
      <div className="flex w-full h-full">
        {/* Conversation List */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-1/4 min-w-[280px] max-w-[320px] bg-white border-r border-gray-200 flex flex-col"
        >
          <div className="p-3 border-b border-gray-200 flex-shrink-0">
            <div className="flex justify-between items-center">
              <Button variant="ghost" className="font-bold">
                1 Pending <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="ghost">
                Recent <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
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

        {/* Chat View */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 flex flex-col bg-white"
        >
          <div className="p-3 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-lg">Mark Johnson</h2>
              <span className="text-gray-500">support@example.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon"><Star className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button>
              <Button variant="secondary" size="sm" className="gap-2" onClick={() => handleAction('Close Ticket')}><X className="w-4 h-4" /> Close</Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <ChatMessage text="Hi, I was wondering about the status of my recent order?" time="3h ago" />
            <ChatMessage text="Hi Mark, I've just checked for you. Your order has shipped! The tracking number is XYZ123. Please let us know if there's anything else we can help with." time="2h ago" isUser />
            <AiSummary />
          </div>
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Clock className="w-5 h-5 text-orange-500" />
              <p className="font-medium">This conversation is pending customer reply.</p>
            </div>
          </div>
        </motion.div>

        {/* AI Agent Assist Sidebar */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-1/4 min-w-[280px] max-w-[320px] bg-gray-50 border-l border-gray-200 flex flex-col"
        >
          <AiAgentAssistPanel />
        </motion.div>
      </div>
    </>
  );
}

export default PendingTickets;