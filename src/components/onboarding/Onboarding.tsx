"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  CreditCard, 
  Shield, 
  Coins,
  CheckCircle,
  ArrowRight,
  Building
} from "lucide-react";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [accountLinked, setAccountLinked] = useState(false);

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLinkAccount = () => {
    setAccountLinked(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Coins className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to MicroInvest!</h2>
            <p className="text-gray-600 mb-6">
              Automatically invest your spare change and grow your wealth effortlessly.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">How it works:</h3>
              <ul className="text-left text-sm space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Link your bank account or card
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  We round up your purchases to the nearest dollar
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Invest the spare change in ETFs and crypto
                </li>
              </ul>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Create Your Account</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={userInfo.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Building className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Link Your Account</h2>
            <p className="text-gray-600 mb-6">
              Connect your bank account to start investing your spare change.
            </p>
            
            {!accountLinked ? (
              <div className="space-y-4">
                <Button 
                  onClick={handleLinkAccount} 
                  className="w-full"
                  variant="outline"
                >
                  <Building className="h-4 w-4 mr-2" />
                  Link Bank Account
                </Button>
                <p className="text-sm text-gray-500">or</p>
                <Button 
                  onClick={handleLinkAccount} 
                  className="w-full"
                  variant="outline"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Link Credit Card
                </Button>
              </div>
            ) : (
              <div className="bg-green-50 p-6 rounded-lg">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Account Linked Successfully!</h3>
                <p className="text-gray-600">
                  We've connected your account. You're ready to start investing.
                </p>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Set Your Preferences</h2>
            <p className="text-gray-600 mb-6">
              Customize how you want to invest your spare change.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Investment Focus</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-16 flex flex-col">
                    <Coins className="h-5 w-5 mb-1" />
                    <span>ETFs</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col">
                    <Coins className="h-5 w-5 mb-1" />
                    <span>Crypto</span>
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Risk Level</h3>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Conservative</span>
                  <span>Moderate</span>
                  <span>Aggressive</span>
                </div>
                <div className="bg-gray-200 h-2 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full w-1/2"></div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Round-up Settings</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Enable Round-ups</span>
                    <Badge variant="secondary">ON</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Automatically invest spare change from purchases
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Step {step} of {totalSteps}</CardTitle>
              <div className="flex mt-2">
                {[...Array(totalSteps)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 flex-1 mx-1 rounded-full ${
                      i < step ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
            {step > 1 && (
              <Button variant="ghost" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          {renderStep()}
          
          <div className="mt-8">
            {step < totalSteps ? (
              <Button 
                onClick={handleNext} 
                className="w-full"
                disabled={step === 2 && (!userInfo.name || !userInfo.email || !userInfo.password)}
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button className="w-full">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;