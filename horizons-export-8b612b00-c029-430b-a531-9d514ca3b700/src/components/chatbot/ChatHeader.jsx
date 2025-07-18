import React from 'react';
import { Bot, Minimize2, UserPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';

const internalUsers = [
  { id: '2', name: 'Jane Doe', role: 'Support Specialist' },
  { id: '3', name: 'John Smith', role: 'Technical Lead' },
  { id: '4', name: 'Emily White', role: 'Product Manager' },
];

const ChatHeader = ({ onMinimize, onAddParticipant, onClose }) => {
  const { user } = useAuth();
  
  return (
    <div className="bg-blue-600 text-white p-4 flex items-center justify-between flex-shrink-0 rounded-t-xl">
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium">AI Assistant</h3>
          <p className="text-xs text-blue-100">Online • Typically replies instantly</p>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        {user?.role === 'admin' && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Invite Internal User</DialogTitle>
                <DialogDescription>
                  Add a team member to this conversation for assistance.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-3">
                {internalUsers.map(internalUser => (
                  <div key={internalUser.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                    <div>
                      <p className="font-medium">{internalUser.name}</p>
                      <p className="text-sm text-gray-500">{internalUser.role}</p>
                    </div>
                    <Button size="sm" onClick={() => onAddParticipant(internalUser)}>Add</Button>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMinimize}
          className="text-white hover:bg-white hover:bg-opacity-20"
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-white hover:bg-opacity-20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;