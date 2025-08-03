import { useState, useEffect } from 'react';
import { TrendingUp, User, Calendar } from 'lucide-react';

interface EmployeeBonusSystemProps {
  currentUser: string;
  totalBoxes: number;
  isRunning: boolean;
}

export function EmployeeBonusSystem({ currentUser, totalBoxes, isRunning }: EmployeeBonusSystemProps) {
  const [bonusPercentage, setBonusPercentage] = useState(10);
  const [currentMonth] = useState('Sierpień 2025');

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        // Stock market-like fluctuation between 5% and 15%
        const fluctuation = (Math.random() - 0.5) * 2; // -1 to 1
        setBonusPercentage(prev => {
          const newValue = prev + fluctuation;
          return Math.max(5, Math.min(15, newValue)); // Clamp between 5 and 15
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const baseSalary = 4200; // Base monthly salary
  const bonusAmount = (baseSalary * bonusPercentage) / 100;
  const totalWithBonus = baseSalary + bonusAmount;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl border-4 border-blue-400/30 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-6 h-6 text-white" />
          <h3 className="text-xl font-bold text-white">
            przez pracownika {currentUser} (dzisiaj)
          </h3>
        </div>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-white" />
            <span className="text-white font-medium">Premia za obecny miesiąc</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {currentMonth}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-white">
              €{baseSalary.toLocaleString()}
            </div>
            <div className="text-white/80 text-xs">Podstawa</div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className={`text-lg font-bold flex items-center justify-center gap-1 ${
              isRunning ? 'text-yellow-300 animate-pulse' : 'text-white'
            }`}>
              <TrendingUp className="w-4 h-4" />
              {bonusPercentage.toFixed(1)}%
            </div>
            <div className="text-white/80 text-xs">Premia</div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">Kwota premii:</span>
            <span className="text-white font-bold">
              €{bonusAmount.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          
          <div className="border-t border-white/20 pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold text-lg">
                Całkowite wynagrodzenie:
              </span>
              <span className="text-yellow-300 font-bold text-xl">
                €{totalWithBonus.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {isRunning && (
          <div className="text-center text-white/80 text-sm animate-pulse mt-3">
            💼 Premia zmienia się w czasie rzeczywistym (5%-15%)
          </div>
        )}
      </div>
    </div>
  );
}