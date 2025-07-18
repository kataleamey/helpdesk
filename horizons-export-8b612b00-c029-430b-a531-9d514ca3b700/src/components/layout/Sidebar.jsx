import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Inbox, MessageCircle, CheckCircle, Clock, FileText, Settings, BarChart, BookOpen, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = ({ onToggleChat }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [helpdeskName, setHelpdeskName] = useState('Helpdesk');

  const navItems = [
    { name: 'All', icon: Inbox, path: '/all-tickets' },
    { name: 'Not Answered', icon: MessageCircle, path: '/not-answered' },
    { name: 'Internal', icon: FileText, path: '/internal' },
    { name: 'Resolved', icon: CheckCircle, path: '/resolved' },
    { name: 'Pending', icon: Clock, path: '/pending' },
    { name: 'Tiledesk', icon: Bot, path: '/tiledesk' },
  ];

  const bottomNavItems = [
    { name: 'Dashboard', icon: BarChart, path: '/dashboard' },
    { name: 'Knowledge Base', icon: BookOpen, path: '/knowledge-base' },
    { name: 'API Integrations', icon: Settings, path: '/api-integrations' },
  ];

  const handleNameChange = (e) => {
    setHelpdeskName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        {isEditing ? (
          <input
            type="text"
            value={helpdeskName}
            onChange={handleNameChange}
            onBlur={() => setIsEditing(false)}
            onKeyDown={handleKeyDown}
            className="text-xl font-bold text-gray-800 w-full bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md"
            autoFocus
          />
        ) : (
          <h1
            className="text-xl font-bold text-gray-800 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {helpdeskName}
          </h1>
        )}
      </div>
      <nav className="flex-1 p-2 space-y-1">
        <p className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">Tickets</p>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <nav className="p-2 border-t border-gray-200">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.name}</span>
          </NavLink>
        ))}
         <Button
            variant="ghost"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-100 w-full justify-start mt-1"
            onClick={onToggleChat}
          >
            <Bot className="w-5 h-5 mr-3" />
            <span>Agent Assist</span>
          </Button>
      </nav>
    </div>
  );
};

export default Sidebar;