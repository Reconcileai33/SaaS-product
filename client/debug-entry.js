// Debug entry point for diagnosing white screen issues
console.log('Debug entry point loaded');

// Check if DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded');
  
  // Add diagnostic information to the page
  const debugInfo = document.createElement('div');
  debugInfo.style.position = 'fixed';
  debugInfo.style.top = '10px';
  debugInfo.style.left = '10px';
  debugInfo.style.padding = '10px';
  debugInfo.style.background = 'rgba(0,0,0,0.8)';
  debugInfo.style.color = 'white';
  debugInfo.style.borderRadius = '5px';
  debugInfo.style.zIndex = '9999';
  debugInfo.style.maxWidth = '80%';
  debugInfo.style.fontFamily = 'monospace';
  
  debugInfo.innerHTML = `
    <h3>ReconcileAI Debug Info</h3>
    <p>URL: ${window.location.href}</p>
    <p>Time: ${new Date().toLocaleString()}</p>
    <p>User Agent: ${navigator.userAgent}</p>
    <div id="api-status">Checking API status...</div>
  `;
  
  document.body.appendChild(debugInfo);
  
  // Check API status
  fetch('/api/health')
    .then(response => response.json())
    .then(data => {
      document.getElementById('api-status').innerHTML = `API Status: ${JSON.stringify(data)}`;
    })
    .catch(error => {
      document.getElementById('api-status').innerHTML = `API Error: ${error.message}`;
    });
});

// Handle errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  
  // Add error information to the page if possible
  if (document.body) {
    const errorInfo = document.createElement('div');
    errorInfo.style.position = 'fixed';
    errorInfo.style.bottom = '10px';
    errorInfo.style.left = '10px';
    errorInfo.style.padding = '10px';
    errorInfo.style.background = 'rgba(255,0,0,0.8)';
    errorInfo.style.color = 'white';
    errorInfo.style.borderRadius = '5px';
    errorInfo.style.zIndex = '9999';
    errorInfo.style.maxWidth = '80%';
    errorInfo.style.fontFamily = 'monospace';
    
    errorInfo.innerHTML = `
      <h3>Error Detected</h3>
      <p>${event.message}</p>
      <p>Line: ${event.lineno}, Column: ${event.colno}</p>
      <p>File: ${event.filename}</p>
    `;
    
    document.body.appendChild(errorInfo);
  }
});
