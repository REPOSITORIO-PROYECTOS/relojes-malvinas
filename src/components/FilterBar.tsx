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
    <div className="bg-white border-b border-primary/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="space-y-4">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-primary mb-2">
              Categoría
            </label>
            <div className="grid grid-cols-5 gap-2">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`relative p-2 rounded-lg border-2 transition-all ${
                      selectedCategory === category.id
                        ? 'border-primary bg-primary/5 scale-105'
                        : 'border-primary/10 hover:border-primary/30 hover:bg-muted'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-1`}>
                      <Icon size={16} className="text-white" />
                    </div>
                    <p className={`text-xs font-medium text-center ${
                      selectedCategory === category.id ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {category.name}
                    </p>
                    {selectedCategory === category.id && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <Check size={10} className="text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Stock Selector */}
            <div>
              <label className="block text-xs font-semibold text-primary mb-2">
                Disponibilidad
              </label>
              <div className="flex gap-2">
                {stockOptions.map(option => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedStock(option.id as 'all' | 'inStock' | 'onOrder')}
                      className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                        selectedStock === option.id
                          ? 'border-primary bg-primary text-white'
                          : 'border-primary/10 hover:border-primary/30 bg-white'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        {Icon && <Icon size={14} />}
                        <p className="text-xs font-medium">{option.name}</p>
                        <p className={`text-[10px] ${
                          selectedStock === option.id ? 'text-white/80' : 'text-muted-foreground'
                        }`}>
                          {option.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Selector */}
            <div>
              <label className="block text-xs font-semibold text-primary mb-2">
                Precio
              </label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full p-2 rounded-lg border-2 border-primary/10 focus:border-primary focus:outline-none bg-white text-sm"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.name}</option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div>
              <label className="block text-xs font-semibold text-primary mb-2">
                Ordenar
              </label>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full p-2 rounded-lg border-2 border-primary/10 focus:border-primary focus:outline-none bg-white text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}