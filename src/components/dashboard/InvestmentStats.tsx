"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const InvestmentStats = () => {
  const stats = [
    { title: "Round-ups This Month", value: "$84.25", change: "+$12.50" },
    { title: "Total Invested", value: "$1,842.50", change: "+8.2%" },
    { title: "Active Investments", value: "7", change: "2 new" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <Badge variant="secondary" className="mt-1">
              {stat.change}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InvestmentStats;