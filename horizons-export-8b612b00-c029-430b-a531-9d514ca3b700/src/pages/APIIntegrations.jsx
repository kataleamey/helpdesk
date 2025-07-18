import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { CheckCircle, ExternalLink, Power, PowerOff, Eye, EyeOff, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useLLM } from '@/contexts/LLMContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const IntegrationCard = ({ integration, onConnect, onDisconnect }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleConnect = () => {
    if (apiKey.trim()) {
      onConnect(integration.id, apiKey);
    } else {
      toast({
        title: 'API Key Required',
        description: `Please enter your API key for ${integration.name}.`,
        variant: 'destructive',
      });
    }
  };

  const cardVariants = {
    connected: 'border-green-300 bg-green-50/50',
    disconnected: 'border-gray-200 bg-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl p-6 hover:shadow-lg transition-all flex flex-col justify-between ${cardVariants[integration.isConnected ? 'connected' : 'disconnected']}`}
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 flex-shrink-0">
              <img  alt={`${integration.name} logo`} src="https://images.unsplash.com/photo-1636114673156-052a83459fc1" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{integration.name}</h3>
              <p className="text-sm text-gray-600 font-light">{integration.description}</p>
            </div>
          </div>
          {integration.isConnected && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Active</span>
            </div>
          )}
        </div>
        {!integration.isConnected && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500">API KEY</label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={`Enter your ${integration.name} API key`}
                className="w-full p-2 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                disabled={integration.isConnected}
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6">
        {integration.isConnected ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-white"
            onClick={() => onDisconnect(integration.id)}
          >
            <PowerOff className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        ) : (
          <Button
            size="sm"
            className="w-full"
            onClick={handleConnect}
          >
            <Power className="mr-2 h-4 w-4" />
            Connect
          </Button>
        )}
      </div>
    </motion.div>
  );
};

const AddIntegrationDialog = ({ onAddIntegration }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [model, setModel] = useState('');

    const handleAdd = () => {
        if (name && description && model) {
            onAddIntegration({
                name,
                description,
                model,
                isConnected: false,
                apiKey: null,
            });
            setName('');
            setDescription('');
            setModel('');
            setOpen(false);
        } else {
            toast({
                title: 'All fields required',
                description: 'Please fill out all fields to add a new integration.',
                variant: 'destructive',
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Integration
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Custom Integration</DialogTitle>
                    <DialogDescription>
                        Add a new LLM provider by providing the required details.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Input id="description" value={description} onChange={e => setDescription(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="model" className="text-right">Model</Label>
                        <Input id="model" value={model} onChange={e => setModel(e.target.value)} className="col-span-3" placeholder="e.g. openai/gpt-4" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAdd}>Add Integration</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

function APIIntegrations() {
  const { integrations, connectLLM, disconnectLLM, addIntegration } = useLLM();

  return (
    <>
      <Helmet>
        <title>API Integrations - AI Models</title>
        <meta name="description" content="Connect your AI chatbot with leading large language models like Gemini, ChatGPT, Claude, and more." />
      </Helmet>

      <motion.div 
        className="p-8 w-full h-full overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Model Integrations</h1>
            <p className="text-gray-600 mt-1">Connect your help desk to the world's leading AI models.</p>
          </div>
          <div className="flex space-x-2">
            <a href="https://openrouter.ai/docs" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Documentation
              </Button>
            </a>
            <AddIntegrationDialog onAddIntegration={addIntegration} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {integrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onConnect={connectLLM}
              onDisconnect={disconnectLLM}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default APIIntegrations;