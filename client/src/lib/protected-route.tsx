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
      setLocation("/auth");
    }
  }, [isAuthenticated, setLocation]);

  return (
    <Route path={path}>
      {isAuthenticated ? (
        <Layout>{children}</Layout>
      ) : null}
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

  return <Route path={path}>{children}</Route>;
}