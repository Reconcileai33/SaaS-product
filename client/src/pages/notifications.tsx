import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pageContainerVariants, pageItemVariants } from "@/lib/animations";
import { 
  AlertCircle, 
  Bell, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  FileText, 
  Filter, 
  InfoIcon, 
  Settings,
  Trash2,
  User
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const Notifications = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Query for notifications data
  const { data, isLoading } = useQuery({
    queryKey: ['/api/notifications'],
    enabled: mounted
  });
  
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Reconciliation Failed",
      message: "The daily bank reconciliation has failed with 15 unmatched transactions.",
      time: "10 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "info",
      title: "New Payment Gateway Connected",
      message: "Razorpay has been successfully connected to your account.",
      time: "2 hours ago",
      read: false
    },
    {
      id: 3,
      type: "success",
      title: "Reconciliation Complete",
      message: "Monthly reconciliation completed with 99.8% match rate.",
      time: "Yesterday",
      read: true
    },
    {
      id: 4,
      type: "info",
      title: "New Beneficiary Added",
      message: "Tech Solutions Pvt Ltd has been added to your beneficiaries.",
      time: "2 days ago",
      read: true
    },
    {
      id: 5,
      type: "alert",
      title: "Critical Error",
      message: "Failed to process transaction #TRX-29045 due to insufficient funds.",
      time: "3 days ago",
      read: true
    }
  ];
  
  // Notification preferences
  const notificationPreferences = [
    {
      id: "transaction-alerts",
      title: "Transaction Alerts",
      description: "Get notified about new transactions and status updates",
      email: true,
      push: true,
      sms: false
    },
    {
      id: "reconciliation-updates",
      title: "Reconciliation Updates",
      description: "Receive updates on reconciliation processes and results",
      email: true,
      push: true,
      sms: true
    },
    {
      id: "system-alerts",
      title: "System Alerts",
      description: "Critical system notifications and maintenance updates",
      email: true,
      push: false,
      sms: false
    },
    {
      id: "marketing-updates",
      title: "Marketing & Updates",
      description: "Product updates, new features, and promotional offers",
      email: false,
      push: false,
      sms: false
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "info":
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
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
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated with important alerts and information</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
        </div>
      </motion.div>
      
      {/* Tabs */}
      <motion.div variants={pageItemVariants}>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>All Notifications</CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1 text-muted-foreground">
                    <Trash2 className="h-3 w-3" />
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg border ${notification.read ? 'bg-card border-border/40' : 'bg-accent/40 border-primary/10'}`}
                    >
                      <div className="flex gap-3">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className={`font-medium ${!notification.read ? 'text-primary' : ''}`}>{notification.title}</h3>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex justify-end space-x-2">
                            {!notification.read && (
                              <Button variant="ghost" size="sm" className="text-xs">Mark as Read</Button>
                            )}
                            <Button variant="outline" size="sm" className="text-xs">View Details</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="unread">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Unread Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.filter(n => !n.read).map((notification) => (
                    <div 
                      key={notification.id} 
                      className="p-4 rounded-lg border bg-accent/40 border-primary/10"
                    >
                      <div className="flex gap-3">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-primary">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm" className="text-xs">Mark as Read</Button>
                            <Button variant="outline" size="sm" className="text-xs">View Details</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {notifications.filter(n => !n.read).length === 0 && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center p-6 bg-accent/40 rounded-full mb-4">
                        <CheckCircle2 className="h-12 w-12 text-muted-foreground opacity-50" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        You don't have any unread notifications at the moment.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {notificationPreferences.map((pref) => (
                    <div key={pref.id} className="border-b border-border/40 pb-5 last:border-0">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{pref.title}</h3>
                          <p className="text-sm text-muted-foreground">{pref.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Email</span>
                          </div>
                          <Switch checked={pref.email} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Bell className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Push</span>
                          </div>
                          <Switch checked={pref.push} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">SMS</span>
                          </div>
                          <Switch checked={pref.sms} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default Notifications;