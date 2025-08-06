import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Euro, Wallet } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface UserBalanceProps {
  username: string;
}

export function UserBalance({ username }: UserBalanceProps) {
  const [balance, setBalance] = useState(10); // Each user starts with 10 EUR

  const handleLotterySpin = () => {
    if (balance >= 1) {
      setBalance(balance - 1);
      // Here you could add lottery logic
      console.log(`${username} spun the lottery for 1 EUR. Remaining balance: ${balance - 1} EUR`);
    }
  };

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
          Zakręcenie: 1 EUR
        </p>
        <Button 
          onClick={handleLotterySpin}
          disabled={balance < 1}
          className="mt-2 bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs h-6 px-2"
          size="sm"
        >
          Zakręć (1€)
        </Button>
      </CardContent>
    </Card>
  );
}