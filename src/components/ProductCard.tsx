import { ShoppingCart, Clock, Check } from 'lucide-react';
import { Watch } from '../App';

type ProductCardProps = {
  watch: Watch;
  onAddToCart: (watch: Watch) => void;
  onViewDetail: (watch: Watch) => void;
};

export function ProductCard({ watch, onAddToCart, onViewDetail }: ProductCardProps) {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
      onClick={() => onViewDetail(watch)}
    >
      <div className="relative overflow-hidden bg-muted">
        <img 
          src={watch.image} 
          alt={watch.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {watch.inStock ? (
          <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Check size={16} />
            En Stock
          </span>
        ) : (
          <span className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Clock size={16} />
            Bajo Pedido
          </span>
        )}
      </div>
      
      <div className="p-6">
        <p className="text-sm text-muted-foreground mb-1">{watch.brand}</p>
        <h3 className="font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
          {watch.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {watch.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${watch.price}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(watch);
            }}
            className="bg-primary text-white p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Agregar al carrito"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}