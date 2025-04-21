
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
    <div className="flex h-screen overflow-hidden bg-black">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-4 animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
