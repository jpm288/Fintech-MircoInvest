"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Plus, Minus } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const BalanceCard = () => {
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [investAmount, setInvestAmount] = useState(50);
  const [withdrawAmount, setWithdrawAmount] = useState(25);
  const [balance, setBalance] = useState(1248.75);

  const handleInvestNow = () => {
    setInvestDialogOpen(true);
  };

  const handleWithdraw = () => {
    setWithdrawDialogOpen(true);
  };

  const confirmInvestment = () => {
    // Update balance
    const newBalance = balance + investAmount;
    setBalance(newBalance);
    
    // Dispatch event to update other components
    const event = new CustomEvent('balanceUpdated', { detail: { balance: newBalance } });
    window.dispatchEvent(event);
    
    showSuccess(`$${investAmount} invested successfully`);
    setInvestDialogOpen(false);
    setInvestAmount(50);
  };

  const confirmWithdrawal = () => {
    // Update balance
    const newBalance = balance - withdrawAmount;
    setBalance(newBalance);
    
    // Dispatch event to update other components
    const event = new CustomEvent('balanceUpdated', { detail: { balance: newBalance } });
    window.dispatchEvent(event);
    
    showSuccess(`$${withdrawAmount} withdrawal initiated`);
    setWithdrawDialogOpen(false);
    setWithdrawAmount(25);
  };

  return (
    <>
      <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Total Balance</span>
            <Wallet className="h-6 w-6" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">${balance.toFixed(2)}</div>
          <p className="text-blue-100 mb-4">+12.4% this month</p>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={handleInvestNow}
            >
              <Plus className="h-4 w-4 mr-2" />
              Invest Now
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30"
              onClick={handleWithdraw}
            >
              <Minus className="h-4 w-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invest Dialog */}
      <Dialog open={investDialogOpen} onOpenChange={setInvestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invest Funds</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Available Balance</h3>
              <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
            </div>
            
            <div>
              <Label htmlFor="investAmount">Amount to Invest</Label>
              <div className="flex items-center mt-2">
                <span className="mr-2">$</span>
                <Input
                  id="investAmount"
                  type="number"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(Number(e.target.value))}
                  className="max-w-[160px]"
                />
              </div>
              <div className="flex space-x-2 mt-2">
                {[25, 50, 100, 250].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setInvestAmount(amount)}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Investment Allocation</h4>
              <p className="text-sm text-gray-500">
                Your funds will be automatically allocated based on your current portfolio settings.
              </p>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setInvestDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmInvestment}>
                Invest Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Available Balance</h3>
              <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
            </div>
            
            <div>
              <Label htmlFor="withdrawAmount">Amount to Withdraw</Label>
              <div className="flex items-center mt-2">
                <span className="mr-2">$</span>
                <Input
                  id="withdrawAmount"
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="max-w-[160px]"
                />
              </div>
              <div className="flex space-x-2 mt-2">
                {[25, 50, 100, 250].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setWithdrawAmount(amount)}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Withdrawal Method</h4>
              <p className="text-sm text-gray-500">
                Funds will be transferred to your linked bank account (Chase ****4832) within 1-3 business days.
              </p>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setWithdrawDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmWithdrawal}>
                Withdraw Funds
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BalanceCard;