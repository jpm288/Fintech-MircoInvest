"use client";

import React, { useState, useEffect } from "react";
import { Home, TrendingUp, Wallet, BarChart3, Settings, User, Moon, Sun, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Default to system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemPrefersDark);
      if (systemPrefersDark) {
        document.documentElement.classList.add('dark');
      }
    }

    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

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
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Theme and Language Toggle */}
      <div className="absolute top-4 right-4 flex space-x-2 z-10">
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle language"
        >
          <Globe className="h-5 w-5" />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>

      <main className="flex-1 pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
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
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" 
                    : "text-gray-500 dark:text-gray-400"
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