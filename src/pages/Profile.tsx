"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Gift, 
  Share2,
  LogOut
} from "lucide-react";

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-500">Manage your account and preferences</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h2 className="text-xl font-bold">Alex Chen</h2>
              <p className="text-gray-500">Member since June 2023</p>
              <Badge variant="secondary" className="mt-1">Premium Member</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              <span>alex.chen@email.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="h-5 w-5 mr-2" />
              Referral Program
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Invite friends to join and earn rewards!</p>
            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
              <div>
                <p className="font-medium">Your Referral Code</p>
                <p className="text-sm text-gray-500">REF123456</p>
              </div>
              <Button variant="outline">Share</Button>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-500">Friends Joined</p>
              </div>
              <div>
                <p className="text-2xl font-bold">$15</p>
                <p className="text-sm text-gray-500">Rewards Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between">
              Update Personal Information
              <User className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              Change Password
              <Lock className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              Share Feedback
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between text-red-500 hover:text-red-600">
              Log Out
              <LogOut className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;