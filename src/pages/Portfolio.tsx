"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Settings } from "lucide-react";

const Portfolio = () => {
  const investments = [
    {
      id: 1,
      name: "Tech Growth ETF",
      symbol: "TECH",
      value: 650.25,
      change: 12.4,
      allocation: 35,
      color: "bg-blue-500",
      type: "ETF"
    },
    {
      id: 2,
      name: "Crypto Index",
      symbol: "CRYPTO",
      value: 325.75,
      change: 8.2,
      allocation: 25,
      color: "bg-green-500",
      type: "Crypto"
    },
    {
      id: 3,
      name: "Green Energy Fund",
      symbol: "GREEN",
      value: 180.50,
      change: 5.7,
      allocation: 20,
      color: "bg-emerald-500",
      type: "ETF"
    },
    {
      id: 4,
      name: "Healthcare ETF",
      symbol: "HEALTH",
      value: 125.00,
      change: 3.1,
      allocation: 15,
      color: "bg-purple-500",
      type: "ETF"
    },
    {
      id: 5,
      name: "International Markets",
      symbol: "GLOBAL",
      value: 75.25,
      change: -1.2,
      allocation: 5,
      color: "bg-amber-500",
      type: "ETF"
    }
  ];

  const totalValue = investments.reduce((sum, investment) => sum + investment.value, 0);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Portfolio</h1>
            <p className="text-gray-500">Your investment allocation and performance</p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Rebalance
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-3xl font-bold">${totalValue.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Gain</p>
              <p className="text-xl font-bold text-green-600">+$124.75 (12.4%)</p>
            </div>
          </div>
          <Button className="w-full">Add Funds</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between text-sm font-medium text-gray-500">
          <span>Asset</span>
          <span>Allocation</span>
        </div>
        
        {investments.map((investment) => (
          <Card key={investment.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${investment.color} mr-3`}></div>
                  <div>
                    <h3 className="font-medium">{investment.name}</h3>
                    <p className="text-sm text-gray-500">{investment.symbol} • {investment.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${investment.value.toFixed(2)}</p>
                  <Badge variant={investment.change >= 0 ? "secondary" : "destructive"}>
                    {investment.change >= 0 ? '+' : ''}{investment.change}%
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center mt-2">
                <div className="w-full">
                  <Progress value={investment.allocation} className="h-2" />
                </div>
                <span className="text-sm font-medium w-12 text-right">{investment.allocation}%</span>
              </div>
              
              <div className="flex justify-end mt-3 space-x-2">
                <Button variant="outline" size="sm">Adjust</Button>
                <Button variant="outline" size="sm">Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;