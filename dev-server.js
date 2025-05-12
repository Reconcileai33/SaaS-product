// Development server for the AI Reconciliation Platform
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const PORT = 3000;

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client')));

// API routes from the original server
app.get('/api/dashboard', (req, res) => {
  res.json({
    stats: {
      totalTransactions: 1250,
      successRate: 98.5,
      processingTime: 1.2,
      activeRules: 15
    },
    feeIntelligence: {
      savings: 1250,
      feeRate: 2.3,
      chartData: [
        { provider: "Stripe", amount: 2200 },
        { provider: "PayPal", amount: 1700 },
        { provider: "Square", amount: 1200 },
        { provider: "Wise", amount: 800 }
      ]
    },
    aiInsights: [
      { 
        id: 1, 
        type: "duplicate", 
        message: "Detected 3 potential duplicate payments in recent transactions",
        severity: "warning" 
      },
      { 
        id: 2, 
        type: "trend", 
        message: "Transaction volume has increased by 15% compared to last month",
        severity: "info" 
      },
      { 
        id: 3, 
        type: "optimization", 
        message: "Recommended optimization: Enable automatic matching for new-rule transactions",
        severity: "info" 
      },
      { 
        id: 4, 
        type: "alert", 
        message: "Alert: Unusual payment pattern detected in recent PayPal transactions",
        severity: "error" 
      }
    ]
  });
});

app.get('/api/transactions', (req, res) => {
  res.json([
    { id: 1, description: 'Payment from Client A', amount: 1250.00, status: 'completed', date: new Date().toISOString() },
    { id: 2, description: 'Subscription renewal', amount: 99.00, status: 'pending', date: new Date().toISOString() },
    { id: 3, description: 'Refund to Customer B', amount: -150.00, status: 'completed', date: new Date().toISOString() },
    { id: 4, description: 'Platform fee', amount: -25.00, status: 'completed', date: new Date().toISOString() }
  ]);
});

app.get('/api/reconciliations', (req, res) => {
  res.json({
    stats: {
      totalTransactions: 0,
      aiMatchedTransactions: 0,
      manualMatchedTransactions: 0,
      unmatchedTransactions: 0
    },
    recentJobs: []
  });
});

app.get('/api/reports', (req, res) => {
  res.json({
    availableReports: [
      { id: 1, name: 'Monthly Reconciliation Summary', type: 'reconciliation', lastGenerated: new Date().toISOString() },
      { id: 2, name: 'Transaction Volume Analysis', type: 'analytics', lastGenerated: new Date().toISOString() },
      { id: 3, name: 'Fee Optimization Report', type: 'optimization', lastGenerated: new Date().toISOString() }
    ]
  });
});

app.get('/api/integrations', (req, res) => {
  res.json([
    { name: 'Stripe', provider: 'stripe', apiKey: '***', connected: true, lastSync: new Date().toISOString() },
    { name: 'PayPal', provider: 'paypal', apiKey: '***', connected: true, lastSync: new Date().toISOString() },
    { name: 'RazorpayX', provider: 'razorpayx', apiKey: null, connected: false, lastSync: null },
    { name: 'HDFC Bank', provider: 'hdfc', apiKey: null, connected: false, lastSync: null }
  ]);
});

app.get('/api/beneficiaries', (req, res) => {
  res.json([
    { id: 1, name: 'Supplier A', accountNumber: '******1234', bankName: 'HDFC Bank', ifsc: 'HDFC0001234' },
    { id: 2, name: 'Vendor B', accountNumber: '******5678', bankName: 'ICICI Bank', ifsc: 'ICIC0005678' }
  ]);
});

app.get('/api/notifications', (req, res) => {
  res.json([
    { id: 1, type: 'info', message: 'New transaction received from Stripe', read: false, date: new Date().toISOString() },
    { id: 2, type: 'warning', message: 'Failed to sync with PayPal', read: true, date: new Date().toISOString() }
  ]);
});

app.get('/api/user/profile', (req, res) => {
  res.json({
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'admin',
    company: 'Demo Company',
    plan: 'enterprise'
  });
});

// For all other routes, serve the index.html
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'client', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
