import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CardboardTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  t: (key: string) => string;
}

const cardboardTypes = [
  { id: '5/ALU', label: '5 / ALU', description: 'Aluminum 5-layer' },
  { id: '6/ALU', label: '6 / ALU', description: 'Aluminum 6-layer' },
  { id: '10T', label: '10T', description: 'Standard 10-layer' },
  { id: '5/PE', label: '5 / PE', description: 'Polyethylene 5-layer' },
  { id: '6/PE', label: '6 / PE', description: 'Polyethylene 6-layer' }
];

export function CardboardTypeSelector({ value, onChange, t }: CardboardTypeSelectorProps) {
  const selectedType = cardboardTypes.find(type => type.id === value);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-white/90 dark:bg-gray-800/90 border-2 border-gray-300 dark:border-gray-600 rounded-lg h-10">
        <SelectValue>
          {selectedType && (
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800 dark:text-white text-sm">
                {selectedType.label}
              </span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-xl">
        {cardboardTypes.map((type) => (
          <SelectItem key={type.id} value={type.id} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            <div className="flex flex-col py-1">
              <span className="font-medium text-gray-800 dark:text-white">
                {type.label}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {type.description}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}