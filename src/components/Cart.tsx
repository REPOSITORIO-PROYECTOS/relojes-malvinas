import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { CartItem } from '../App';

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (watchId: number, quantity: number) => void;
  onRemoveItem: (watchId: number) => void;
  onCheckout: () => void;
};

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.watch.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-[110] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-primary" size={24} />
            <h2 className="text-primary">Carrito de Compras</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X size={24} className="text-primary" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={64} className="text-muted mb-4" />
              <p className="text-muted-foreground mb-2">Tu carrito está vacío</p>
              <button 
                onClick={onClose}
                className="text-primary hover:text-accent transition-colors"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div 
                  key={item.watch.id}
                  className="bg-muted rounded-xl p-4 flex gap-4"
                >
                  <img 
                    src={item.watch.image}
                    alt={item.watch.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-primary">{item.watch.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.watch.brand}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.watch.id)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3 bg-white rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.watch.id, item.quantity - 1)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          <Minus size={16} className="text-primary" />
                        </button>
                        <span className="w-8 text-center font-medium text-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.watch.id, item.quantity + 1)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          <Plus size={16} className="text-primary" />
                        </button>
                      </div>
                      <span className="font-bold text-primary">
                        ${item.watch.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-primary/10 p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-primary">Total</span>
              <span className="text-2xl font-bold text-primary">${total}</span>
            </div>
            <button
              onClick={() => {
                onCheckout();
                onClose();
              }}
              className="w-full bg-primary text-white py-4 rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-3 font-medium shadow-lg hover:shadow-xl"
            >
              <CreditCard size={20} />
              Proceder al Pago
            </button>
            <button
              onClick={onClose}
              className="w-full text-primary hover:text-accent transition-colors text-center"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}