import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Activity, 
  FileSpreadsheet, 
  Plus, 
  Check, 
  Settings, 
  ChevronDown, 
  Wifi,
  Building,
  ShoppingBag,
  CreditCard as CreditCardIcon,
  Building2 as BankIcon,
  Wallet,
  Store as StoreIcon,
  Smartphone,
  Globe
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import GlowCard from "@/components/ui/glow-card";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { pageContainerVariants, pageItemVariants } from "@/lib/animations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "connected" | "disconnected";
  isEnabled: boolean;
  color: string;
  category: string;
}

const Integrations = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Query for integrations data
  const { data, isLoading } = useQuery({
    queryKey: ['/api/integrations'],
    enabled: mounted
  });
  
  // Toggle integration status
  const toggleIntegration = (id: string) => {
    setIntegrations(prevIntegrations => 
      prevIntegrations.map(integration => 
        integration.id === id 
          ? { ...integration, isEnabled: !integration.isEnabled } 
          : integration
      )
    );
  };
  
  // Sample integrations with Indian payment gateways and marketplaces
  const [integrations, setIntegrations] = useState<Integration[]>([
    // Payment Gateways
    {
      id: "razorpay",
      name: "Razorpay",
      description: "Process payments with India's leading payment gateway",
      icon: <CreditCardIcon className="h-6 w-6" />,
      status: "connected",
      isEnabled: true,
      color: "text-blue-500",
      category: "payment"
    },
    {
      id: "paytm",
      name: "PayTM",
      description: "India's popular payment & wallet service",
      icon: <Wallet className="h-6 w-6" />,
      status: "connected",
      isEnabled: true,
      color: "text-blue-400",
      category: "payment"
    },
    {
      id: "phonepe",
      name: "PhonePe",
      description: "UPI and mobile payments platform",
      icon: <Smartphone className="h-6 w-6" />,
      status: "connected",
      isEnabled: false,
      color: "text-purple-500",
      category: "payment"
    },
    {
      id: "cashfree",
      name: "Cashfree",
      description: "Payment gateway and banking solutions",
      icon: <CreditCardIcon className="h-6 w-6" />,
      status: "disconnected",
      isEnabled: false,
      color: "text-green-500",
      category: "payment"
    },
    {
      id: "payu",
      name: "PayU",
      description: "Online payment solutions for businesses",
      icon: <CreditCardIcon className="h-6 w-6" />,
      status: "disconnected",
      isEnabled: false,
      color: "text-green-600",
      category: "payment"
    },
    {
      id: "ccavenue",
      name: "CCAvenue",
      description: "Multi-currency payment processing",
      icon: <Globe className="h-6 w-6" />,
      status: "disconnected",
      isEnabled: false,
      color: "text-red-500",
      category: "payment"
    },
    
    // Marketplaces
    {
      id: "amazon",
      name: "Amazon",
      description: "E-commerce marketplace for sellers",
      icon: <ShoppingBag className="h-6 w-6" />,
      status: "connected",
      isEnabled: true,
      color: "text-amber-500",
      category: "marketplace"
    },
    {
      id: "flipkart",
      name: "Flipkart",
      description: "India's leading online marketplace",
      icon: <ShoppingBag className="h-6 w-6" />,
      status: "connected",
      isEnabled: true,
      color: "text-primary",
      category: "marketplace"
    },
    {
      id: "meesho",
      name: "Meesho",
      description: "Social commerce platform for resellers",
      icon: <StoreIcon className="h-6 w-6" />,
      status: "disconnected",
      isEnabled: false,
      color: "text-pink-500",
      category: "marketplace"
    },
    {
      id: "myntra",
      name: "Myntra",
      description: "Fashion e-commerce platform",
      icon: <ShoppingBag className="h-6 w-6" />,
      status: "disconnected",
      isEnabled: false,
      color: "text-red-500",
      category: "marketplace"
    },
    
    // Banks
    {
      id: "hdfc",
      name: "HDFC Bank",
      description: "Banking and financial services",
      icon: <BankIcon className="h-6 w-6" />,
      status: "connected",
      isEnabled: true,
      color: "text-red-600",
      category: "bank"
    },
    {
      id: "icici",
      name: "ICICI Bank",
      description: "Retail and corporate banking services",
      icon: <BankIcon className="h-6 w-6" />,
      status: "connected",
      isEnabled: true,
      color: "text-orange-600",
      category: "bank"
    },
    {
      id: "sbi",
      name: "State Bank of India",
      description: "India's largest public sector bank",
      icon: <BankIcon className="h-6 w-6" />,
      status: "disconnected",
      isEnabled: false,
      color: "text-blue-600",
      category: "bank"
    },
    
    // Financial Software
    {
      id: "tally",
      name: "Tally",
      description: "Accounting software for businesses",
      icon: <FileSpreadsheet className="h-6 w-6" />,
      status: "connected",
      isEnabled: true,
      color: "text-secondary",
      category: "software"
    },
    {
      id: "zohobooks",
      name: "Zoho Books",
      description: "Online accounting software for businesses",
      icon: <FileSpreadsheet className="h-6 w-6" />,
      status: "disconnected",
      isEnabled: false,
      color: "text-green-500",
      category: "software"
    },
    {
      id: "quickbooks",
      name: "QuickBooks",
      description: "Accounting and bookkeeping integration",
      icon: <FileSpreadsheet className="h-6 w-6" />,
      status: "connected",
      isEnabled: true,
      color: "text-green-600",
      category: "software"
    }
  ]);
  
  const getGlowColor = (integration: Integration) => {
    switch (integration.category) {
      case "payment":
        return "rgba(59, 130, 246, 0.3)";
      case "marketplace":
        return "rgba(245, 158, 11, 0.3)";
      case "bank":
        return "rgba(220, 38, 38, 0.3)";
      case "software":
        return "rgba(139, 92, 246, 0.3)";
      default:
        return "rgba(59, 130, 246, 0.3)";
    }
  };
  
  const getBorderColor = (integration: Integration) => {
    switch (integration.category) {
      case "payment":
        return "border-blue-500/10";
      case "marketplace":
        return "border-amber-500/10";
      case "bank":
        return "border-red-500/10";
      case "software":
        return "border-secondary/10";
      default:
        return "border-primary/10";
    }
  };
  
  const getConnectionStatusBadge = (status: string) => {
    if (status === "connected") {
      return (
        <span className="inline-flex items-center text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
          <Check className="h-3 w-3 mr-1" />
          Connected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-xs bg-gray-500/10 text-gray-500 px-2 py-1 rounded-full">
        Disconnected
      </span>
    );
  };

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={pageItemVariants} className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Integrations</h1>
          <p className="text-muted-foreground mt-1">Connect and manage your payment gateways and platforms</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Settings</Button>
          <Button variant="default" className="bg-primary hover:bg-primary/90">Add New</Button>
        </div>
      </motion.div>
      
      {/* Integrations */}
      <motion.div variants={pageItemVariants} className="mb-8">
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Integrations</TabsTrigger>
            <TabsTrigger value="payment">Payment Gateways</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplaces</TabsTrigger>
            <TabsTrigger value="bank">Banks</TabsTrigger>
            <TabsTrigger value="software">Financial Software</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>All Integrations</CardTitle>
                <CardDescription>
                  Connect with payment gateways, marketplaces, banks, and financial software
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {integrations.map((integration) => (
                    <GlowCard 
                      key={integration.id}
                      className="transition-all duration-300"
                      borderColor={getBorderColor(integration)}
                      glowColor={getGlowColor(integration)}
                    >
                      <Card className="border-0 shadow-none bg-transparent">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className={`w-10 h-10 rounded-lg bg-accent flex items-center justify-center mr-3 ${integration.color}`}>
                                {integration.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{integration.name}</h3>
                                <p className="text-xs text-muted-foreground">{integration.description}</p>
                              </div>
                            </div>
                            <div className="relative inline-block">
                              <Switch 
                                checked={integration.isEnabled} 
                                onCheckedChange={() => toggleIntegration(integration.id)} 
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            {getConnectionStatusBadge(integration.status)}
                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
                              {integration.status === "connected" ? "Configure" : "Connect"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </GlowCard>
                  ))}
                  
                  {/* Add Integration Card */}
                  <GlowCard borderColor="border-dashed border-primary/30">
                    <Card className="border-0 shadow-none bg-transparent h-full">
                      <CardContent className="p-5 flex flex-col items-center justify-center h-full text-center">
                        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-3">
                          <Plus className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium mb-1">Add New Integration</h3>
                        <p className="text-xs text-muted-foreground mb-3">Connect with custom platforms or services</p>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs">
                          Add Integration
                        </Button>
                      </CardContent>
                    </Card>
                  </GlowCard>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Payment Gateways</CardTitle>
                <CardDescription>
                  Connect with popular Indian payment gateways for transaction processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {integrations.filter(i => i.category === "payment").map((integration) => (
                    <GlowCard 
                      key={integration.id}
                      className="transition-all duration-300"
                      borderColor={getBorderColor(integration)}
                      glowColor={getGlowColor(integration)}
                    >
                      <Card className="border-0 shadow-none bg-transparent">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className={`w-10 h-10 rounded-lg bg-accent flex items-center justify-center mr-3 ${integration.color}`}>
                                {integration.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{integration.name}</h3>
                                <p className="text-xs text-muted-foreground">{integration.description}</p>
                              </div>
                            </div>
                            <div className="relative inline-block">
                              <Switch 
                                checked={integration.isEnabled} 
                                onCheckedChange={() => toggleIntegration(integration.id)} 
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            {getConnectionStatusBadge(integration.status)}
                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
                              {integration.status === "connected" ? "Configure" : "Connect"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </GlowCard>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="marketplace">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Marketplaces</CardTitle>
                <CardDescription>
                  Connect with e-commerce marketplaces for transaction reconciliation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {integrations.filter(i => i.category === "marketplace").map((integration) => (
                    <GlowCard 
                      key={integration.id}
                      className="transition-all duration-300"
                      borderColor={getBorderColor(integration)}
                      glowColor={getGlowColor(integration)}
                    >
                      <Card className="border-0 shadow-none bg-transparent">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className={`w-10 h-10 rounded-lg bg-accent flex items-center justify-center mr-3 ${integration.color}`}>
                                {integration.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{integration.name}</h3>
                                <p className="text-xs text-muted-foreground">{integration.description}</p>
                              </div>
                            </div>
                            <div className="relative inline-block">
                              <Switch 
                                checked={integration.isEnabled} 
                                onCheckedChange={() => toggleIntegration(integration.id)} 
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            {getConnectionStatusBadge(integration.status)}
                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
                              {integration.status === "connected" ? "Configure" : "Connect"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </GlowCard>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bank">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Banks</CardTitle>
                <CardDescription>
                  Connect with banking services for statement reconciliation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {integrations.filter(i => i.category === "bank").map((integration) => (
                    <GlowCard 
                      key={integration.id}
                      className="transition-all duration-300"
                      borderColor={getBorderColor(integration)}
                      glowColor={getGlowColor(integration)}
                    >
                      <Card className="border-0 shadow-none bg-transparent">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className={`w-10 h-10 rounded-lg bg-accent flex items-center justify-center mr-3 ${integration.color}`}>
                                {integration.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{integration.name}</h3>
                                <p className="text-xs text-muted-foreground">{integration.description}</p>
                              </div>
                            </div>
                            <div className="relative inline-block">
                              <Switch 
                                checked={integration.isEnabled} 
                                onCheckedChange={() => toggleIntegration(integration.id)} 
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            {getConnectionStatusBadge(integration.status)}
                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
                              {integration.status === "connected" ? "Configure" : "Connect"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </GlowCard>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="software">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Financial Software</CardTitle>
                <CardDescription>
                  Connect with accounting and financial management software
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {integrations.filter(i => i.category === "software").map((integration) => (
                    <GlowCard 
                      key={integration.id}
                      className="transition-all duration-300"
                      borderColor={getBorderColor(integration)}
                      glowColor={getGlowColor(integration)}
                    >
                      <Card className="border-0 shadow-none bg-transparent">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className={`w-10 h-10 rounded-lg bg-accent flex items-center justify-center mr-3 ${integration.color}`}>
                                {integration.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{integration.name}</h3>
                                <p className="text-xs text-muted-foreground">{integration.description}</p>
                              </div>
                            </div>
                            <div className="relative inline-block">
                              <Switch 
                                checked={integration.isEnabled} 
                                onCheckedChange={() => toggleIntegration(integration.id)} 
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            {getConnectionStatusBadge(integration.status)}
                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
                              {integration.status === "connected" ? "Configure" : "Connect"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </GlowCard>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      {/* API Settings */}
      <motion.div variants={pageItemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>API Access</CardTitle>
            <CardDescription>
              Manage API credentials and webhook configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* API Tokens */}
              <div>
                <h3 className="font-medium mb-4 flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  API Tokens
                </h3>
                
                <Card className="bg-accent/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">Production Key</h4>
                        <div className="flex items-center mt-1">
                          <div className="bg-background px-2 py-1 rounded text-sm font-mono tracking-wide text-muted-foreground">
                            ••••••••••••••••••••
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 ml-2 text-xs">Show</Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">Copy</Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <h4 className="text-sm font-medium">Test Key</h4>
                        <div className="flex items-center mt-1">
                          <div className="bg-background px-2 py-1 rounded text-sm font-mono tracking-wide text-muted-foreground">
                            ••••••••••••••••••••
                          </div>
                          <Button variant="ghost" size="sm" className="h-7 ml-2 text-xs">Show</Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">Copy</Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/40">
                      <Button variant="outline" size="sm" className="w-full">
                        <ChevronDown className="h-4 w-4 mr-2" />
                        View API Documentation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Webhooks */}
              <div>
                <h3 className="font-medium mb-4 flex items-center">
                  <Wifi className="h-4 w-4 mr-2" />
                  Webhooks
                </h3>
                
                <Card className="bg-accent/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-sm font-medium">Webhook URL</h4>
                        <p className="text-xs text-muted-foreground mt-1">Receive real-time notifications for transaction events</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center mt-3">
                      <div className="bg-background px-2 py-1 rounded text-sm font-mono tracking-wide text-muted-foreground flex-1">
                        https://yourserver.com/api/webhook
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 ml-2 text-xs">Edit</Button>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Webhook Events</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Transaction completed</span>
                          <Switch checked={true} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Reconciliation status change</span>
                          <Switch checked={true} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Payment failure</span>
                          <Switch checked={true} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Integrations;
