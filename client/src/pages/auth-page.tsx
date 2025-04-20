import { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight, Building, Eye, EyeOff, Flag, LockKeyhole, Mail, User, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { pageContainerVariants, pageItemVariants } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";

// Define form schemas
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional()
});

const registerSchema = z.object({
  userType: z.enum(["individual", "business", "admin"]),
  email: z.string().email("Please enter a valid email"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyName: z.string().optional(),
}).refine(
  (data) => {
    // Company name is required only for business users
    if (data.userType === "business") {
      return !!data.companyName;
    }
    return true;
  },
  {
    message: "Company name is required for business accounts",
    path: ["companyName"],
  }
);

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [selectedUserType, setSelectedUserType] = useState<"individual" | "business" | "admin">("individual");
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userType: "individual",
      email: "",
      username: "",
      password: "",
      companyName: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      // Simulate login API call
      console.log("Logging in with:", data);
      
      toast({
        title: "Login successful!",
        description: `Welcome back!`,
      });
      
      // Set authentication flag
      localStorage.setItem('authenticated', 'true');
      // Navigate to dashboard
      setLocation("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      // Simulate registration API call
      console.log("Registering with:", data);
      
      toast({
        title: "Registration successful!",
        description: "Your account has been created.",
      });
      
      // Set authentication flag
      localStorage.setItem('authenticated', 'true');
      // Navigate to dashboard
      setLocation("/dashboard");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration",
        variant: "destructive",
      });
    }
  };

  const handleUserTypeSelect = (type: "individual" | "business" | "admin") => {
    setSelectedUserType(type);
    registerForm.setValue("userType", type);
  };

  const Logo = () => (
    <div className="flex flex-col items-center mb-8">
      <motion.div 
        className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 p-[3px] mb-4"
        animate={{ 
          boxShadow: ["0 0 10px rgba(251, 191, 36, 0.5)", "0 0 20px rgba(251, 191, 36, 0.5)", "0 0 10px rgba(251, 191, 36, 0.5)"]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
          <Sparkles className="h-7 w-7 text-amber-400" />
        </div>
      </motion.div>
      <h1 className="text-2xl font-bold text-white">Reconcile AI</h1>
      <motion.p 
        className="text-sm text-amber-300/80"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        India's AI-Powered Reconciliation Platform
      </motion.p>
    </div>
  );

  const SocialLogin = () => (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-slate-900 px-2 text-gray-500">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" className="bg-slate-800 border-slate-700 hover:bg-slate-700">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </Button>
        <Button variant="outline" className="bg-slate-800 border-slate-700 hover:bg-slate-700">
          <svg className="w-5 h-5" fill="#ea4c89" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.326 14.899c-.188.405-.498.592-.913.592-.152 0-.303-.035-.446-.104-.449-.178-.635-.627-.456-1.076l1.86-4.72h-1.272l-1.822 4.624c-.188.405-.498.592-.913.592-.151 0-.302-.035-.445-.105-.449-.176-.635-.626-.457-1.075l1.86-4.72h-1.304c-.455 0-.822-.367-.822-.822 0-.455.367-.822.822-.822h1.859c.467 0 .826.378.794.844l-.292.843h1.292c.467 0 .826.378.794.844l-.292.843h1.272l.543-1.377c.177-.449.626-.635 1.075-.456.449.178.635.627.456 1.076l-1.95 4.949z"></path>
          </svg>
        </Button>
        <Button variant="outline" className="bg-slate-800 border-slate-700 hover:bg-slate-700">
          <svg className="w-5 h-5" fill="#f56040" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.494-1.11 1.1-1.11s1.1.498 1.1 1.11c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"></path>
          </svg>
        </Button>
      </div>
    </>
  );

  return (
    <motion.div 
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center justify-center bg-black"
    >
      <motion.div 
        variants={pageItemVariants}
        className="w-full max-w-md mx-auto p-4 relative z-10"
      >
        <div className="absolute inset-0 -top-8 -bottom-8 -left-20 -right-20 z-0">
          <motion.div
            className="absolute w-40 h-40 rounded-full bg-amber-600/10 blur-3xl top-0 -right-16"
            animate={{
              y: [0, 30, 0],
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-40 h-40 rounded-full bg-amber-400/10 blur-2xl -bottom-20 -left-12"
            animate={{
              y: [0, -40, 0],
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <Card className="relative bg-slate-900/80 backdrop-blur-sm border-slate-800 shadow-[0_0_15px_rgba(245,158,11,0.15)] z-10">
          <CardContent className="pt-6">
            <Logo />

            <Tabs 
              defaultValue={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-2 mb-6 bg-slate-950 border border-slate-800">
                <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-black data-[state=active]:font-medium">Login</TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-600 data-[state=active]:text-black data-[state=active]:font-medium">Register</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <User className="text-muted-foreground h-5 w-5" />
                              </div>
                              <Input 
                                className="pl-10 bg-slate-800 border-slate-700" 
                                placeholder="Enter your username" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <LockKeyhole className="text-muted-foreground h-5 w-5" />
                              </div>
                              <Input 
                                className="pl-10 bg-slate-800 border-slate-700" 
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password" 
                                {...field} 
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute inset-y-0 right-0 flex items-center px-3"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-between">
                      <FormField
                        control={loginForm.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              Remember me
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <Button variant="link" className="text-sm p-0 h-auto text-purple-400" onClick={() => {}}>
                        Forgot password?
                      </Button>
                    </div>

                    <motion.div 
                      whileTap={{ scale: 0.97 }}
                      className="w-full"
                    >
                      <Button 
                        type="submit" 
                        className="w-full btn-primary"
                      >
                        Sign in <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </form>
                </Form>

                <SocialLogin />
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    {/* User Type Selector */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <motion.div 
                        className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all relative
                          ${selectedUserType === "individual" 
                            ? "bg-gradient-to-b from-amber-500 to-yellow-600 text-black" 
                            : "bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700"}`}
                        onClick={() => handleUserTypeSelect("individual")}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        animate={selectedUserType === "individual" ? {
                          boxShadow: ["0 0 0px rgba(245, 158, 11, 0.5)", "0 0 8px rgba(245, 158, 11, 0.5)", "0 0 0px rgba(245, 158, 11, 0.5)"],
                        } : {}}
                        transition={{ 
                          duration: 1.5, 
                          repeat: selectedUserType === "individual" ? Infinity : 0,
                          ease: "easeInOut" 
                        }}
                      >
                        <User className={`h-5 w-5 mb-1 ${selectedUserType === "individual" ? "text-black" : ""}`} />
                        <span className="text-xs font-semibold">Individual</span>
                      </motion.div>
                      <motion.div 
                        className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all relative
                          ${selectedUserType === "business" 
                            ? "bg-gradient-to-b from-amber-500 to-yellow-600 text-black" 
                            : "bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700"}`}
                        onClick={() => handleUserTypeSelect("business")}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        animate={selectedUserType === "business" ? {
                          boxShadow: ["0 0 0px rgba(245, 158, 11, 0.5)", "0 0 8px rgba(245, 158, 11, 0.5)", "0 0 0px rgba(245, 158, 11, 0.5)"],
                        } : {}}
                        transition={{ 
                          duration: 1.5, 
                          repeat: selectedUserType === "business" ? Infinity : 0,
                          ease: "easeInOut" 
                        }}
                      >
                        <Building className={`h-5 w-5 mb-1 ${selectedUserType === "business" ? "text-black" : ""}`} />
                        <span className="text-xs font-semibold">Business</span>
                      </motion.div>
                      <motion.div 
                        className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all relative
                          ${selectedUserType === "admin" 
                            ? "bg-gradient-to-b from-amber-500 to-yellow-600 text-black" 
                            : "bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700"}`}
                        onClick={() => handleUserTypeSelect("admin")}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        animate={selectedUserType === "admin" ? {
                          boxShadow: ["0 0 0px rgba(245, 158, 11, 0.5)", "0 0 8px rgba(245, 158, 11, 0.5)", "0 0 0px rgba(245, 158, 11, 0.5)"],
                        } : {}}
                        transition={{ 
                          duration: 1.5, 
                          repeat: selectedUserType === "admin" ? Infinity : 0,
                          ease: "easeInOut" 
                        }}
                      >
                        <ShieldCheck className={`h-5 w-5 mb-1 ${selectedUserType === "admin" ? "text-black" : ""}`} />
                        <span className="text-xs font-semibold">Admin</span>
                      </motion.div>
                    </div>

                    {/* Hidden field for userType */}
                    <FormField
                      control={registerForm.control}
                      name="userType"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input type="hidden" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Mail className="text-muted-foreground h-5 w-5" />
                              </div>
                              <Input 
                                className="pl-10 bg-slate-800 border-slate-700" 
                                placeholder="Enter your email" 
                                type="email"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <User className="text-muted-foreground h-5 w-5" />
                              </div>
                              <Input 
                                className="pl-10 bg-slate-800 border-slate-700" 
                                placeholder="Choose a username" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <LockKeyhole className="text-muted-foreground h-5 w-5" />
                              </div>
                              <Input 
                                className="pl-10 bg-slate-800 border-slate-700" 
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password" 
                                {...field} 
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute inset-y-0 right-0 flex items-center px-3"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedUserType === "business" && (
                      <FormField
                        control={registerForm.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <Building className="text-muted-foreground h-5 w-5" />
                                </div>
                                <Input 
                                  className="pl-10 bg-slate-800 border-slate-700" 
                                  placeholder="Enter company name" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <motion.div 
                      whileTap={{ scale: 0.97 }}
                      className="w-full"
                    >
                      <Button 
                        type="submit" 
                        className="w-full btn-primary"
                      >
                        Create Account <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}