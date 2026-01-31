import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Watch, CartItem } from '../App';
import { FilterBar } from './FilterBar';
import { ProductGrid } from './ProductGrid';

type CatalogPageProps = {
  watches: Watch[];
  onAddToCart: (watch: Watch) => void;
  onViewDetail: (watch: Watch) => void;
};

export function CatalogPage({ watches, onAddToCart, onViewDetail }: CatalogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStock, setSelectedStock] = useState<'all' | 'inStock' | 'onOrder'>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredWatches = watches.filter(watch => {
    const categoryMatch = selectedCategory === 'all' || watch.category === selectedCategory;
    const stockMatch = 
      selectedStock === 'all' || 
      (selectedStock === 'inStock' && watch.inStock) ||
      (selectedStock === 'onOrder' && !watch.inStock);
    
    // Price range filter
    let priceMatch = true;
    if (selectedPriceRange !== 'all') {
      if (selectedPriceRange === '0-500000') {
        priceMatch = watch.price <= 500000;
      } else if (selectedPriceRange === '500000-1000000') {
        priceMatch = watch.price > 500000 && watch.price <= 1000000;
      } else if (selectedPriceRange === '1000000-2000000') {
        priceMatch = watch.price > 1000000 && watch.price <= 2000000;
      } else if (selectedPriceRange === '2000000+') {
        priceMatch = watch.price > 2000000;
      }
    }
    
    const searchMatch = searchQuery === '' || 
      watch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      watch.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      watch.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && stockMatch && priceMatch && searchMatch;
  });

  // Sort watches
  const sortedWatches = [...filteredWatches].sort((a, b) => {
    if (selectedSort === 'price-asc') {
      return a.price - b.price;
    } else if (selectedSort === 'price-desc') {
      return b.price - a.price;
    } else if (selectedSort === 'name') {
      return a.name.localeCompare(b.name);
    }
    // Default: featured first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedStock('all');
    setSelectedPriceRange('all');
    setSelectedSort('default');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedStock !== 'all' || selectedPriceRange !== 'all' || selectedSort !== 'default' || searchQuery !== '';

  return (
    <div className="pt-24">
      {/* Search Bar & Filters - Sticky Container */}
      <div className="sticky top-[80px] z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <FilterBar 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStock={selectedStock}
            setSelectedStock={setSelectedStock}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </div>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-primary mb-2">Catálogo Completo</h2>
            <p className="text-muted-foreground">
              {sortedWatches.length} {sortedWatches.length === 1 ? 'reloj encontrado' : 'relojes encontrados'}
            </p>
          </div>
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-accent">
                    <X size={14} />
                  </button>
                </span>
              )}
              {selectedStock !== 'all' && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {selectedStock === 'inStock' ? 'En Stock' : 'Bajo Pedido'}
                  <button onClick={() => setSelectedStock('all')} className="hover:text-accent">
                    <X size={14} />
                  </button>
                </span>
              )}
              {selectedPriceRange !== 'all' && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {selectedPriceRange === '0-500' && 'Hasta $500'}
                  {selectedPriceRange === '500-1000' && '$500-$1000'}
                  {selectedPriceRange === '1000-2000' && '$1000-$2000'}
                  {selectedPriceRange === '2000+' && 'Más de $2000'}
                  <button onClick={() => setSelectedPriceRange('all')} className="hover:text-accent">
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {sortedWatches.length === 0 ? (
          <div className="text-center py-16">
            <Filter size={64} className="mx-auto text-muted mb-4" />
            <h3 className="text-primary mb-2">No se encontraron resultados</h3>
            <p className="text-muted-foreground mb-6">
              Intenta ajustar los filtros o realizar una nueva búsqueda
            </p>
            <button
              onClick={clearFilters}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        ) : (
          <ProductGrid 
            watches={sortedWatches} 
            onAddToCart={onAddToCart}
            onViewDetail={onViewDetail}
          />
        )}
      </main>
    </div>
  );
}