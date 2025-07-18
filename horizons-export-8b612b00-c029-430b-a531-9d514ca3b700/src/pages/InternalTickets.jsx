import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ChevronDown, Star, MoreHorizontal, Phone, Pause as Snooze, X, Paperclip, Send, Plus, Bot, User, FileText, Link as LinkIcon, MessageSquare, Users, Briefcase, Tag, Languages, Workflow, Calendar, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const conversations = [
  {
    id: 2,
    from: 'eng-team@example.com',
    title: 'Q4 Product Roadmap Discussion',
    preview: 'Let\'s sync up on the final fea...',
    avatar: 'E',
    avatarBg: 'bg-cyan-500',
    unread: false,
    status: 'Internal',
  },
];

const initialChatMessages = {
  2: [
    {
      sender: 'E',
      text: "Let's sync up on the final features for the Q4 launch. I've attached the latest spec doc.",
      time: "4h",
      isUser: false,
      seen: true,
    },
    {
      sender: 'A',
      text: "Thanks! Taking a look now. I have a few questions about the new analytics dashboard.",
      time: "3h",
      isUser: true,
      seen: true,
    }
  ]
};

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
        {item.avatar}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-800 truncate">{item.from}</p>
          {item.unread && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>}
        </div>
        <p className="text-sm text-gray-600 truncate">{item.title}</p>
        <p className="text-xs text-gray-400 truncate">{item.preview}</p>
      </div>
    </div>
  </div>
);

const ChatMessage = ({ sender, text, time, isUser, seen, avatarBg }) => (
  <div className={cn('flex mb-4', isUser ? 'justify-end' : 'justify-start')}>
    <div className={cn('flex items-end gap-2 max-w-md', isUser && 'flex-row-reverse')}>
      {isUser ? (
         <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">A</div>
      ) : (
        <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0', avatarBg)}>
            {sender}
        </div>
      )}
      <div>
        <div className={cn('px-4 py-2 rounded-lg', isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800')}>
          <p>{text}</p>
        </div>
        <p className="text-xs text-gray-400 mt-1 px-1">{time} {seen && `• Seen`}</p>
      </div>
    </div>
  </div>
);

const DetailItem = ({ icon: Icon, label, value, action = false }) => (
  <div className="flex justify-between items-center text-sm py-2">
    <div className="flex items-center gap-2 text-gray-500">
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </div>
    {value ? (
      <div className="flex items-center gap-2 font-medium text-gray-800">
        {label === 'Team' && <Users className="w-4 h-4 text-blue-500" />}
        <span>{value}</span>
      </div>
    ) : (
      action && <Button variant="ghost" size="icon" className="h-6 w-6"><Plus className="w-4 h-4" /></Button>
    )}
  </div>
);

function InternalTickets() {
  const [activeConversation, setActiveConversation] = useState(2);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  
  const selectedConversation = conversations.find(c => c.id === activeConversation);

  const handleAction = (action) => {
    toast({
      title: `Action: ${action}`,
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleSendMessage = () => {
    if (message.trim() && activeConversation) {
      const newMessage = {
        sender: 'A',
        text: message,
        time: "Just now",
        isUser: true,
        seen: false
      };
      setChatMessages(prev => ({
        ...prev,
        [activeConversation]: [...(prev[activeConversation] || []), newMessage]
      }));
      setMessage('');
      toast({
        title: 'Reply Sent!',
        description: 'Your reply has been sent.',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Internal Tickets - Help Desk</title>
        <meta name="description" content="Manage internal team conversations and notes." />
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
                {conversations.length} Internal <ChevronDown className="w-4 h-4 ml-1" />
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
              <h2 className="font-bold text-lg">{selectedConversation.title}</h2>
              <span className="text-gray-500">{selectedConversation.from}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => handleAction('Star')}><Star className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleAction('More options')}><MoreHorizontal className="w-5 h-5" /></Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => handleAction('Call')}><Phone className="w-4 h-4" /> Call</Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => handleAction('Snooze')}><Snooze className="w-4 h-4" /> Snooze</Button>
              <Button variant="secondary" size="sm" className="gap-2" onClick={() => handleAction('Close')}><X className="w-4 h-4" /> Close</Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
             {chatMessages[activeConversation]?.map((msg, index) => <ChatMessage key={index} {...msg} avatarBg={selectedConversation.avatarBg} />)}
          </div>
          <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                placeholder="Reply..."
                className="w-full p-3 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={2}
              />
              <div className="absolute bottom-2 right-3 flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => handleAction('Attach File')}><Paperclip className="w-5 h-5 text-gray-500" /></Button>
                <Button size="icon" onClick={handleSendMessage}><Send className="w-5 h-5" /></Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Details Sidebar */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-1/4 min-w-[280px] max-w-[320px] bg-gray-50 border-l border-gray-200 flex flex-col overflow-y-auto"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Details</h3>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <DetailItem icon={User} label="Assignee" value="Alex" />
            <DetailItem icon={Users} label="Team" value="Engineering" />

            <div>
              <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-2">Links</h4>
              <DetailItem icon={LinkIcon} label="Jira ticket" value="ENG-421" />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default InternalTickets;