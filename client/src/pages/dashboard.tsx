import { useState, useEffect } from "react";
import Header from "@/components/Header";
import MarketOverview from "@/components/MarketOverview";
import PriceChart from "@/components/PriceChart";
import CryptocurrencyTable from "@/components/CryptocurrencyTable";
import Sidebar from "@/components/Sidebar";
import { useCryptoData } from "@/hooks/useCryptoData";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const [searchFilter, setSearchFilter] = useState<string | null>(null);
  const { data: cryptocurrencies, isLoading } = useCryptoData();
  const { lastUpdate, isConnected } = useWebSocket();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onSearchSelect={setSearchFilter} />

      <main className="container mx-auto px-4 py-6">
        {/* Market Overview */}
        <MarketOverview cryptocurrencies={cryptocurrencies?.slice(0, 4) || []} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Price Chart */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Price Chart</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                    <span>{isConnected ? 'Live Updates' : 'Disconnected'}</span>
                  </div>
                  <select 
                    className="px-3 py-1 bg-secondary border border-border rounded text-sm"
                    onChange={(e) => setSelectedCrypto(e.target.value)}
                    value={selectedCrypto}
                    data-testid="select-crypto-chart"
                  >
                    {cryptocurrencies?.slice(0, 10).map((crypto) => (
                      <option key={crypto.id} value={crypto.id}>
                        {crypto.symbol.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <PriceChart cryptoId={selectedCrypto} />
              
              <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <div>Last updated: <span data-testid="text-last-update">{lastUpdate || 'Never'}</span></div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>Price</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Price Table */}
            <CryptocurrencyTable cryptocurrencies={cryptocurrencies || []} isLoading={isLoading} searchFilter={searchFilter} />
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </main>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl z-40"
        size="icon"
        data-testid="button-quick-actions"
        title="Quick Actions"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
