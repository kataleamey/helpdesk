
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, MoreHorizontal, Edit, Trash2, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from '@/components/ui/use-toast';

const Message = ({ message, onEdit, onDelete, onSaveEdit, editingMessage, setEditingText, editingText }) => {
  const isEditing = editingMessage?.id === message.id;

  if (message.type === 'system') {
    return (
      <div className="text-xs text-gray-500 text-center w-full my-2 flex items-center justify-center">
        <Info className="h-3 w-3 mr-2" /> {message.content}
      </div>
    );
  }

  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group flex items-center ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {(message.type === 'user' || message.type === 'bot') && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className={`h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity ${message.type === 'user' ? 'order-first mr-1' : 'order-last ml-1'}`}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-1">
            <div className="flex flex-col">
              <Button variant="ghost" size="sm" className="justify-start gap-2" onClick={() => onEdit(message)}><Edit className="h-4 w-4" />Edit</Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="justify-start gap-2 text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" />Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete the message.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(message.id)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </PopoverContent>
        </Popover>
      )}

      <div className={`flex items-start space-x-2 max-w-xs ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
          {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
        <div className={`rounded-lg px-4 py-2 chat-bubble ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="bg-white text-black"
              />
              <div className="flex gap-2 justify-end">
                <Button size="sm" variant="secondary" onClick={() => onEdit(null)}>Cancel</Button>
                <Button size="sm" onClick={onSaveEdit}>Save</Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm font-normal">{message.content}</p>
              {message.edited && <span className="text-xs opacity-70 ml-2">(edited)</span>}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const MessageList = ({ messages, isTyping, onEdit, onDelete, onSaveEdit, editingMessage, setEditingText, editingText, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-1">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          onEdit={onEdit}
          onDelete={onDelete}
          onSaveEdit={onSaveEdit}
          editingMessage={editingMessage}
          setEditingText={setEditingText}
          editingText={editingText}
        />
      ))}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <div className="flex items-start space-x-2 max-w-xs">
            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-gray-600" />
            </div>
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
