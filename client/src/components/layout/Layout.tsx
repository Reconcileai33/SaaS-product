import { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    if (!localStorage.getItem("authenticated")) {
      window.location.href = '/';
    }
  }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
