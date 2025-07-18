import React from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, FileText, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const KnowledgeBaseList = ({ searchTerm, setSearchTerm, filteredItems, onAddDocument, onEdit, onDelete }) => {
  return (
    <motion.div
      key="list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-600 mt-1">Manage your documents and knowledge sources.</p>
        </div>
        <Button onClick={onAddDocument}>
          <Plus className="mr-2 h-4 w-4" />
          Add Document
        </Button>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">All Documents</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredItems.length > 0 ? filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onEdit(item)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Source: {item.source} &bull; Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onEdit(item); }}>
                    <Edit className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="text-center py-12 text-gray-500">
              <p>No documents found.</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default KnowledgeBaseList;