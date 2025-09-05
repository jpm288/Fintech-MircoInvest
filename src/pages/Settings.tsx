"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Shield, 
  CreditCard, 
  User, 
  Building, 
  Globe, 
  Moon,
  Smartphone,
  Mail,
  Lock
} from "lucide-react";
import { showSuccess } from "@/utils/toast";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [riskLevel, setRiskLevel] = useState(5);
  const [autoDeposit, setAutoDeposit] = useState(true);
  const [depositAmount, setDepositAmount] = useState(25);
  const [investmentAllocation, setInvestmentAllocation] = useState({
    etfs: 60,
    crypto: 30,
    bonds: 10
  });

  const riskLabels = [
    "Conservative",
    "Moderate",
    "Balanced",
    "Growth",
    "Aggressive"
  ];

  const handleEditPersonalInfo = () => {
    showSuccess("Personal information updated successfully");
  };

  const handleChangePassword = () => {
    showSuccess("Password changed successfully");
  };

  const handleManageSecurity = () => {
    showSuccess("Security settings updated");
  };

  const handleAllocationChange = (type: string, value: number) => {
    setInvestmentAllocation(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSaveAllocation = () => {
    showSuccess("Investment allocation updated successfully");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your account preferences</p>
      </div>

      <div className="space-y-6">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Personal Information</h3>
                <p className="text-sm text-gray-500">Update your profile details</p>
              </div>
              <Button variant="outline" onClick={handleEditPersonalInfo}>Edit</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Security</h3>
                <p className="text-sm text-gray-500">Password, 2FA, and more</p>
              </div>
              <Button variant="outline" onClick={handleManageSecurity}>Manage</Button>
            </div>
          </CardContent>
        </Card>

        {/* Investment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Investment Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Risk Profile</h3>
              <div className="space-y-4">
                <Slider 
                  value={[riskLevel]} 
                  onValueChange={(value) => setRiskLevel(value[0])}
                  max={10} 
                  step={1} 
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Conservative</span>
                  <span className="font-medium text-blue-600">
                    {riskLabels[Math.min(4, Math.floor(riskLevel / 2.5))]}
                  </span>
                  <span>Aggressive</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Auto-deposit</h3>
                <p className="text-sm text-gray-500">Automatically invest when balance reaches threshold</p>
              </div>
              <Switch
                checked={autoDeposit}
                onCheckedChange={setAutoDeposit}
              />
            </div>
            
            {autoDeposit && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <Label htmlFor="deposit-amount" className="font-medium">Deposit Threshold</Label>
                <div className="flex items-center mt-2">
                  <span className="mr-2">$</span>
                  <Input
                    id="deposit-amount"
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="max-w-[120px]"
                  />
                  <Button variant="outline" size="sm" className="ml-2" onClick={() => showSuccess("Deposit threshold updated")}>Save</Button>
                </div>
              </div>
            )}
            
            <div>
              <h3 className="font-medium mb-2">Investment Allocation</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">ETFs</span>
                    <span className="text-sm font-medium">{investmentAllocation.etfs}%</span>
                  </div>
                  <Slider 
                    value={[investmentAllocation.etfs]} 
                    onValueChange={(value) => handleAllocationChange('etfs', value[0])}
                    max={100} 
                    step={1} 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Crypto</span>
                    <span className="text-sm font-medium">{investmentAllocation.crypto}%</span>
                  </div>
                  <Slider 
                    value={[investmentAllocation.crypto]} 
                    onValueChange={(value) => handleAllocationChange('crypto', value[0])}
                    max={100} 
                    step={1} 
                    className="w-full"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Bonds</span>
                    <span className="text-sm font-medium">{investmentAllocation.bonds}%</span>
                  </div>
                  <Slider 
                    value={[investmentAllocation.bonds]} 
                    onValueChange={(value) => handleAllocationChange('bonds', value[0])}
                    max={100} 
                    step={1} 
                    className="w-full"
                  />
                </div>
                
                <div className="pt-2">
                  <Button onClick={handleSaveAllocation} className="w-full">
                    Save Allocation
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-gray-500">Receive updates on your investments</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Updates</h3>
                <p className="text-sm text-gray-500">Monthly performance reports</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-gray-500">Switch to dark theme</p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Linked Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Linked Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-3 text-blue-500" />
                <div>
                  <h3 className="font-medium">Chase Bank ****4832</h3>
                  <p className="text-sm text-gray-500">Primary account</p>
                </div>
              </div>
              <Badge variant="secondary">Connected</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <Smartphone className="h-5 w-5 mr-3 text-green-500" />
                <div>
                  <h3 className="font-medium">Apple Card ****1298</h3>
                  <p className="text-sm text-gray-500">Secondary account</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Link</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;