import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gamepad2, 
  Target, 
  Zap, 
  Trophy, 
  Gift, 
  Star,
  Crown,
  Medal,
  Award,
  TrendingUp,
  Calendar,
  Users,
  Flame
} from 'lucide-react';

interface GamificationCenterProps {
  username: string;
  totalBoxes: number;
  efficiency: number;
  activeMachines: number;
  uptime: string;
}

export function GamificationCenter({
  username,
  totalBoxes,
  efficiency,
  activeMachines,
  uptime
}: GamificationCenterProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCenter, setShowCenter] = useState(false);

  // Game stats
  const userLevel = Math.floor(totalBoxes / 100) + 1;
  const xpProgress = (totalBoxes % 100);
  const totalAchievements = 8;
  const unlockedAchievements = Math.min(totalAchievements, Math.floor(totalBoxes / 50) + 2);
  const currentStreak = 5;
  const weeklyRank = 3;

  const gamificationStats = [
    {
      icon: <Trophy className="w-5 h-5 text-yellow-500" />,
      label: 'Poziom',
      value: userLevel,
      color: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      icon: <Star className="w-5 h-5 text-purple-500" />,
      label: 'Osiągnięcia',
      value: `${unlockedAchievements}/${totalAchievements}`,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: <Flame className="w-5 h-5 text-orange-500" />,
      label: 'Passa',
      value: `${currentStreak} dni`,
      color: 'text-orange-600 dark:text-orange-400'
    },
    {
      icon: <Medal className="w-5 h-5 text-blue-500" />,
      label: 'Ranking',
      value: `#${weeklyRank}`,
      color: 'text-blue-600 dark:text-blue-400'
    }
  ];

  const quickActions = [
    {
      icon: <Target className="w-4 h-4" />,
      label: 'Wyzwania',
      description: 'Sprawdź dzienne zadania',
      action: () => setActiveTab('challenges'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <Award className="w-4 h-4" />,
      label: 'Osiągnięcia',
      description: 'Zobacz swoje nagrody',
      action: () => setActiveTab('achievements'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: 'Ranking',
      description: 'Porównaj się z innymi',
      action: () => setActiveTab('leaderboard'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <Gift className="w-4 h-4" />,
      label: 'Nagrody',
      description: 'Odbierz swoje premie',
      action: () => setActiveTab('rewards'),
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const recentActivity = [
    {
      type: 'achievement',
      title: 'Nowe osiągnięcie odblokowane!',
      description: 'Pierwszy Karton - Wyprodukuj swój pierwszy karton',
      time: '2 min temu',
      icon: <Award className="w-4 h-4 text-yellow-500" />,
      reward: '+2.00 EUR'
    },
    {
      type: 'level',
      title: 'Awans na wyższy poziom!',
      description: `Osiągnięto poziom ${userLevel}`,
      time: '15 min temu',
      icon: <TrendingUp className="w-4 h-4 text-green-500" />,
      reward: '+50 XP'
    },
    {
      type: 'challenge',
      title: 'Wyzwanie ukończone',
      description: 'Dzienny Cel - 50 kartonów wyprodukowanych',
      time: '1 godz temu',
      icon: <Target className="w-4 h-4 text-blue-500" />,
      reward: '+10.00 EUR'
    }
  ];

  if (!showCenter) {
    return (
      <Card className="bg-gradient-to-br from-green-600 to-teal-700 text-white border-0 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6 text-yellow-400" />
            <div>
              <CardTitle className="text-lg font-bold">Centrum Gier</CardTitle>
              <div className="text-sm text-green-100">
                Poziom {userLevel} • {xpProgress}/100 XP
              </div>
            </div>
          </div>
          <Button
            onClick={() => setShowCenter(true)}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 h-8 px-3 text-xs"
            size="sm"
          >
            Otwórz
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {gamificationStats.map((stat, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-2 text-center">
                <div className="flex items-center justify-center mb-1">
                  {stat.icon}
                </div>
                <div className="text-xs font-bold">{stat.value}</div>
                <div className="text-xs text-green-200">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Progress to next level */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Do następnego poziomu:</span>
              <span>{100 - xpProgress} XP</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-100 border-2 border-green-200 dark:border-green-300 shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">Centrum Gamifikacji</CardTitle>
            <div className="text-sm text-gray-600 dark:text-gray-700">
              {username} • Poziom {userLevel}
            </div>
          </div>
        </div>
        <Button
          onClick={() => setShowCenter(false)}
          variant="outline"
          className="h-8 px-3 text-xs"
          size="sm"
        >
          Zwiń
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white h-auto p-3 flex flex-col items-center space-y-1`}
            >
              {action.icon}
              <div className="text-xs font-medium">{action.label}</div>
            </Button>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gamificationStats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 dark:bg-white rounded-lg">
              <div className="flex items-center justify-center mb-2">
                {stat.icon}
              </div>
              <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Level Progress */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-50 dark:to-teal-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">Postęp poziomu</span>
            </div>
            <Badge className="bg-green-500 text-white">
              Poziom {userLevel}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{xpProgress} XP</span>
              <span>100 XP</span>
            </div>
            <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-teal-500 transition-all duration-1000"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-700 text-center">
              {100 - xpProgress} XP do następnego poziomu
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Ostatnia aktywność</span>
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-white rounded-lg">
                <div className="mt-0.5">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{activity.title}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-700">{activity.description}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-600 mt-1">{activity.time}</div>
                </div>
                <Badge variant="outline" className="text-xs whitespace-nowrap">
                  {activity.reward}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}