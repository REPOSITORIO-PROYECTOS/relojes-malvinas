import { Crown, Zap, Watch, Sparkles, Package, Clock, Check, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

type FilterBarProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedStock: 'all' | 'inStock' | 'onOrder';
  setSelectedStock: (stock: 'all' | 'inStock' | 'onOrder') => void;
  selectedPriceRange: string;
  setSelectedPriceRange: (range: string) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
};

export function FilterBar({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedStock, 
  setSelectedStock,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedSort,
  setSelectedSort
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
    { id: 'price-asc', name: 'Precio ↑', icon: TrendingUp },
    { id: 'price-desc', name: 'Precio ↓', icon: TrendingDown },
    { id: 'name', name: 'Nombre A-Z', icon: Watch }
  ];

  return (
    <div className="bg-transparent">
      <div className="mx-auto">
        <div className="flex flex-col gap-4">
          {/* Top Row: Categories (Horizontal Scroll on Mobile) */}
          <div className="overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
            <div className="flex md:grid md:grid-cols-5 gap-2 min-w-max md:min-w-0">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`relative flex items-center gap-2 p-2 rounded-xl border-2 transition-all whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-primary/5 hover:border-primary/20 hover:bg-muted/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center shrink-0`}>
                      <Icon size={16} className="text-white" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-tight ${
                      selectedCategory === category.id ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {category.name}
                    </span>
                    {selectedCategory === category.id && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        <Check size={10} className="text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Row: Stock, Price, Sort (Grid that collapses) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Stock Selector (Compact) */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex bg-muted/50 p-1 rounded-xl gap-1 border border-primary/5">
                {stockOptions.map(option => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedStock(option.id as 'all' | 'inStock' | 'onOrder')}
                      className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
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
            </div>

            {/* Price Range Selector */}
            <div className="relative group">
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border-2 border-primary/5 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 focus:outline-none bg-muted/50 hover:bg-muted/80 text-[11px] font-bold uppercase tracking-wider text-primary appearance-none cursor-pointer transition-all"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id} className="text-sm font-sans uppercase">Precio: {range.name}</option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary/60 group-hover:text-primary transition-colors">
                <DollarSign size={14} strokeWidth={3} />
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l border-primary/10 pl-2 text-primary/40 group-hover:text-primary transition-colors">
                <TrendingDown size={14} />
              </div>
            </div>

            {/* Sort Selector */}
            <div className="relative group">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl border-2 border-primary/5 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 focus:outline-none bg-muted/50 hover:bg-muted/80 text-[11px] font-bold uppercase tracking-wider text-primary appearance-none cursor-pointer transition-all"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id} className="text-sm font-sans uppercase">Orden: {option.name}</option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary/60 group-hover:text-primary transition-colors">
                <Sparkles size={14} strokeWidth={3} />
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l border-primary/10 pl-2 text-primary/40 group-hover:text-primary transition-colors">
                <TrendingUp size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}