
import { ReactNode } from "react";
import { useLocation } from "wouter";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [, setLocation] = useLocation();
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  if (!isAuthenticated) {
    setLocation("/auth");
    return null;
  }

  return (
    <motion.div 
      className="flex h-screen overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Sidebar />
      <motion.main 
        className="flex-1 overflow-y-auto relative"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="container mx-auto p-4">
          {children}
        </div>
      </motion.main>
    </motion.div>
  );
};

export default Layout;
