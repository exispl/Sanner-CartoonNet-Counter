import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MachineSelectorProps {
  currentNumber: number;
  onMachineChange: (number: number) => void;
  machineId: number;
}

// Machine status colors - restored original colors
const getMachineStatus = (number: number) => {
  const statuses = {
    16: { status: 'PRODUKTION', color: 'bg-green-500' },
    51: { status: 'SETUP', color: 'bg-cyan-400' },
    23: { status: 'WARTUNG', color: 'bg-red-500' },
    78: { status: 'TECHNISCH', color: 'bg-yellow-400' },
    60: { status: 'PRODUKTION', color: 'bg-green-500' },
    50: { status: 'SETUP', color: 'bg-cyan-400' },
    77: { status: 'WARTUNG', color: 'bg-red-500' },
  };
  return statuses[number as keyof typeof statuses] || { status: 'INAKTIV', color: 'bg-gray-400' };
};

const machineNumbers = [16, 23, 50, 51, 60, 77, 78];

export function MachineSelector({ currentNumber, onMachineChange, machineId }: MachineSelectorProps) {
  const currentStatus = getMachineStatus(currentNumber);

  return (
    <Select value={currentNumber.toString()} onValueChange={(value) => onMachineChange(parseInt(value))}>
      <SelectTrigger className="w-full bg-transparent border-none rounded-lg h-8 transition-all p-1">
        <SelectValue>
          <div className="flex items-center justify-center">
            <div className={`w-4 h-4 rounded ${currentStatus.color} border border-gray-600`}></div>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-xl">
        {machineNumbers.map((number) => {
          const status = getMachineStatus(number);
          return (
            <SelectItem key={number} value={number.toString()} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="flex items-center gap-3 py-1">
                <div className={`w-4 h-4 rounded ${status.color} border border-gray-600`}></div>
                <span className="font-medium text-gray-800 dark:text-white">
                  {number} - {status.status}
                </span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}