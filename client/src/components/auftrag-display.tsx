import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Package, Target, CheckCircle, AlertCircle } from 'lucide-react';

interface Auftrag {
  nummer: string;
  artikel: string;
  beschreibung: string;
  menge: number;
  gefertigtMenge: number;
  beginn: string;
  ende: string;
  status: 'Aktiv' | 'Wartend' | 'Fertig' | 'Überfällig';
  priorität: 'Hoch' | 'Normal' | 'Niedrig';
}

const aufträge: Auftrag[] = [
  {
    nummer: '10120154',
    artikel: '1471311',
    beschreibung: 'Prägest K-11/REZ/2.35cr',
    menge: 1200000,
    gefertigtMenge: 850000,
    beginn: '07.08.25',
    ende: '18.08.25',
    status: 'Aktiv',
    priorität: 'Hoch'
  },
  {
    nummer: '10120155',
    artikel: '1471311',
    beschreibung: 'Prägest K-11/REZ/2.35cr',
    menge: 1500000,
    gefertigtMenge: 0,
    beginn: '18.08.25',
    ende: '25.08.25',
    status: 'Wartend',
    priorität: 'Normal'
  },
  {
    nummer: '10120152',
    artikel: '1471311',
    beschreibung: 'Prägest K-11/REZ/2.35cr',
    menge: 800000,
    gefertigtMenge: 800000,
    beginn: '05.08.25',
    ende: '10.08.25',
    status: 'Fertig',
    priorität: 'Normal'
  },
  {
    nummer: '10120156',
    artikel: '1471311',
    beschreibung: 'Prägest K-11/REZ/2.35cr',
    menge: 2000000,
    gefertigtMenge: 1200000,
    beginn: '11.11.25',
    ende: '12.12.25',
    status: 'Wartend',
    priorität: 'Niedrig'
  }
];

interface AuftragDisplayProps {
  machineId?: string;
  compact?: boolean;
}

export function AuftragDisplay({ machineId = 'MA61', compact = false }: AuftragDisplayProps) {
  const [currentAuftrag, setCurrentAuftrag] = useState<Auftrag | null>(null);

  useEffect(() => {
    // Find active Auftrag
    const active = aufträge.find(a => a.status === 'Aktiv');
    setCurrentAuftrag(active || aufträge[0]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktiv': return 'bg-green-400 text-white';
      case 'Wartend': return 'bg-yellow-400 text-gray-800';
      case 'Fertig': return 'bg-blue-400 text-white';
      case 'Überfällig': return 'bg-red-400 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getPriorityColor = (priorität: string) => {
    switch (priorität) {
      case 'Hoch': return 'text-red-500 bg-red-50 border-red-200';
      case 'Normal': return 'text-blue-500 bg-blue-50 border-blue-200';
      case 'Niedrig': return 'text-gray-500 bg-gray-50 border-gray-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Aktiv': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'Fertig': return <CheckCircle className="w-4 h-4 text-blue-400" />;
      case 'Überfällig': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-yellow-400" />;
    }
  };

  if (compact && currentAuftrag) {
    const progress = Math.round((currentAuftrag.gefertigtMenge / currentAuftrag.menge) * 100);
    
    return (
      <div className="bg-white dark:bg-gray-50 rounded-lg p-3 border border-gray-200 dark:border-gray-300 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(currentAuftrag.status)}
            <span className="font-semibold text-sm text-gray-800">Auftrag {currentAuftrag.nummer}</span>
          </div>
          <Badge className={`text-xs ${getStatusColor(currentAuftrag.status)}`}>
            {currentAuftrag.status}
          </Badge>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Fortschritt:</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{(currentAuftrag.gefertigtMenge / 1000).toFixed(0)}k / {(currentAuftrag.menge / 1000).toFixed(0)}k</span>
            <span>{currentAuftrag.ende}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-50 border-2 border-blue-200 dark:border-blue-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center space-x-2">
          <Package className="w-5 h-5 text-blue-600" />
          <span>Aufträge - {machineId}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Active Auftrag */}
        {currentAuftrag && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-50 dark:to-green-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(currentAuftrag.status)}
                <span className="font-semibold text-gray-800">Aktueller Auftrag</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`text-xs ${getPriorityColor(currentAuftrag.priorität)}`}>
                  {currentAuftrag.priorität}
                </Badge>
                <Badge className={`text-xs ${getStatusColor(currentAuftrag.status)}`}>
                  {currentAuftrag.status}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-xs text-gray-600">Auftrag Nr.</div>
                <div className="font-bold text-gray-800">{currentAuftrag.nummer}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Artikel</div>
                <div className="font-medium text-gray-700">{currentAuftrag.artikel}</div>
              </div>
              <div className="col-span-2">
                <div className="text-xs text-gray-600">Beschreibung</div>
                <div className="text-sm text-gray-700">{currentAuftrag.beschreibung}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fortschritt:</span>
                <span className="font-medium text-gray-800">
                  {Math.round((currentAuftrag.gefertigtMenge / currentAuftrag.menge) * 100)}%
                </span>
              </div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                  style={{ width: `${(currentAuftrag.gefertigtMenge / currentAuftrag.menge) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Gefertigt: {(currentAuftrag.gefertigtMenge / 1000).toFixed(0)}k Stück</span>
                <span>Ziel: {(currentAuftrag.menge / 1000).toFixed(0)}k Stück</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Beginn: {currentAuftrag.beginn}</span>
                <span>Ende: {currentAuftrag.ende}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Upcoming Aufträge */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2 flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Wartende Aufträge</span>
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {aufträge.filter(a => a.status === 'Wartend').map((auftrag, index) => (
              <div key={auftrag.nummer} className="bg-gray-50 dark:bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-gray-800">#{auftrag.nummer}</span>
                  <Badge className={`text-xs ${getPriorityColor(auftrag.priorität)}`}>
                    {auftrag.priorität}
                  </Badge>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Menge: {(auftrag.menge / 1000).toFixed(0)}k Stück</div>
                  <div>Termin: {auftrag.beginn} - {auftrag.ende}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}