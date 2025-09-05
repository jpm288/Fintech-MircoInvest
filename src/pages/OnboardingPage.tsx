"use client";

import React from "react";
import Onboarding from "@/components/onboarding/Onboarding";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4 text-gray-700 dark:text-gray-300"
          onClick={handleGoBack}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
      <Onboarding />
    </div>
  );
};

export default OnboardingPage;