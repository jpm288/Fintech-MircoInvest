"use client";

import React from "react";
import BalanceCard from "@/components/dashboard/BalanceCard";
import InvestmentStats from "@/components/dashboard/InvestmentStats";
import PortfolioChart from "@/components/dashboard/PortfolioChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const recentTransactions = [
    { id: 1, name: "Coffee Shop", amount: 4.75, roundUp: 0.25, date: "2023-06-15" },
    { id: 2, name: "Grocery Store", amount: 32.40, roundUp: 0.60, date: "2023-06-14" },
    { id: 3, name: "Online Retail", amount: 45.99, roundUp: 0.01, date: "2023-06-13" },
    { id: 4, name: "Gas Station", amount: 38.50, roundUp: 1.50, date: "2023-06-12" },
  ];

  const handleViewAll = () => {
    navigate("/transactions");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Logo Bar */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <div className="flex items-center">
          <div className="bg-blue-600 text-white rounded-lg w-10 h-10 flex items-center justify-center font-bold text-xl mr-3">
            μI
          </div>
          <h1 className="text-2xl font-bold">MicroInvest</h1>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-500">Here's what's happening with your investments</p>
      </div>

      <div className="space-y-6">
        <BalanceCard />
        
        <InvestmentStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioChart />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Round-ups</span>
                <Button variant="ghost" size="sm" onClick={handleViewAll}>View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">+${transaction.roundUp.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">${transaction.amount.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;