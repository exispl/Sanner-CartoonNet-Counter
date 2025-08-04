import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MachineSelectorProps {
  currentNumber: number;
  onMachineChange: (number: number) => void;
  machineId: number;
}

// Machine status colors based on the uploaded images
const getMachineStatus = (number: number) => {
  // Sample statuses based on common industrial machine states
  const statuses = {
    16: { status: 'production', color: 'bg-green-500' },
    51: { status: 'setup', color: 'bg-cyan-400' },
    23: { status: 'maintenance', color: 'bg-red-500' },
    78: { status: 'technical', color: 'bg-yellow-400' },
    60: { status: 'production', color: 'bg-green-500' },
    50: { status: 'setup', color: 'bg-cyan-400' },
    77: { status: 'maintenance', color: 'bg-red-500' },
  };
  return statuses[number as keyof typeof statuses] || { status: 'inactive', color: 'bg-gray-400' };
};

const machineNumbers = [16, 23, 50, 51, 60, 77, 78];

export function MachineSelector({ currentNumber, onMachineChange, machineId }: MachineSelectorProps) {
  const currentStatus = getMachineStatus(currentNumber);

  return (
    <Select value={currentNumber.toString()} onValueChange={(value) => onMachineChange(parseInt(value))}>
      <SelectTrigger className="w-full bg-white/45 hover:bg-white/55 border-2 border-white/50 rounded-lg h-10 transition-all backdrop-blur-sm">
        <SelectValue>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${currentStatus.color} border border-white/50`}></div>
            <span className="font-bold text-gray-800 text-sm">
              MA820016
            </span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-xl">
        {machineNumbers.map((number) => {
          const status = getMachineStatus(number);
          return (
            <SelectItem key={number} value={number.toString()} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="flex items-center gap-3 py-1">
                <div className={`w-3 h-3 rounded ${status.color} border border-gray-300`}></div>
                <span className="font-medium text-gray-800 dark:text-white">
                  MA820016 - {status.status.toUpperCase()}
                </span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}