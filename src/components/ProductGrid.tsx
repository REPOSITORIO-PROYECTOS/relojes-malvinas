import { ProductCard } from './ProductCard';
import { Watch } from '../App';

type ProductGridProps = {
  watches: Watch[];
  onAddToCart: (watch: Watch) => void;
  onViewDetail: (watch: Watch) => void;
};

export function ProductGrid({ watches, onAddToCart, onViewDetail }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {watches.map(watch => (
        <ProductCard 
          key={watch.id} 
          watch={watch} 
          onAddToCart={onAddToCart}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
}