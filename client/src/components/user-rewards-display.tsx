import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Gift, Info, MapPin, Clock, Phone } from 'lucide-react';

interface UserRewardsDisplayProps {
  username: string;
}

interface Reward {
  id: string;
  emoji: string;
  name: string;
  description: string;
  claimInfo: string;
  location?: string;
  timeLimit?: string;
  contact?: string;
}

export function UserRewardsDisplay({ username }: UserRewardsDisplayProps) {
  const [rewards] = useState<Reward[]>([
    {
      id: '1',
      emoji: '🎁',
      name: 'Voucher 50 EUR',
      description: 'Voucher na zakupy w Media Markt',
      claimInfo: 'Zgłoś się do działu HR z tym kodem: MM50-2025-789',
      location: 'Dział HR, budynek A, pokój 205',
      timeLimit: 'Ważne do 15.03.2025',
      contact: 'hr@sanner.de lub tel. +49 30 12345678'
    },
    {
      id: '2', 
      emoji: '🍕',
      name: 'Pizza dla zespołu',
      description: 'Darmowa pizza dla całej zmiany',
      claimInfo: 'Złóż wniosek urlopowy z kodem: BBS\nW polu Bemerkung wpisz: Lokalizacja: Biuro, Termin wykorzystania: do 30.06.2027',
      location: 'Biuro',
      timeLimit: 'Do 30.06.2027',
      contact: 'kamil.kowalczyk@sanner.gmbh'
    },
    {
      id: '5', 
      emoji: '🍕',
      name: 'Pizza #2',
      description: 'Druga pizza dla zespołu',
      claimInfo: 'Złóż wniosek urlopowy z kodem: BBS\nW polu Bemerkung wpisz: Lokalizacja: Biuro, Termin wykorzystania: do 30.06.2027',
      location: 'Biuro',
      timeLimit: 'Do 30.06.2027',
      contact: 'kamil.kowalczyk@sanner.gmbh'
    },
    {
      id: '3',
      emoji: '🏆',
      name: 'Dzień wolny',
      description: 'Dodatkowy dzień urlopu',
      claimInfo: 'Złóż wniosek urlopowy z kodem: BONUS-DAY-2025',
      location: 'Dział personalny lub online',
      timeLimit: 'Do wykorzystania do końca roku',
      contact: 'personal@sanner.de'
    },
    {
      id: '4',
      emoji: '🎯',
      name: 'Parking VIP',
      description: 'Miesiąc parkowania w strefie VIP',
      claimInfo: 'Odbierz kartę dostępu w recepcji głównej',
      location: 'Recepcja główna, budynek A',
      timeLimit: 'Aktywuj w ciągu 30 dni',
      contact: 'Recepcja: +49 30 11111111'
    }
  ]);

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2 mb-2">
        <Gift className="h-4 w-4 text-green-600 dark:text-green-500" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
          Nagrody {username}:
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {rewards.map((reward) => (
          <Dialog key={reward.id}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 text-lg hover:scale-110 transition-transform bg-yellow-50 dark:bg-yellow-100 border-yellow-300 dark:border-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-200"
                data-testid={`reward-${reward.id}`}
              >
                {reward.emoji}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-100 max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-800">
                  <span className="text-2xl">{reward.emoji}</span>
                  <span>{reward.name}</span>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 text-gray-800 dark:text-gray-700">
                <div>
                  <h4 className="font-semibold mb-1">Opis nagrody:</h4>
                  <p className="text-sm">{reward.description}</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-100 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-800 dark:text-blue-900 mb-1">
                        Jak odebrać:
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-800">
                        {reward.claimInfo}
                      </p>
                    </div>
                  </div>
                </div>
                
                {reward.location && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Lokalizacja:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-700">{reward.location}</p>
                    </div>
                  </div>
                )}
                
                {reward.timeLimit && (
                  <div className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 text-orange-600 dark:text-orange-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Termin:</h4>
                      <p className="text-sm text-orange-600 dark:text-orange-700">{reward.timeLimit}</p>
                    </div>
                  </div>
                )}
                
                {reward.contact && (
                  <div className="flex items-start space-x-2">
                    <Phone className="h-4 w-4 text-green-600 dark:text-green-700 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Kontakt:</h4>
                      <p className="text-sm text-green-600 dark:text-green-700">{reward.contact}</p>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}