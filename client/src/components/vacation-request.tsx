import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Calendar, FileText, Send } from 'lucide-react';

export function VacationRequest() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    days: '',
    reason: '',
    bemerkung: 'Lokalizacja: Biuro, Termin wykorzystania: do 30.06.2027'
  });

  const handleSubmit = () => {
    // Show confirmation with BBS code
    alert(`✅ Wniosek urlopowy został złożony!

📋 Szczegóły wniosku:
• Kod: BBS
• Data od: ${formData.startDate}
• Data do: ${formData.endDate}
• Liczba dni: ${formData.days}
• Powód: ${formData.reason}

📝 Bemerkung: ${formData.bemerkung}

⚡ Status: Przekazano do HR
🕐 Czas oczekiwania: 2-3 dni robocze`);
    
    setIsOpen(false);
    // Reset form
    setFormData({
      startDate: '',
      endDate: '',
      days: '',
      reason: '',
      bemerkung: 'Lokalizacja: Biuro, Termin wykorzystania: do 30.06.2027'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0 cursor-pointer hover:scale-105 transition-transform">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urlop BBS</CardTitle>
            <Calendar className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span className="text-sm">Złóż wniosek</span>
            </div>
            <p className="text-xs text-blue-100 mt-1">
              System wniosków urlopowych
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="bg-gray-900 border-green-400">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-400" />
            <span>Wniosek urlopowy - Kod: BBS</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-white">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300">Data rozpoczęcia</label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Data zakończenia</label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm text-gray-300">Liczba dni urlopowych</label>
            <Input
              type="number"
              placeholder="np. 5"
              value={formData.days}
              onChange={(e) => setFormData(prev => ({ ...prev, days: e.target.value }))}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-300">Powód urlopu</label>
            <Input
              placeholder="np. Urlop wypoczynkowy"
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-300">Bemerkung (wymagane)</label>
            <Textarea
              value={formData.bemerkung}
              onChange={(e) => setFormData(prev => ({ ...prev, bemerkung: e.target.value }))}
              className="bg-gray-800 border-gray-600 text-white h-20"
              readOnly
            />
            <p className="text-xs text-green-400 mt-1">
              ⚠️ To pole jest wstępnie wypełnione zgodnie z wymogami BBS
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border border-blue-500">
            <h4 className="text-sm font-bold text-blue-400 mb-2">📋 Instrukcje BBS:</h4>
            <ul className="text-xs space-y-1 text-gray-300">
              <li>• Kod wniosku: <span className="text-green-400 font-bold">BBS</span></li>
              <li>• Lokalizacja musi być: <span className="text-yellow-400">Biuro</span></li>
              <li>• Termin wykorzystania: <span className="text-red-400">do 30.06.2027</span></li>
              <li>• Wniosek zostanie przekazany automatycznie do HR</li>
            </ul>
          </div>
          
          <Button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={!formData.startDate || !formData.endDate || !formData.days || !formData.reason}
          >
            <Send className="h-4 w-4 mr-2" />
            Złóż wniosek BBS
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}