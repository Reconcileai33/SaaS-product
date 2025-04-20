import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, RefreshCw, Calendar, FileCheck, AlertTriangle, Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import StatCard from "@/components/ui/stat-card";
import GlowCard from "@/components/ui/glow-card";
import { useQuery } from "@tanstack/react-query";
import { pageContainerVariants, pageItemVariants } from "@/lib/animations";

const Reconciliations = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Query for reconciliation data
  const { data, isLoading } = useQuery({
    queryKey: ['/api/reconciliations'],
    enabled: mounted
  });

  // Sample reconciliation tasks (would come from API in a real app)
  const reconciliationTasks = [
    {
      id: 1,
      title: "Daily Bank Reconciliation",
      description: "Matching bank transactions with internal records",
      status: "completed",
      lastRun: "2 hours ago",
      nextRun: "Tomorrow, 9:00 AM",
      matchRate: 98.5
    },
    {
      id: 2,
      title: "Credit Card Statement Reconciliation",
      description: "Matching credit card statements with transaction records",
      status: "scheduled",
      lastRun: "Yesterday",
      nextRun: "June 15, 2023",
      matchRate: 95.2
    },
    {
      id: 3,
      title: "PayPal Account Reconciliation",
      description: "Matching PayPal transactions with internal records",
      status: "in_progress",
      lastRun: "5 hours ago",
      nextRun: "N/A",
      matchRate: 92.8
    }
  ];

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={pageItemVariants} className="mb-8">
        <h1 className="text-2xl font-bold">Reconciliations</h1>
        <p className="text-muted-foreground mt-1">Manage and track your reconciliation processes</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={pageItemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Transactions"
          value={0}
          icon={<Activity />}
          progress={0}
        />
        
        <StatCard
          title="AI Matched"
          value={0}
          icon={<Zap />}
          progress={0}
          progressColor="bg-secondary"
          iconColor="text-secondary"
          iconBackground="bg-secondary/10"
        />
        
        <StatCard
          title="Pending Review"
          value={0}
          icon={<AlertTriangle />}
          progress={0}
          progressColor="bg-amber-500"
          iconColor="text-amber-500"
          iconBackground="bg-amber-500/10"
        />
        
        <StatCard
          title="Success Rate"
          value={0}
          suffix="%"
          icon={<FileCheck />}
          progress={0}
          progressColor="bg-green-500"
          iconColor="text-green-500"
          iconBackground="bg-green-500/10"
        />
      </motion.div>

      {/* AI Transaction Matching */}
      <motion.div variants={pageItemVariants} className="mb-8">
        <GlowCard>
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-lg font-semibold">AI Transaction Matching</h2>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Generate Matches</span>
                </Button>
              </div>

              <div className="grid place-items-center py-24">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center p-6 bg-accent/40 rounded-full mb-4">
                    <FileCheck className="h-12 w-12 text-muted-foreground opacity-50" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No transactions to match</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                    Your reconciliation is up to date. Import new transactions or come back later.
                  </p>
                  <Button variant="outline">Import Transactions</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </GlowCard>
      </motion.div>

      {/* Reconciliation Tasks */}
      <motion.div variants={pageItemVariants}>
        <GlowCard borderColor="border-secondary/10" glowColor="rgba(139, 92, 246, 0.3)">
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-secondary mr-2" />
                  <h2 className="text-lg font-semibold">Scheduled Reconciliations</h2>
                </div>
                <Button className="bg-secondary hover:bg-secondary/90 text-white">New Schedule</Button>
              </div>

              <div className="space-y-4">
                {reconciliationTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="border border-border/50 p-4 rounded-lg hover:bg-accent/20 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                      <div>
                        <span 
                          className={`text-xs px-2 py-1 rounded-full ${
                            task.status === 'completed' 
                              ? 'bg-green-500/10 text-green-500' 
                              : task.status === 'in_progress'
                                ? 'bg-amber-500/10 text-amber-500'
                                : 'bg-blue-500/10 text-blue-500'
                          }`}
                        >
                          {task.status === 'completed' 
                            ? 'Completed' 
                            : task.status === 'in_progress'
                              ? 'In Progress'
                              : 'Scheduled'
                          }
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <RefreshCw className="h-3.5 w-3.5 mr-1" />
                        <span>Last run: {task.lastRun}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>Next run: {task.nextRun}</span>
                      </div>
                      <div className="flex items-center">
                        <FileCheck className="h-3.5 w-3.5 mr-1" />
                        <span>Match rate: {task.matchRate}%</span>
                      </div>
                    </div>

                    <div className="flex justify-end mt-3 gap-2">
                      <Button variant="ghost" size="sm" className="text-xs">View Details</Button>
                      <Button variant="outline" size="sm" className="text-xs">Run Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </GlowCard>
      </motion.div>
    </motion.div>
  );
};

export default Reconciliations;
