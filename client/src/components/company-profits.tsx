import { useState, useEffect } from 'react';

export function CompanyProfits() {
  const [profits, setProfits] = useState({
    daily: 152800,
    weekly: 1069600,
    monthly: 4588400,
    yearly: 55060800
  });

  // Stable values that don't jump around
  useEffect(() => {
    const interval = setInterval(() => {
      setProfits(prev => ({
        daily: prev.daily + Math.floor(Math.random() * 50) - 25, // Small fluctuations
        weekly: prev.weekly + Math.floor(Math.random() * 200) - 100,
        monthly: prev.monthly + Math.floor(Math.random() * 1000) - 500,
        yearly: prev.yearly + Math.floor(Math.random() * 5000) - 2500
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-xl p-4 border-2 border-green-500/30 shadow-lg">
      <h3 className="text-lg font-bold text-white mb-3 text-center">🏢 Zyski Firmy</h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <div className="text-xs text-green-200">Dzienny</div>
          <div className="text-sm font-bold text-white">{formatCurrency(profits.daily)}</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <div className="text-xs text-green-200">Tygodniowy</div>
          <div className="text-sm font-bold text-white">{formatCurrency(profits.weekly)}</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <div className="text-xs text-green-200">Miesięczny</div>
          <div className="text-sm font-bold text-white">{formatCurrency(profits.monthly)}</div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <div className="text-xs text-green-200">Roczny</div>
          <div className="text-sm font-bold text-white">{formatCurrency(profits.yearly)}</div>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-center text-green-200">
        💹 Stabilny wzrost produkcji
      </div>
    </div>
  );
}