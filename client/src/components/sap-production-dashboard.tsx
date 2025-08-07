import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
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

export function SAPProductionDashboard({ isVisible, onClose }: SAPProductionDashboardProps) {
  const [selectedWorkCenter, setSelectedWorkCenter] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<SAPProductionOrder[]>(allSAPOrders);
  const [lastRefresh, setLastRefresh] = useState(new Date());

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
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Gesamt Aufträge</p>
                      <p className="text-xl font-bold">{allSAPOrders.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Factory className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Arbeitsplätze</p>
                      <p className="text-xl font-bold">{sapWorkCenters.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Effizienz</p>
                      <p className="text-xl font-bold">{getProductionEfficiency()}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Letzte Aktualisierung</p>
                      <p className="text-sm font-medium">{lastRefresh.toLocaleTimeString('de-DE')}</p>
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
                    <Card key={order.auftrag} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                          <div>
                            <p className="font-semibold text-blue-600 dark:text-blue-400">
                              {order.auftrag}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {order.material}
                            </p>
                          </div>

                          <div className="lg:col-span-2">
                            <p className="text-sm font-medium">{order.arbeitsplatz}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                              {order.bezeichnung}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Von:</span> {order.beginn}
                            </p>
                            <p className="text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Bis:</span> {order.ende}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Geplant:</span> {formatQuantity(order.mengeGeplant)}
                            </p>
                            <p className="text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Geliefert:</span> {formatQuantity(order.mengeGeliefert)}
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
                    <Card key={wc.arbeitsplatz}>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Factory className="h-5 w-5" />
                          <span>{wc.arbeitsplatz}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm">{wc.bezeichnung}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                            <Badge className={wc.status === 'Aktiv' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {wc.status}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Kapazität:</span>
                            <span className="font-medium">{wc.kapazitaet}</span>
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Auslastung:</span>
                              <span className="font-medium">{wc.auslastung}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${wc.auslastung}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="pt-2 border-t">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
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