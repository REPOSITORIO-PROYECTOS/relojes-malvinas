import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Home, LayoutGrid } from 'lucide-react';
import logo from 'figma:asset/a7eac119fd1291ad9cb8b4516f909b038a907973.png';

export function Header({ cartItemsCount, onCartClick, onSearchClick, currentPage = 'home', onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Se activa una transición suave al bajar
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Variables de color basadas en tu configuración de marca
  const brandBg = 'bg-primary'; // El verde oscuro sólido de tu marca (#1a4d5a)
  const accentEmerald = 'text-emerald-400';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      {/* Barra sólida fija en la parte superior */}
      <div 
        className={`flex items-center justify-between w-full max-w-7xl border-x border-b border-white/10 shadow-xl ${brandBg} h-20 px-8 transition-all duration-300 ${
          isScrolled ? 'rounded-b-none shadow-2xl' : 'rounded-b-2xl'
        }`}
      >
        
        {/* LADO IZQUIERDO: Logo */}
        <button 
          onClick={() => onNavigate?.('home')}
          className="flex items-center gap-4 group shrink-0"
        >
          {/* Círculo contenedor de logo */}
          <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/30 border-2 border-white/10 overflow-hidden transform transition-transform group-hover:scale-110 shadow-lg">
            <img 
              src={logo} 
              alt="Relojes Malvinas" 
              className="w-8 h-8 md:w-9 md:h-9 object-contain brightness-0 invert" 
            />
          </div>
          
          <div className="hidden sm:flex flex-col items-start text-left">
            <span className="text-white font-bold text-xl md:text-2xl tracking-tighter leading-none">
              Relojes <span className={accentEmerald}>Malvinas</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] font-black text-emerald-200/60 mt-0.5">
              Colección Exclusiva
            </span>
          </div>
        </button>

        {/* CENTRO: Botones con contraste mejorado para estados inactivos */}
        <nav className="flex items-center gap-2 md:gap-8">
          <button 
            onClick={() => onNavigate?.('home')}
            className={`relative flex items-center gap-3 text-xs md:text-sm font-black tracking-widest uppercase transition-all duration-300 py-3 px-6 rounded-full hover:bg-white/10 ${
              currentPage === 'home' ? 'text-white' : 'text-white/80' // Aumentada la visibilidad del inactivo
            }`}
          >
            <Home size={20} className="md:w-5 md:h-5" />
            <span className="hidden md:inline">Inicio</span>
            {currentPage === 'home' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-[4px] rounded-full bg-emerald-400 shadow-[0_0_15px_#10b981]" />
            )}
          </button>

          <button 
            onClick={() => onNavigate?.('catalog')}
            className={`relative flex items-center gap-3 text-xs md:text-sm font-black tracking-widest uppercase transition-all duration-300 py-3 px-6 rounded-full hover:bg-white/10 ${
              currentPage === 'catalog' ? 'text-white' : 'text-white/80'
            }`}
          >
            <LayoutGrid size={20} className="md:w-5 md:h-5" />
            <span className="hidden md:inline">Catálogo</span>
            {currentPage === 'catalog' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-[4px] rounded-full bg-emerald-400 shadow-[0_0_15px_#10b981]" />
            )}
          </button>
        </nav>

        {/* DERECHA: Iconos de acción definidos */}
        <div className="flex items-center gap-3 md:gap-6 shrink-0">
          <button onClick={onSearchClick} className="text-white hover:text-emerald-300 transition-colors p-2">
            <Search size={28} strokeWidth={3} />
          </button>
          
          <button onClick={onCartClick} className="text-white hover:text-emerald-300 transition-colors relative p-2">
            <ShoppingCart size={28} strokeWidth={3} />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}