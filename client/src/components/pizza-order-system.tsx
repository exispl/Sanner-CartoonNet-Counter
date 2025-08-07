import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Pizza, MessageSquare, Trash2, Calendar } from 'lucide-react';

interface PizzaOrder {
  id: string;
  user: string;
  pizza: string;
  message: string;
  timestamp: Date;
}

interface PizzaOrderSystemProps {
  currentUser: string;
}

export function PizzaOrderSystem({ currentUser }: PizzaOrderSystemProps) {
  const [orders, setOrders] = useState<PizzaOrder[]>([]);
  const [selectedPizza, setSelectedPizza] = useState('');
  const [message, setMessage] = useState('');
  const [showOrders, setShowOrders] = useState(false);

  const pizzaOptions = [
    'Margherita',
    'Pepperoni', 
    'Hawaiian',
    'Vegetarian',
    'Quattro Stagioni',
    'Prosciutto',
    'Funghi',
    'Salami',
    'Pizza Döner'
  ];

  const getTodaysDate = () => {
    return new Date().toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const addOrder = () => {
    if (selectedPizza) {
      const newOrder: PizzaOrder = {
        id: Date.now().toString(),
        user: currentUser,
        pizza: selectedPizza,
        message: message,
        timestamp: new Date()
      };
      setOrders([...orders, newOrder]);
      setSelectedPizza('');
      setMessage('');
    }
  };

  const removeOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId && order.user === currentUser));
  };

  const userOrders = orders.filter(order => order.user === currentUser);

  return (
    <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-2">
          <Pizza className="h-5 w-5" />
          <div>
            <CardTitle className="text-base font-bold">Heute Pizza Bestellung</CardTitle>
            <div className="flex items-center space-x-1 text-xs text-orange-100">
              <Calendar className="h-3 w-3" />
              <span>{getTodaysDate()}</span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setShowOrders(!showOrders)}
          className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs h-6 px-2"
          size="sm"
        >
          {showOrders ? 'Ukryj' : `Pokaż (${orders.length})`}
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Select value={selectedPizza} onValueChange={setSelectedPizza}>
            <SelectTrigger className="bg-white/20 border-white/30 text-white">
              <SelectValue placeholder="Wybierz pizzę..." />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-100">
              {pizzaOptions.map((pizza) => (
                <SelectItem key={pizza} value={pizza} className="hover:bg-gray-100 dark:hover:bg-gray-200 text-gray-900 dark:text-gray-800">
                  🍕 {pizza === 'Pizza Döner' ? <span className="font-bold">{pizza}</span> : pizza}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Dodaj wiadomość (opcjonalne)..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/70 resize-none h-16"
          />

          <Button 
            onClick={addOrder}
            disabled={!selectedPizza}
            className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            Dodaj zamówienie
          </Button>
        </div>

        {showOrders && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <h4 className="text-sm font-bold text-orange-100">Wszystkie zamówienia:</h4>
            {orders.length === 0 ? (
              <p className="text-xs text-orange-200">Brak zamówień</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white/10 rounded p-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-semibold">{order.user}: {order.pizza}</div>
                      {order.message && (
                        <div className="text-orange-200 mt-1 flex items-start space-x-1">
                          <MessageSquare className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span>{order.message}</span>
                        </div>
                      )}
                    </div>
                    {order.user === currentUser && (
                      <Button
                        onClick={() => removeOrder(order.id)}
                        className="bg-red-500/50 hover:bg-red-500/70 text-white border-0 h-5 w-5 p-0 ml-2"
                        size="sm"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        
        {/* Help button */}
        <div className="mt-3 text-center">
          <Button 
            onClick={() => {
              // Find and expand the chat component
              const chatElement = document.querySelector('[data-testid="factory-chat"]');
              if (chatElement) {
                const expandButton = chatElement.querySelector('button');
                if (expandButton) {
                  expandButton.click();
                }
              }
            }}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs px-3 py-1"
            size="sm"
          >
            Fragen?
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}