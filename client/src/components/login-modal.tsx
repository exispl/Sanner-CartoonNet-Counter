import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, LogIn } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string) => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast({
        title: "Błąd",
        description: "Wprowadź nazwę użytkownika",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Create or login user
      await apiRequest({
        url: '/api/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: '' // Allow login without password for now
        })
      });

      onLogin(username.trim());
      onClose();
      setUsername('');
      
      toast({
        title: "Pomyślnie zalogowano",
        description: `Witaj, ${username.trim()}!`,
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Błąd logowania",
        description: "Spróbuj ponownie",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => !isLoading && onClose()}>
      <DialogContent className="sm:max-w-md mx-auto bg-white dark:bg-gray-50 border-2 border-blue-200">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            <LogIn className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Logowanie do systemu
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Wprowadź swoją nazwę użytkownika, aby kontynuować
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-gray-700">
              Nazwa użytkownika
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="username"
                type="text"
                placeholder="Wpisz nazwę użytkownika..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                disabled={isLoading}
                autoFocus
                data-testid="input-username"
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
              data-testid="button-cancel"
            >
              Anuluj
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !username.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="button-login"
            >
              {isLoading ? 'Logowanie...' : 'Zaloguj się'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}