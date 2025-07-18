import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { KnowledgeBaseProvider } from '@/contexts/KnowledgeBaseContext';
import { LLMProvider } from '@/contexts/LLMContext';
import { TiledeskProvider } from '@/contexts/TiledeskContext';
import LoginPage from '@/pages/LoginPage';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Dashboard from '@/pages/Dashboard';
import KnowledgeBase from '@/pages/KnowledgeBase';
import APIIntegrations from '@/pages/APIIntegrations';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';
import AllTickets from '@/pages/AllTickets';
import NotAnsweredTickets from '@/pages/NotAnsweredTickets';
import InternalTickets from '@/pages/InternalTickets';
import ResolvedTickets from '@/pages/ResolvedTickets';
import PendingTickets from '@/pages/PendingTickets';
import AgentAssist from '@/pages/AgentAssist';
import TiledeskPage from '@/pages/TiledeskPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      
      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/all-tickets" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="knowledge-base" element={<KnowledgeBase />} />
        <Route path="api-integrations" element={<APIIntegrations />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="agent-assist" element={<AgentAssist />} />
        
        <Route path="all-tickets" element={<AllTickets />} />
        <Route path="not-answered" element={<NotAnsweredTickets />} />
        <Route path="internal" element={<InternalTickets />} />
        <Route path="resolved" element={<ResolvedTickets />} />
        <Route path="pending" element={<PendingTickets />} />
        <Route path="tiledesk" element={<TiledeskPage />} />

      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <SettingsProvider>
          <KnowledgeBaseProvider>
            <LLMProvider>
              <TiledeskProvider>
                <Helmet>
                  <title>Help Desk - AI Chatbot Platform</title>
                  <meta name="description" content="Deploy sophisticated AI chatbots with agent assist capabilities. Monitor performance, manage knowledge base, and provide exceptional customer support." />
                </Helmet>
                <div className="min-h-screen bg-gray-50">
                  <AppRoutes />
                  <Toaster />
                </div>
              </TiledeskProvider>
            </LLMProvider>
          </KnowledgeBaseProvider>
        </SettingsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;