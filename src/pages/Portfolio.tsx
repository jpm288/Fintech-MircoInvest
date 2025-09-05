"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Plus, ArrowUp, ArrowDown, Check } from "lucide-react";
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
      type: "ETF",
      benchmark: "S&P 500",
      benchmarkChange: 8.2
    },
    {
      id: 2,
      name: "Crypto Index",
      symbol: "CRYPTO",
      value: 325.75,
      change: 8.2,
      allocation: 25,
      color: "bg-green-500",
      type: "Crypto",
      benchmark: "Bitcoin",
      benchmarkChange: 15.3
    },
    {
      id: 3,
      name: "Green Energy Fund",
      symbol: "GREEN",
      value: 180.50,
      change: 5.7,
      allocation: 20,
      color: "bg-emerald-500",
      type: "ETF",
      benchmark: "Global Clean Energy Index",
      benchmarkChange: 7.1
    },
    {
      id: 4,
      name: "Healthcare ETF",
      symbol: "HEALTH",
      value: 125.00,
      change: 3.1,
      allocation: 15,
      color: "bg-purple-500",
      type: "ETF",
      benchmark: "Healthcare Select Sector SPDR",
      benchmarkChange: 4.8
    },
    {
      id: 5,
      name: "International Markets",
      symbol: "GLOBAL",
      value: 75.25,
      change: -1.2,
      allocation: 5,
      color: "bg-amber-500",
      type: "ETF",
      benchmark: "MSCI World Index",
      benchmarkChange: 2.3
    }
  ]);
  
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [addFundsDialogOpen, setAddFundsDialogOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null);
  const [newAllocation, setNewAllocation] = useState(''); // Changed to string
  const [addFundsAmount, setAddFundsAmount] = useState(''); // Changed to string
  const [totalValue, setTotalValue] = useState(1356.75);

  // Update portfolio when balance changes
  useEffect(() => {
    const handleBalanceUpdate = (event: CustomEvent) => {
      // In a real app, this would update individual investments
      // For now, we'll just update the total value
      setTotalValue((event as CustomEvent).detail.balance);
    };

    window.addEventListener('balanceUpdated', handleBalanceUpdate as EventListener);
    return () => {
      window.removeEventListener('balanceUpdated', handleBalanceUpdate as EventListener);
    };
  }, []);

  const handleAdjustClick = (investment: any) => {
    setSelectedInvestment(investment);
    setNewAllocation(investment.allocation.toString()); // Convert to string
    setAdjustDialogOpen(true);
  };

  const handleDetailsClick = (investment: any) => {
    setSelectedInvestment(investment);
    setDetailsDialogOpen(true);
  };

  const saveAllocation = () => {
    if (selectedInvestment) {
      // Convert string to number
      const allocationValue = parseInt(newAllocation) || 0;
      setInvestments(investments.map(investment => 
        investment.id === selectedInvestment.id 
          ? { ...investment, allocation: allocationValue } 
          : investment
      ));
      setAdjustDialogOpen(false);
      setSelectedInvestment(null);
      setNewAllocation(''); // Reset to empty string
      showSuccess("Allocation updated successfully");
    }
  };

  const handleAddFunds = () => {
    setAddFundsDialogOpen(true);
  };

  const confirmAddFunds = () => {
    // Convert string to number
    const amount = parseFloat(addFundsAmount) || 0;
    // Update total value
    const newTotalValue = totalValue + amount;
    setTotalValue(newTotalValue);
    
    // Dispatch event to update other components
    const event = new CustomEvent('balanceUpdated', { detail: { balance: newTotalValue } });
    window.dispatchEvent(event);
    
    showSuccess(`$${amount} added to your portfolio`);
    setAddFundsDialogOpen(false);
    setAddFundsAmount(''); // Reset to empty string
  };

  // Calculate performance comparison
  const getPerformanceComparison = (investment: any) => {
    const diff = investment.change - investment.benchmarkChange;
    return {
      difference: diff,
      isOutperforming: diff > 0
    };
  };

  // Find top performing investment
  const getTopPerformingInvestment = () => {
    return investments.reduce((top, current) => 
      current.change > top.change ? current : top
    );
  };

  const topPerformer = getTopPerformingInvestment();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Portfolio</h1>
            <p className="text-gray-500 dark:text-gray-400">Your investment allocation and performance</p>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
              <p className="text-3xl font-bold">${totalValue.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Gain</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">+$124.75 (12.4%)</p>
            </div>
          </div>
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
              <p className="text-sm">
                <span className="font-medium">{topPerformer.name}</span> is your top performer with <span className="font-medium">+{topPerformer.change}%</span> growth
              </p>
            </div>
          </div>
          <Button className="w-full" onClick={handleAddFunds}>
            <Plus className="h-4 w-4 mr-2" />
            Add Funds
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400">
          <span>Asset</span>
          <span>Allocation</span>
        </div>
        
        {investments.map((investment) => {
          const performance = getPerformanceComparison(investment);
          const isTopPerformer = investment.id === topPerformer.id;
          return (
            <Card key={investment.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${investment.color} mr-3`}></div>
                    <div>
                      <h3 className="font-medium">{investment.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{investment.symbol} • {investment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${investment.value.toFixed(2)}</p>
                    <div className="flex items-center">
                      <Badge 
                        variant="secondary"
                        className={investment.change >= 0 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}
                      >
                        {investment.change >= 0 ? '+' : ''}{investment.change}%
                      </Badge>
                      {performance.difference !== 0 && (
                        <Badge 
                          variant="secondary"
                          className={performance.isOutperforming ? "ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "ml-2 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}
                        >
                          {performance.isOutperforming ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                          {Math.abs(performance.difference).toFixed(1)}% vs {investment.benchmark}
                        </Badge>
                      )}
                      {isTopPerformer && (
                        <Badge className="ml-2 bg-green-500 hover:bg-green-600">
                          <Check className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
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
          );
        })}
      </div>

      {/* Adjust Allocation Dialog */}
      <Dialog open={adjustDialogOpen} onOpenChange={setAdjustDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Allocation</DialogTitle>
          </DialogHeader>
          {selectedInvestment && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${selectedInvestment.color} mr-3`}></div>
                  <div>
                    <h3 className="font-medium">{selectedInvestment.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedInvestment.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${selectedInvestment.value.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedInvestment.allocation}%</p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="allocation">New Allocation Percentage</Label>
                <div className="flex items-center mt-2">
                  <Input
                    id="allocation"
                    type="number"
                    value={newAllocation}
                    onChange={(e) => setNewAllocation(e.target.value)}
                    className="max-w-[120px]"
                    placeholder="0"
                  />
                  <span className="ml-2">%</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enter a value between 0% and 100%</p>
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
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${selectedInvestment.color} mr-3`}></div>
                  <div>
                    <h3 className="font-medium">{selectedInvestment.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedInvestment.symbol} • {selectedInvestment.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${selectedInvestment.value.toFixed(2)}</p>
                  <Badge 
                    variant="secondary"
                    className={selectedInvestment.change >= 0 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}
                  >
                    {selectedInvestment.change >= 0 ? '+' : ''}{selectedInvestment.change}%
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Allocation</p>
                  <p className="font-medium">{selectedInvestment.allocation}%</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Gain</p>
                  <p className="font-medium">${(selectedInvestment.value * selectedInvestment.change / 100).toFixed(2)}</p>
                </div>
              </div>
              
              {/* Performance Comparison Section */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Performance Comparison</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Your Investment</span>
                    <span className={selectedInvestment.change >= 0 ? "text-green-600 dark:text-green-400 font-medium" : "text-red-600 dark:text-red-400 font-medium"}>
                      {selectedInvestment.change >= 0 ? '+' : ''}{selectedInvestment.change}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Benchmark ({selectedInvestment.benchmark})</span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      +{selectedInvestment.benchmarkChange}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-medium">Performance Difference</span>
                    <span className={getPerformanceComparison(selectedInvestment).isOutperforming ? "text-green-600 dark:text-green-400 font-medium" : "text-red-600 dark:text-red-400 font-medium"}>
                      {getPerformanceComparison(selectedInvestment).isOutperforming ? '+' : ''}{getPerformanceComparison(selectedInvestment).difference.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Historical Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">1 Month</span>
                    <span className={selectedInvestment.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                      +{selectedInvestment.change}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">3 Months</span>
                    <span className="text-green-600 dark:text-green-400">+{selectedInvestment.change * 2.5}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">1 Year</span>
                    <span className="text-green-600 dark:text-green-400">+{selectedInvestment.change * 8}%</span>
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
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
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
                  onChange={(e) => setAddFundsAmount(e.target.value)}
                  className="max-w-[160px]"
                  placeholder="0"
                />
              </div>
              <div className="flex space-x-2 mt-2">
                {[50, 100, 250, 500].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAddFundsAmount(amount.toString())}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Investment Allocation</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
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