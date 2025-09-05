"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Settings, Plus } from "lucide-react";
import { showSuccess } from "@/utils/toast";

const Portfolio = () => {
  const [investments, setInvestments] = useState([
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
  ]);
  
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [addFundsDialogOpen, setAddFundsDialogOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null);
  const [newAllocation, setNewAllocation] = useState(0);
  const [addFundsAmount, setAddFundsAmount] = useState(100);

  const totalValue = investments.reduce((sum, investment) => sum + investment.value, 0);

  const handleAdjustClick = (investment: any) => {
    setSelectedInvestment(investment);
    setNewAllocation(investment.allocation);
    setAdjustDialogOpen(true);
  };

  const handleDetailsClick = (investment: any) => {
    setSelectedInvestment(investment);
    setDetailsDialogOpen(true);
  };

  const saveAllocation = () => {
    if (selectedInvestment) {
      setInvestments(investments.map(investment => 
        investment.id === selectedInvestment.id 
          ? { ...investment, allocation: newAllocation } 
          : investment
      ));
      setAdjustDialogOpen(false);
      setSelectedInvestment(null);
      showSuccess("Allocation updated successfully");
    }
  };

  const handleAddFunds = () => {
    setAddFundsDialogOpen(true);
  };

  const confirmAddFunds = () => {
    // In a real app, this would connect to a payment system
    showSuccess(`$${addFundsAmount} added to your portfolio`);
    setAddFundsDialogOpen(false);
    setAddFundsAmount(100);
  };

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
          <Button className="w-full" onClick={handleAddFunds}>
            <Plus className="h-4 w-4 mr-2" />
            Add Funds
          </Button>
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
                <Button variant="outline" size="sm" onClick={() => handleAdjustClick(investment)}>
                  Adjust
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDetailsClick(investment)}>
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Adjust Allocation Dialog */}
      <Dialog open={adjustDialogOpen} onOpenChange={setAdjustDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Allocation</DialogTitle>
          </DialogHeader>
          {selectedInvestment && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${selectedInvestment.color} mr-3`}></div>
                  <div>
                    <h3 className="font-medium">{selectedInvestment.name}</h3>
                    <p className="text-sm text-gray-500">{selectedInvestment.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${selectedInvestment.value.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{selectedInvestment.allocation}%</p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="allocation">New Allocation Percentage</Label>
                <div className="flex items-center mt-2">
                  <Input
                    id="allocation"
                    type="number"
                    min="0"
                    max="100"
                    value={newAllocation}
                    onChange={(e) => setNewAllocation(parseInt(e.target.value) || 0)}
                    className="max-w-[120px]"
                  />
                  <span className="ml-2">%</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Enter a value between 0% and 100%</p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setAdjustDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveAllocation}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Investment Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Investment Details</DialogTitle>
          </DialogHeader>
          {selectedInvestment && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${selectedInvestment.color} mr-3`}></div>
                  <div>
                    <h3 className="font-medium">{selectedInvestment.name}</h3>
                    <p className="text-sm text-gray-500">{selectedInvestment.symbol} • {selectedInvestment.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${selectedInvestment.value.toFixed(2)}</p>
                  <Badge variant={selectedInvestment.change >= 0 ? "secondary" : "destructive"}>
                    {selectedInvestment.change >= 0 ? '+' : ''}{selectedInvestment.change}%
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Allocation</p>
                  <p className="font-medium">{selectedInvestment.allocation}%</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Total Gain</p>
                  <p className="font-medium">${(selectedInvestment.value * selectedInvestment.change / 100).toFixed(2)}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">1 Month</span>
                    <span className={selectedInvestment.change >= 0 ? "text-green-600" : "text-red-600"}>
                      +{selectedInvestment.change}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">3 Months</span>
                    <span className="text-green-600">+{selectedInvestment.change * 2.5}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">1 Year</span>
                    <span className="text-green-600">+{selectedInvestment.change * 8}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Funds Dialog */}
      <Dialog open={addFundsDialogOpen} onOpenChange={setAddFundsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Funds to Portfolio</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Linked Account</h3>
              <p className="text-sm">Chase Bank ****4832</p>
            </div>
            
            <div>
              <Label htmlFor="amount">Amount to Add</Label>
              <div className="flex items-center mt-2">
                <span className="mr-2">$</span>
                <Input
                  id="amount"
                  type="number"
                  value={addFundsAmount}
                  onChange={(e) => setAddFundsAmount(Number(e.target.value))}
                  className="max-w-[160px]"
                />
              </div>
              <div className="flex space-x-2 mt-2">
                {[50, 100, 250, 500].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAddFundsAmount(amount)}
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
              <Button variant="outline" onClick={() => setAddFundsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmAddFunds}>
                Add Funds
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Portfolio;