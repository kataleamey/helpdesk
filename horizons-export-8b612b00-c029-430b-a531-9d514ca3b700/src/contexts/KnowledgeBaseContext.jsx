
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const initialKnowledgeItems = [
  {
    id: 1,
    title: 'Onboarding New Customers',
    source: 'Internal Document',
    lastUpdated: '2025-07-15',
    content: 'Welcome to our service! Here are the first steps to get you started. First, configure your account settings. Second, invite your team members. Finally, explore our main features through the guided tour.'
  },
  {
    id: 2,
    title: 'Refund Policy Q3 2025',
    source: 'Uploaded PDF',
    lastUpdated: '2025-07-12',
    content: 'Our Q3 2025 refund policy states that customers can request a full refund within 14 days of purchase. After 14 days, a partial refund may be issued on a case-by-case basis. All refund requests should be submitted through our support portal.'
  },
  {
    id: 3,
    title: 'API Rate Limits',
    source: 'Web Page',
    lastUpdated: '2025-07-10',
    content: 'The rate limit for our public API is 100 requests per minute per API key. For enterprise plans, this limit can be increased. Please contact sales for more information on custom rate limits.'
  },
  {
    id: 4,
    title: 'Troubleshooting Login Issues',
    source: 'Internal Document',
    lastUpdated: '2025-07-05',
    content: 'If a user is unable to log in, first ask them to reset their password. If the issue persists, check if their account is locked or if there are any ongoing service outages. Escalate to a senior technician if the problem is not resolved within 15 minutes.'
  }
];

const KnowledgeBaseContext = createContext();

export const useKnowledgeBase = () => useContext(KnowledgeBaseContext);

export const KnowledgeBaseProvider = ({ children }) => {
  const [documents, setDocuments] = useState(() => {
    try {
      const localData = window.localStorage.getItem('knowledgeBaseDocuments');
      if (localData) {
        return JSON.parse(localData);
      }
    } catch (error) {
      console.error("Error reading knowledge base from localStorage", error);
    }
    return initialKnowledgeItems;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('knowledgeBaseDocuments', JSON.stringify(documents));
    } catch (error) {
      console.error("Error saving knowledge base to localStorage", error);
    }
  }, [documents]);

  const addDocument = (newDoc) => {
    const documentToAdd = {
      ...newDoc,
      id: Date.now(),
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setDocuments(prevDocs => [documentToAdd, ...prevDocs]);
    toast({
      title: "Document Added",
      description: "The new document has been added to your knowledge base.",
    });
  };

  const updateDocument = (updatedDoc) => {
    setDocuments(prevDocs => prevDocs.map(doc => 
      doc.id === updatedDoc.id 
        ? { ...updatedDoc, lastUpdated: new Date().toISOString().split('T')[0] } 
        : doc
    ));
    toast({
      title: "Document Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const deleteDocument = (docId) => {
    setDocuments(prevDocs => prevDocs.filter(d => d.id !== docId));
    toast({
      title: "Document Deleted",
      description: "The document has been successfully removed.",
      variant: 'default',
    });
  };

  const value = {
    documents,
    addDocument,
    updateDocument,
    deleteDocument,
  };

  return (
    <KnowledgeBaseContext.Provider value={value}>
      {children}
    </KnowledgeBaseContext.Provider>
  );
};
