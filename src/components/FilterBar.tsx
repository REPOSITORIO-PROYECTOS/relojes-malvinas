import { Crown, Zap, Watch, Sparkles, Package, Clock, Check, TrendingUp, TrendingDown, DollarSign, Search, X, ChevronDown } from 'lucide-react';

type FilterBarProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedStock: 'all' | 'inStock' | 'onOrder';
  setSelectedStock: (stock: 'all' | 'inStock' | 'onOrder') => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (range: string) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
};

export function FilterBar({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedStock, 
  setSelectedStock,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedSort,
  setSelectedSort,
  searchQuery,
  setSearchQuery,
  onClearFilters,
  hasActiveFilters
}: FilterBarProps) {
  const categories = [
    { id: 'all', name: 'Todos', icon: Watch, color: 'from-primary to-accent' },
    { id: 'luxury', name: 'Lujo', icon: Crown, color: 'from-amber-500 to-yellow-600' },
    { id: 'sport', name: 'Deportivos', icon: Zap, color: 'from-blue-500 to-cyan-600' },
    { id: 'classic', name: 'Clásicos', icon: Sparkles, color: 'from-purple-500 to-pink-600' },
    { id: 'modern', name: 'Modernos', icon: Package, color: 'from-green-500 to-emerald-600' }
  ];

  const stockOptions = [
    { id: 'all', name: 'Todos', description: 'Ver todo', icon: null },
    { id: 'inStock', name: 'En Stock', description: 'Inmediato', icon: Check },
    { id: 'onOrder', name: 'Bajo Pedido', description: '2-4 sem', icon: Clock }
  ];

  const priceRanges = [
    { id: 'all', name: 'Todos' },
    { id: '0-500000', name: 'Hasta $500k' },
    { id: '500000-1000000', name: '$500k - $1M' },
    { id: '1000000-2000000', name: '$1M - $2M' },
    { id: '2000000+', name: 'Más de $2M' }
  ];

  const sortOptions = [
    { id: 'default', name: 'Destacados', icon: Sparkles },
    { id: 'price-asc', name: 'Precio: Menor a Mayor', icon: TrendingUp },
    { id: 'price-desc', name: 'Precio: Mayor a Menor', icon: TrendingDown },
    { id: 'name', name: 'Nombre: A-Z', icon: Watch }
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md border-2 border-primary/10 rounded-2xl shadow-lg p-4 overflow-hidden">
      <div className="flex flex-col gap-4">
        {/* Top Row: Search & Categories */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          {/* Search Bar integrated */}
          <div className="flex-1 relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar relojes..."
              className="w-full pl-10 pr-4 py-3 border-2 border-primary/5 rounded-xl focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 bg-muted/30 text-sm transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Categories (Horizontal Scroll) */}
          <div className="flex-[1.5] overflow-x-auto pb-1 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-primary/5 hover:border-primary/20 hover:bg-muted/50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center shrink-0`}>
                      <Icon size={12} className="text-white" />
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-tight ${
                      selectedCategory === category.id ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {category.name}
                    </span>
                    {selectedCategory === category.id && (
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        <Check size={8} className="text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all text-xs font-bold whitespace-nowrap"
            >
              <X size={14} />
              <span>Limpiar</span>
            </button>
          )}
        </div>

        {/* Bottom Row: Stock, Price, Sort */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-primary/5 pt-4">
          {/* Stock Selector */}
          <div className="flex bg-muted/30 p-1 rounded-xl gap-1 border border-primary/5">
            {stockOptions.map(option => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedStock(option.id as 'all' | 'inStock' | 'onOrder')}
                  className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                    selectedStock === option.id
                      ? 'bg-white shadow-sm text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {Icon && <Icon size={14} />}
                  <span className="text-[11px] font-semibold whitespace-nowrap">{option.name}</span>
                </button>
              );
            })}
          </div>

          {/* Price Range Selector */}
          <div className="relative group">
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary/5 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 focus:outline-none bg-muted/30 hover:bg-muted/50 text-sm font-medium text-primary cursor-pointer transition-all"
            >
              {priceRanges.map(range => (
                <option key={range.id} value={range.id} className="bg-white text-primary">
                  {range.id === 'all' ? 'Precio: Todos' : `Precio: ${range.name}`}
                </option>
              ))}
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/60 group-hover:text-primary transition-colors">
              <DollarSign size={16} strokeWidth={2.5} />
            </div>
          </div>

          {/* Sort Selector */}
          <div className="relative group">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary/5 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 focus:outline-none bg-muted/30 hover:bg-muted/50 text-sm font-medium text-primary cursor-pointer transition-all"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id} className="bg-white text-primary">
                  {option.id === 'default' ? 'Orden: Destacados' : option.name}
                </option>
              ))}
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/60 group-hover:text-primary transition-colors">
              <Sparkles size={16} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}