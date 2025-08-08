import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Euro, Wallet } from 'lucide-react';

interface UserBalanceProps {
  username: string;
}

export function UserBalance({ username }: UserBalanceProps) {
  const [balance, setBalance] = useState(() => {
    // Each user has their own balance stored in localStorage
    const saved = localStorage.getItem(`balance_${username}`);
    return saved ? parseFloat(saved) : 10.0; // Start with 10 EUR
  });

  // Save balance when it changes
  useEffect(() => {
    localStorage.setItem(`balance_${username}`, balance.toString());
  }, [balance, username]);

  // Function to update balance from outside (e.g., lottery wins)
  const updateBalance = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  // Expose updateBalance globally for other components
  useEffect(() => {
    (window as any)[`updateBalance_${username}`] = updateBalance;
    return () => {
      delete (window as any)[`updateBalance_${username}`];
    };
  }, [username]);

  return (
    <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 w-48">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Saldo</CardTitle>
        <Wallet className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Euro className="h-5 w-5" />
          <span className="text-xl font-bold">{balance.toFixed(2)}</span>
        </div>
        <p className="text-xs text-green-100 mt-1">
          {username}
        </p>
      </CardContent>
    </Card>
  );
}