import { Route, useLocation } from "wouter";
import { ReactNode, useEffect } from "react";
import Layout from "@/components/layout/Layout";

interface ProtectedRouteProps {
  path: string;
  children: ReactNode;
}

/**
 * A route that requires authentication.
 * If the user is not authenticated, they're redirected to /auth.
 * This component also applies the dashboard Layout.
 */
export function ProtectedRoute({ path, children }: ProtectedRouteProps) {
  // For now, we'll use a simple check to see if the user is authenticated
  // In a real app, you'd use auth state from your context
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/auth");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Route path={path}>
      <Layout>{children}</Layout>
    </Route>
  );
}

/**
 * A route that is only accessible when the user is NOT authenticated.
 * If the user is authenticated, they're redirected to /dashboard.
 */
export function PublicOnlyRoute({ path, children }: ProtectedRouteProps) {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated && (path === "/auth" || path === "/")) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, path, setLocation]);

  if (isAuthenticated && (path === "/auth" || path === "/")) {
    return null;
  }

  return <Route path={path}>{children}</Route>;
}