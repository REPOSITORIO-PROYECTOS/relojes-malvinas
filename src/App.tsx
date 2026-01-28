import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { SearchModal } from './components/SearchModal';
import { CatalogPage } from './components/CatalogPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import catalogProducts from './data/catalog_products.json';

export type Watch = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  inStock: boolean;
  category: 'luxury' | 'sport' | 'classic' | 'modern';
  description: string;
  featured?: boolean;
};

export type CartItem = {
  watch: Watch;
  quantity: number;
};

const productImages = [
  '/products/WhatsApp Image 2026-01-16 at 11.51.26.jpeg',
  '/products/WhatsApp Image 2026-01-16 at 11.51.27 (1).jpeg',
  '/products/WhatsApp Image 2026-01-16 at 11.51.27 (2).jpeg',
  '/products/WhatsApp Image 2026-01-16 at 11.51.27.jpeg',
  '/products/WhatsApp Image 2026-01-16 at 11.51.49 (1).jpeg',
  '/products/WhatsApp Image 2026-01-16 at 11.51.49 (2).jpeg',
  '/products/WhatsApp Image 2026-01-16 at 11.51.49 (3).jpeg',
  '/products/WhatsApp Image 2026-01-16 at 11.51.49.jpeg'
];

const manualWatches: Watch[] = [
  {
    id: 1,
    name: 'Citizen Eco-Drive Elite',
    brand: 'Citizen',
    price: 1250000,
    image: '/products/WhatsApp Image 2026-01-16 at 11.51.26.jpeg',
    inStock: true,
    category: 'luxury',
    description: 'Elegante reloj cronógrafo con movimiento Eco-Drive',
    featured: true
  },
  {
    id: 2,
    name: 'Festina Chrono Bike',
    brand: 'Festina',
    price: 850000,
    image: '/products/WhatsApp Image 2026-01-16 at 11.51.27 (1).jpeg',
    inStock: true,
    category: 'sport',
    description: 'Diseño deportivo resistente inspirado en el ciclismo',
    featured: true
  },
  {
    id: 3,
    name: 'Citizen Modern',
    brand: 'Citizen',
    price: 650000,
    image: '/products/WhatsApp Image 2026-01-16 at 11.51.27.jpeg',
    inStock: true,
    category: 'modern',
    description: 'Reloj minimalista con tecnología japonesa'
  },
  {
    id: 4,
    name: 'Festina Classic',
    brand: 'Festina',
    price: 1680000,
    image: '/products/WhatsApp Image 2026-01-16 at 11.51.49.jpeg',
    inStock: true,
    category: 'classic',
    description: 'Pieza clásica con acabado premium',
    featured: true
  }
];

// Process catalog products
const catalogWatches: Watch[] = catalogProducts.map((p, index) => {
    // Assign a random category based on brand or just random
    const categories: Watch['category'][] = ['luxury', 'sport', 'classic', 'modern'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    // Assign an image cyclically
    const image = productImages[index % productImages.length];

    return {
        id: 1000 + index, // Start IDs from 1000
        name: p.name,
        brand: p.brand,
        price: p.price,
        image: image,
        inStock: false, // Mark as 'Bajo Pedido'
        category: category,
        description: `Modelo ${p.id} - Disponible a pedido`,
        featured: false
    };
});

const watches: Watch[] = [...manualWatches, ...catalogWatches];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'detail' | 'checkout'>('home');
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const addToCart = (watch: Watch) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.watch.id === watch.id);
      if (existing) {
        return prev.map(item =>
          item.watch.id === watch.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { watch, quantity: 1 }];
    });
  };

  const removeFromCart = (watchId: number) => {
    setCartItems(prev => prev.filter(item => item.watch.id !== watchId));
  };

  const updateQuantity = (watchId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(watchId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.watch.id === watchId ? { ...item, quantity } : item
      )
    );
  };

  const handleViewDetail = (watch: Watch) => {
    setSelectedWatch(watch);
    setCurrentPage('detail');
    window.scrollTo(0, 0);
  };

  const handleBackFromDetail = () => {
    setSelectedWatch(null);
    setCurrentPage('catalog');
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
    window.scrollTo(0, 0);
  };

  const handleBackFromCheckout = () => {
    setCurrentPage('catalog');
  };

  const featuredWatches = watches.filter(w => w.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <main className="pt-40 md:pt-44">
        {currentPage === 'home' && (
          <HomePage onNavigate={setCurrentPage} />
        )}

        {currentPage === 'catalog' && (
          <CatalogPage 
            watches={watches} 
            onAddToCart={addToCart}
            onViewDetail={handleViewDetail}
          />
        )}

        {currentPage === 'detail' && selectedWatch && (
          <ProductDetailPage 
            watch={selectedWatch}
            onAddToCart={addToCart}
            onBack={handleBackFromDetail}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage 
            items={cartItems}
            onBack={handleBackFromCheckout}
          />
        )}
      </main>

      {/* Cart Drawer */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        watches={watches}
        onAddToCart={addToCart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}