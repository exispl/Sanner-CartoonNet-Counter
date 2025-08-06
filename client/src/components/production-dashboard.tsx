import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  getProductionStats, 
  getProductionRecords, 
  formatDateTime,
  ProductionRecord 
} from '@/lib/production-data';
import { 
  Package, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  Users, 
  CheckCircle,
  Activity,
  BarChart3
} from 'lucide-react';

interface ProductionDashboardProps {
  t: (key: string) => string;
}

export function ProductionDashboard({ t }: ProductionDashboardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const stats = getProductionStats();
  const records = getProductionRecords();

  return (
    <div className="space-y-6">
      {/* Production Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wyprodukowane</CardTitle>
            <Package className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProduced.toLocaleString()}</div>
            <p className="text-xs text-green-100">
              sztuk w {stats.recordCount} kartonach
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wydajność</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.efficiency.toFixed(1)}%</div>
            <p className="text-xs text-blue-100">
              {stats.totalProductionTime.toFixed(1)} min produkcji
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jakość</CardTitle>
            <CheckCircle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.qualityRate.toFixed(1)}%</div>
            <p className="text-xs text-amber-100">
              {stats.totalDefects} defektów
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operatorzy</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeOperators.length}</div>
            <p className="text-xs text-purple-100">aktywnych użytkowników</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Production Records */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Ostatnie Rekordy Produkcyjne
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            {showDetails ? 'Ukryj szczegóły' : 'Pokaż szczegóły'}
          </Button>
        </CardHeader>
        <CardContent className="bg-gray-50 dark:bg-gray-800">
          <div className="space-y-3">
            {stats.recentRecords.map((record, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 dark:text-white text-base">VE-{record.veNumber}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Karton #{record.kartonNr}
                    </span>
                  </div>
                  <Badge 
                    variant={record.status === 'Frei' ? 'default' : 'secondary'}
                    className="bg-green-200 text-green-900 font-semibold border-green-300"
                  >
                    {record.status}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-bold text-gray-900 dark:text-white text-lg">{record.gutmenge.toLocaleString()}</div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-200">sztuk</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 dark:text-white text-base">{record.anwender}</div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {formatDateTime(record.buchungsdatum)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showDetails && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-4">
              <h4 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                Szczegółowe Statystyki
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2 border-gray-300 dark:border-gray-600">
                  <CardHeader className="bg-blue-50 dark:bg-blue-900">
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">Czas Produkcji</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white dark:bg-gray-700">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800 dark:text-gray-200">Łączny czas produkcji:</span>
                        <span className="font-bold text-gray-900 dark:text-white text-lg">{stats.totalProductionTime.toFixed(1)} min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800 dark:text-gray-200">Czas przestojów:</span>
                        <span className="font-bold text-gray-900 dark:text-white text-lg">{stats.totalDowntime.toFixed(1)} min</span>
                      </div>
                      <div className="flex justify-between items-center border-t-2 border-gray-200 dark:border-gray-600 pt-3">
                        <span className="font-bold text-gray-800 dark:text-gray-200">Efektywność:</span>
                        <span className="font-bold text-green-700 dark:text-green-400 text-xl">{stats.efficiency.toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-300 dark:border-gray-600">
                  <CardHeader className="bg-purple-50 dark:bg-purple-900">
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">Aktywni Operatorzy</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white dark:bg-gray-700">
                    <div className="space-y-3">
                      {stats.activeOperators.map((operator, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-600 rounded">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-medium text-gray-900 dark:text-white">{operator}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Records Table */}
              <Card className="border-2 border-gray-300 dark:border-gray-600">
                <CardHeader className="bg-green-50 dark:bg-green-900">
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">Wszystkie Rekordy</CardTitle>
                </CardHeader>
                <CardContent className="bg-white dark:bg-gray-700">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800">
                          <th className="text-left p-3 font-bold text-gray-900 dark:text-white">VE-Nr</th>
                          <th className="text-left p-3 font-bold text-gray-900 dark:text-white">Karton</th>
                          <th className="text-left p-3 font-bold text-gray-900 dark:text-white">Data</th>
                          <th className="text-left p-3 font-bold text-gray-900 dark:text-white">Operator</th>
                          <th className="text-right p-3 font-bold text-gray-900 dark:text-white">Ilość</th>
                          <th className="text-right p-3 font-bold text-gray-900 dark:text-white">Defekty</th>
                          <th className="text-right p-3 font-bold text-gray-900 dark:text-white">Czas [min]</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((record, index) => (
                          <tr key={index} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                            <td className="p-3 font-mono text-sm font-bold text-gray-900 dark:text-white">{record.veNumber}</td>
                            <td className="p-3 font-medium text-gray-900 dark:text-white">{record.kartonNr}</td>
                            <td className="p-3 text-sm font-medium text-gray-800 dark:text-gray-200">{formatDateTime(record.buchungsdatum)}</td>
                            <td className="p-3 font-medium text-gray-900 dark:text-white">{record.anwender}</td>
                            <td className="p-3 text-right font-bold text-gray-900 dark:text-white text-base">{record.gutmenge.toLocaleString()}</td>
                            <td className="p-3 text-right">
                              {record.ausschuss > 0 ? (
                                <span className="text-red-700 dark:text-red-400 font-bold">{record.ausschuss}</span>
                              ) : (
                                <span className="text-green-700 dark:text-green-400 font-bold">0</span>
                              )}
                            </td>
                            <td className="p-3 text-right font-bold text-gray-900 dark:text-white">{record.prodZeit.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}