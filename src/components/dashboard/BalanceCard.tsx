"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Wallet } from "lucide-react";

const BalanceCard = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Total Balance</span>
          <Wallet className="h-6 w-6" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-2">$1,248.75</div>
        <p className="text-blue-100 mb-4">+12.4% this month</p>
        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1">
            Invest Now
          </Button>
          <Button variant="outline" className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30">
            Withdraw
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;