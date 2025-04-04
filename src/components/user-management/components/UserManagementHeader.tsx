
import React from "react";
import { motion } from "framer-motion";
import { Users, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useInviteUserDialog } from "../hooks/useInviteUserDialog";

const UserManagementHeader = () => {
  const { openInviteDialog } = useInviteUserDialog();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
    >
      <div>
        <h1 className="text-3xl font-bold text-black">Manage Users & Permissions</h1>
        <p className="text-gray-500 mt-1">
          Manage users, permissions and access to your financial data
        </p>
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search users..." 
            className="pl-10 bg-white" 
          />
        </div>
        <Button onClick={openInviteDialog} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>
    </motion.div>
  );
};

export default UserManagementHeader;
