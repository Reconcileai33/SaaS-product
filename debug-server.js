// Debug server for diagnosing white screen issues
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001; // Using a different port to avoid conflicts

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client')));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Debug server is running', timestamp: new Date().toISOString() });
});

// Mock API endpoints to match the main application
app.get('/api/dashboard', (req, res) => {
  res.json({
    stats: {
      totalTransactions: 1250,
      successRate: 98.5,
      processingTime: 1.2,
      activeRules: 15
    },
    recentActivity: [
      { id: 1, type: 'transaction', amount: 1250.00, status: 'completed', date: new Date().toISOString() },
      { id: 2, type: 'reconciliation', amount: 3500.00, status: 'pending', date: new Date().toISOString() }
    ]
  });
});

app.get('/api/transactions', (req, res) => {
  res.json([
    { id: 1, description: 'Payment from Client A', amount: 1250.00, status: 'completed', date: new Date().toISOString() },
    { id: 2, description: 'Subscription renewal', amount: 99.00, status: 'pending', date: new Date().toISOString() }
  ]);
});

// Special route for debugging the white screen issue
app.get('/debug-app', (req, res) => {
  // Read the original index.html
  const indexPath = path.join(__dirname, 'client', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Inject our debug script before the closing body tag
    html = html.replace('</body>', 
      `<script>
        console.log('Debug script injected');
        
        // Create a visible debug panel
        const debugPanel = document.createElement('div');
        debugPanel.style.position = 'fixed';
        debugPanel.style.bottom = '10px';
        debugPanel.style.right = '10px';
        debugPanel.style.padding = '10px';
        debugPanel.style.background = 'rgba(0,0,0,0.8)';
        debugPanel.style.color = 'white';
        debugPanel.style.borderRadius = '5px';
        debugPanel.style.zIndex = '9999';
        debugPanel.style.maxWidth = '400px';
        debugPanel.style.fontFamily = 'monospace';
        debugPanel.style.fontSize = '12px';
        
        debugPanel.innerHTML = '<h3>Debug Panel</h3><div id="debug-content"></div>';
        
        // Add a function to log to the debug panel
        window.debugLog = function(message) {
          const content = document.getElementById('debug-content');
          if (content) {
            const time = new Date().toLocaleTimeString();
            content.innerHTML += \`<div>\${time}: \${message}</div>\`;
          }
          console.log(message);
        };
        
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', () => {
          document.body.appendChild(debugPanel);
          debugLog('DOM loaded');
          
          // Check if React root element exists
          const rootElement = document.getElementById('root');
          debugLog('Root element exists: ' + !!rootElement);
        });
        
        // Catch and display errors
        window.addEventListener('error', (event) => {
          debugLog('ERROR: ' + event.message);
        });
        
        // Monitor React rendering
        const originalCreateElement = React.createElement;
        React.createElement = function() {
          try {
            return originalCreateElement.apply(this, arguments);
          } catch (error) {
            debugLog('React.createElement error: ' + error.message);
            throw error;
          }
        };
      </script></body>`);
    
    res.send(html);
  } else {
    res.status(404).send('Index.html not found');
  }
});

// Catch-all route to serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'debug.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Debug server running at http://localhost:${PORT}`);
  console.log(`Access the debug app at http://localhost:${PORT}/debug-app`);
});
