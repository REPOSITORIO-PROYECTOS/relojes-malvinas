import { Clock, CheckCircle } from 'lucide-react';

type HeroProps = {
  onNavigate?: (page: 'home' | 'catalog') => void;
};

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden bg-[#1a4d5a]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/products/WhatsApp Image 2026-01-16 at 11.51.26.jpeg"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a4d5a]/90 via-[#1a4d5a]/70 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
              <Clock size={16} className="text-emerald-400" />
              <span className="text-sm font-medium text-emerald-100">Colección 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Relojes <span className="text-emerald-400">Malvinas</span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
              Distribuidores Oficiales de las Mejores Marcas.
              <span className="block mt-2 text-gray-300 text-lg">Elegancia, precisión y exclusividad en cada detalle.</span>
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button 
                onClick={() => onNavigate?.('catalog')}
                className="bg-emerald-500 text-white px-8 py-4 rounded-xl hover:bg-emerald-600 transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30 font-bold tracking-wide"
              >
                VER CATÁLOGO
              </button>
              <button 
                className="group border border-white/30 text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-all font-medium flex items-center gap-2"
              >
                <span>Más Información</span>
                <CheckCircle size={18} className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center items-center w-full max-w-md mx-auto md:max-w-none">
            <div className="relative w-full">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center p-4 rounded-2xl bg-white/5">
                    <div className="text-4xl font-bold text-white mb-1">250+</div>
                    <div className="text-sm text-emerald-200 uppercase tracking-wider">Modelos</div>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-white/5">
                    <div className="text-4xl font-bold text-white mb-1">50+</div>
                    <div className="text-sm text-emerald-200 uppercase tracking-wider">Marcas</div>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-white/5">
                    <div className="text-4xl font-bold text-white mb-1">15</div>
                    <div className="text-sm text-emerald-200 uppercase tracking-wider">Años</div>
                  </div>
                  <div className="text-center p-4 rounded-2xl bg-white/5">
                    <div className="text-4xl font-bold text-white mb-1">100%</div>
                    <div className="text-sm text-emerald-200 uppercase tracking-wider">Garantía</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}