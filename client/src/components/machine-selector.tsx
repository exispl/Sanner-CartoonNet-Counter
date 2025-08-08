import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MachineSelectorProps {
  currentNumber: number;
  onMachineChange: (number: number) => void;
  machineId: number;
}

// Machine configurations - MA62: 2000 sztuk, MA61: 3000, MA59: 3000
const getMachineConfig = (number: number) => {
  const configs = {
    62: { status: 'PRODUKTION', color: 'bg-green-500', limit: 2000, boxType: '6' },
    61: { status: 'PRODUKTION', color: 'bg-green-500', limit: 3000, boxType: '6 / ALU' },
    59: { status: 'SETUP', color: 'bg-cyan-400', limit: 3000, boxType: '10T' },
  };
  return configs[number as keyof typeof configs] || { status: 'PRODUKTION', color: 'bg-green-500', limit: 2000, boxType: '6' };
};

const machineNumbers = [62, 61, 59];

export function MachineSelector({ currentNumber, onMachineChange, machineId }: MachineSelectorProps) {
  const currentConfig = getMachineConfig(currentNumber);

  return (
    <Select value={currentNumber.toString()} onValueChange={(value) => onMachineChange(parseInt(value))}>
      <SelectTrigger className="w-full bg-transparent border-none rounded-lg h-8 transition-all p-1">
        <SelectValue>
          <div className="flex items-center justify-center">
            <div className={`w-4 h-4 rounded ${currentConfig.color} border border-gray-600`}></div>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-500 rounded-lg shadow-xl">
        {machineNumbers.map((number) => {
          const config = getMachineConfig(number);
          return (
            <SelectItem key={number} value={number.toString()} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100">
              <div className="flex items-center gap-3 py-1">
                <div className={`w-4 h-4 rounded ${config.color} border border-gray-600`}></div>
                <span className="font-medium text-gray-800 dark:text-gray-100 text-xs">
                  MA{number} - {config.status} ({config.limit} szt.)
                </span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}