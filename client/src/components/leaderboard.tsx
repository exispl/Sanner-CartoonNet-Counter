import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, Crown, TrendingUp, Users } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  level: number;
  totalBoxes: number;
  efficiency: number;
  totalEarnings: number;
  achievements: number;
  isCurrentUser: boolean;
  avatar?: string;
  title: string;
}

interface LeaderboardProps {
  currentUser: string;
}

export function Leaderboard({ currentUser }: LeaderboardProps) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [timeFrame, setTimeFrame] = useState<'daily' | 'weekly' | 'monthly' | 'alltime'>('weekly');

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([
    {
      rank: 1,
      username: 'ProduktionMeister',
      level: 6,
      totalBoxes: 2547,
      efficiency: 98.5,
      totalEarnings: 450.75,
      achievements: 23,
      isCurrentUser: false,
      title: 'Legenda Produkcji'
    },
    {
      rank: 2,
      username: 'SpeedyGonzales',
      level: 5,
      totalBoxes: 2134,
      efficiency: 96.2,
      totalEarnings: 380.50,
      achievements: 19,
      isCurrentUser: false,
      title: 'Mistrz Prędkości'
    },
    {
      rank: 3,
      username: currentUser,
      level: 3,
      totalBoxes: 1247,
      efficiency: 87.3,
      totalEarnings: 215.25,
      achievements: 12,
      isCurrentUser: true,
      title: 'Specjalista'
    },
    {
      rank: 4,
      username: 'EfficiencyExpert',
      level: 4,
      totalBoxes: 1089,
      efficiency: 94.8,
      totalEarnings: 195.80,
      achievements: 15,
      isCurrentUser: false,
      title: 'Ekspert Wydajności'
    },
    {
      rank: 5,
      username: 'BoxingChampion',
      level: 3,
      totalBoxes: 987,
      efficiency: 89.1,
      totalEarnings: 175.60,
      achievements: 11,
      isCurrentUser: false,
      title: 'Mistrz Kartonów'
    },
    {
      rank: 6,
      username: 'NightShiftHero',
      level: 2,
      totalBoxes: 756,
      efficiency: 85.4,
      totalEarnings: 135.90,
      achievements: 8,
      isCurrentUser: false,
      title: 'Nocny Wojownik'
    },
    {
      rank: 7,
      username: 'QualityFirst',
      level: 2,
      totalBoxes: 634,
      efficiency: 92.7,
      totalEarnings: 120.45,
      achievements: 9,
      isCurrentUser: false,
      title: 'Strażnik Jakości'
    },
    {
      rank: 8,
      username: 'TurboWorker',
      level: 2,
      totalBoxes: 523,
      efficiency: 88.3,
      totalEarnings: 95.20,
      achievements: 7,
      isCurrentUser: false,
      title: 'Turbo Pracownik'
    },
    {
      rank: 9,
      username: 'MorningShift',
      level: 1,
      totalBoxes: 445,
      efficiency: 81.6,
      totalEarnings: 78.50,
      achievements: 6,
      isCurrentUser: false,
      title: 'Poranny Ptak'
    },
    {
      rank: 10,
      username: 'PrecisionMaster',
      level: 2,
      totalBoxes: 412,
      efficiency: 95.1,
      totalEarnings: 85.75,
      achievements: 8,
      isCurrentUser: false,
      title: 'Mistrz Precyzji'
    },
    {
      rank: 11,
      username: 'TeamPlayer',
      level: 1,
      totalBoxes: 356,
      efficiency: 79.4,
      totalEarnings: 65.30,
      achievements: 5,
      isCurrentUser: false,
      title: 'Gracz Zespołowy'
    },
    {
      rank: 12,
      username: 'NewHope',
      level: 1,
      totalBoxes: 234,
      efficiency: 76.8,
      totalEarnings: 42.15,
      achievements: 3,
      isCurrentUser: false,
      title: 'Nowa Nadzieja'
    },
    {
      rank: 8,
      username: 'NewbiePro',
      level: 1,
      totalBoxes: 423,
      efficiency: 78.2,
      totalEarnings: 85.30,
      achievements: 5,
      isCurrentUser: false,
      title: 'Wschodzący Talent'
    }
  ]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <div className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</div>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
    if (rank === 2) return 'bg-gray-400 text-white';
    if (rank === 3) return 'bg-amber-600 text-white';
    return 'bg-gray-200 text-gray-800';
  };

  const getLevelColor = (level: number) => {
    if (level >= 6) return 'bg-gradient-to-r from-purple-500 to-pink-500';
    if (level >= 4) return 'bg-purple-500';
    if (level >= 3) return 'bg-blue-500';
    if (level >= 2) return 'bg-green-500';
    return 'bg-gray-500';
  };

  const getTimeFrameLabel = (frame: typeof timeFrame) => {
    switch (frame) {
      case 'daily': return 'Dzisiaj';
      case 'weekly': return 'Ten tydzień';
      case 'monthly': return 'Ten miesiąc';
      case 'alltime': return 'Wszech czasów';
    }
  };

  const currentUserEntry = leaderboardData.find(entry => entry.isCurrentUser);
  const topEntries = leaderboardData.slice(0, 3);
  const restEntries = leaderboardData.slice(3);

  return (
    <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white border-0 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-yellow-400" />
          <div>
            <CardTitle className="text-lg font-bold">Ranking</CardTitle>
            <div className="text-sm text-purple-100">
              {getTimeFrameLabel(timeFrame)}
            </div>
          </div>
        </div>
        <Button
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="bg-white/20 hover:bg-white/30 text-white border-white/30 h-8 px-3 text-xs"
          size="sm"
        >
          {showLeaderboard ? 'Ukryj' : 'Pokaż'}
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current User Quick Stats */}
        {currentUserEntry && (
          <div className="bg-white/10 rounded-lg p-3 border border-yellow-400/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-400 text-purple-800 rounded-full font-bold text-sm">
                  #{currentUserEntry.rank}
                </div>
                <div>
                  <div className="font-bold text-sm">{currentUserEntry.username}</div>
                  <div className="text-xs text-purple-200">{currentUserEntry.title}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">{currentUserEntry.totalBoxes} kartonów</div>
                <div className="text-xs text-purple-200">{currentUserEntry.totalEarnings.toFixed(2)} EUR</div>
              </div>
            </div>
          </div>
        )}

        {/* Time Frame Selector */}
        <div className="flex space-x-1 p-1 bg-white/10 rounded-lg">
          {(['daily', 'weekly', 'monthly', 'alltime'] as const).map((frame) => (
            <Button
              key={frame}
              onClick={() => setTimeFrame(frame)}
              className={`flex-1 h-7 text-xs ${
                timeFrame === frame
                  ? 'bg-white text-purple-700'
                  : 'bg-transparent text-white hover:bg-white/20'
              }`}
              size="sm"
            >
              {getTimeFrameLabel(frame).split(' ')[0]}
            </Button>
          ))}
        </div>

        {/* Leaderboard */}
        {showLeaderboard && (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {/* Top 3 - Special display */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-3 flex items-center space-x-1">
                <Trophy className="w-4 h-4" />
                <span>Podium</span>
              </h4>
              <div className="space-y-2">
                {topEntries.map((entry) => (
                  <div 
                    key={entry.username}
                    className={`p-3 rounded-lg ${
                      entry.isCurrentUser 
                        ? 'bg-yellow-400/20 border-2 border-yellow-400' 
                        : 'bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {getRankIcon(entry.rank)}
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-purple-500 text-white text-xs">
                          {entry.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm">{entry.username}</span>
                          <Badge className={`text-xs ${getLevelColor(entry.level)} text-white`}>
                            L{entry.level}
                          </Badge>
                          {entry.isCurrentUser && (
                            <Badge className="bg-yellow-400 text-purple-800 text-xs">
                              TY
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-purple-200">{entry.title}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{entry.totalBoxes}</div>
                        <div className="text-xs text-purple-200">{entry.efficiency}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rest of the leaderboard */}
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Pozostali</span>
              </h4>
              <div className="space-y-1">
                {restEntries.map((entry) => (
                  <div 
                    key={entry.username}
                    className={`p-2 rounded ${
                      entry.isCurrentUser 
                        ? 'bg-yellow-400/20 border border-yellow-400' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-6 text-center font-bold">#{entry.rank}</div>
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-purple-400 text-white text-xs">
                          {entry.username.substring(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">{entry.username}</div>
                      <Badge className={`text-xs ${getLevelColor(entry.level)} text-white`}>
                        L{entry.level}
                      </Badge>
                      <div className="text-xs text-purple-200 w-12 text-right">{entry.totalBoxes}</div>
                      <div className="text-xs text-purple-200 w-10 text-right">{entry.efficiency}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}