import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ChevronDown, Star, MoreHorizontal, RefreshCw, Paperclip, Send, Plus, Bot, User, FileText, Link as LinkIcon, MessageSquare, Users, Briefcase, Tag, Languages, Workflow, Calendar, UserPlus, CheckCircle, Zap, BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const conversations = [
  {
    id: 1,
    from: 'support@example.com',
    title: 'Re: Urgent: Login Issue - Fixed',
    preview: 'Glad we could get that sorted f...',
    avatar: 'S',
    avatarBg: 'bg-green-500',
  },
  {
    id: 2,
    from: 'billing@example.com',
    title: 'Invoice question answered',
    preview: 'Let us know if you have any oth...',
    avatar: 'B',
    avatarBg: 'bg-green-500',
  },
  {
    id: 3,
    from: 'feedback@example.com',
    title: 'Feature Request acknowledged',
    preview: 'Thanks for the suggestion! We\'v...',
    avatar: 'F',
    avatarBg: 'bg-green-500',
  },
  {
    id: 4,
    from: 'sales@example.com',
    title: 'Enterprise Plan info sent',
    preview: 'The requested info has been se...',
    avatar: 'S',
    avatarBg: 'bg-green-500',
  },
    {
    id: 5,
    from: 'support@example.com',
    title: 'PDF Export bug resolved',
    preview: 'A fix has been deployed. Please...',
    avatar: 'S',
    avatarBg: 'bg-green-500',
  },
    {
    id: 6,
    from: 'support@example.com',
    title: 'Unauthorized user access report',
    preview: 'Thank you for the report. Our...',
    avatar: 'S',
    avatarBg: 'bg-green-500',
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
        <CheckCircle className="w-5 h-5" />
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
  <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
    <div className="flex items-center gap-2 mb-2">
      <Bot className="w-5 h-5 text-green-600" />
      <h3 className="font-bold text-sm text-green-800">AI Summary of Resolution</h3>
    </div>
    <div>
      <h4 className="font-semibold text-sm text-gray-800">Outcome</h4>
      <p className="text-sm text-gray-600 mb-2">The customer's login issue was successfully resolved by manually resetting their two-factor authentication from the admin panel.</p>
      <h4 className="font-semibold text-sm text-gray-800">Resolution Steps</h4>
      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        <li>Agent verified customer's identity.</li>
        <li>Agent located the user in the admin system.</li>
        <li>2FA was reset for the user's account.</li>
        <li>Customer confirmed they could log in successfully.</li>
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
            Post-Resolution Actions
          </h4>
          <div className="space-y-2">
            <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => handleAction('Send Survey')}>Send satisfaction survey</Button>
            <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => handleAction('Add Tag')}>Add "2FA-Reset" tag</Button>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-green-500" />
            Related Knowledge
          </h4>
          <div className="space-y-2">
            <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm hover:bg-gray-50 cursor-pointer" onClick={() => handleAction('View Article')}>
              <p className="font-semibold text-gray-800">How to reset 2FA for a user</p>
              <p className="text-xs text-gray-500 truncate">Navigate to the user's profile in the admin panel and click "Reset 2FA"...</p>
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
              <span className="font-medium text-gray-800">John Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Plan:</span>
              <span className="font-medium text-gray-800">Enterprise</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Joined:</span>
              <span className="font-medium text-gray-800">6 months ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ResolvedTickets() {
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
        <title>Resolved Tickets - Help Desk</title>
        <meta name="description" content="View and manage all resolved customer conversations." />
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
                6 Resolved <ChevronDown className="w-4 h-4 ml-1" />
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
              <h2 className="font-bold text-lg">John Doe</h2>
              <span className="text-gray-500">support@example.com</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon"><Star className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => handleAction('Re-open Ticket')}><RefreshCw className="w-4 h-4" /> Re-open</Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <ChatMessage text="I still can't log in, can someone please help me? This is urgent." time="2h ago" />
            <ChatMessage text="No problem, I've just reset your 2FA settings. Please try logging in again now." time="1h ago" isUser />
            <ChatMessage text="It worked! Thank you so much for your help." time="1h ago" />
            <ChatMessage text="You're very welcome! I'll mark this as resolved. Have a great day!" time="1h ago" isUser />
            <AiSummary />
          </div>
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="font-medium">This conversation is resolved.</p>
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

export default ResolvedTickets;