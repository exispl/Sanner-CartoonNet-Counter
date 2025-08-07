import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, Clock, Star, Flame, Gift } from 'lucide-react';

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  current: number;
  reward: number; // EUR
  xpReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  timeLeft: string;
}

interface DailyChallengesProps {
  totalBoxes: number;
  efficiency: number;
  activeMachines: number;
  onRewardClaimed?: (amount: number, reason: string) => void;
}

export function DailyChallenges({ 
  totalBoxes, 
  efficiency, 
  activeMachines,
  onRewardClaimed 
}: DailyChallengesProps) {
  const [showChallenges, setShowChallenges] = useState(false);
  const [streak, setStreak] = useState(3); // Current daily challenge streak
  const [lastCompleted, setLastCompleted] = useState<Date>(new Date());

  const [challenges, setChallenges] = useState<DailyChallenge[]>([
    {
      id: 'daily_boxes',
      title: 'Dzienny Cel',
      description: 'Wyprodukuj 50 kartonów dziś',
      icon: '📦',
      target: 50,
      current: Math.min(totalBoxes, 50),
      reward: 10.0,
      xpReward: 100,
      difficulty: 'easy',
      completed: totalBoxes >= 50,
      timeLeft: '18:45:23'
    },
    {
      id: 'efficiency_master',
      title: 'Mistrz Efektywności',
      description: 'Utrzymaj wydajność powyżej 90% przez 2 godziny',
      icon: '⚡',
      target: 120, // 120 minutes
      current: efficiency >= 90 ? 45 : 0, // Simulated time
      reward: 25.0,
      xpReward: 250,
      difficulty: 'medium',
      completed: false,
      timeLeft: '18:45:23'
    },
    {
      id: 'multi_machine',
      title: 'Multitasking Pro',
      description: 'Obsługuj 2 maszyny jednocześnie przez 1 godzinę',
      icon: '🔀',
      target: 60, // 60 minutes
      current: activeMachines >= 2 ? 25 : 0, // Simulated time
      reward: 40.0,
      xpReward: 400,
      difficulty: 'hard',
      completed: false,
      timeLeft: '18:45:23'
    },
    {
      id: 'speed_run',
      title: 'Speed Run',
      description: 'Wyprodukuj 100 kartonów w rekordowym tempie',
      icon: '🏃‍♂️',
      target: 100,
      current: Math.min(totalBoxes, 100),
      reward: 50.0,
      xpReward: 500,
      difficulty: 'hard',
      completed: totalBoxes >= 100,
      timeLeft: '18:45:23'
    }
  ]);

  const completedChallenges = challenges.filter(c => c.completed);
  const availableChallenges = challenges.filter(c => !c.completed);

  const getDifficultyColor = (difficulty: DailyChallenge['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'hard': return 'bg-red-500 text-white';
    }
  };

  const getDifficultyName = (difficulty: DailyChallenge['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'Łatwe';
      case 'medium': return 'Średnie';
      case 'hard': return 'Trudne';
    }
  };

  const claimReward = (challenge: DailyChallenge) => {
    onRewardClaimed?.(challenge.reward, `Wyzwanie: ${challenge.title}`);
    setChallenges(prev => prev.map(c => 
      c.id === challenge.id ? { ...c, completed: true } : c
    ));
    
    // Increase streak if all challenges completed
    if (completedChallenges.length === challenges.length - 1) {
      setStreak(prev => prev + 1);
      setLastCompleted(new Date());
    }
  };

  const getStreakBonus = () => {
    if (streak >= 7) return 50; // 50 EUR bonus for 7-day streak
    if (streak >= 3) return 20; // 20 EUR bonus for 3-day streak
    return 0;
  };

  const totalPossibleReward = challenges.reduce((sum, c) => sum + c.reward, 0);
  const earnedReward = completedChallenges.reduce((sum, c) => sum + c.reward, 0);

  return (
    <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-yellow-300" />
          <div>
            <CardTitle className="text-lg font-bold">Dzienne Wyzwania</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-orange-100">
              <Flame className="w-4 h-4" />
              <span>Passa: {streak} dni</span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setShowChallenges(!showChallenges)}
          className="bg-white/20 hover:bg-white/30 text-white border-white/30 h-8 px-3 text-xs"
          size="sm"
        >
          {showChallenges ? 'Ukryj' : 'Pokaż'} ({completedChallenges.length}/{challenges.length})
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Summary */}
        <div className="bg-white/10 rounded-lg p-3 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Postęp dnia:</span>
            <span className="font-bold">{completedChallenges.length}/{challenges.length}</span>
          </div>
          <Progress 
            value={(completedChallenges.length / challenges.length) * 100} 
            className="h-2"
          />
          <div className="flex justify-between text-xs text-orange-100">
            <span>Zarobione: {earnedReward} EUR</span>
            <span>Możliwe: {totalPossibleReward} EUR</span>
          </div>
        </div>

        {/* Streak Bonus */}
        {streak >= 3 && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-orange-900 rounded-lg p-2 text-center text-sm font-bold">
            <Gift className="w-4 h-4 inline mr-1" />
            Bonus za passę: +{getStreakBonus()} EUR (za {streak} dni)
          </div>
        )}

        {/* Time Left */}
        <div className="flex items-center justify-center space-x-2 text-sm text-orange-100">
          <Clock className="w-4 h-4" />
          <span>Odnowienie za: {challenges[0]?.timeLeft}</span>
        </div>

        {/* Challenges List */}
        {showChallenges && (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {challenges.map(challenge => (
              <div 
                key={challenge.id}
                className={`p-3 rounded-lg border-2 ${
                  challenge.completed 
                    ? 'bg-green-500/20 border-green-400' 
                    : 'bg-white/10 border-white/20'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{challenge.icon}</span>
                    <div>
                      <div className="font-semibold text-sm">{challenge.title}</div>
                      <div className="text-xs text-orange-100">{challenge.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {getDifficultyName(challenge.difficulty)}
                    </Badge>
                    {challenge.completed && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>{challenge.current}/{challenge.target}</span>
                    <span className="font-bold">+{challenge.reward} EUR</span>
                  </div>
                  <Progress 
                    value={(challenge.current / challenge.target) * 100} 
                    className="h-2"
                  />
                </div>

                {challenge.completed && (
                  <Button
                    onClick={() => claimReward(challenge)}
                    className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white text-xs h-7"
                    size="sm"
                  >
                    <Star className="w-3 h-3 mr-1" />
                    Odbierz nagrodę
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}