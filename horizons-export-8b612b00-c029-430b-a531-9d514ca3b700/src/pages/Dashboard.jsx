import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Clock,
  ArrowUp,
  ArrowDown,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const metrics = [
  {
    title: 'Total Conversations',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: MessageSquare,
    color: 'text-blue-600'
  },
  {
    title: 'Active Users',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'text-green-600'
  },
  {
    title: 'Satisfaction Rate',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-purple-600'
  },
  {
    title: 'Avg Response Time',
    value: '1.2s',
    change: '-15.3%',
    trend: 'down',
    icon: Clock,
    color: 'text-orange-600'
  }
];

const recentConversations = [
  {
    id: 1,
    user: 'Jane Smith',
    message: 'Hi, I need help with my billing...',
    time: '2 min ago',
    status: 'active',
    avatar: 'JS'
  },
  {
    id: 2,
    user: 'Mike Johnson',
    message: 'Can you help me reset my password?',
    time: '5 min ago',
    status: 'resolved',
    avatar: 'MJ'
  },
  {
    id: 3,
    user: 'Sarah Wilson',
    message: 'I have a question about your pricing...',
    time: '12 min ago',
    status: 'pending',
    avatar: 'SW'
  },
  {
    id: 4,
    user: 'David Brown',
    message: 'The chatbot is not responding properly',
    time: '18 min ago',
    status: 'escalated',
    avatar: 'DB'
  }
];

function Dashboard() {
  const handleViewDetails = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - AI Chatbot Platform</title>
        <meta name="description" content="Monitor your AI chatbot performance with real-time analytics, conversation metrics, and user satisfaction data." />
      </Helmet>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 font-light">Monitor your chatbot performance and analytics</p>
          </div>
          <Button onClick={handleViewDetails} className="bg-blue-600 hover:bg-blue-700">
            View Full Report
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="metric-card rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-50 ${metric.color}`}>
                    <metric.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-light text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {metric.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ml-1 ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Conversations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Recent Conversations</h2>
              <Button variant="ghost" size="sm" onClick={handleViewDetails}>
                View All
              </Button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentConversations.map((conversation) => (
              <div key={conversation.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {conversation.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{conversation.user}</p>
                      <p className="text-sm text-gray-600 font-light">{conversation.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      conversation.status === 'active' ? 'bg-green-100 text-green-800' :
                      conversation.status === 'resolved' ? 'bg-blue-100 text-blue-800' :
                      conversation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {conversation.status}
                    </span>
                    <span className="text-sm text-gray-500 font-light">{conversation.time}</span>
                    <Button variant="ghost" size="icon" onClick={handleViewDetails}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={handleViewDetails}>
                <MessageSquare className="mr-2 h-4 w-4" />
                View Live Conversations
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleViewDetails}>
                <Users className="mr-2 h-4 w-4" />
                Manage Agent Assist
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleViewDetails}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 font-light">Chatbot Status</span>
                <span className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 font-light">API Status</span>
                <span className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 font-light">Agent Assist</span>
                <span className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-900">Knowledge base updated</p>
                <p className="text-gray-500 font-light">2 hours ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-900">New integration added</p>
                <p className="text-gray-500 font-light">1 day ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-900">Agent training completed</p>
                <p className="text-gray-500 font-light">2 days ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Dashboard;