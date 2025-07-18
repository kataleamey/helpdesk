import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, FilePlus2, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AddOptionCard = ({ icon: Icon, title, description, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.08)" }}
    transition={{ type: 'spring', stiffness: 300 }}
    onClick={onClick}
    className="bg-white rounded-xl p-8 text-center flex flex-col items-center justify-center cursor-pointer border border-gray-200"
  >
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Icon className="h-8 w-8 text-gray-600" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </motion.div>
);

const KnowledgeBaseAdd = ({ onBack, onAddClick }) => {
  return (
    <motion.div
      key="add"
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
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Add a New Document</h1>
        <p className="text-gray-600 mt-2">You can upload PDFs, create documents, or link web pages.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AddOptionCard
          icon={Upload}
          title="Upload PDF File"
          description="Directly upload your file with the required information."
          onClick={() => onAddClick('pdf')}
        />
        <AddOptionCard
          icon={FilePlus2}
          title="Blank Document"
          description="Manually add the information to a blank document."
          onClick={() => onAddClick('blank')}
        />
        <AddOptionCard
          icon={LinkIcon}
          title="Paste from URL"
          description="Scan information from URL link to document or website."
          onClick={() => onAddClick('url')}
        />
      </div>
    </motion.div>
  );
};

export default KnowledgeBaseAdd;