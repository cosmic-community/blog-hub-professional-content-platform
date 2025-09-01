(function() {
  // Only run in iframe (dashboard preview)
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  // Store original console methods
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  // Helper to serialize objects safely
  function serializeArg(arg) {
    if (typeof arg === 'object' && arg !== null) {
      try {
        return JSON.stringify(arg, (key, value) => {
          if (typeof value === 'function') return '[Function]';
          if (value instanceof Error) return value.toString();
          if (value instanceof HTMLElement) return `[HTMLElement: ${value.tagName}]`;
          return value;
        }, 2);
      } catch (e) {
        return '[Object]';
      }
    }
    return String(arg);
  }
  
  // Capture and forward console logs
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = args.map(serializeArg).join(' ');
    
    const logEntry = {
      timestamp,
      level,
      message,
      url: window.location.href
    };
    
    // Store log (with limit)
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    // Send to parent dashboard
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {
      // Silent fail if parent communication fails
    }
    
    // Still call original console method
    originalConsole[level].apply(console, args);
  }
  
  // Override console methods
  console.log = function(...args) { captureLog('log', args); };
  console.warn = function(...args) { captureLog('warn', args); };
  console.error = function(...args) { captureLog('error', args); };
  console.info = function(...args) { captureLog('info', args); };
  console.debug = function(...args) { captureLog('debug', args); };
  
  // Capture unhandled errors
  window.addEventListener('error', function(event) {
    captureLog('error', [`Uncaught Error: ${event.error ? event.error.stack || event.error.message : event.message}`]);
  });
  
  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    captureLog('error', [`Unhandled Promise Rejection: ${event.reason}`]);
  });
  
  // Send ready notification to dashboard
  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Silent fail
    }
  }
  
  // Send route change notification
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Silent fail
    }
  }
  
  // Monitor route changes for SPA navigation
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function(...args) {
    originalPushState.apply(history, args);
    sendRouteChange();
  };
  
  history.replaceState = function(...args) {
    originalReplaceState.apply(history, args);
    sendRouteChange();
  };
  
  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
  
  // Send initial ready message
  if (document.readyState === 'loading') {
    window.addEventListener('load', function() {
      sendReady();
      sendRouteChange();
    });
  } else {
    sendReady();
    sendRouteChange();
  }
})();