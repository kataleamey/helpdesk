import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, Plus, FileText, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { useKnowledgeBase } from '@/contexts/KnowledgeBaseContext';
import { Button } from '@/components/ui/button';
import KnowledgeBaseList from '@/components/knowledge-base/KnowledgeBaseList';
import KnowledgeBaseEdit from '@/components/knowledge-base/KnowledgeBaseEdit';
import KnowledgeBaseAdd from '@/components/knowledge-base/KnowledgeBaseAdd';
import KnowledgeBaseAddForm from '@/components/knowledge-base/KnowledgeBaseAddForm';

function KnowledgeBase() {
  const { documents, addDocument, updateDocument, deleteDocument } = useKnowledgeBase();
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('list'); // 'list', 'add', 'edit', 'add-form'
  const [addType, setAddType] = useState(null); // 'blank', 'pdf', 'url'
  const [editingDocument, setEditingDocument] = useState(null);

  const handleEditClick = (doc) => {
    setEditingDocument({ ...doc });
    setView('edit');
  };

  const handleDelete = (docId) => {
    deleteDocument(docId);
    setView('list');
    setEditingDocument(null);
  };

  const handleSave = (doc) => {
    updateDocument(doc);
    setView('list');
    setEditingDocument(null);
  };

  const handleAddClick = (type) => {
    setAddType(type);
    setView('add-form');
  };

  const handleSaveNewDocument = (newDoc) => {
    addDocument(newDoc);
    setView('list');
    setAddType(null);
  };

  const filteredItems = documents.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const renderView = () => {
    switch (view) {
      case 'add':
        return (
          <KnowledgeBaseAdd 
            onBack={() => setView('list')} 
            onAddClick={handleAddClick} 
          />
        );
      case 'add-form':
        return (
          <KnowledgeBaseAddForm
            type={addType}
            onBack={() => setView('add')}
            onSave={handleSaveNewDocument}
          />
        );
      case 'edit':
        return (
          <KnowledgeBaseEdit
            document={editingDocument}
            onBack={() => setView('list')}
            onSave={handleSave}
            onDelete={handleDelete}
            setDocument={setEditingDocument}
          />
        );
      case 'list':
      default:
        return (
          <KnowledgeBaseList
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredItems={filteredItems}
            onAddDocument={() => setView('add')}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Knowledge Base - Help Desk</title>
        <meta name="description" content="Manage your documents and knowledge sources to power your AI assistant." />
      </Helmet>

      <div className="p-8 w-full h-full overflow-y-auto bg-gray-50">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </div>
    </>
  );
}

export default KnowledgeBase;