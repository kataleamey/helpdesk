import React from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentManagement from "@/pages/AgentManagement";
import EmailSettings from "@/pages/EmailSettings";

function Settings() {
  return (
    <>
      <Helmet>
        <title>Settings - Help Desk</title>
        <meta name="description" content="Manage application settings." />
      </Helmet>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users & Permissions</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="general" disabled>General</TabsTrigger>
            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="space-y-4">
            <AgentManagement />
          </TabsContent>
          <TabsContent value="email" className="space-y-4">
            <EmailSettings />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Settings;