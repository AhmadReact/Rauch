import React, { useState, useEffect } from 'react';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };

    // Register a global error handler
    window.addEventListener('error', handleError);

    return () => {
      // Cleanup by removing the error handler
      window.removeEventListener('error', handleError);
    };
  }, []);

  return hasError ? <h1>Something went wrong.</h1> : children;
}

export default ErrorBoundary;
