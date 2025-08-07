import { useState } from 'react';
import { User, ChevronDown, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { LoginModal } from '@/components/login-modal';

const users = ['SoG1917', 'SoG1', 'SoGTest'];

interface UserLoginSelectorProps {
  currentUser: string;
  onUserChange: (user: string) => void;
}

export function UserLoginSelector({ currentUser, onUserChange }: UserLoginSelectorProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = (username: string) => {
    onUserChange(username);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-xl text-white font-medium transition-colors">
          <User className="w-4 h-4" />
          <span className="text-sm">{currentUser}</span>
          <ChevronDown className="w-3 h-3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border border-white/20">
          {users.map(user => (
            <DropdownMenuItem
              key={user}
              onClick={() => onUserChange(user)}
              className={`cursor-pointer ${
                currentUser === user ? 'bg-machine-blue/20 text-machine-blue font-medium' : ''
              }`}
              data-testid={`user-option-${user}`}
            >
              <User className="w-4 h-4 mr-2" />
              {user}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowLoginModal(true)}
            className="cursor-pointer text-blue-600 font-medium"
            data-testid="user-login-new"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nowy użytkownik
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </>
  );
}