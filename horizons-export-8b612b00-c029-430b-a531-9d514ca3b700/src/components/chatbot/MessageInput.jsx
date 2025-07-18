
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MessageInput = ({ message, setMessage, onSendMessage }) => {
  return (
    <div className="border-t border-gray-200 p-4 flex-shrink-0">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button onClick={onSendMessage} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 font-light mt-2">
        Powered by AI • Your conversations are secure
      </p>
    </div>
  );
};

export default MessageInput;
