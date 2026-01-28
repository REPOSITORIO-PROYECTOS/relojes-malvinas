import { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, User, Mail, Phone, CheckCircle } from 'lucide-react';
import { CartItem } from '../App';

type CheckoutPageProps = {
  items: CartItem[];
  onBack: () => void;
};

export function CheckoutPage({ items, onBack }: CheckoutPageProps) {
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    // Datos personales
    fullName: '',
    email: '',
    phone: '',
    // Dirección
    address: '',
    city: '',
    postalCode: '',
    // Pago
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const subtotal = items.reduce((sum, item) => sum + item.watch.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-primary mb-4">¡Pedido Confirmado!</h2>
          <p className="text-muted-foreground mb-8">
            Gracias por tu compra. Recibirás un correo de confirmación con los detalles de tu pedido.
          </p>
          <div className="bg-muted p-6 rounded-xl mb-6">
            <p className="text-sm text-muted-foreground mb-2">Número de pedido</p>
            <p className="text-2xl font-bold text-primary">#RM-{Math.floor(Math.random() * 100000)}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-accent transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft size={20} />
        <span>Volver al carrito</span>
      </button>

      <h2 className="text-primary mb-8">Finalizar Compra</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Datos Personales */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="text-primary" size={24} />
                <h3 className="text-primary">Datos Personales</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="juan@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="+54 9 11 1234-5678"
                  />
                </div>
              </div>
            </div>

            {/* Dirección de Envío */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-primary" size={24} />
                <h3 className="text-primary">Dirección de Envío</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary mb-2">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Av. Corrientes 1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Buenos Aires"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="C1043"
                  />
                </div>
              </div>
            </div>

            {/* Datos de Pago */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-primary" size={24} />
                <h3 className="text-primary">Método de Pago</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary mb-2">
                    Número de Tarjeta *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    maxLength={16}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary mb-2">
                    Nombre en la Tarjeta *
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="JUAN PEREZ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Fecha de Vencimiento *
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                    maxLength={5}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="MM/AA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                    maxLength={3}
                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-lg hover:bg-accent transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
            >
              Confirmar Pedido
            </button>
          </form>
        </div>

        {/* Resumen del Pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h3 className="text-primary mb-6">Resumen del Pedido</h3>
            
            {/* Items */}
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {items.map(item => (
                <div key={item.watch.id} className="flex gap-4">
                  <img 
                    src={item.watch.image} 
                    alt={item.watch.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary truncate">{item.watch.name}</p>
                    <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                    <p className="text-sm font-medium text-primary">${item.watch.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totales */}
            <div className="border-t border-primary/10 pt-4 space-y-3">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Envío</span>
                <span>{shipping === 0 ? 'Gratis' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between font-bold text-primary pt-3 border-t border-primary/10">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
