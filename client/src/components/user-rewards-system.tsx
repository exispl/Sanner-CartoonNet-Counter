import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Award, Gift, Target, Crown, Medal, Zap } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward: number; // EUR reward
  type: 'production' | 'efficiency' | 'time' | 'special';
}

interface UserLevel {
  level: number;
  name: string;
  minXP: number;
  maxXP: number;
  color: string;
  icon: string;
}

interface UserRewardsSystemProps {
  username: string;
  totalBoxes: number;
  efficiency: number;
  uptime: string;
  onRewardEarned?: (amount: number, reason: string) => void;
}

export function UserRewardsSystem({ 
  username, 
  totalBoxes, 
  efficiency, 
  uptime,
  onRewardEarned 
}: UserRewardsSystemProps) {
  const [userXP, setUserXP] = useState(250);
  const [totalEarnings, setTotalEarnings] = useState(15.50);
  const [showAchievements, setShowAchievements] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  const userLevels: UserLevel[] = [
    { level: 1, name: 'Praktykant', minXP: 0, maxXP: 100, color: 'bg-gray-400', icon: '👶' },
    { level: 2, name: 'SoGXXX', minXP: 100, maxXP: 300, color: 'bg-blue-500', icon: '🔧' },
    { level: 3, name: 'Specjalista', minXP: 300, maxXP: 600, color: 'bg-green-500', icon: '⚙️' },
    { level: 4, name: 'Ekspert', minXP: 600, maxXP: 1000, color: 'bg-purple-500', icon: '🎯' },
    { level: 5, name: 'Mistrz', minXP: 1000, maxXP: 1500, color: 'bg-orange-500', icon: '👑' },
    { level: 6, name: 'Legenda', minXP: 1500, maxXP: 999999, color: 'bg-gradient-to-r from-yellow-400 to-orange-500', icon: '⭐' }
  ];

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_box',
      name: 'Pierwszy Karton',
      description: 'Wyprodukuj swój pierwszy karton',
      icon: '📦',
      unlocked: totalBoxes >= 1,
      progress: Math.min(totalBoxes, 1),
      maxProgress: 1,
      reward: 2.0,
      type: 'production'
    },
    {
      id: 'hundred_boxes',
      name: 'Setka na Karcie',
      description: 'Wyprodukuj 100 kartonów',
      icon: '💯',
      unlocked: totalBoxes >= 100,
      progress: Math.min(totalBoxes, 100),
      maxProgress: 100,
      reward: 25.0,
      type: 'production'
    },
    {
      id: 'efficiency_master',
      name: 'Mistrz Wydajności',
      description: 'Osiągnij 95% wydajności',
      icon: '🎯',
      unlocked: efficiency >= 95,
      progress: Math.min(efficiency, 95),
      maxProgress: 95,
      reward: 15.0,
      type: 'efficiency'
    },
    {
      id: 'marathon_worker',
      name: 'Maratończyk',
      description: 'Pracuj przez 8 godzin bez przerwy',
      icon: '🏃‍♂️',
      unlocked: false, // This would need uptime calculation
      progress: 0,
      maxProgress: 8,
      reward: 50.0,
      type: 'time'
    },
    {
      id: 'perfect_day',
      name: 'Idealny Dzień',
      description: 'Wyprodukuj 500 kartonów w jednej sesji',
      icon: '✨',
      unlocked: totalBoxes >= 500,
      progress: Math.min(totalBoxes, 500),
      maxProgress: 500,
      reward: 100.0,
      type: 'special'
    },
    {
      id: 'speed_demon',
      name: 'Demon Prędkości',
      description: 'Wyprodukuj 10 kartonów w 5 minut',
      icon: '⚡',
      unlocked: false,
      progress: 0,
      maxProgress: 10,
      reward: 30.0,
      type: 'production'
    }
  ]);

  const getCurrentLevel = () => {
    return userLevels.find(level => userXP >= level.minXP && userXP < level.maxXP) || userLevels[0];
  };

  const getNextLevel = () => {
    const current = getCurrentLevel();
    return userLevels.find(level => level.level === current.level + 1);
  };

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const progressToNextLevel = nextLevel 
    ? ((userXP - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100
    : 100;

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const availableAchievements = achievements.filter(a => !a.unlocked);

  const claimReward = (achievement: Achievement) => {
    setTotalEarnings(prev => prev + achievement.reward);
    setUserXP(prev => prev + Math.floor(achievement.reward * 10)); // 10 XP per EUR
    onRewardEarned?.(achievement.reward, `Osiągnięcie: ${achievement.name}`);
    
    // Mark achievement as claimed
    setAchievements(prev => prev.map(a => 
      a.id === achievement.id ? { ...a, unlocked: true } : a
    ));

    // Show achievement notification
    setNewAchievement(achievement);
    setTimeout(() => setNewAchievement(null), 5000);
  };

  const getTypeIcon = (type: Achievement['type']) => {
    switch (type) {
      case 'production': return <Target className="w-4 h-4" />;
      case 'efficiency': return <Zap className="w-4 h-4" />;
      case 'time': return <Trophy className="w-4 h-4" />;
      case 'special': return <Crown className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Achievement['type']) => {
    switch (type) {
      case 'production': return 'bg-blue-500';
      case 'efficiency': return 'bg-green-500';
      case 'time': return 'bg-purple-500';
      case 'special': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    }
  };

  return (
    <div className="space-y-4">
      {/* New Achievement Notification */}
      {newAchievement && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-2xl">
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="text-2xl">{newAchievement.icon}</div>
              <div>
                <div className="font-bold">Nowe Osiągnięcie!</div>
                <div className="text-sm">{newAchievement.name}</div>
                <div className="text-xs opacity-90">+{newAchievement.reward} EUR</div>
              </div>
              <Award className="w-6 h-6" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Rewards Card */}
      <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-0 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <CardTitle className="text-lg font-bold">System Nagród</CardTitle>
          </div>
          <Button
            onClick={() => setShowAchievements(!showAchievements)}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 h-8 px-3 text-xs"
            size="sm"
          >
            {showAchievements ? 'Ukryj' : 'Pokaż'} ({unlockedAchievements.length}/{achievements.length})
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* User Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{currentLevel.icon}</span>
                <div>
                  <div className="font-bold text-sm">{currentLevel.name}</div>
                  <div className="text-xs text-indigo-200">Poziom {currentLevel.level}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{userXP} XP</div>
                {nextLevel && (
                  <div className="text-xs text-indigo-200">
                    Do następnego: {nextLevel.minXP - userXP} XP
                  </div>
                )}
              </div>
            </div>
            
            {nextLevel && (
              <div className="space-y-1">
                <Progress value={progressToNextLevel} className="h-2" />
                <div className="text-xs text-indigo-200 text-center">
                  {Math.round(progressToNextLevel)}% do {nextLevel.name}
                </div>
              </div>
            )}
          </div>

          {/* Total Earnings */}
          <div className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">Łączne zarobki:</span>
            </div>
            <div className="text-lg font-bold text-yellow-400">
              {totalEarnings.toFixed(2)} EUR
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-white/10 rounded p-2 text-center">
              <div className="font-bold">{totalBoxes}</div>
              <div className="text-indigo-200">Kartonów</div>
            </div>
            <div className="bg-white/10 rounded p-2 text-center">
              <div className="font-bold">{efficiency}%</div>
              <div className="text-indigo-200">Wydajność</div>
            </div>
            <div className="bg-white/10 rounded p-2 text-center">
              <div className="font-bold">{unlockedAchievements.length}</div>
              <div className="text-indigo-200">Osiągnięcia</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Panel */}
      {showAchievements && (
        <Card className="bg-white/95 dark:bg-gray-800/95 border-2 border-indigo-200 dark:border-indigo-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Medal className="w-5 h-5" />
              <span>Osiągnięcia</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Unlocked Achievements */}
            {unlockedAchievements.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600 dark:text-green-400 flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Odblokowane ({unlockedAchievements.length})</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {unlockedAchievements.map(achievement => (
                    <div 
                      key={achievement.id}
                      className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{achievement.name}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</div>
                          <Badge className={`mt-1 text-xs ${getTypeColor(achievement.type)} text-white`}>
                            +{achievement.reward} EUR
                          </Badge>
                        </div>
                        <div className="text-green-600 dark:text-green-400">
                          <Award className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Achievements */}
            {availableAchievements.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>Do zdobycia ({availableAchievements.length})</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableAchievements.map(achievement => (
                    <div 
                      key={achievement.id}
                      className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg opacity-75"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl grayscale">{achievement.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{achievement.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{achievement.description}</div>
                          <div className="mt-2 space-y-1">
                            <Progress 
                              value={(achievement.progress / achievement.maxProgress) * 100} 
                              className="h-1"
                            />
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {achievement.progress}/{achievement.maxProgress}
                            </div>
                          </div>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {getTypeIcon(achievement.type)} {achievement.reward} EUR
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}