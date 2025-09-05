"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar, DollarSign, Settings } from "lucide-react";

const Transactions = () => {
  const [roundUpsEnabled, setRoundUpsEnabled] = useState(true);
  
  const transactions = [
    { 
      id: 1, 
      name: "Coffee Shop", 
      amount: 4.75, 
      roundUp: 0.25, 
      date: "2023-06-15", 
      category: "Food & Drink",
      status: "completed"
    },
    { 
      id: 2, 
      name: "Grocery Store", 
      amount: 32.40, 
      roundUp: 0.60, 
      date: "2023-06-14", 
      category: "Groceries",
      status: "completed"
    },
    { 
      id: 3, 
      name: "Online Retail", 
      amount: 45.99, 
      roundUp: 0.01, 
      date: "2023-06-13", 
      category: "Shopping",
      status: "pending"
    },
    { 
      id: 4, 
      name: "Gas Station", 
      amount: 38.50, 
      roundUp: 1.50, 
      date: "2023-06-12", 
      category: "Transport",
      status: "completed"
    },
    { 
      id: 5, 
      name: "Restaurant", 
      amount: 27.80, 
      roundUp: 0.20, 
      date: "2023-06-11", 
      category: "Food & Drink",
      status: "skipped"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-gray-500">Your recent purchases and round-ups</p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Round-up Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable Round-ups</h3>
              <p className="text-sm text-gray-500">Automatically invest spare change from purchases</p>
            </div>
            <Switch
              checked={roundUpsEnabled}
              onCheckedChange={setRoundUpsEnabled}
            />
          </div>
          
          {roundUpsEnabled && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Round-up Limit</h4>
                  <p className="text-sm text-gray-500">Maximum round-up per transaction: $1.00</p>
                </div>
                <Button variant="outline" size="sm">Adjust</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <Card key={transaction.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{transaction.name}</h3>
                    <p className="text-sm text-gray-500">{transaction.date} • {transaction.category}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center">
                    <span className="font-medium mr-3">+${transaction.roundUp.toFixed(2)}</span>
                    {transaction.status === "completed" && (
                      <Badge variant="secondary">Completed</Badge>
                    )}
                    {transaction.status === "pending" && (
                      <Badge variant="outline">Pending</Badge>
                    )}
                    {transaction.status === "skipped" && (
                      <Badge variant="destructive">Skipped</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 text-right">${transaction.amount.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex justify-end mt-3 space-x-2">
                <Button variant="outline" size="sm">Skip</Button>
                <Button variant="outline" size="sm">Adjust</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Transactions;