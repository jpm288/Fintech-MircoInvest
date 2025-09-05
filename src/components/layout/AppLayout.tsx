"use client";

import React, { useState } from "react";
import { Home, TrendingUp, Wallet, BarChart3, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getActiveTab = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname === "/portfolio") return "portfolio";
    if (location.pathname === "/transactions") return "transactions";
    if (location.pathname === "/analytics") return "analytics";
    if (location.pathname === "/settings") return "settings";
    if (location.pathname === "/profile") return "profile";
    return "home";
  };

  const activeTab = getActiveTab();

  const navItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "portfolio", icon: TrendingUp, label: "Portfolio", path: "/portfolio" },
    { id: "transactions", icon: Wallet, label: "Transactions", path: "/transactions" },
    { id: "analytics", icon: BarChart3, label: "Analytics", path: "/analytics" },
    { id: "profile", icon: User, label: "Profile", path: "/profile" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg",
                  activeTab === item.id 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-500"
                )}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;