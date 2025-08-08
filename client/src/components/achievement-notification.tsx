import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Sparkles, 
  Gift,
  CheckCircle,
  Star
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'production' | 'efficiency' | 'time' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  reward: number;
  unlocked: boolean;
  justUnlocked?: boolean;
}

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

const rarityColors = {
  common: {
    bg: 'from-gray-400 to-gray-600',
    text: 'text-gray-800',
    glow: 'shadow-gray-400/50'
  },
  rare: {
    bg: 'from-blue-400 to-blue-600',
    text: 'text-blue-800',
    glow: 'shadow-blue-400/50'
  },
  epic: {
    bg: 'from-purple-400 to-purple-600',
    text: 'text-purple-800',
    glow: 'shadow-purple-400/50'
  },
  legendary: {
    bg: 'from-yellow-400 to-orange-500',
    text: 'text-yellow-800',
    glow: 'shadow-yellow-400/50'
  }
};

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  const colors = rarityColors[achievement.rarity];
  const IconComponent = achievement.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 z-[9999] pointer-events-auto"
          initial={{ x: 400, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 400, opacity: 0, scale: 0.8 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
        >
          <Card className={`
            bg-white dark:bg-gray-900 border-2 
            ${colors.glow} shadow-2xl w-80 overflow-hidden
            relative
          `}>
            {/* Animated Background */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${colors.bg} opacity-10`}
              animate={{
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Sparkle Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 6 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              ))}
            </div>

            <CardContent className="p-4 relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: 2,
                    }}
                  >
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </motion.div>
                  <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                    OSIĄGNIĘCIE ODBLOKOWANE!
                  </span>
                </div>
                <Badge className={`${colors.text} bg-gradient-to-r ${colors.bg} text-white text-xs`}>
                  {achievement.rarity}
                </Badge>
              </div>

              {/* Achievement Content */}
              <div className="flex items-start space-x-3">
                {/* Icon with Animation */}
                <motion.div
                  className={`
                    p-3 rounded-lg bg-gradient-to-r ${colors.bg} 
                    flex items-center justify-center relative
                  `}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut"
                  }}
                >
                  <IconComponent className="h-6 w-6 text-white" />
                  
                  {/* Sparkle Effect */}
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{
                      scale: [1, 1.5, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                  </motion.div>
                </motion.div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {achievement.description}
                  </p>
                  
                  {/* Reward */}
                  <motion.div
                    className="space-y-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <div className="flex items-center space-x-2">
                      <Gift className="h-4 w-4 text-green-500" />
                      <span className="font-bold text-green-600 dark:text-green-400">
                        +{achievement.reward} EUR
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Złóż wniosek z kodem: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">BBS</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Progress Indicator */}
              <motion.div
                className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
              >
                <motion.div
                  className={`h-full bg-gradient-to-r ${colors.bg}`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeOut" }}
                />
              </motion.div>

              {/* Success Icon */}
              <motion.div
                className="absolute top-2 right-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <CheckCircle className="h-5 w-5 text-green-500" />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}