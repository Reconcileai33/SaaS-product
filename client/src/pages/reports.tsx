import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pageContainerVariants, pageItemVariants } from "@/lib/animations";
import { BarChartBig, Download, FileBarChart, FilterX, LineChart, PieChart, Share2, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import GlowCard from "@/components/ui/glow-card";
import AnimatedChart from "@/components/ui/animated-chart";
import StatCard from "@/components/ui/stat-card";

const Reports = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Query for reports data
  const { data, isLoading } = useQuery({
    queryKey: ['/api/reports'],
    enabled: mounted
  });
  
  // Chart data
  const performanceData = [
    { value: 2400, label: "Jan" },
    { value: 1800, label: "Feb" },
    { value: 2900, label: "Mar" },
    { value: 1950, label: "Apr" },
    { value: 3100, label: "May" },
    { value: 2700, label: "Jun" }
  ];
  
  const reconciliationData = [
    { value: 98.2, label: "Jan" },
    { value: 97.5, label: "Feb" },
    { value: 99.1, label: "Mar" },
    { value: 98.7, label: "Apr" },
    { value: 99.5, label: "May" },
    { value: 99.8, label: "Jun" }
  ];
  
  // Sample report types
  const reportTypes = [
    { 
      id: "transaction-summary", 
      title: "Transaction Summary", 
      description: "Summary of all transactions by volume, status, and gateway",
      icon: <BarChartBig className="h-6 w-6 text-primary" />,
      lastGenerated: "Today, 2:30 PM"
    },
    { 
      id: "reconciliation-report", 
      title: "Reconciliation Report", 
      description: "Match rates, exceptions, and reconciliation performance",
      icon: <PieChart className="h-6 w-6 text-green-500" />,
      lastGenerated: "Yesterday, 5:15 PM"
    },
    { 
      id: "gateway-performance", 
      title: "Gateway Performance", 
      description: "Analysis of payment gateway reliability and fees",
      icon: <LineChart className="h-6 w-6 text-blue-500" />,
      lastGenerated: "June 15, 2023"
    },
    { 
      id: "financial-statement", 
      title: "Financial Statement", 
      description: "Balance sheet and cash flow from reconciled data",
      icon: <FileBarChart className="h-6 w-6 text-secondary" />,
      lastGenerated: "June 10, 2023"
    }
  ];

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={pageItemVariants} className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground mt-1">Generate and analyze financial reports</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center gap-2">
            <FilterX className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <Button variant="default" className="bg-primary hover:bg-primary/90 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>New Report</span>
          </Button>
        </div>
      </motion.div>
      
      {/* Stats Overview */}
      <motion.div variants={pageItemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Transactions"
          value={528249}
          formattedValue="$528,249"
          prefix="$"
          icon={<BarChartBig />}
          change={12.5}
          progress={75}
        />
        
        <StatCard
          title="Success Rate"
          value={99.3}
          suffix="%"
          icon={<TrendingUp />}
          change={0.8}
          changeLabel="+0.8% from last month"
          progress={99.3}
          progressColor="bg-green-500"
          iconColor="text-green-500"
          iconBackground="bg-green-500/10"
        />
        
        <StatCard
          title="Revenue"
          value={125850}
          formattedValue="$125,850"
          prefix="$"
          icon={<LineChart />}
          change={15.2}
          progress={80}
          progressColor="bg-secondary"
          iconColor="text-secondary"
          iconBackground="bg-secondary/10"
        />
      </motion.div>
      
      {/* Charts */}
      <motion.div variants={pageItemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <GlowCard>
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChartBig className="h-5 w-5 text-primary mr-2" />
                Transaction Volume Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <AnimatedChart 
                  data={performanceData}
                  height={250}
                  showValues={true}
                />
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                  <Share2 className="h-3 w-3" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </GlowCard>
        
        <GlowCard borderColor="border-green-500/10" glowColor="rgba(16, 185, 129, 0.3)">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <PieChart className="h-5 w-5 text-green-500 mr-2" />
                Reconciliation Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <AnimatedChart 
                  data={reconciliationData}
                  height={250}
                  showValues={true}
                />
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                  <Share2 className="h-3 w-3" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </GlowCard>
      </motion.div>
      
      {/* Reports List */}
      <motion.div variants={pageItemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map((report) => (
                <Card key={report.id} className="bg-accent/30 hover:bg-accent/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 p-2 bg-background rounded-md">
                        {report.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{report.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Last generated: {report.lastGenerated}</span>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
                            <Button variant="outline" size="sm" className="h-7 text-xs">Generate</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Reports;