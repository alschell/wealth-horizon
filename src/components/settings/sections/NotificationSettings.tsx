
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const NotificationSettings = () => {
  const handleSaveSettings = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        <p className="text-sm text-gray-500">
          Control which notifications you receive and how they are delivered
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="border-b pb-5">
          <h4 className="font-medium mb-4">Email Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Account Activity</p>
                <p className="text-sm text-gray-500">Receive notifications about your account activity and security</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Trade Confirmations</p>
                <p className="text-sm text-gray-500">Receive notifications when trades are executed</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Market Updates</p>
                <p className="text-sm text-gray-500">Daily or weekly summaries of market movements</p>
              </div>
              <Switch defaultChecked={false} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Cash Activity</p>
                <p className="text-sm text-gray-500">Receive alerts for deposits, withdrawals, and transfers</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Documents & Statements</p>
                <p className="text-sm text-gray-500">Be notified when new documents are available</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
          </div>
        </div>
        
        <div className="border-b pb-5">
          <h4 className="font-medium mb-4">In-App Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alerts & Reminders</p>
                <p className="text-sm text-gray-500">Important alerts and reminders about your account</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Price Alerts</p>
                <p className="text-sm text-gray-500">Notifications when assets reach defined price points</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">System Announcements</p>
                <p className="text-sm text-gray-500">Updates about platform features and maintenance</p>
              </div>
              <Switch defaultChecked={false} />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">SMS Notifications</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Security Alerts</p>
                <p className="text-sm text-gray-500">Critical security alerts for your account</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Trade Notifications</p>
                <p className="text-sm text-gray-500">SMS alerts when trades are executed</p>
              </div>
              <Switch defaultChecked={false} />
            </div>
          </div>
        </div>
      </div>
      
      <Button onClick={handleSaveSettings}>
        Save Notification Settings
      </Button>
    </div>
  );
};

export default NotificationSettings;
