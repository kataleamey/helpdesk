import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import AgentAssistChat from '@/components/AgentAssistChat';

function DashboardLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleToggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar onToggleChat={handleToggleChat} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 flex overflow-hidden bg-white">
          <Outlet />
        </main>
      </div>
      <AgentAssistChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default DashboardLayout;