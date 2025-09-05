"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { Calendar, TrendingUp, DollarSign } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Analytics = () => {
  const [timeFrame, setTimeFrame] = useState("30d");
  
  // Mock data for different time frames
  const getDataForTimeFrame = (frame: string) => {
    switch (frame) {
      case "7d":
        return [
          { date: "Mon", value: 1000 },
          { date: "Tue", value: 1020 },
          { date: "Wed", value: 1050 },
          { date: "Thu", value: 1070 },
          { date: "Fri", value: 1100 },
          { date: "Sat", value: 1120 },
          { date: "Sun", value: 1150 },
        ];
      case "90d":
        return [
          { date: "Apr", value: 1000 },
          { date: "May", value: 1120 },
          { date: "Jun", value: 1250 },
          { date: "Jul", value: 1320 },
          { date: "Aug", value: 1480 },
          { date: "Sep", value: 1650 },
        ];
      case "1y":
        return [
          { date: "Jan", value: 1000 },
          { date: "Feb", value: 1050 },
          { date: "Mar", value: 1120 },
          { date: "Apr", value: 1180 },
          { date: "May", value: 1250 },
          { date: "Jun", value: 1320 },
          { date: "Jul", value: 1400 },
          { date: "Aug", value: 1480 },
          { date: "Sep", value: 1550 },
          { date: "Oct", value: 1620 },
          { date: "Nov", value: 1700 },
          { date: "Dec", value: 1820 },
        ];
      case "all":
        return [
          { date: "Q1", value: 1000 },
          { date: "Q2", value: 1250 },
          { date: "Q3", value: 1480 },
          { date: "Q4", value: 1820 },
        ];
      default: // 30d
        return [
          { date: "Jun 1", value: 1000 },
          { date: "Jun 5", value: 1050 },
          { date: "Jun 10", value: 1120 },
          { date: "Jun 15", value: 1200 },
          { date: "Jun 20", value: 1280 },
          { date: "Jun 25", value: 1380 },
          { date: "Jun 30", value: 1480 },
        ];
    }
  };

  // Mock data for round-ups by category
  const categoryData = [
    { category: "Food & Drink", amount: 42.50 },
    { category: "Shopping", amount: 38.25 },
    { category: "Transport", amount: 32.75 },
    { category: "Entertainment", amount: 28.50 },
    { category: "Groceries", amount: 25.00 },
  ];

  const growthData = getDataForTimeFrame(timeFrame);
  const totalGrowth = growthData[growthData.length - 1].value - growthData[0].value;
  const growthPercentage = growthData[0].value !== 0 
    ? ((totalGrowth / growthData[0].value) * 100).toFixed(1)
    : "0";

  const timeFrameOptions = [
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
    { value: "1y", label: "1 Year" },
    { value: "all", label: "All Time" },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Investment Analytics</h1>
          <div className="w-32">
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeFrameOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-gray-500">Track your investment performance and trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-bold">${growthData[growthData.length - 1].value.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Growth</p>
                <p className="text-2xl font-bold text-green-600">+${totalGrowth.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Growth Rate</p>
                <p className="text-2xl font-bold text-purple-600">+{growthPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Investment Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Round-ups by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium mb-2">Top Performing Assets</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Tech ETF</span>
                  <span className="text-green-600">+15.2%</span>
                </li>
                <li className="flex justify-between">
                  <span>Crypto Index</span>
                  <span className="text-green-600">+12.8%</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Recent Activity</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Round-ups this month</span>
                  <span>$84.25</span>
                </li>
                <li className="flex justify-between">
                  <span>Investments made</span>
                  <span>12</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Savings Impact</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Annualized return</span>
                  <span>8.4%</span>
                </li>
                <li className="flex justify-between">
                  <span>Projected 5-year growth</span>
                  <span>$2,450</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;