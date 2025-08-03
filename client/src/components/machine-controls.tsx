import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { CardboardTypeSelector } from './cardboard-type-selector';

interface MachineControlsProps {
  cardboardType: string;
  capsuleCount: number;
  onCardboardTypeChange: (type: string) => void;
  onCapsuleCountChange: (count: number) => void;
  t: (key: string) => string;
}

export function MachineControls({ 
  cardboardType, 
  capsuleCount, 
  onCardboardTypeChange, 
  onCapsuleCountChange,
  t 
}: MachineControlsProps) {
  // Custom marks for the slider with emphasized stations
  const marks = [
    { value: 900, label: '900' },
    { value: 1000, label: '1000', emphasized: false },
    { value: 1500, label: '1500', emphasized: true },
    { value: 2000, label: '2000', emphasized: false },
    { value: 3000, label: '3000', emphasized: true },
    { value: 5000, label: '5000', emphasized: false },
    { value: 10000, label: '10k', emphasized: false }
  ];

  return (
    <div className="bg-white/10 rounded-xl p-4 border-2 border-white/20 space-y-4">
      <h3 className="text-lg font-semibold text-white text-center">
        ⚙️ Konfiguracja produkcji
      </h3>
      
      {/* Cardboard Type Selector */}
      <div className="space-y-2">
        <Label className="text-white font-medium">Typ kartonu:</Label>
        <CardboardTypeSelector
          value={cardboardType}
          onChange={onCardboardTypeChange}
          t={t}
        />
      </div>
      
      {/* Capsule Count Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-white font-medium">Ilość kapsułek:</Label>
          <span className="text-white font-bold bg-white/20 px-3 py-1 rounded-lg">
            {capsuleCount.toLocaleString()}
          </span>
        </div>
        <div className="px-2">
          <Slider
            value={[capsuleCount]}
            onValueChange={(value) => onCapsuleCountChange(value[0])}
            min={900}
            max={10000}
            step={50}
            className="w-full"
          />
          {/* Custom marks */}
          <div className="flex justify-between mt-1 text-xs text-white/70">
            {marks.map((mark) => (
              <div 
                key={mark.value} 
                className={`text-center ${mark.emphasized ? 'font-bold text-white' : ''}`}
              >
                {mark.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Production Info */}
      <div className="bg-white/5 rounded-lg p-3 space-y-2">
        <div className="text-sm text-white/80">
          <div className="flex justify-between">
            <span>Typ kartonu:</span>
            <span className="font-semibold">{cardboardType}</span>
          </div>
          <div className="flex justify-between">
            <span>Kapsułek na karton:</span>
            <span className="font-semibold">{capsuleCount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Czas wypełnienia:</span>
            <span className="font-semibold">~{Math.round(capsuleCount / 100)} sek</span>
          </div>
        </div>
      </div>
    </div>
  );
}