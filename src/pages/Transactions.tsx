"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, DollarSign, Settings, Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Transactions = () => {
  const [roundUpsEnabled, setRoundUpsEnabled] = useState(true);
  const [transactions, setTransactions] = useState([
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
    { 
      id: 6, 
      name: "Pharmacy", 
      amount: 15.30, 
      roundUp: 0.70, 
      date: "2023-06-10", 
      category: "Healthcare",
      status: "completed"
    },
    { 
      id: 7, 
      name: "Entertainment", 
      amount: 22.99, 
      roundUp: 0.01, 
      date: "2023-06-09", 
      category: "Entertainment",
      status: "completed"
    },
  ]);
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [newRoundUpAmount, setNewRoundUpAmount] = useState(0);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [amountRange, setAmountRange] = useState({ min: 0, max: 100 });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories for filter dropdown
  const categories = ["all", ...Array.from(new Set(transactions.map(t => t.category)))];

  // Update transactions when round-ups are adjusted
  useEffect(() => {
    const handleTransactionUpdate = (event: CustomEvent) => {
      const updatedTransactions = transactions.map(transaction => 
        transaction.id === event.detail.id 
          ? { ...transaction, roundUp: event.detail.roundUp, status: "completed" } 
          : transaction
      );
      setTransactions(updatedTransactions);
    };

    window.addEventListener('transactionUpdated', handleTransactionUpdate as EventListener);
    return () => {
      window.removeEventListener('transactionUpdated', handleTransactionUpdate as EventListener);
    };
  }, [transactions]);

  const handleSkipRoundUp = (id: number) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === id 
        ? { ...transaction, status: "skipped" } 
        : transaction
    ));
  };

  const handleAdjustRoundUp = (transaction: any) => {
    setSelectedTransaction(transaction);
    setNewRoundUpAmount(transaction.roundUp);
    setAdjustDialogOpen(true);
  };

  const saveAdjustedRoundUp = () => {
    if (selectedTransaction) {
      const updatedTransactions = transactions.map(transaction => 
        transaction.id === selectedTransaction.id 
          ? { ...transaction, roundUp: newRoundUpAmount, status: "completed" } 
          : transaction
      );
      setTransactions(updatedTransactions);
      
      // Dispatch event to update other components
      const event = new CustomEvent('transactionUpdated', { 
        detail: { 
          id: selectedTransaction.id, 
          roundUp: newRoundUpAmount 
        } 
      });
      window.dispatchEvent(event);
      
      setAdjustDialogOpen(false);
      setSelectedTransaction(null);
    }
  };

  // Filter transactions based on all criteria
  const filteredTransactions = transactions.filter(transaction => {
    // Search term filter
    const matchesSearch = searchTerm === "" || 
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter === "all" || 
      transaction.category === categoryFilter;
    
    // Date range filter
    const matchesDateRange = (dateRange.start === "" || transaction.date >= dateRange.start) &&
      (dateRange.end === "" || transaction.date <= dateRange.end);
    
    // Amount range filter
    const matchesAmountRange = transaction.amount >= amountRange.min && 
      transaction.amount <= amountRange.max;
    
    return matchesSearch && matchesCategory && matchesDateRange && matchesAmountRange;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setDateRange({ start: "", end: "" });
    setAmountRange({ min: 0, max: 100 });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-gray-500 dark:text-gray-400">Your recent purchases and round-ups</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Filter Section */}
      {showFilters && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Filter Transactions</span>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="search"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  {searchTerm && (
                    <button 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setSearchTerm("")}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  />
                </div>
              </div>

              {/* Amount Range */}
              <div>
                <Label>Amount Range: ${amountRange.min} - ${amountRange.max}</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={amountRange.min || ""}
                    onChange={(e) => setAmountRange({...amountRange, min: Number(e.target.value) || 0})}
                    className="w-24"
                  />
                  <span className="text-gray-500">to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={amountRange.max || ""}
                    onChange={(e) => setAmountRange({...amountRange, max: Number(e.target.value) || 0})}
                    className="w-24"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Round-up Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable Round-ups</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Automatically invest spare change from purchases</p>
            </div>
            <Switch
              checked={roundUpsEnabled}
              onCheckedChange={setRoundUpsEnabled}
            />
          </div>
          
          {roundUpsEnabled && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Round-up Limit</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Maximum round-up per transaction: $1.00</p>
                </div>
                <Button variant="outline" size="sm">Adjust</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                    <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">{transaction.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date} • {transaction.category}</p>
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
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-right">${transaction.amount.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex justify-end mt-3 space-x-2">
                {transaction.status !== "skipped" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleSkipRoundUp(transaction.id)}
                  >
                    Skip
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleAdjustRoundUp(transaction)}
                >
                  Adjust
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={adjustDialogOpen} onOpenChange={setAdjustDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Round-up Amount</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <h3 className="font-medium">{selectedTransaction.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">${selectedTransaction.amount.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">+${selectedTransaction.roundUp.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Round-up</p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="roundUpAmount">New Round-up Amount</Label>
                <div className="flex items-center mt-2">
                  <span className="mr-2">$</span>
                  <Input
                    id="roundUpAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={newRoundUpAmount}
                    onChange={(e) => setNewRoundUpAmount(parseFloat(e.target.value) || 0)}
                    className="max-w-[120px]"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enter amount between $0.00 and $1.00</p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setAdjustDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveAdjustedRoundUp}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transactions;