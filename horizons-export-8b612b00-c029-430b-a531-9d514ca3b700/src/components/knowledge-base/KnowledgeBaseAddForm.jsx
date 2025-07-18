import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const KnowledgeBaseAddForm = ({ type, onBack, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const getFormTitle = () => {
    switch (type) {
      case 'blank': return 'Create New Document';
      case 'pdf': return 'Upload PDF Document';
      case 'url': return 'Add from URL';
      default: return 'Add Document';
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setTitle(file.name.replace(/\.[^/.]+$/, ""));
      setContent(`Content from ${file.name} will be extracted here upon processing.`);
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setTitle("Content from URL");
    setContent(`Content from ${e.target.value} will be fetched and displayed here.`);
  };

  const handleSave = () => {
    if (!title) {
      toast({
        title: "Title is required",
        description: "Please enter a title for the document.",
        variant: "destructive",
      });
      return;
    }
    onSave({
      title,
      content,
      source: type === 'pdf' ? 'Uploaded PDF' : type === 'url' ? 'Web Page' : 'Internal Document',
    });
  };

  return (
    <motion.div
      key="add-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <Button variant="ghost" onClick={onBack} className="mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Add Options
      </Button>
      <div className="bg-white p-8 rounded-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{getFormTitle()}</h1>
        <div className="space-y-6">
          {type === 'pdf' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PDF File
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF up to 10MB</p>
                </div>
              </div>
              {fileName && (
                <div className="mt-3 flex items-center justify-between text-sm bg-gray-50 p-2 rounded-md">
                  <p className="text-gray-700 truncate">{fileName}</p>
                  <Button variant="ghost" size="icon" onClick={() => setFileName('')}><X className="h-4 w-4" /></Button>
                </div>
              )}
            </div>
          )}

          {type === 'url' && (
            <div>
              <label htmlFor="doc-url" className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <input
                id="doc-url"
                type="url"
                placeholder="https://example.com/article"
                value={url}
                onChange={handleUrlChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label htmlFor="doc-title" className="block text-sm font-medium text-gray-700 mb-1">
              Document Title
            </label>
            <input
              ref={titleInputRef}
              id="doc-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {type === 'blank' && (
            <div>
              <label htmlFor="doc-content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="doc-content"
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Document
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default KnowledgeBaseAddForm;