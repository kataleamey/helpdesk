
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useKnowledgeBase } from '@/contexts/KnowledgeBaseContext';
import { useLLM } from '@/contexts/LLMContext';
import { toast } from '@/components/ui/use-toast';
import getAIResponse from '@/api/mock-ai';
import ChatHeader from '@/components/chatbot/ChatHeader';
import MessageList from '@/components/chatbot/MessageList';
import MessageInput from '@/components/chatbot/MessageInput';
import MinimizedWidget from '@/components/chatbot/MinimizedWidget';

const initialMessages = [
  {
    id: 1,
    type: 'bot',
    content: 'Hello! I\'m your AI assistant. How can I help you today?',
    timestamp: new Date()
  }
];

function ChatbotWidget({ isOpen, onClose }) {
  const { user } = useAuth();
  const { documents } = useKnowledgeBase();
  const { llmConfig } = useLLM();
  const [messages, setMessages] = useState(() => {
    const savedMessages = sessionStorage.getItem('chatbotMessages');
    return savedMessages ? JSON.parse(savedMessages) : initialMessages;
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editingText, setEditingText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    sessionStorage.setItem('chatbotMessages', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    const currentMessages = [...messages, newMessage];
    setMessages(currentMessages);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await getAIResponse(currentInput, documents, llmConfig, currentMessages.slice(-5));
      if (response.success) {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'bot',
          content: response.data.reply,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        throw new Error(response.error || 'Failed to get AI response');
      }
    } catch (error) {
      const errorResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I\'m having trouble connecting. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
       toast({
        title: "Error",
        description: "Could not get a response from the AI. Please check your connection.",
        variant: "destructive",
      });
    } finally {
        setIsTyping(false);
    }
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
    toast({ title: "Message Deleted", description: "The message has been removed." });
  };

  const handleEditMessage = (message) => {
    setEditingMessage(message);
    setEditingText(message.content);
  };
  
  const handleSaveEdit = () => {
    setMessages(prev => prev.map(m => 
        m.id === editingMessage.id ? { ...m, content: editingText, edited: true } : m
    ));
    setEditingMessage(null);
    setEditingText("");
    toast({ title: "Message Edited", description: "Your message has been updated." });
  };

  const handleAddParticipant = (invitedUser) => {
    if (participants.find(p => p.id === invitedUser.id)) {
      toast({
        title: "User already in chat",
        description: `${invitedUser.name} is already part of this conversation.`,
        variant: "destructive"
      });
      return;
    }

    setParticipants(prev => [...prev, invitedUser]);
    const systemMessage = {
      id: Date.now(),
      type: 'system',
      content: `${user.name} added ${invitedUser.name} to the chat.`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, systemMessage]);
    toast({
      title: "User Added",
      description: `${invitedUser.name} has been invited to the chat.`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isMinimized ? (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-[400px] h-[600px] bg-white rounded-xl border border-gray-200 shadow-2xl flex flex-col"
          >
            <ChatHeader 
              onMinimize={() => setIsMinimized(true)} 
              onAddParticipant={handleAddParticipant}
              onClose={onClose}
            />
            <MessageList
                messages={messages}
                isTyping={isTyping}
                onEdit={handleEditMessage}
                onDelete={handleDeleteMessage}
                onSaveEdit={handleSaveEdit}
                editingMessage={editingMessage}
                setEditingText={setEditingText}
                editingText={editingText}
                messagesEndRef={messagesEndRef}
            />
            <MessageInput message={inputMessage} setMessage={setInputMessage} onSendMessage={handleSendMessage} />
          </motion.div>
        ) : (
          <MinimizedWidget onMaximize={() => setIsMinimized(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatbotWidget;
