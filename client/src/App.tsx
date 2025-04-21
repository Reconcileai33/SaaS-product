
import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute, PublicOnlyRoute } from "@/lib/protected-route";
import Dashboard from "@/pages/dashboard";
import Transactions from "@/pages/transactions";
import Reconciliations from "@/pages/reconciliations";
import Integrations from "@/pages/integrations";
import Reports from "@/pages/reports";
import Beneficiaries from "@/pages/beneficiaries";
import Notifications from "@/pages/notifications";
import Settings from "@/pages/settings";
import Support from "@/pages/support";
import AuthPage from "@/pages/auth-page";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Pricing from "@/pages/pricing";
import Features from "@/pages/features";
import About from "@/pages/about";
import Contact from "@/pages/contact";

function App() {
  const [location] = useLocation();
  
  return (
    <>
      <Switch>
        {/* Public pages that don't require authentication */}
        <Route path="/">
          <Home />
        </Route>
        <PublicOnlyRoute path="/auth">
          <AuthPage />
        </PublicOnlyRoute>
        <Route path="/pricing">
          <Pricing />
        </Route>
        <Route path="/features">
          <Features />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        
        {/* Protected dashboard routes - require authentication */}
        <ProtectedRoute path="/dashboard">
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path="/transactions">
          <Transactions />
        </ProtectedRoute>
        <ProtectedRoute path="/reconciliations">
          <Reconciliations />
        </ProtectedRoute>
        <ProtectedRoute path="/reports">
          <Reports />
        </ProtectedRoute>
        <ProtectedRoute path="/integrations">
          <Integrations />
        </ProtectedRoute>
        <ProtectedRoute path="/beneficiaries">
          <Beneficiaries />
        </ProtectedRoute>
        <ProtectedRoute path="/notifications">
          <Notifications />
        </ProtectedRoute>
        <ProtectedRoute path="/settings">
          <Settings />
        </ProtectedRoute>
        <ProtectedRoute path="/support">
          <Support />
        </ProtectedRoute>
        
        {/* 404 page */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
