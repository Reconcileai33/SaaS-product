import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  BarChart4, 
  ExternalLink,
  ChevronRight,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  IndianRupee
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { pageContainerVariants, pageItemVariants, shimmerVariants } from "@/lib/animations";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type TransactionStatus = "reconciled" | "pending" | "mismatch" | "failed";

interface Transaction {
  id: number;
  amount: number;
  description: string;
  source: {
    id: string;
    name: string;
  };
  destination: {
    id: string;
    name: string;
  };
  status: TransactionStatus;
  date: string;
}

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Stats data
  const stats = {
    totalTransactions: {
      value: 0,
      change: 15.3,
      changeDirection: "up" as "up" | "down",
      period: "vs last week"
    },
    pendingReconciliations: {
      value: 0,
      change: 12.5,
      changeDirection: "down" as "up" | "down",
      period: "vs last week"
    },
    successfulMatches: {
      value: "0.0%",
      change: 2.1,
      changeDirection: "up" as "up" | "down",
      period: "vs last week"
    },
    processingFeeSaved: {
      value: 0,
      change: 16.4,
      changeDirection: "up" as "up" | "down",
      period: "vs last week"
    }
  };

  // Sample transactions data
  const transactions = [
    {
      id: 1,
      amount: 78750.5,
      description: "Client Payment - Project Alpha",
      source: {
        id: "razorpay",
        name: "RazorpayX"
      },
      destination: {
        id: "hdfc",
        name: "HDFC Bank"
      },
      status: "reconciled" as TransactionStatus,
      date: "about 3 hours ago"
    },
    {
      id: 2,
      amount: 25499.99,
      description: "Office Rent",
      source: {
        id: "rbl",
        name: "RBL Bank"
      },
      destination: {
        id: "property",
        name: "Property Management"
      },
      status: "pending" as TransactionStatus,
      date: "about 7 hours ago"
    },
    {
      id: 3,
      amount: 12500,
      description: "Supplier Payment",
      source: {
        id: "razorpay",
        name: "RazorpayX"
      },
      destination: {
        id: "sbi",
        name: "SBI Bank"
      },
      status: "reconciled" as TransactionStatus,
      date: "about 15 hours ago"
    },
    {
      id: 4,
      amount: 37680.25,
      description: "Marketing Services",
      source: {
        id: "cashfree",
        name: "Cashfree"
      },
      destination: {
        id: "icici",
        name: "ICICI Bank"
      },
      status: "mismatch" as TransactionStatus,
      date: "1 day ago"
    },
    {
      id: 5,
      amount: 54250.75,
      description: "Software Subscription",
      source: {
        id: "rbl",
        name: "RBL Bank"
      },
      destination: {
        id: "vendor",
        name: "Vendor Account"
      },
      status: "failed" as TransactionStatus,
      date: "2 days ago"
    }
  ];

  // Connected sources
  const connectedSources = [
    {
      id: "razorpay",
      name: "RazorpayX",
      type: "Payment Gateway",
      status: "active"
    },
    {
      id: "rbl",
      name: "RBL Bank",
      type: "Banking",
      status: "syncing"
    },
    {
      id: "cashfree",
      name: "Cashfree",
      type: "Payment Service",
      status: "active"
    }
  ];

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case "reconciled":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-blue-500 text-white";
      case "mismatch":
        return "bg-amber-500 text-white";
      case "failed":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusBadge = (status: TransactionStatus) => {
    const baseClasses = "px-2 py-0.5 rounded-full text-xs font-medium";
    
    switch (status) {
      case "reconciled":
        return (
          <span className={`${baseClasses} bg-green-500/10 text-green-500 border border-green-500/20`}>
            Reconciled
          </span>
        );
      case "pending":
        return (
          <span className={`${baseClasses} bg-blue-500/10 text-blue-500 border border-blue-500/20`}>
            Pending
          </span>
        );
      case "mismatch":
        return (
          <span className={`${baseClasses} bg-amber-500/10 text-amber-500 border border-amber-500/20`}>
            Mismatch
          </span>
        );
      case "failed":
        return (
          <span className={`${baseClasses} bg-red-500/10 text-red-500 border border-red-500/20`}>
            Failed
          </span>
        );
    }
  };

  const getSourceIcon = (sourceId: string) => {
    switch (sourceId) {
      case "razorpay":
        return (
          <div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-500">
            R
          </div>
        );
      case "rbl":
        return (
          <div className="w-6 h-6 rounded-md bg-red-500/10 flex items-center justify-center text-red-500">
            RB
          </div>
        );
      case "cashfree":
        return (
          <div className="w-6 h-6 rounded-md bg-green-500/10 flex items-center justify-center text-green-500">
            CF
          </div>
        );
      case "hdfc":
      case "sbi":
      case "icici":
        return (
          <div className="w-6 h-6 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-500">
            {sourceId.substring(0, 2).toUpperCase()}
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 rounded-md bg-gray-500/10 flex items-center justify-center text-gray-500">
            ?
          </div>
        );
    }
  };

  const StatCard = ({ title, value, icon, change, changeDirection, period }: { 
    title: string;
    value: number | string;
    icon: React.ReactNode;
    change: number;
    changeDirection: "up" | "down";
    period: string;
  }) => {
    return (
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="pt-6 px-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <h3 className="text-2xl font-bold mt-1">{value}</h3>
              
              <div className="flex items-center mt-2">
                <div className={`flex items-center text-xs ${changeDirection === "up" ? "text-green-500" : "text-red-500"}`}>
                  {changeDirection === "up" ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {change}%
                </div>
                <span className="text-xs text-muted-foreground ml-1">{period}</span>
              </div>
            </div>
            
            <div className={`w-10 h-10 rounded-full ${
              title.includes("Transactions") 
                ? "bg-purple-500/10" 
                : title.includes("Reconciliations") 
                  ? "bg-red-500/10"
                  : title.includes("Matches")
                    ? "bg-green-500/10"
                    : "bg-blue-500/10"
            } flex items-center justify-center`}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  };

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Section */}
      <motion.div variants={pageItemVariants} className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, sss!</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your reconciliation today.</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search transactions..."
              className="pl-9 bg-slate-900 border-slate-800"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[100px] bg-slate-900 border-slate-800">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-800">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>
      
      {/* Stats Cards */}
      <motion.div variants={pageItemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Transactions" 
          value={stats.totalTransactions.value}
          icon={<BarChart4 className="h-5 w-5 text-purple-500" />}
          change={stats.totalTransactions.change}
          changeDirection={stats.totalTransactions.changeDirection}
          period={stats.totalTransactions.period}
        />
        
        <StatCard 
          title="Pending Reconciliations" 
          value={stats.pendingReconciliations.value}
          icon={<Clock className="h-5 w-5 text-red-500" />}
          change={stats.pendingReconciliations.change}
          changeDirection={stats.pendingReconciliations.changeDirection}
          period={stats.pendingReconciliations.period}
        />
        
        <StatCard 
          title="Successful Matches" 
          value={stats.successfulMatches.value}
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
          change={stats.successfulMatches.change}
          changeDirection={stats.successfulMatches.changeDirection}
          period={stats.successfulMatches.period}
        />
        
        <StatCard 
          title="Processing Fee Saved" 
          value={stats.processingFeeSaved.value}
          icon={<IndianRupee className="h-5 w-5 text-blue-500" />}
          change={stats.processingFeeSaved.change}
          changeDirection={stats.processingFeeSaved.changeDirection}
          period={stats.processingFeeSaved.period}
        />
      </motion.div>
      
      {/* Chart Section */}
      <motion.div variants={pageItemVariants} className="mb-8">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Reconciliation Performance</CardTitle>
            <Tabs defaultValue="day">
              <TabsList className="bg-slate-800">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Weekly</TabsTrigger>
                <TabsTrigger value="month">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              {/* Placeholder for chart */}
              <div className="w-full h-full">
                <div className="flex h-full items-end justify-between gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="relative flex h-full w-full flex-col items-center">
                      <div 
                        className="w-full rounded-t bg-purple-500"
                        style={{ height: `${Math.random() * 70 + 20}%` }}
                      ></div>
                      {i % 3 === 0 && (
                        <div 
                          className="absolute bottom-0 left-0 w-full rounded-t bg-orange-500"
                          style={{ height: `${Math.random() * 20 + 10}%`, zIndex: 2 }}
                        ></div>
                      )}
                      <div 
                        className="absolute bottom-0 left-0 w-full rounded-t bg-cyan-500"
                        style={{ height: `${Math.random() * 40 + 20}%`, zIndex: 1 }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center space-x-4">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-xs text-muted-foreground">Transactions</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-cyan-500 mr-2"></div>
                    <span className="text-xs text-muted-foreground">Reconciled</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-orange-500 mr-2"></div>
                    <span className="text-xs text-muted-foreground">Pending</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-xl font-bold mt-1">1254</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-xl font-bold mt-1">98.3%</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Processing Time</p>
                <p className="text-xl font-bold mt-1">1.2s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Bottom Grid - Transactions & Connected Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <motion.div variants={pageItemVariants} className="lg:col-span-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 bg-slate-800 border-slate-700">
                  <Filter className="h-3.5 w-3.5 mr-1" />
                  <span>Filter</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8 bg-slate-800 border-slate-700">Refresh</Button>
                <Button size="sm" className="h-8 bg-purple-600 hover:bg-purple-700">Export</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md overflow-hidden border border-slate-800">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-800/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Source</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Destination</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-slate-800/30">
                          <td className="px-4 py-3 text-sm font-medium">#{transaction.id}</td>
                          <td className="px-4 py-3 text-sm">₹{transaction.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                          <td className="px-4 py-3 text-sm">{transaction.description}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center">
                              {getSourceIcon(transaction.source.id)}
                              <span className="ml-2">{transaction.source.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center">
                              {getSourceIcon(transaction.destination.id)}
                              <span className="ml-2">{transaction.destination.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {getStatusBadge(transaction.status)}
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{transaction.date}</td>
                          <td className="px-4 py-3 text-sm">
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-slate-800/30 px-4 py-2 text-sm flex items-center justify-between">
                  <span className="text-muted-foreground">Showing 5 of 5 transactions</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-7 px-2 text-xs bg-slate-800 border-slate-700" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 px-2 text-xs bg-slate-800 border-slate-700" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Connected Sources & AI Insights */}
        <motion.div variants={pageItemVariants} className="space-y-8">
          {/* Connected Sources */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Connected Sources</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">3/5 maximum connected accounts</p>
              </div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Connect New
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedSources.map((source) => (
                  <div key={source.id} className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center mr-3">
                        {getSourceIcon(source.id)}
                      </div>
                      <div>
                        <h4 className="font-medium">{source.name}</h4>
                        <p className="text-xs text-muted-foreground">{source.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {source.status === "active" ? (
                        <span className="mr-3 text-xs text-green-500 flex items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></div>
                          Connected
                        </span>
                      ) : (
                        <span className="mr-3 text-xs text-amber-500 flex items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-1"></div>
                          Sync...
                        </span>
                      )}
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* AI Insights */}
          <Card className="bg-slate-900 border-slate-800 overflow-hidden">
            <CardHeader>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-2">
                  <AlertCircle className="h-4 w-4 text-purple-500" />
                </div>
                <CardTitle>AI Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="px-6 pb-4">
                <p className="text-sm text-muted-foreground mb-4">Smart recommendations based on your data</p>
                
                <div className="space-y-3">
                  {/* Insight 1 */}
                  <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/10">
                    <div className="flex items-start mb-2">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                      <div>
                        <h4 className="text-sm font-medium">Reconciliation Gap</h4>
                        <p className="text-xs text-muted-foreground">7 transactions worth ₹35,450 remain unreconciled for 15 days. AI found potential matches.</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 h-7 text-xs">
                        Review Matches
                      </Button>
                    </div>
                  </div>
                  
                  {/* Insight 2 */}
                  <div className="p-3 rounded-lg border border-blue-500/20 bg-blue-500/10">
                    <div className="flex items-start mb-2">
                      <BarChart4 className="h-4 w-4 text-blue-500 mt-0.5 mr-2" />
                      <div>
                        <h4 className="text-sm font-medium">Peak Traffic Analysis</h4>
                        <p className="text-xs text-muted-foreground">Transaction volume increases 42% on Mondays. Consider adjusting staffing for reconciliation.</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 h-7 text-xs">
                        View Analysis
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full mt-4">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-medium">Your Plan</h3>
                    <div className="flex items-baseline mt-1">
                      <span className="text-white text-lg font-bold">₹5</span>
                      <span className="text-xs text-white/70 ml-1">per ₹1,000 transaction volume</span>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="h-8">
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;