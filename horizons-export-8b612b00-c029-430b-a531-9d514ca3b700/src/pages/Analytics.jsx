import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { BarChart3, TrendingUp, Users, MessageSquare, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

function Analytics() {
  const handleAction = (action) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Analytics - AI Chatbot Platform</title>
        <meta name="description" content="Analyze chatbot performance with detailed metrics, conversation analytics, and user engagement insights." />
      </Helmet>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
            <p className="text-gray-600 font-light">Detailed insights into your chatbot performance</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => handleAction('date-range')}>
              <Calendar className="mr-2 h-4 w-4" />
              Last 30 Days
            </Button>
            <Button onClick={() => handleAction('export')}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Total Conversations', value: '12,847', change: '+15.3%', icon: MessageSquare, color: 'text-blue-600' },
            { title: 'Unique Users', value: '8,234', change: '+12.1%', icon: Users, color: 'text-green-600' },
            { title: 'Resolution Rate', value: '89.2%', change: '+3.4%', icon: TrendingUp, color: 'text-purple-600' },
            { title: 'Avg Session Time', value: '4m 32s', change: '+8.7%', icon: BarChart3, color: 'text-orange-600' }
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-light text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{metric.value}</p>
                  <p className="text-sm text-green-600 font-medium mt-1">{metric.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${metric.color}`}>
                  <metric.icon className="h-6 w-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Conversation Volume</h2>
              <Button variant="ghost" size="sm" onClick={() => handleAction('view-chart')}>
                View Details
              </Button>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 font-light">Chart visualization would appear here</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">User Satisfaction</h2>
              <Button variant="ghost" size="sm" onClick={() => handleAction('view-satisfaction')}>
                View Details
              </Button>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 font-light">Satisfaction trends would appear here</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Inquiries</h3>
            <div className="space-y-4">
              {[
                { topic: 'Billing Questions', count: 1247, percentage: 35 },
                { topic: 'Technical Support', count: 892, percentage: 25 },
                { topic: 'Account Management', count: 634, percentage: 18 },
                { topic: 'Product Information', count: 445, percentage: 12 },
                { topic: 'General Inquiries', count: 356, percentage: 10 }
              ].map((item, index) => (
                <div key={item.topic} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.topic}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-medium text-gray-900">{item.count}</p>
                    <p className="text-xs text-gray-500 font-light">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Response Times</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 font-light">Average Response</span>
                <span className="text-sm font-medium">1.2s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 font-light">Fastest Response</span>
                <span className="text-sm font-medium">0.3s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 font-light">95th Percentile</span>
                <span className="text-sm font-medium">2.8s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 font-light">Timeout Rate</span>
                <span className="text-sm font-medium">0.1%</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">User Engagement</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 font-light">Messages per Session</span>
                <span className="text-sm font-medium">4.7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 font-light">Return Users</span>
                <span className="text-sm font-medium">23.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 font-light">Completion Rate</span>
                <span className="text-sm font-medium">87.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 font-light">Escalation Rate</span>
                <span className="text-sm font-medium">5.8%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Analytics;