import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MachineControlsProps {
  boxSize: '5T' | '6T' | '10T';
  capsuleCount: number;
  onBoxSizeChange: (size: '5T' | '6T' | '10T') => void;
  onCapsuleCountChange: (count: number) => void;
  t: (key: string) => string;
}

export function MachineControls({ 
  boxSize, 
  capsuleCount, 
  onBoxSizeChange, 
  onCapsuleCountChange,
  t 
}: MachineControlsProps) {
  return (
    <div className="bg-white/10 rounded-xl p-4 border-2 border-white/20 space-y-4">
      <h3 className="text-lg font-semibold text-white text-center">
        ⚙️ Konfiguracja produkcji
      </h3>
      
      {/* Box Size Selector */}
      <div className="space-y-2">
        <Label className="text-white font-medium">Rozmiar kartonu:</Label>
        <Select value={boxSize} onValueChange={onBoxSizeChange}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-industrial-800 border-industrial-200 dark:border-industrial-600">
            <SelectItem value="5T" className="text-industrial-800 dark:text-white">5T - Mały</SelectItem>
            <SelectItem value="6T" className="text-industrial-800 dark:text-white">6T - Średni</SelectItem>
            <SelectItem value="10T" className="text-industrial-800 dark:text-white">10T - Duży</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Capsule Count Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-white font-medium">Ilość kapsułek:</Label>
          <span className="text-white font-bold bg-white/20 px-3 py-1 rounded-lg">
            {capsuleCount}
          </span>
        </div>
        <Slider
          value={[capsuleCount]}
          onValueChange={(value) => onCapsuleCountChange(value[0])}
          min={50}
          max={500}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-white/70">
          <span>50</span>
          <span className="text-white font-medium">{capsuleCount} kapsułek</span>
          <span>500</span>
        </div>
      </div>
      
      {/* Production Info */}
      <div className="bg-white/5 rounded-lg p-3 space-y-2">
        <div className="text-sm text-white/80">
          <div className="flex justify-between">
            <span>Typ kartonu:</span>
            <span className="font-semibold">{boxSize}</span>
          </div>
          <div className="flex justify-between">
            <span>Kapsułek na karton:</span>
            <span className="font-semibold">{capsuleCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Czas wypełnienia:</span>
            <span className="font-semibold">~{Math.round(capsuleCount / 10)} sek</span>
          </div>
        </div>
      </div>
    </div>
  );
}