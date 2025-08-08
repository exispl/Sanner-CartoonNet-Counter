import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Star, 
  Zap, 
  Medal, 
  Crown, 
  Target,
  CheckCircle,
  Sparkles,
  Gift,
  Award
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'production' | 'efficiency' | 'time' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  reward: number;
  progress?: number;
  maxProgress?: number;
  unlocked: boolean;
  justUnlocked?: boolean;
}

interface AchievementMicroInteractionsProps {
  achievements: Achievement[];
  onAchievementClick?: (achievement: Achievement) => void;
}

const rarityColors = {
  common: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    border: 'border-gray-300 dark:border-gray-600',
    text: 'text-gray-800 dark:text-gray-200',
    glow: 'shadow-gray-300/50',
    particle: '#9CA3AF'
  },
  rare: {
    bg: 'bg-blue-100 dark:bg-blue-900',
    border: 'border-blue-300 dark:border-blue-600',
    text: 'text-blue-800 dark:text-blue-200',
    glow: 'shadow-blue-400/50',
    particle: '#3B82F6'
  },
  epic: {
    bg: 'bg-purple-100 dark:bg-purple-900',
    border: 'border-purple-300 dark:border-purple-600',
    text: 'text-purple-800 dark:text-purple-200',
    glow: 'shadow-purple-400/50',
    particle: '#8B5CF6'
  },
  legendary: {
    bg: 'bg-yellow-100 dark:bg-yellow-900',
    border: 'border-yellow-300 dark:border-yellow-600',
    text: 'text-yellow-800 dark:text-yellow-200',
    glow: 'shadow-yellow-400/50',
    particle: '#F59E0B'
  }
};

const categoryIcons = {
  production: Target,
  efficiency: Zap,
  time: CheckCircle,
  special: Crown
};

function ParticleEffect({ color, isActive }: { color: string; isActive: boolean }) {
  const particles = Array.from({ length: 8 }, (_, i) => i);

  return (
    <AnimatePresence>
      {isActive && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle}
              className="absolute w-1 h-1 rounded-full"
              style={{ backgroundColor: color }}
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
                opacity: 1
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 200}%`,
                y: `${50 + (Math.random() - 0.5) * 200}%`,
                scale: [0, 1, 0],
                opacity: [1, 1, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                delay: particle * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

function AchievementCard({ achievement, onClick }: { 
  achievement: Achievement; 
  onClick?: (achievement: Achievement) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);

  const colors = rarityColors[achievement.rarity];
  const IconComponent = achievement.icon;
  const CategoryIcon = categoryIcons[achievement.category];

  useEffect(() => {
    if (achievement.justUnlocked) {
      setShowParticles(true);
      setPulseEffect(true);
      
      const timer = setTimeout(() => {
        setShowParticles(false);
        setPulseEffect(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [achievement.justUnlocked]);

  const progressPercentage = achievement.progress && achievement.maxProgress 
    ? (achievement.progress / achievement.maxProgress) * 100 
    : 0;

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className={`
          ${colors.bg} ${colors.border} border-2 cursor-pointer
          transition-all duration-300 relative overflow-hidden
          ${isHovered ? `${colors.glow} shadow-xl` : 'shadow-md'}
          ${pulseEffect ? 'animate-pulse' : ''}
          ${achievement.unlocked ? '' : 'opacity-60 grayscale'}
        `}
        onClick={() => onClick?.(achievement)}
        data-testid={`achievement-${achievement.id}`}
      >
        <CardContent className="p-4 relative">
          {/* Particle Effect */}
          <ParticleEffect 
            color={colors.particle} 
            isActive={showParticles}
          />

          {/* Glow Effect for Legendary */}
          {achievement.rarity === 'legendary' && achievement.unlocked && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          <div className="flex items-start space-x-3 relative z-10">
            {/* Icon with Animation */}
            <motion.div
              className={`
                p-2 rounded-lg ${colors.bg} ${colors.border} border
                flex items-center justify-center relative
              `}
              animate={{
                rotate: achievement.justUnlocked ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                repeat: achievement.justUnlocked ? 3 : 0,
              }}
            >
              <IconComponent className={`h-6 w-6 ${colors.text}`} />
              
              {/* Sparkle Effect for Unlocked */}
              {achievement.unlocked && (
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="h-3 w-3 text-yellow-500" />
                </motion.div>
              )}
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`font-semibold text-sm ${colors.text}`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-xs ${colors.text} opacity-80 mt-1`}>
                    {achievement.description}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Category Badge */}
                  <Badge 
                    variant="outline" 
                    className={`${colors.border} ${colors.text} text-xs`}
                  >
                    <CategoryIcon className="h-3 w-3 mr-1" />
                    {achievement.category}
                  </Badge>

                  {/* Reward */}
                  <motion.div
                    className={`flex items-center space-x-1 ${colors.text}`}
                    animate={{
                      scale: achievement.justUnlocked ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: achievement.justUnlocked ? 2 : 0,
                    }}
                  >
                    <Gift className="h-3 w-3" />
                    <span className="text-xs font-medium">+{achievement.reward} EUR</span>
                  </motion.div>
                </div>
              </div>

              {/* Progress Bar (if applicable) */}
              {achievement.maxProgress && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={`${colors.text} opacity-80`}>Postęp</span>
                    <span className={`${colors.text} font-medium`}>
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${
                        achievement.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                        achievement.rarity === 'epic' ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                        achievement.rarity === 'rare' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                        'bg-gradient-to-r from-gray-400 to-gray-600'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}

              {/* Unlocked Status */}
              {achievement.unlocked && (
                <motion.div
                  className="flex items-center space-x-1 mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Odblokowane!
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function AchievementMicroInteractions({ 
  achievements, 
  onAchievementClick 
}: AchievementMicroInteractionsProps) {
  const [filter, setFilter] = useState<'all' | Achievement['category']>('all');
  const [sortBy, setSortBy] = useState<'rarity' | 'progress' | 'unlocked'>('rarity');

  const filteredAndSortedAchievements = achievements
    .filter(achievement => filter === 'all' || achievement.category === filter)
    .sort((a, b) => {
      if (sortBy === 'unlocked') {
        if (a.unlocked && !b.unlocked) return -1;
        if (!a.unlocked && b.unlocked) return 1;
      }
      if (sortBy === 'rarity') {
        const rarityOrder = ['legendary', 'epic', 'rare', 'common'];
        return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
      }
      if (sortBy === 'progress' && a.maxProgress && b.maxProgress) {
        const progressA = (a.progress || 0) / a.maxProgress;
        const progressB = (b.progress || 0) / b.maxProgress;
        return progressB - progressA;
      }
      return 0;
    });

  return (
    <div className="space-y-4">
      {/* Filter and Sort Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Kategoria:
          </span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
            data-testid="achievement-filter"
          >
            <option value="all">Wszystkie</option>
            <option value="production">Produkcja</option>
            <option value="efficiency">Efektywność</option>
            <option value="time">Czas</option>
            <option value="special">Specjalne</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sortuj:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
            data-testid="achievement-sort"
          >
            <option value="rarity">Rzadkość</option>
            <option value="unlocked">Status</option>
            <option value="progress">Postęp</option>
          </select>
        </div>
      </div>

      {/* Achievements Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredAndSortedAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <AchievementCard
                achievement={achievement}
                onClick={onAchievementClick}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredAndSortedAchievements.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Brak osiągnięć
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Nie znaleziono osiągnięć spełniających wybrane kryteria.
          </p>
        </motion.div>
      )}
    </div>
  );
}