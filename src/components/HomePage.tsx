import { Watch, ShoppingBag, Shield, Award, Crown, Zap, Sparkles, Package, Play } from 'lucide-react';
import { Watch as WatchType } from '../App';

type HomePageProps = {
  onNavigate: (page: 'home' | 'catalog') => void;
};

export function HomePage({ onNavigate }: HomePageProps) {
  const brands = [
    { name: 'Citizen', logo: '/brands/citizen-logo.svg' },
    { name: 'Festina', logo: '/brands/festina.svg' }
  ];

  const categories = [
    {
      id: 'luxury',
      name: 'Relojes de Lujo',
      icon: Crown,
      description: 'Piezas exclusivas de las mejores marcas',
      color: 'from-amber-500 to-yellow-600',
      image: '/products/WhatsApp Image 2026-01-16 at 11.51.27 (1).jpeg'
    },
    {
      id: 'sport',
      name: 'Deportivos',
      icon: Zap,
      description: 'Resistentes y funcionales para el deporte',
      color: 'from-blue-500 to-cyan-600',
      image: '/products/WhatsApp Image 2026-01-16 at 11.51.27 (2).jpeg'
    },
    {
      id: 'classic',
      name: 'Clásicos',
      icon: Sparkles,
      description: 'Diseños atemporales y elegantes',
      color: 'from-purple-500 to-pink-600',
      image: '/products/WhatsApp Image 2026-01-16 at 11.51.49.jpeg'
    },
    {
      id: 'modern',
      name: 'Modernos',
      icon: Package,
      description: 'Tecnología y diseño contemporáneo',
      color: 'from-green-500 to-emerald-600',
      image: '/products/WhatsApp Image 2026-01-16 at 11.51.49 (1).jpeg'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Garantía Oficial',
      description: 'Todos nuestros relojes cuentan con garantía internacional de fábrica'
    },
    {
      icon: Award,
      title: 'Autenticidad',
      description: '100% originales. Trabajamos directamente con distribuidores autorizados'
    },
    {
      icon: ShoppingBag,
      title: 'Envío Seguro',
      description: 'Envíos asegurados a todo el país con seguimiento en tiempo real'
    },
    {
      icon: Watch,
      title: 'Asesoramiento',
      description: 'Expertos en relojería para ayudarte a elegir la pieza perfecta'
    }
  ];

  const youtubeVideos = [
    {
      id: '1',
      title: 'Colección Rolex 2024',
      thumbnail: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop',
      videoId: 'dQw4w9WgXcQ' // Reemplazar con IDs reales
    },
    {
      id: '2',
      title: 'Cómo elegir tu primer reloj de lujo',
      thumbnail: 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?w=600&h=400&fit=crop',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: '3',
      title: 'Relojes deportivos: Guía completa',
      thumbnail: 'https://images.unsplash.com/photo-1587400519568-1fe0329bfb2e?w=600&h=400&fit=crop',
      videoId: 'dQw4w9WgXcQ'
    }
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage: 'url("/products/WhatsApp Image 2026-01-16 at 11.51.26.jpeg")',
            opacity: 0.6
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Relojes Las Malvinas</h1>
          <p className="text-xl md:text-2xl mb-4 text-white/90">
            Distribuidores Oficiales de las Mejores Marcas de Relojería
          </p>
          <p className="text-lg md:text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            Más de 15 años llevando exclusividad y prestigio a tu muñeca. Trabajamos con las marcas más reconocidas del mundo para ofrecerte piezas únicas de alta relojería.
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="bg-white text-primary px-8 py-4 rounded-xl text-lg font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            Explorar Catálogo
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-primary mb-6">Sobre Relojes Las Malvinas</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Somos una empresa familiar argentina dedicada a la venta de relojes de alta gama desde 2009. Nuestra pasión por la relojería nos ha llevado a establecer alianzas con las marcas más prestigiosas del mundo.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Cada reloj que ofrecemos es una obra de arte, seleccionada cuidadosamente para garantizar calidad, autenticidad y exclusividad. Ya sea que busques una pieza de lujo, un reloj deportivo o un clásico atemporal, tenemos la opción perfecta para ti.
              </p>
              <p className="text-lg text-muted-foreground">
                <strong className="text-primary">Nuestra misión:</strong> Hacer accesible el mundo de la alta relojería con transparencia, garantía y un servicio excepcional.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/products/WhatsApp Image 2026-01-16 at 11.51.27.jpeg"
                alt="Relojes de lujo"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-primary mb-4">Marcas con las que Trabajamos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Somos distribuidores autorizados de las marcas más prestigiosas de relojería mundial
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-105"
              >
                <div className="p-8 rounded-full mb-6 bg-transparent group-hover:bg-primary/5 transition-all duration-300">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-32 h-32 object-contain filter drop-shadow-md"
                  />
                </div>
                <p className="text-3xl font-bold text-gray-600 group-hover:text-primary transition-colors">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nuestras Categorías</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora nuestra selección exclusiva organizada por estilo para encontrar tu compañero perfecto
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
                  onClick={() => onNavigate('catalog')}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 z-10">
                      <Icon size={24} />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{category.description}</p>
                    <div className="flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
                      Explorar colección <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-white">¿Por qué Elegir Relojes Las Malvinas?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <Icon size={40} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-white/80">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-primary mb-4">Nuestro Canal de YouTube</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestras colecciones, guías de compra y todo sobre el mundo de la relojería
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {youtubeVideos.map((video) => (
              <div
                key={video.id}
                className="group cursor-pointer"
                onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
              >
                <div className="relative h-56 rounded-xl overflow-hidden shadow-lg mb-4">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={32} className="text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => window.open('https://www.youtube.com/@relojesmalvinas', '_blank')}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2"
            >
              <Play size={20} />
              Ver más en YouTube
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-primary mb-6">¿Listo para encontrar tu reloj perfecto?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Explora nuestro catálogo completo con más de 100 modelos disponibles
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="bg-primary text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-accent transition-all transform hover:scale-105 shadow-xl"
          >
            Ir al Catálogo
          </button>
        </div>
      </section>
    </div>
  );
}