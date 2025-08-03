import { useState, useEffect } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, TrendingUp, DollarSign, Eye } from 'lucide-react';

interface EarningsCounterProps {
  isRunning: boolean;
  totalBoxes: number;
}

export function EarningsCounter({ isRunning, totalBoxes }: EarningsCounterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTotalEarnings(prev => prev + Math.random() * 2.5 + 1.5);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const earningsPerBox = 12.50;
  const estimatedRevenue = totalBoxes * earningsPerBox + totalEarnings;

  return (
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-2xl border-4 border-green-400/30 overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-white" />
            <h3 className="text-xl font-bold text-white">
              💰 Zyski firmy
            </h3>
            {showHint && !isOpen && (
              <div className="flex items-center gap-2 text-white/80 text-sm animate-pulse">
                <Eye className="w-4 h-4" />
                <span>Kliknij aby odkryć</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isOpen && (
              <span className="text-white/80 text-sm font-medium">
                €{estimatedRevenue.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
            {isOpen ? (
              <ChevronDown className="w-5 h-5 text-white" />
            ) : (
              <ChevronRight className="w-5 h-5 text-white" />
            )}
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-4">
            {isOpen && (() => { setShowHint(false); return null; })()}
            
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {totalBoxes.toLocaleString()}
                  </div>
                  <div className="text-white/80 text-sm">Wyprodukowane kartony</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    €{earningsPerBox.toFixed(2)}
                  </div>
                  <div className="text-white/80 text-sm">Za karton</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Przychód z produkcji:</span>
                <span className="text-white font-bold">
                  €{(totalBoxes * earningsPerBox).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Bonusy wydajności:</span>
                <span className="text-white font-bold">
                  €{totalEarnings.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="border-t border-white/20 pt-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Całkowity zysk:
                  </span>
                  <span className="text-yellow-300 font-bold text-xl">
                    €{estimatedRevenue.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {isRunning && (
              <div className="text-center text-white/80 text-sm animate-pulse">
                💡 Maszyny pracują - zyski rosną w czasie rzeczywistym!
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}