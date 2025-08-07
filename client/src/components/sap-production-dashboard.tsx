import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useAppSettings, ColorScheme } from '@/hooks/use-app-settings';
import { 
  Database,
  Factory,
  TrendingUp,
  Calendar,
  Package,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { 
  allSAPOrders, 
  sapWorkCenters,
  getSAPOrdersByWorkCenter,
  getSAPOrdersByStatus,
  getTotalPlannedQuantity,
  getTotalDeliveredQuantity,
  getProductionEfficiency,
  sapStatusTranslations,
  materialDescriptions,
  type SAPProductionOrder,
  type SAPWorkCenter
} from '@/lib/sap-production-data';

interface SAPProductionDashboardProps {
  isVisible: boolean;
  onClose: () => void;
}

const getSAPColorSchemeClasses = (scheme: ColorScheme) => {
  switch (scheme) {
    case 'green':
      return {
        cardBg: 'bg-green-50 dark:bg-green-900',
        cardContent: 'bg-green-100 dark:bg-green-800',
        orderBg: 'bg-green-100 dark:bg-green-800',
        orderHover: 'hover:bg-green-200 dark:hover:bg-green-700',
        border: 'border-green-200 dark:border-green-600',
        text: 'text-green-900 dark:text-green-100',
        textSecondary: 'text-green-700 dark:text-green-300',
        headerBg: 'bg-green-100 dark:bg-green-800'
      };
    case 'blue':
      return {
        cardBg: 'bg-blue-50 dark:bg-blue-900',
        cardContent: 'bg-blue-100 dark:bg-blue-800',
        orderBg: 'bg-blue-100 dark:bg-blue-800',
        orderHover: 'hover:bg-blue-200 dark:hover:bg-blue-700',
        border: 'border-blue-200 dark:border-blue-600',
        text: 'text-blue-900 dark:text-blue-100',
        textSecondary: 'text-blue-700 dark:text-blue-300',
        headerBg: 'bg-blue-100 dark:bg-blue-800'
      };
    case 'yellow':
      return {
        cardBg: 'bg-yellow-50 dark:bg-yellow-900',
        cardContent: 'bg-yellow-100 dark:bg-yellow-800',
        orderBg: 'bg-yellow-100 dark:bg-yellow-800',
        orderHover: 'hover:bg-yellow-200 dark:hover:bg-yellow-700',
        border: 'border-yellow-200 dark:border-yellow-600',
        text: 'text-yellow-900 dark:text-yellow-100',
        textSecondary: 'text-yellow-700 dark:text-yellow-300',
        headerBg: 'bg-yellow-100 dark:bg-yellow-800'
      };
    default:
      return {
        cardBg: 'bg-white dark:bg-gray-800',
        cardContent: 'bg-gray-50 dark:bg-gray-700',
        orderBg: 'bg-white dark:bg-gray-700',
        orderHover: 'hover:bg-gray-100 dark:hover:bg-gray-600',
        border: 'border-gray-200 dark:border-gray-600',
        text: 'text-gray-900 dark:text-gray-100',
        textSecondary: 'text-gray-700 dark:text-gray-300',
        headerBg: 'bg-gray-100 dark:bg-gray-700'
      };
  }
};

export function SAPProductionDashboard({ isVisible, onClose }: SAPProductionDashboardProps) {
  const [selectedWorkCenter, setSelectedWorkCenter] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<SAPProductionOrder[]>(allSAPOrders);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const { settings } = useAppSettings();
  const colorClasses = getSAPColorSchemeClasses(settings.colorScheme);

  useEffect(() => {
    let orders = allSAPOrders;

    if (selectedWorkCenter !== 'all') {
      orders = getSAPOrdersByWorkCenter(selectedWorkCenter);
    }

    if (selectedStatus !== 'all') {
      orders = orders.filter(order => order.status === selectedStatus);
    }

    if (searchTerm) {
      orders = orders.filter(order => 
        order.auftrag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.bezeichnung.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.material.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(orders);
  }, [selectedWorkCenter, selectedStatus, searchTerm]);

  const refreshData = () => {
    setLastRefresh(new Date());
    // In real implementation, this would fetch fresh data from SAP
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Fällig':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'Info':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Fällig':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  const formatQuantity = (quantity: number) => {
    return quantity.toLocaleString('de-DE', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Database className="h-8 w-8" />
                <div>
                  <h2 className="text-2xl font-bold">SAP Produktionsplanung</h2>
                  <p className="text-blue-100">Belegungsübersicht • Live Data Integration</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={refreshData}
                  variant="outline"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  data-testid="sap-refresh-button"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Aktualisieren
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  data-testid="sap-close-button"
                >
                  Schließen
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className={colorClasses.cardBg}>
                <CardContent className={`p-4 ${colorClasses.cardContent}`}>
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className={`text-sm ${colorClasses.textSecondary}`}>Gesamt Aufträge</p>
                      <p className={`text-xl font-bold ${colorClasses.text}`}>{allSAPOrders.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={colorClasses.cardBg}>
                <CardContent className={`p-4 ${colorClasses.cardContent}`}>
                  <div className="flex items-center space-x-2">
                    <Factory className="h-5 w-5 text-green-500" />
                    <div>
                      <p className={`text-sm ${colorClasses.textSecondary}`}>Arbeitsplätze</p>
                      <p className={`text-xl font-bold ${colorClasses.text}`}>{sapWorkCenters.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={colorClasses.cardBg}>
                <CardContent className={`p-4 ${colorClasses.cardContent}`}>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className={`text-sm ${colorClasses.textSecondary}`}>Effizienz</p>
                      <p className={`text-xl font-bold ${colorClasses.text}`}>{getProductionEfficiency()}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={colorClasses.cardBg}>
                <CardContent className={`p-4 ${colorClasses.cardContent}`}>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className={`text-sm ${colorClasses.textSecondary}`}>Letzte Aktualisierung</p>
                      <p className={`text-sm font-medium ${colorClasses.text}`}>{lastRefresh.toLocaleTimeString('de-DE')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Suche nach Auftrag, Material..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                  data-testid="sap-search-input"
                />
              </div>

              <select
                value={selectedWorkCenter}
                onChange={(e) => setSelectedWorkCenter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                data-testid="sap-workcenter-filter"
              >
                <option value="all">Alle Arbeitsplätze</option>
                {sapWorkCenters.map(wc => (
                  <option key={wc.arbeitsplatz} value={wc.arbeitsplatz}>
                    {wc.arbeitsplatz} - {wc.bezeichnung}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                data-testid="sap-status-filter"
              >
                <option value="all">Alle Status</option>
                <option value="Fällig">Fällig</option>
                <option value="Info">Info</option>
              </select>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="orders" className="h-full flex flex-col">
              <TabsList className="mx-6 mt-4">
                <TabsTrigger value="orders" data-testid="sap-orders-tab">Produktionsaufträge</TabsTrigger>
                <TabsTrigger value="workcenters" data-testid="sap-workcenters-tab">Arbeitsplätze</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="flex-1 overflow-auto mx-6 mb-6">
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <Card key={order.auftrag} className={`${colorClasses.orderBg} ${colorClasses.orderHover} border-2 ${colorClasses.border} shadow-md transition-all`}>
                      <CardContent className={`p-4 ${colorClasses.cardContent}`}>
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                          <div>
                            <p className={`font-semibold text-blue-600 dark:text-blue-400`}>
                              {order.auftrag}
                            </p>
                            <p className={`text-sm ${colorClasses.textSecondary}`}>
                              {order.material}
                            </p>
                          </div>

                          <div className="lg:col-span-2">
                            <p className={`text-sm font-medium ${colorClasses.text}`}>{order.arbeitsplatz}</p>
                            <p className={`text-xs ${colorClasses.textSecondary} line-clamp-2`}>
                              {order.bezeichnung}
                            </p>
                          </div>

                          <div>
                            <p className={`text-sm ${colorClasses.text}`}>
                              <span className={colorClasses.textSecondary}>Von:</span> {order.beginn}
                            </p>
                            <p className={`text-sm ${colorClasses.text}`}>
                              <span className={colorClasses.textSecondary}>Bis:</span> {order.ende}
                            </p>
                          </div>

                          <div>
                            <p className={`text-sm ${colorClasses.text}`}>
                              <span className={colorClasses.textSecondary}>Geplant:</span> {formatQuantity(order.mengeGeplant)}
                            </p>
                            <p className={`text-sm ${colorClasses.text}`}>
                              <span className={colorClasses.textSecondary}>Geliefert:</span> {formatQuantity(order.mengeGeliefert)}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(order.status)}
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {order.bearbeiterStatus}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="workcenters" className="flex-1 overflow-auto mx-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sapWorkCenters.map((wc) => (
                    <Card key={wc.arbeitsplatz} className={`${colorClasses.cardBg} border-2 ${colorClasses.border}`}>
                      <CardHeader className={colorClasses.headerBg}>
                        <CardTitle className={`flex items-center space-x-2 ${colorClasses.text}`}>
                          <Factory className="h-5 w-5" />
                          <span>{wc.arbeitsplatz}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className={colorClasses.cardContent}>
                        <div className="space-y-3">
                          <p className={`text-sm ${colorClasses.text}`}>{wc.bezeichnung}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${colorClasses.textSecondary}`}>Status:</span>
                            <Badge className={wc.status === 'Aktiv' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {wc.status}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${colorClasses.textSecondary}`}>Kapazität:</span>
                            <span className={`font-medium ${colorClasses.text}`}>{wc.kapazitaet}</span>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-sm ${colorClasses.textSecondary}`}>Auslastung:</span>
                              <span className={`font-medium ${colorClasses.text}`}>{wc.auslastung}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${wc.auslastung}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className={`pt-2 border-t ${colorClasses.border}`}>
                            <p className={`text-sm ${colorClasses.textSecondary}`}>
                              Aktive Aufträge: {getSAPOrdersByWorkCenter(wc.arbeitsplatz).length}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}