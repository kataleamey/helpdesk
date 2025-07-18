import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

const KnowledgeBaseEdit = ({ document, onBack, onSave, onDelete, setDocument }) => {
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  return (
    <motion.div
      key="edit"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <Button variant="ghost" onClick={onBack} className="mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Knowledge Base
      </Button>
      <div className="bg-white p-8 rounded-xl border border-gray-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Document</h1>
            <p className="text-gray-600 mt-1">Update the details for this knowledge source.</p>
          </div>
          <Button variant="destructive" size="sm" onClick={() => onDelete(document.id)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="doc-title" className="block text-sm font-medium text-gray-700 mb-1">
              Document Title
            </label>
            <input
              ref={titleInputRef}
              id="doc-title"
              type="text"
              value={document.title}
              onChange={(e) => setDocument({ ...document, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="doc-source" className="block text-sm font-medium text-gray-700 mb-1">
              Source
            </label>
            <input
              id="doc-source"
              type="text"
              value={document.source}
              onChange={(e) => setDocument({ ...document, source: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="doc-content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="doc-content"
              rows="10"
              value={document.content}
              onChange={(e) => setDocument({ ...document, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={() => onSave(document)}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default KnowledgeBaseEdit;