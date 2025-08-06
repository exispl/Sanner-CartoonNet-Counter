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
        <CardContent className="bg-white dark:bg-gray-700">
          <div className="space-y-3">
            {stats.recentRecords.map((record, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-gray-100">VE-{record.veNumber}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Karton #{record.kartonNr}
                    </span>
                  </div>
                  <Badge 
                    variant={record.status === 'Frei' ? 'default' : 'secondary'}
                    className="bg-green-100 text-green-800"
                  >
                    {record.status}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{record.gutmenge.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">sztuk</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{record.anwender}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {formatDateTime(record.buchungsdatum)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showDetails && (
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Szczegółowe Statystyki
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Czas Produkcji</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Łączny czas produkcji:</span>
                        <span className="font-medium">{stats.totalProductionTime.toFixed(1)} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Czas przestojów:</span>
                        <span className="font-medium">{stats.totalDowntime.toFixed(1)} min</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Efektywność:</span>
                        <span className="font-bold text-green-600">{stats.efficiency.toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Aktywni Operatorzy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {stats.activeOperators.map((operator, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">{operator}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Records Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Wszystkie Rekordy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">VE-Nr</th>
                          <th className="text-left p-2">Karton</th>
                          <th className="text-left p-2">Data</th>
                          <th className="text-left p-2">Operator</th>
                          <th className="text-right p-2">Ilość</th>
                          <th className="text-right p-2">Defekty</th>
                          <th className="text-right p-2">Czas [min]</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((record, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="p-2 font-mono text-xs">{record.veNumber}</td>
                            <td className="p-2">{record.kartonNr}</td>
                            <td className="p-2 text-xs">{formatDateTime(record.buchungsdatum)}</td>
                            <td className="p-2">{record.anwender}</td>
                            <td className="p-2 text-right font-medium">{record.gutmenge.toLocaleString()}</td>
                            <td className="p-2 text-right">
                              {record.ausschuss > 0 ? (
                                <span className="text-red-600 font-medium">{record.ausschuss}</span>
                              ) : (
                                <span className="text-green-600">0</span>
                              )}
                            </td>
                            <td className="p-2 text-right">{record.prodZeit.toFixed(1)}</td>
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