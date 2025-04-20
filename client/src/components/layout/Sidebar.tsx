import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  HomeIcon,
  ArrowRightLeft,
  DollarSign,
  BarChart3,
  Layers,
  Users,
  Bell,
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

const Sidebar = () => {
  const [location] = useLocation();

  const navItems = useMemo(() => [
    { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/transactions", label: "Transactions", icon: ArrowRightLeft },
    { href: "/reconciliations", label: "Reconciliations", icon: DollarSign },
    { href: "/reports", label: "Reports", icon: BarChart3 },
    { href: "/integrations", label: "Integrations", icon: Layers },
    { href: "/beneficiaries", label: "Beneficiaries", icon: Users },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/support", label: "Support", icon: HelpCircle },
  ], []);

  return (
    <aside className="w-56 h-full flex-shrink-0 bg-card border-r border-accent overflow-y-auto flex flex-col">
      <div className="p-4 flex-1">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2">
            <span className="text-white font-bold">R</span>
          </div>
          <h1 className="text-xl font-bold text-white">ReconcileAI</h1>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  "relative flex justify-start items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground transition-all duration-200 hover:bg-accent group",
                  isActive && "text-primary bg-accent/50"
                )}
                asChild
              >
                <a href={item.href}>
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute left-0 top-1/2 w-1 h-7 bg-primary rounded-r-sm -translate-y-1/2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <span className="absolute inset-0 rounded-lg ring-0 ring-primary transition-all duration-300 ease-in-out group-hover:ring-1 opacity-0 group-hover:opacity-20" />
                </a>
              </Button>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-accent">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2">
            <span className="text-xs font-medium text-white">JS</span>
          </div>
          <div>
            <p className="text-sm font-medium">John Smith</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
        <Button variant="ghost" className="flex items-center text-sm w-full justify-start px-3 py-2 text-muted-foreground" asChild>
          <a href="#">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </a>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
