import type { Promocion } from '../types/menu';

// Información detallada de todas las promociones disponibles
export const promociones: Promocion[] = [
  {
    id: 1,
    name: 'Big WhatsApp',
    description: '2 Encebollados Big + 2 Chifles + 2 Jugos',
    price: 12.99,
    originalPrice: 16.80,
    discount: 23,
    image: 'promo-big-whatsapp.jpg',
    category: 'promociones',
    isActive: true,
    validUntil: new Date('2024-12-31'),
    items: [
      { name: 'Encebollado Big', quantity: 2 },
      { name: 'Chifle', quantity: 2 },
      { name: 'Jugo Natural', quantity: 2 }
    ],
    terms: 'Válido solo para pedidos por WhatsApp. No acumulable con otras promociones.',
    isPopular: true
  },
  {
    id: 2,
    name: 'Familiar WhatsApp',
    description: '2 Encebollados + 2 Ceviches + 4 Chifles + 4 Jugos',
    price: 19.99,
    originalPrice: 26.40,
    discount: 24,
    image: 'promo-familiar-whatsapp.jpg',
    category: 'promociones',
    isActive: true,
    validUntil: new Date('2024-12-31'),
    items: [
      { name: 'Encebollado', quantity: 2 },
      { name: 'Ceviche', quantity: 2 },
      { name: 'Chifle', quantity: 4 },
      { name: 'Jugo Natural', quantity: 4 }
    ],
    terms: 'Válido solo para pedidos por WhatsApp. Ideal para 4 personas.',
    isPopular: true
  },
  {
    id: 3,
    name: 'Combo Cazuela',
    description: '2 Cazuelas Grandes + 2 Chifles + 2 Bebidas',
    price: 15.99,
    originalPrice: 19.20,
    discount: 17,
    image: 'promo-combo-cazuela.jpg',
    category: 'promociones',
    isActive: true,
    validUntil: new Date('2024-12-31'),
    items: [
      { name: 'Cazuela Grande', quantity: 2 },
      { name: 'Chifle', quantity: 2 },
      { name: 'Bebida', quantity: 2 }
    ],
    terms: 'Válido para pedidos por WhatsApp. Cazuelas a elección.',
    isPopular: false
  },
  {
    id: 4,
    name: 'Promo Bollo',
    description: '2 Bollos + 2 Jugos + 2 Chifles',
    price: 11.99,
    originalPrice: 14.58,
    discount: 18,
    image: 'promo-bollo.jpg',
    category: 'promociones',
    isActive: true,
    validUntil: new Date('2024-12-31'),
    items: [
      { name: 'Bollo de Verde', quantity: 2 },
      { name: 'Jugo Natural', quantity: 2 },
      { name: 'Chifle', quantity: 2 }
    ],
    terms: 'Válido para pedidos por WhatsApp. Bollos a elección.',
    isPopular: false
  }
];

// Promociones activas
export const promocionesActivas = promociones.filter(promo => promo.isActive);

// Promociones populares
export const promocionesPopulares = promociones.filter(promo => promo.isPopular);

// Función para obtener promoción por ID
export const obtenerPromocionPorId = (id: number): Promocion | undefined => {
  return promociones.find(promo => promo.id === id);
};

// Función para calcular ahorro total de una promoción
export const calcularAhorro = (promocion: Promocion): number => {
  return promocion.originalPrice - promocion.price;
};

// Función para verificar si una promoción está vigente
export const esPromocionVigente = (promocion: Promocion): boolean => {
  const ahora = new Date();
  return promocion.isActive && promocion.validUntil > ahora;
};

// Función para obtener promociones por descuento mínimo
export const obtenerPromocionesPorDescuento = (descuentoMinimo: number): Promocion[] => {
  return promociones.filter(promo => promo.discount >= descuentoMinimo);
};

// Estadísticas de promociones
export const estadisticasPromociones = {
  total: promociones.length,
  activas: promocionesActivas.length,
  populares: promocionesPopulares.length,
  descuentoPromedio: promociones.reduce((sum, promo) => sum + promo.discount, 0) / promociones.length,
  ahorroTotal: promociones.reduce((sum, promo) => sum + calcularAhorro(promo), 0),
  precioPromedio: promociones.reduce((sum, promo) => sum + promo.price, 0) / promociones.length
};

export default promociones;