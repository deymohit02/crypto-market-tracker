import { useState } from "react";
import { Search, Moon, Sun, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/useTheme";
import { useCryptoSearch } from "@/hooks/useCryptoData";
import { useDebounce } from "@/hooks/useDebounce";

interface HeaderProps {
  onSearchSelect?: (cryptoId: string) => void;
}

export default function Header({ onSearchSelect }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { theme, toggleTheme } = useTheme();
  const { data: searchResults } = useCryptoSearch(debouncedSearch, debouncedSearch.length > 2);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">📈</div>
              <h1 className="text-2xl font-bold text-foreground" data-testid="text-app-title">CryptoTracker</h1>
              <Badge variant="default" className="bg-primary text-primary-foreground">PRO</Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search cryptocurrencies..."
                className="w-64 pl-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                data-testid="input-search-crypto"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
                  {searchResults.slice(0, 5).map((crypto) => (
                    <div 
                      key={crypto.id}
                      className="flex items-center space-x-3 p-3 hover:bg-muted cursor-pointer"
                      onClick={() => {
                        if (onSearchSelect) {
                          onSearchSelect(crypto.id);
                        }
                        setSearchQuery("");
                        setShowSearchResults(false);
                      }}
                      data-testid={`result-crypto-${crypto.id}`}
                    >
                      <img src={crypto.image || ""} alt={crypto.name} className="w-6 h-6 rounded-full" />
                      <div>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-sm text-muted-foreground">{crypto.symbol.toUpperCase()}</div>
                      </div>
                      <div className="ml-auto">
                        <div className="font-semibold">${parseFloat(crypto.current_price || "0").toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Controls */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-toggle-theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              data-testid="button-show-alerts"
            >
              <Bell className="h-4 w-4" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                data-testid="badge-alert-count"
              >
                3
              </Badge>
            </Button>
            
            <Button data-testid="button-add-watchlist">
              <Plus className="h-4 w-4 mr-2" />
              Add to Watchlist
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
