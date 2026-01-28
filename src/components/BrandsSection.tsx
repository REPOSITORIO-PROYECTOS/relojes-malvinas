import { Award, TrendingUp, Shield, Star } from 'lucide-react';

type BrandsSectionProps = {
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
};

const brands = [
  {
    id: 'Citizen',
    name: 'Citizen',
    description: 'Innovación y precisión japonesa',
    logo: '/brands/citizen-logo.svg',
    models: 4,
    specialty: 'Eco-Drive Technology'
  },
  {
    id: 'Festina',
    name: 'Festina',
    description: 'Elegancia y deportividad',
    logo: '/brands/festina.svg',
    models: 4,
    specialty: 'Cronógrafos deportivos'
  }
];

export function BrandsSection({ selectedBrand, setSelectedBrand }: BrandsSectionProps) {
  return (
    <section className="mb-16" id="brands">
      <div className="text-center mb-12">
        <h2 className="text-primary mb-4">Nuestras Marcas</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Trabajamos con las marcas más prestigiosas del mundo de la relojería, 
          garantizando autenticidad y calidad en cada pieza.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-12 md:gap-24">
        {brands.map(brand => {
          const isSelected = selectedBrand === brand.id;
          
          return (
            <button
              key={brand.id}
              onClick={() => setSelectedBrand(isSelected ? 'all' : brand.id)}
              className={`group flex flex-col items-center text-center transition-all duration-300 ${
                isSelected ? 'scale-110' : 'hover:scale-105 opacity-70 hover:opacity-100'
              }`}
            >
              <div className={`p-8 rounded-full mb-6 transition-all duration-300 ${
                isSelected 
                  ? 'bg-primary/5 ring-4 ring-primary/20 shadow-xl' 
                  : 'bg-transparent group-hover:bg-primary/5'
              }`}>
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="w-32 h-32 object-contain filter drop-shadow-md"
                />
              </div>
              
              <h3 className={`text-3xl font-bold mb-3 ${
                isSelected ? 'text-primary' : 'text-gray-600 group-hover:text-primary'
              }`}>
                {brand.name}
              </h3>
              
              <p className="text-lg text-muted-foreground max-w-[250px] leading-relaxed">
                {brand.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}