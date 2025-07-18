
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Users, 
  MessageSquare, 
  Play, 
  Pause, 
  Eye,
  Send,
  MoreHorizontal,
  UserCheck,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useKnowledgeBase } from '@/contexts/KnowledgeBaseContext';
import { useLLM } from '@/contexts/LLMContext';
import getAIResponse from '@/api/mock-ai';

const initialConversations = [
  {
    id: 1,
    user: 'Jane Smith',
    status: 'ai-active',
    lastMessage: 'I need help with my billing account',
    time: '2 min ago',
    agent: null,
    priority: 'high',
    history: [
      { from: 'user', text: 'Hi! I need help with my billing account. I was charged twice this month.', time: '2 min ago' },
      { from: 'bot', text: 'I understand your concern about the billing issue. Let me check your account details right away.', time: '1 min ago' },
      { from: 'user', text: 'Thank you. My account email is jane@example.com', time: '30 sec ago' },
    ]
  },
  {
    id: 2,
    user: 'Mike Johnson',
    status: 'agent-active',
    lastMessage: 'Thank you for the quick response!',
    time: '5 min ago',
    agent: 'Sarah Wilson',
    priority: 'medium',
    history: [
        { from: 'user', text: 'Where can I find my invoice?', time: '6 min ago'},
        { from: 'agent', text: 'You can find all your invoices under the "Billing" section of your account dashboard.', time: '5 min ago'},
        { from: 'user', text: 'Thank you for the quick response!', time: '5 min ago'}
    ]
  },
  {
    id: 3,
    user: 'David Brown',
    status: 'ai-active',
    lastMessage: 'Can you explain your pricing plans?',
    time: '8 min ago',
    agent: null,
    priority: 'low',
    history: [
        { from: 'user', text: 'Can you explain your pricing plans?', time: '8 min ago' },
        { from: 'bot', text: 'Of course! We have a few different plans available. Could you tell me a bit about your needs so I can recommend the best one?', time: '7 min ago' }
    ]
  }
];

const agents = [
  {
    id: 1,
    name: 'Sarah Wilson',
    status: 'online',
    activeChats: 2,
    avatar: 'SW'
  },
  {
    id: 2,
    name: 'John Davis',
    status: 'busy',
    activeChats: 3,
    avatar: 'JD'
  },
  {
    id: 3,
    name: 'Emily Chen',
    status: 'away',
    activeChats: 0,
    avatar: 'EC'
  }
];

function AgentAssist() {
  const [activeConversations, setActiveConversations] = useState(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState(initialConversations[0]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const { documents } = useKnowledgeBase();
  const { llmConfig } = useLLM();

  useEffect(() => {
    setSelectedConversation(activeConversations.find(c => c.id === selectedConversation.id) || activeConversations[0]);
  }, [activeConversations, selectedConversation.id]);
  
  const handleAction = (action, item) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newAgentMessage = {
      from: 'agent-assist',
      text: message,
      time: 'Just now',
    };
    
    const currentInput = message;
    setMessage('');
    
    // Optimistically update UI
    const updatedConversations = activeConversations.map(c =>
        c.id === selectedConversation.id
            ? { ...c, history: [...c.history, newAgentMessage] }
            : c
    );
    setActiveConversations(updatedConversations);
    const updatedHistory = updatedConversations.find(c => c.id === selectedConversation.id).history;
    
    setIsTyping(true);
    
    try {
        const res = await getAIResponse(currentInput, documents, llmConfig, updatedHistory);
        
        const aiResponseMessage = {
            from: 'bot',
            text: res.success ? res.data.reply : 'Sorry, I encountered an error.',
            time: 'Just now',
        };

        setActiveConversations(prev =>
            prev.map(c =>
                c.id === selectedConversation.id
                    ? { ...c, history: [...c.history, aiResponseMessage] }
                    : c
            )
        );
    } catch(error) {
         toast({
            title: "Error",
            description: "Could not get a response from the AI. Please check your connection and API keys.",
            variant: "destructive",
        });
        const errorMessage = {
            from: 'system',
            text: 'Failed to get AI response.',
            time: 'Just now',
        };
        setActiveConversations(prev =>
            prev.map(c =>
                c.id === selectedConversation.id
                    ? { ...c, history: [...c.history, errorMessage] }
                    : c
            )
        );
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Agent Assist - AI Chatbot Platform</title>
        <meta name="description" content="Monitor live conversations and provide agent assistance with AI-powered customer support tools." />
      </Helmet>

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Agent Assist Console</h1>
            <p className="text-gray-600 font-light">Monitor and assist with live conversations</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 font-light">{activeConversations.length} Active Conversations</span>
            </div>
            <Button onClick={() => handleAction('settings')}>
              Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="text-sm font-medium text-gray-900">Active Conversations</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {activeConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation.id === conversation.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{conversation.user}</span>
                      <div className="flex items-center space-x-1">
                        {conversation.status === 'ai-active' ? (
                          <Bot className="h-3 w-3 text-blue-500" />
                        ) : (
                          <UserCheck className="h-3 w-3 text-green-500" />
                        )}
                        <span className={`w-2 h-2 rounded-full ${
                          conversation.priority === 'high' ? 'bg-red-500' :
                          conversation.priority === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}></span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 font-light mb-1 truncate">{conversation.lastMessage}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-light">{conversation.time}</span>
                      {conversation.agent && (
                        <span className="text-xs text-blue-600 font-light">{conversation.agent}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="text-sm font-medium text-gray-900">Agents</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {agents.map((agent) => (
                  <div key={agent.id} className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">{agent.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            agent.status === 'online' ? 'bg-green-500' :
                            agent.status === 'busy' ? 'bg-yellow-500' :
                            'bg-gray-400'
                          }`}></div>
                          <span className="text-xs text-gray-500 font-light">
                            {agent.activeChats} active chats
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 h-[700px] flex flex-col"
            >
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {selectedConversation.user.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{selectedConversation.user}</h3>
                    <div className="flex items-center space-x-2">
                      {selectedConversation.status === 'ai-active' ? (
                        <>
                          <Bot className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-blue-600 font-light">AI Active</span>
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600 font-light">Agent: {selectedConversation.agent}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedConversation.status === 'ai-active' ? (
                    <Button size="sm" onClick={() => handleAction('takeover')}>
                      <UserCheck className="mr-2 h-4 w-4" />
                      Take Over
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => handleAction('release')}>
                      <Bot className="mr-2 h-4 w-4" />
                      Release to AI
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => handleAction('more')}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {selectedConversation.history.map((msg, index) => (
                  <div key={index} className={`flex ${msg.from === 'user' ? 'justify-start' : 'justify-end'}`}>
                    {msg.from !== 'agent-assist' && (
                        <div className={`max-w-xs lg:max-w-md ${msg.from === 'user' ? '' : 'text-right'}`}>
                            <div className={`${
                                msg.from === 'user' ? 'bg-gray-100' : 'bg-blue-600 text-white'
                                } rounded-lg px-4 py-2 chat-bubble`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                            <p className="text-xs text-gray-500 font-light mt-1">
                                {msg.time} {msg.from === 'bot' && '• AI'}
                            </p>
                        </div>
                    )}
                     {msg.from === 'agent-assist' && (
                       <div className="max-w-xs lg:max-w-md text-right w-full">
                         <div className="bg-green-100 border border-green-200 rounded-lg px-4 py-2 inline-block">
                           <p className="text-sm text-green-900 text-left">{msg.text}</p>
                         </div>
                         <p className="text-xs text-gray-500 font-light mt-1">
                           Your query • {msg.time}
                         </p>
                       </div>
                     )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-end">
                    <div className="max-w-xs lg:max-w-md">
                      <div className="bg-blue-600 rounded-lg px-4 py-2 chat-bubble inline-flex items-center">
                        <div className="typing-indicator-white w-2 h-2 bg-white rounded-full mr-1"></div>
                        <div className="typing-indicator-white w-2 h-2 bg-white rounded-full mr-1"></div>
                        <div className="typing-indicator-white w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Query the AI for assistance with this conversation:</p>
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask for suggestions, next steps, or information from the knowledge base..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={!llmConfig || !llmConfig.isConnected}
                  />
                  <Button onClick={handleSendMessage} disabled={!llmConfig || !llmConfig.isConnected}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                 {!llmConfig || !llmConfig.isConnected && (
                    <p className="text-xs text-red-500 mt-2">
                        Please connect to an AI model in the API Integrations page to enable agent assistance.
                    </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgentAssist;
