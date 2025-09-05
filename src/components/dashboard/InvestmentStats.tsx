"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const InvestmentStats = () => {
  const [stats, setStats] = useState({
    roundUpsThisMonth: 84.25,
    totalInvested: 1842.50,
    activeInvestments: 7
  });

  // Update stats when balance changes
  useEffect(() => {
    const handleBalanceUpdate = (event: CustomEvent) => {
      // In a real app, this would calculate based on actual investments
      // For now, we'll just update the total invested value
      setStats(prev => ({
        ...prev,
        totalInvested: (event as CustomEvent).detail.balance
      }));
    };

    window.addEventListener('balanceUpdated', handleBalanceUpdate as EventListener);
    return () => {
      window.removeEventListener('balanceUpdated', handleBalanceUpdate as EventListener);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Round-ups This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.roundUpsThisMonth.toFixed(2)}</div>
          <Badge variant="secondary" className="mt-1">
            +$12.50
          </Badge>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Invested
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalInvested.toFixed(2)}</div>
          <Badge variant="secondary" className="mt-1">
            +8.2%
          </Badge>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Active Investments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeInvestments}</div>
          <Badge variant="secondary" className="mt-1">
            2 new
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentStats;