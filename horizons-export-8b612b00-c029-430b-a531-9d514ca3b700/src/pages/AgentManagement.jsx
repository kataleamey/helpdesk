import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Pencil, Trash2, Mail, Loader2 } from "lucide-react";
import { useSettings } from '@/contexts/SettingsContext';

const initialAgents = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Agent" },
  { id: 3, name: "Peter Jones", email: "peter.jones@example.com", role: "Viewer" },
];

const sendInvite = async ({ to, name, role, from, apiKey }) => {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Hi ${name},</h2>
      <p>You've been invited to join the Help Desk team as a(n) <strong>${role}</strong>.</p>
      <p>Click the button below to set up your account and get started.</p>
      <a href="https://example.com/signup" style="background-color: #2563eb; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 8px; font-size: 16px;">Create Account</a>
      <p>Welcome aboard!</p>
      <p>- The Help Desk Team</p>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: from,
        to: to,
        subject: "You're invited to join the Help Desk team!",
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorResult = await response.json();
      const errorMessage = errorResult?.message || `HTTP error! status: ${response.status}`;
      console.error("Resend API Error:", errorResult);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    console.error("Error in sendInvite function:", err);
    return { success: false, error: err.message };
  }
};


function AgentManagement() {
  const [agents, setAgents] = useState(initialAgents);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isEmailPreviewOpen, setEmailPreviewOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({ name: "", email: "", role: "" });
  const [editingAgent, setEditingAgent] = useState(null);
  const { emailConfig } = useSettings();
  const [isSending, setIsSending] = useState(false);

  const handlePreviewEmail = () => {
    if (!newAgent.name || !newAgent.email || !newAgent.role) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (!emailConfig.apiKey || !emailConfig.from) {
      toast({
        title: "Email Not Configured",
        description: "Please configure your email settings in the 'Email' tab before sending invites.",
        variant: "destructive",
      });
      return;
    }
    
    setCreateDialogOpen(false);
    setEmailPreviewOpen(true);
  };

  const handleCreateAgent = async () => {
    setIsSending(true);

    try {
      const result = await sendInvite({
        to: newAgent.email,
        name: newAgent.name,
        role: newAgent.role,
        from: emailConfig.from,
        apiKey: emailConfig.apiKey,
      });

      if (result.success) {
        setAgents([...agents, { id: Date.now(), ...newAgent }]);
        setEmailPreviewOpen(false);
        toast({
          title: "Success! Agent Invited 🚀",
          description: `An invitation email has been sent to ${newAgent.email}.`,
        });
        setNewAgent({ name: "", email: "", role: "" });
      } else {
        throw new Error(result.error || 'An unknown error occurred.');
      }
    } catch (error) {
      toast({
        title: "Error Sending Email",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleEditClick = (agent) => {
    setEditingAgent({ ...agent });
    setEditDialogOpen(true);
  };
  
  const handleUpdateAgent = () => {
    if (!editingAgent || !editingAgent.name || !editingAgent.email || !editingAgent.role) {
        toast({
            title: "Error",
            description: "Please fill in all fields.",
            variant: "destructive",
        });
        return;
    }
    setAgents(agents.map(agent => agent.id === editingAgent.id ? editingAgent : agent));
    setEditDialogOpen(false);
    setEditingAgent(null);
    toast({
        title: "Success!",
        description: "Agent information has been updated.",
    });
  };

  const handleNotImplemented = () => {
      toast({
          title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
      });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Manage Agents</h3>
          <p className="text-sm text-muted-foreground">
            Add, remove, or edit agents in your team.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Agent</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Agent</DialogTitle>
              <DialogDescription>
                Add a new team member to your help desk. They will receive an email to set up their account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="create-name" className="text-right">Name</Label>
                <Input id="create-name" value={newAgent.name} onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="create-email" className="text-right">Email</Label>
                <Input id="create-email" type="email" value={newAgent.email} onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="create-role" className="text-right">Role</Label>
                <Select onValueChange={(value) => setNewAgent({ ...newAgent, role: value })}>
                  <SelectTrigger className="col-span-3"><SelectValue placeholder="Select a role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Agent">Agent</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handlePreviewEmail}>Create & Send Invite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell className="font-medium">{agent.name}</TableCell>
                <TableCell>{agent.email}</TableCell>
                <TableCell>{agent.role}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditClick(agent)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={handleNotImplemented}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {editingAgent && (
        <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Agent</DialogTitle>
                    <DialogDescription>
                        Update the details for {editingAgent.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-name" className="text-right">Name</Label>
                        <Input id="edit-name" value={editingAgent.name} onChange={(e) => setEditingAgent({ ...editingAgent, name: e.target.value })} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-email" className="text-right">Email</Label>
                        <Input id="edit-email" type="email" value={editingAgent.email} onChange={(e) => setEditingAgent({ ...editingAgent, email: e.target.value })} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="edit-role" className="text-right">Role</Label>
                        <Select value={editingAgent.role} onValueChange={(value) => setEditingAgent({ ...editingAgent, role: value })}>
                            <SelectTrigger className="col-span-3"><SelectValue placeholder="Select a role" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Agent">Agent</SelectItem>
                                <SelectItem value="Viewer">Viewer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleUpdateAgent}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )}

      <Dialog open={isEmailPreviewOpen} onOpenChange={setEmailPreviewOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Email Invitation Preview</DialogTitle>
            <DialogDescription>
              This is a preview of the email that will be sent to {newAgent.email}.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 rounded-lg border bg-gray-50 p-6">
            <p className="text-sm text-gray-500 mb-4">From: {emailConfig.from}</p>
            <p className="text-sm text-gray-500 mb-4">Subject: You're invited to join the Help Desk team!</p>
            <div className="space-y-4 text-gray-800">
              <p>Hi {newAgent.name || "there"},</p>
              <p>You've been invited to join the Help Desk team as an <span className="font-semibold">{newAgent.role || "Agent"}</span>.</p>
              <p>Click the button below to set up your account and get started.</p>
              <div className="text-center py-2">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Create Account</Button>
              </div>
              <p>Welcome aboard!</p>
              <p className="text-sm text-gray-600">- The Help Desk Team</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setEmailPreviewOpen(false); setCreateDialogOpen(true); }}>Cancel</Button>
            <Button onClick={handleCreateAgent} disabled={isSending}>
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Confirm & Send
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AgentManagement;