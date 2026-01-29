import { X, Search } from 'lucide-react';
import { Watch } from '../App';
import { useEffect, useRef } from 'react';

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  watches: Watch[];
  onAddToCart: (watch: Watch) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export function SearchModal({ 
  isOpen, 
  onClose, 
  watches, 
  onAddToCart, 
  searchQuery, 
  setSearchQuery 
}: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
      setSearchQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, setSearchQuery]);

  const filteredWatches = watches.filter(watch => {
    const query = searchQuery.toLowerCase();
    return (
      watch.name.toLowerCase().includes(query) ||
      watch.brand.toLowerCase().includes(query) ||
      watch.description.toLowerCase().includes(query)
    );
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed top-0 left-0 right-0 z-[110] mx-auto max-w-3xl">
        <div className="bg-white m-4 md:m-8 rounded-2xl shadow-2xl max-h-[80vh] flex flex-col">
          {/* Search Input */}
          <div className="p-4 border-b border-primary/10 bg-primary">
            <div className="flex items-center gap-3">
              <Search size={20} className="text-secondary" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar relojes por nombre, marca o descripción..."
                className="flex-1 outline-none text-lg bg-transparent text-white placeholder-secondary"
              />
              <button 
                onClick={onClose}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X size={20} className="text-secondary" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto p-4">
            {searchQuery === '' ? (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-muted mb-4" />
                <p className="text-muted-foreground">Busca relojes por nombre, marca o características</p>
              </div>
            ) : filteredWatches.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron resultados para "{searchQuery}"</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-4">
                  {filteredWatches.length} {filteredWatches.length === 1 ? 'resultado' : 'resultados'}
                </p>
                {filteredWatches.map(watch => (
                  <div 
                    key={watch.id}
                    className="flex gap-4 p-3 hover:bg-muted rounded-lg transition-colors cursor-pointer"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={watch.image} 
                        alt={watch.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground mb-1">{watch.brand}</div>
                      <h3 className="text-sm mb-1 text-primary">{watch.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{watch.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-primary">${watch.price.toLocaleString()}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(watch);
                          }}
                          className="bg-primary text-white px-3 py-1 rounded text-xs hover:bg-accent transition-colors"
                        >
                          {watch.inStock ? 'Agregar' : 'Pedir'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}