
import React from "react";
import UserManagementHeader from "./components/UserManagementHeader";
import UsersList from "./components/UsersList";
import InviteUserDialog from "./components/InviteUserDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const UserManagementInterface = () => {
  return (
    <div className="max-w-7xl mx-auto w-full p-4">
      <UserManagementHeader />
      <InviteUserDialog />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mb-8">
            <TabsTrigger value="active" className="text-sm">Active Users</TabsTrigger>
            <TabsTrigger value="invited" className="text-sm">Pending Invites</TabsTrigger>
            <TabsTrigger value="inactive" className="text-sm">Inactive Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-0">
            <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="p-4">
                <UsersList status="active" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="invited" className="mt-0">
            <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="p-4">
                <UsersList status="invited" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="inactive" className="mt-0">
            <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="p-4">
                <UsersList status="inactive" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default UserManagementInterface;
