import { useState, useEffect } from 'react';

export function useEfficiencyOscillator() {
  const [efficiency, setEfficiency] = useState(99.45);
  
  useEffect(() => {
    // Very stable efficiency with minimal changes
    const interval = setInterval(() => {
      setEfficiency(prev => {
        // Very small random variations ±0.05%
        const variation = prev + (Math.random() - 0.5) * 0.1;
        // Keep it between 99.3% and 99.6%
        const bounded = Math.max(99.3, Math.min(99.6, variation));
        return Math.round(bounded * 100) / 100;
      });
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return efficiency;
}