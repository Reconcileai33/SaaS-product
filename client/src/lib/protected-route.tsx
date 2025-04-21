
import { Route, useLocation } from "wouter";
import { ReactNode, useEffect } from "react";
import Layout from "@/components/layout/Layout";

interface ProtectedRouteProps {
  path: string;
  children: ReactNode;
}

export function ProtectedRoute({ path, children }: ProtectedRouteProps) {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem("authenticated");
      setLocation("/auth");
    }
  }, [isAuthenticated, path, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Route path={path}>
      <Layout>{children}</Layout>
    </Route>
  );
}

export function PublicOnlyRoute({ path, children }: ProtectedRouteProps) {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated && path === "/auth") {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, path, setLocation]);

  if (isAuthenticated && path === "/auth") {
    return null;
  }

  return <Route path={path}>{children}</Route>;
}
