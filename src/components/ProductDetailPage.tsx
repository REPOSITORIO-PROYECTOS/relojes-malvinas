import { ArrowLeft, ShoppingCart, Check, Clock } from 'lucide-react';
import { Watch } from '../App';

type ProductDetailPageProps = {
  watch: Watch;
  onAddToCart: (watch: Watch) => void;
  onBack: () => void;
};

export function ProductDetailPage({ watch, onAddToCart, onBack }: ProductDetailPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-24">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        <span>Volver al catálogo</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-muted rounded-2xl overflow-hidden">
          <img 
            src={watch.image} 
            alt={watch.name}
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Stock Badge */}
          <div className="mb-4">
            {watch.inStock ? (
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                <Check size={18} />
                En Stock - Envío Inmediato
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full font-medium">
                <Clock size={18} />
                Bajo Pedido - 2-4 Semanas
              </span>
            )}
          </div>

          {/* Brand */}
          <p className="text-muted-foreground mb-2">{watch.brand}</p>

          {/* Name */}
          <h1 className="text-primary mb-4">{watch.name}</h1>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-primary">${watch.price}</span>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-primary mb-3">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed">
              {watch.description}
            </p>
          </div>

          {/* Features */}
          <div className="mb-8 bg-muted p-6 rounded-xl">
            <h3 className="text-primary mb-4">Características</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Garantía internacional de 2 años</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Resistente al agua hasta 50 metros</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Cristal de zafiro anti-rayones</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Correa ajustable de acero inoxidable</span>
              </li>
            </ul>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              onAddToCart(watch);
              onBack();
            }}
            className="w-full bg-primary text-white py-4 rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-3 font-medium text-lg shadow-lg hover:shadow-xl"
          >
            <ShoppingCart size={24} />
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
