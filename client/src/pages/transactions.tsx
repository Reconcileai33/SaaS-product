import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/ui/stat-card";
import GlowCard from "@/components/ui/glow-card";
import { 
  ArrowUpRight, 
  DollarSign, 
  CheckCircle, 
  Search, 
  FileDown, 
  Filter,
  Clock
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { pageContainerVariants, pageItemVariants } from "@/lib/animations";

const Transactions = () => {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Query for transactions data
  const { data, isLoading } = useQuery({
    queryKey: ['/api/transactions'],
    enabled: mounted
  });
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Sample transactions (would come from API in a real app)
  const transactions = [
    {
      id: 1,
      description: "Payment from Client A",
      amount: 1500,
      status: "completed",
      gateway: "Stripe",
      date: "2023-05-30"
    },
    {
      id: 2,
      description: "Vendor Payment",
      amount: -800,
      status: "pending",
      gateway: "PayPal",
      date: "2023-05-29"
    },
    {
      id: 3,
      description: "Monthly Subscription",
      amount: 2500,
      status: "completed",
      gateway: "Stripe",
      date: "2023-05-28"
    }
  ];
  
  const filteredTransactions = transactions.filter(
    transaction => transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={pageItemVariants} className="mb-8">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-muted-foreground mt-1">View and manage your transaction history</p>
      </motion.div>
      
      {/* Stats Cards */}
      <motion.div variants={pageItemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Volume"
          value={48250}
          formattedValue="$48,250"
          prefix="$"
          icon={<DollarSign />}
          change={10.5}
          progress={65}
        />
        
        <StatCard
          title="Pending"
          value={5420}
          formattedValue="$5,420"
          prefix="$"
          icon={<Clock />}
          change={8}
          progress={35}
          progressColor="bg-amber-500"
          iconColor="text-amber-500"
          iconBackground="bg-amber-500/10"
        />
        
        <StatCard
          title="Success Rate"
          value={98.5}
          suffix="%"
          icon={<CheckCircle />}
          change={0.4}
          progress={98.5}
          progressColor="bg-green-500"
          iconColor="text-green-500"
          iconBackground="bg-green-500/10"
        />
      </motion.div>
      
      {/* Transactions Table */}
      <motion.div variants={pageItemVariants}>
        <GlowCard>
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search transactions..." 
                    className="pl-10 bg-accent/40 border-accent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="outline" className="flex items-center gap-2 sm:flex-grow-0 flex-grow">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 sm:flex-grow-0 flex-grow">
                    <FileDown className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-muted-foreground border-b border-accent/60">
                      <th className="text-left pl-4 py-3">Transaction</th>
                      <th className="text-right py-3">Amount</th>
                      <th className="text-left py-3">Gateway</th>
                      <th className="text-left py-3">Status</th>
                      <th className="text-left py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      // Loading skeleton
                      Array(3).fill(0).map((_, idx) => (
                        <tr key={idx} className="animate-pulse border-b border-accent/30">
                          <td className="pl-4 py-4">
                            <div className="h-4 bg-accent/50 rounded w-32"></div>
                          </td>
                          <td className="text-right py-4">
                            <div className="h-4 bg-accent/50 rounded w-16 ml-auto"></div>
                          </td>
                          <td className="py-4">
                            <div className="h-4 bg-accent/50 rounded w-16"></div>
                          </td>
                          <td className="py-4">
                            <div className="h-4 bg-accent/50 rounded w-20"></div>
                          </td>
                          <td className="py-4">
                            <div className="h-4 bg-accent/50 rounded w-24"></div>
                          </td>
                        </tr>
                      ))
                    ) : filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-muted-foreground">
                          No transactions found
                        </td>
                      </tr>
                    ) : (
                      filteredTransactions.map((transaction) => (
                        <motion.tr 
                          key={transaction.id} 
                          className="border-b border-accent/30 hover:bg-accent/30 transition-colors"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td className="pl-4 py-4 font-medium">{transaction.description}</td>
                          <td className={`text-right py-4 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {transaction.amount < 0 ? '- $' : '+ $'}{Math.abs(transaction.amount).toLocaleString()}
                          </td>
                          <td className="py-4">{transaction.gateway}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              transaction.status === 'completed' 
                                ? 'bg-green-500/10 text-green-500' 
                                : 'bg-amber-500/10 text-amber-500'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="py-4 text-muted-foreground">{transaction.date}</td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{filteredTransactions.length}</span> of {transactions.length} transactions
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </GlowCard>
      </motion.div>
    </motion.div>
  );
};

export default Transactions;
