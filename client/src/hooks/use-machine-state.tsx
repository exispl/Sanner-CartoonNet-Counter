import { useState, useEffect, useRef } from 'react';

export interface MachineState {
  running: boolean;
  progress: number;
  currentBox: number;
  itemsInBox: number;
  itemsProduced: number;
  name: string;
  limit: number;
  cycleTime: number;
}

export function useMachineState(machineId: number, initialName: string, initialLimit: number, initialCycleTime: number) {
  const [state, setState] = useState<MachineState>({
    running: false,
    progress: 0,
    currentBox: 1,
    itemsInBox: 0,
    itemsProduced: 0,
    name: initialName,
    limit: initialLimit,
    cycleTime: initialCycleTime
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateSettings = (limit: number, cycleTime: number, name?: string) => {
    setState(prev => ({
      ...prev,
      limit,
      cycleTime,
      ...(name && { name })
    }));
  };

  const start = () => {
    if (state.running) return;

    setState(prev => ({ ...prev, running: true }));
    
    const intervalTime = (state.cycleTime * 60000) / state.limit;
    
    intervalRef.current = setInterval(() => {
      setState(prev => {
        let newItemsInBox = prev.itemsInBox + 1;
        let newCurrentBox = prev.currentBox;
        
        if (newItemsInBox > prev.limit) {
          newCurrentBox++;
          newItemsInBox = 1;
        }
        
        return {
          ...prev,
          progress: prev.progress + 1,
          itemsInBox: newItemsInBox,
          currentBox: newCurrentBox,
          itemsProduced: prev.itemsProduced + 1
        };
      });
    }, intervalTime);
  };

  const pause = () => {
    setState(prev => ({ ...prev, running: false }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    pause();
    setState(prev => ({
      ...prev,
      progress: 0,
      currentBox: 1,
      itemsProduced: 0,
      itemsInBox: 0
    }));
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (state.running && intervalRef.current) {
      clearInterval(intervalRef.current);
      const intervalTime = (state.cycleTime * 60000) / state.limit;
      intervalRef.current = setInterval(() => {
        setState(prev => {
          let newItemsInBox = prev.itemsInBox + 1;
          let newCurrentBox = prev.currentBox;
          
          if (newItemsInBox > prev.limit) {
            newCurrentBox++;
            newItemsInBox = 1;
          }
          
          return {
            ...prev,
            progress: prev.progress + 1,
            itemsInBox: newItemsInBox,
            currentBox: newCurrentBox
          };
        });
      }, intervalTime);
    }
  }, [state.limit, state.cycleTime, state.running]);

  return {
    state,
    start,
    pause,
    reset,
    updateSettings
  };
}
