import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { pageContainerVariants, pageItemVariants } from "@/lib/animations";
import { 
  Bell, 
  CreditCard, 
  Globe, 
  Key, 
  Lock, 
  LogOut, 
  Mail, 
  Moon, 
  Phone, 
  Save, 
  Shield, 
  Sun, 
  UserCog, 
  Wallet
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Query for user profile data
  const { data, isLoading } = useQuery({
    queryKey: ['/api/user/profile'],
    enabled: mounted
  });
  
  // Sample user data
  const user = {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+91 9876543210",
    company: "ABC Trading Co.",
    role: "Admin",
    avatar: "JS",
    joined: "March 2023",
    twoFactorEnabled: true
  };

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={pageItemVariants} className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and configurations</p>
      </motion.div>
      
      {/* Tabs */}
      <motion.div variants={pageItemVariants}>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Manage your personal information and contact details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" defaultValue={user.email} />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={user.phone} />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" defaultValue={user.company} />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-primary hover:bg-primary/90 text-white">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                  <CardDescription>
                    Information about your account and role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-semibold">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-lg">{user.name}</h3>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {user.role}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">Member since {user.joined}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-accent/40">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Email Address</span>
                      </div>
                      <span>{user.email}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-accent/40">
                      <div className="flex items-center">
                        <UserCog className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Account Role</span>
                      </div>
                      <span>{user.role}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-accent/40">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Account Security</span>
                      </div>
                      <span className="text-green-500">Secure</span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button variant="destructive" className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password to maintain security
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="bg-primary hover:bg-primary/90 text-white">
                        <Key className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Configure your account security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-primary" />
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Secure your account with two-factor authentication
                        </p>
                      </div>
                      <Switch checked={user.twoFactorEnabled} />
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Bell className="h-4 w-4 mr-2 text-primary" />
                          <h3 className="font-medium">Login Notifications</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for new login attempts
                        </p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Lock className="h-4 w-4 mr-2 text-primary" />
                          <h3 className="font-medium">Session Timeout</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Automatically log out after period of inactivity
                        </p>
                      </div>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Billing Tab */}
          <TabsContent value="billing">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your payment methods and billing details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-border/40 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md bg-blue-500/10 flex items-center justify-center text-blue-500 mr-3">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">HDFC Bank ●●●● 4528</p>
                          <p className="text-xs text-muted-foreground">Expires 10/2025</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs rounded-full">
                        Primary
                      </span>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-border/40 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md bg-purple-500/10 flex items-center justify-center text-purple-500 mr-3">
                          <Wallet className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">ICICI Bank ●●●● 7851</p>
                          <p className="text-xs text-muted-foreground">Expires 04/2024</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">Set Primary</Button>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>
                    View your recent billing information and invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <div>
                          <p className="font-medium">June 2023 Subscription</p>
                          <p className="text-xs text-muted-foreground">Jun 1, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹4,999</p>
                          <p className="text-xs text-green-500">Paid</p>
                        </div>
                      </div>
                      <div className="border-b border-border/40"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <div>
                          <p className="font-medium">May 2023 Subscription</p>
                          <p className="text-xs text-muted-foreground">May 1, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹4,999</p>
                          <p className="text-xs text-green-500">Paid</p>
                        </div>
                      </div>
                      <div className="border-b border-border/40"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <div>
                          <p className="font-medium">April 2023 Subscription</p>
                          <p className="text-xs text-muted-foreground">Apr 1, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹4,999</p>
                          <p className="text-xs text-green-500">Paid</p>
                        </div>
                      </div>
                      <div className="border-b border-border/40"></div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View All Invoices
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Application Preferences</CardTitle>
                <CardDescription>
                  Customize your application settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Moon className="h-4 w-4 mr-2 text-primary" />
                        <h3 className="font-medium">Dark Mode</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Use dark theme for the application interface
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4 text-muted-foreground" />
                      <Switch checked={true} />
                      <Moon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-primary" />
                        <h3 className="font-medium">Language</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Select your preferred language
                      </p>
                    </div>
                    <Select defaultValue="en">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="ta">Tamil</SelectItem>
                        <SelectItem value="te">Telugu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Bell className="h-4 w-4 mr-2 text-primary" />
                        <h3 className="font-medium">Desktop Notifications</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications on your desktop
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-primary" />
                        <h3 className="font-medium">Mobile Notifications</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications on your mobile device
                      </p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default Settings;