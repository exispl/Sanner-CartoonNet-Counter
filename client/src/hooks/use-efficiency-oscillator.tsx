import { useState, useEffect } from 'react';

export function useEfficiencyOscillator() {
  const [efficiency, setEfficiency] = useState(99.45);
  
  useEffect(() => {
    // Generate random efficiency between 99.22% and 99.80%
    const generateRandomEfficiency = () => {
      const min = 99.22;
      const max = 99.80;
      const randomValue = min + Math.random() * (max - min);
      return Math.round(randomValue * 100) / 100; // Round to 2 decimal places
    };
    
    // Set initial value
    setEfficiency(generateRandomEfficiency());
    
    // Update every hour (3600000 ms)
    const interval = setInterval(() => {
      setEfficiency(generateRandomEfficiency());
    }, 3600000);
    
    // For demo purposes, also update every 10 seconds
    const demoInterval = setInterval(() => {
      setEfficiency(generateRandomEfficiency());
    }, 10000);
    
    return () => {
      clearInterval(interval);
      clearInterval(demoInterval);
    };
  }, []);
  
  return efficiency;
}