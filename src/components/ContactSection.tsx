import { Mail, Phone, MapPin, Building2, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    quantity: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('Gracias por tu interés. Nos pondremos en contacto contigo pronto.');
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      quantity: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="bg-primary text-white py-16" id="contact">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-white mb-4">Pedidos Especiales y Empresas</h2>
            <p className="text-secondary mb-8 text-lg">
              ¿Necesitas un pedido corporativo o personalizado? Nuestro equipo está listo para 
              ayudarte con pedidos al por mayor, grabados personalizados y soluciones empresariales.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm text-secondary mb-1">Email</div>
                  <a href="mailto:ventas@relojesmalvinas.com" className="hover:text-white transition-colors">
                    ventas@relojesmalvinas.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-sm text-secondary mb-1">Teléfono</div>
                  <a href="tel:+1234567890" className="hover:text-white transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-sm text-secondary mb-1">Ubicación</div>
                  <p className="text-secondary">
                    Av. Principal 123, Suite 456<br />
                    Ciudad, País 12345
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h3 className="text-white mb-4 flex items-center gap-2">
                <Building2 size={20} />
                Beneficios Corporativos
              </h3>
              <ul className="space-y-2 text-sm text-secondary">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  Descuentos especiales por volumen
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  Grabado y personalización incluidos
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  Asesoría personalizada
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  Facturación empresarial
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  Entrega programada
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
            <h3 className="text-white mb-6">Solicita una Cotización</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-secondary mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-secondary/50 focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-secondary mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-secondary/50 focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm text-secondary mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-secondary/50 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="Nombre de empresa"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm text-secondary mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-secondary/50 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm text-secondary mb-2">
                  Cantidad Estimada
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-secondary/50 focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="Ej: 10-20 unidades"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-secondary mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-secondary/50 focus:outline-none focus:border-white/40 transition-colors resize-none"
                  placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-primary py-3 rounded-lg hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Enviar Solicitud
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-secondary text-sm">
            © 2026 Relojes Malvinas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </section>
  );
}