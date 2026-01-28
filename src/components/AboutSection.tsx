import { Clock, Award, Users, Globe } from 'lucide-react';

export function AboutSection() {
  const stats = [
    { icon: Clock, value: '15+', label: 'Años de Experiencia' },
    { icon: Award, value: '50+', label: 'Marcas Exclusivas' },
    { icon: Users, value: '10K+', label: 'Clientes Satisfechos' },
    { icon: Globe, value: '25+', label: 'Países Atendidos' }
  ];

  const values = [
    {
      title: 'Autenticidad Garantizada',
      description: 'Todos nuestros relojes son 100% originales y vienen con certificado de autenticidad.',
      icon: Award
    },
    {
      title: 'Experiencia y Tradición',
      description: 'Más de 15 años seleccionando las mejores piezas de relojería del mundo.',
      icon: Clock
    },
    {
      title: 'Servicio Personalizado',
      description: 'Nuestro equipo de expertos está listo para asesorarte en tu elección perfecta.',
      icon: Users
    },
    {
      title: 'Envíos Internacionales',
      description: 'Enviamos a todo el mundo con seguro completo y seguimiento en tiempo real.',
      icon: Globe
    }
  ];

  return (
    <section className="mb-16" id="about">
      <div className="bg-gradient-to-br from-primary via-accent to-primary text-white rounded-3xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-white mb-4">Sobre Nosotros</h2>
          <p className="text-secondary max-w-3xl mx-auto text-lg">
            Somos Relojes Malvinas, una relojería premium especializada en piezas de alta gama y colección. 
            Nuestra pasión es conectar a los amantes de la relojería con las mejores marcas del mundo.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-3">
                  <Icon size={24} className="text-white" />
                </div>
                <div className="text-3xl mb-1">{stat.value}</div>
                <div className="text-sm text-secondary">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg flex-shrink-0">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-secondary">{value.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}