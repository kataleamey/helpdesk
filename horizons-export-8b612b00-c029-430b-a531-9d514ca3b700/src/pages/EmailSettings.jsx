import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useSettings } from '@/contexts/SettingsContext';

function EmailSettings() {
  const { emailConfig, saveEmailConfig } = useSettings();
  const [currentConfig, setCurrentConfig] = useState({ from: '', apiKey: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCurrentConfig(emailConfig);
    if (!emailConfig.from && !emailConfig.apiKey) {
      setIsEditing(true);
    }
  }, [emailConfig]);

  const handleSave = () => {
    if (!currentConfig.from || !currentConfig.apiKey) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }
    saveEmailConfig(currentConfig);
    toast({
      title: 'Success!',
      description: 'Email settings have been saved.',
    });
    setIsEditing(false);
  };
  
  const handleChange = (e) => {
    setCurrentConfig({ ...currentConfig, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Email Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure your email provider to send invitations and notifications.
        </p>
      </div>
      <div className="rounded-md border p-6">
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="from">"From" Email Address</Label>
            <Input
              type="email"
              id="from"
              name="from"
              placeholder="notifications@yourcompany.com"
              value={currentConfig.from}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="apiKey">Email Provider API Key</Label>
            <Input
              type="password"
              id="apiKey"
              name="apiKey"
              placeholder="••••••••••••••••••••••••"
              value={currentConfig.apiKey}
              onChange={handleChange}
              disabled={!isEditing}
            />
             <p className="text-xs text-muted-foreground pt-1">
              We recommend using a service like Resend for reliable email delivery.
            </p>
          </div>
        </div>
        <div className="flex justify-start mt-6">
          {isEditing ? (
            <Button onClick={handleSave}>Save Configuration</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Configuration</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailSettings;