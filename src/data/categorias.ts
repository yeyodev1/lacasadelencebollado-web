import type { CategoriaMenu, CategoriaProducto } from '../types/menu';
import { obtenerProductosPorCategoria } from './productos';

// Información detallada de cada categoría del menú
export const categoriasMenu: CategoriaMenu[] = [
  {
    id: 'promociones',
    name: 'Promociones WhatsApp',
    description: 'Ofertas especiales exclusivas para pedidos por WhatsApp. ¡Aprovecha nuestros combos familiares!',
    icon: '🎉',
    productos: obtenerProductosPorCategoria('promociones')
  },
  {
    id: 'encebollados',
    name: 'Encebollados',
    description: 'Nuestro plato estrella. Caldo de pescado con yuca, cebolla y especias tradicionales ecuatorianas.',
    icon: '🍲',
    productos: obtenerProductosPorCategoria('encebollados')
  },
  {
    id: 'ceviches',
    name: 'Ceviches',
    description: 'Frescos ceviches de pescado y camarón, preparados con limón y especias de la casa.',
    icon: '🐟',
    productos: obtenerProductosPorCategoria('ceviches')
  },
  {
    id: 'bollos',
    name: 'Bollos y Especialidades',
    description: 'Bollos de verde con pescado, guatitas y nuestras famosas banderas ecuatorianas.',
    icon: '🌽',
    productos: obtenerProductosPorCategoria('bollos')
  },
  {
    id: 'cazuelas',
    name: 'Cazuelas',
    description: 'Cazuelas de verde con masa de maní, pescado y camarón. Tradición en cada bocado.',
    icon: '🥘',
    productos: obtenerProductosPorCategoria('cazuelas')
  },
  {
    id: 'congelados',
    name: 'Productos Congelados',
    description: 'Lleva nuestros sabores a casa. Productos empacados al vacío para conservar la frescura.',
    icon: '❄️',
    productos: obtenerProductosPorCategoria('congelados')
  },
  {
    id: 'acompañamientos',
    name: 'Acompañamientos',
    description: 'Complementa tu comida con nuestros acompañamientos tradicionales.',
    icon: '🍚',
    productos: obtenerProductosPorCategoria('acompañamientos')
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    description: 'Refrescantes jugos naturales, gaseosas y bebidas para acompañar tu comida.',
    icon: '🥤',
    productos: obtenerProductosPorCategoria('bebidas')
  }
];

// Información adicional sobre las categorías
export const infoCategoriasDetallada = {
  promociones: {
    destacado: 'Promo Familiar WhatsApp',
    ahorro: 'Hasta 25% de descuento',
    recomendacion: 'Ideal para familias de 2-4 personas'
  },
  encebollados: {
    destacado: 'Encebollado Big',
    especialidad: 'Receta tradicional de 3 generaciones',
    recomendacion: 'Perfecto para cualquier hora del día'
  },
  ceviches: {
    destacado: 'Ceviche Mixto',
    frescura: 'Pescado y mariscos del día',
    recomendacion: 'Ideal para el almuerzo'
  },
  bollos: {
    destacado: 'Terremoto',
    tradicion: 'Plato típico costeño ecuatoriano',
    recomendacion: 'Una experiencia gastronómica completa'
  },
  cazuelas: {
    destacado: 'Cazuela Grande Macho',
    preparacion: 'Cocción lenta en cazuela de barro',
    recomendacion: 'Para los amantes de sabores intensos'
  },
  congelados: {
    destacado: 'Encebollado Congelado',
    conveniencia: 'Listo en 15 minutos',
    recomendacion: 'Perfecto para llevar a casa'
  },
  acompañamientos: {
    destacado: 'Chifles',
    tradicion: 'Acompañamiento clásico costeño',
    recomendacion: 'Complementa cualquier plato principal'
  },
  bebidas: {
    destacado: 'Jugos Naturales',
    frescura: 'Preparados diariamente',
    recomendacion: 'Refrescantes y nutritivos'
  }
};

// Función para obtener información de una categoría específica
export const obtenerCategoriaInfo = (categoria: CategoriaProducto) => {
  return categoriasMenu.find(cat => cat.id === categoria);
};

// Función para obtener categorías con productos disponibles
export const obtenerCategoriasConProductos = () => {
  return categoriasMenu.filter(categoria => categoria.productos.length > 0);
};

// Estadísticas por categoría
export const estadisticasCategorias = categoriasMenu.reduce((acc, categoria) => {
  acc[categoria.id as CategoriaProducto] = {
    totalProductos: categoria.productos.length,
    productosPopulares: categoria.productos.filter(p => p.isPopular).length,
    promociones: categoria.productos.filter(p => p.isPromotion).length,
    precioPromedio: categoria.productos.reduce((sum, p) => sum + p.price, 0) / categoria.productos.length,
    precioMinimo: Math.min(...categoria.productos.map(p => p.price)),
    precioMaximo: Math.max(...categoria.productos.map(p => p.price))
  };
  return acc;
}, {} as Record<CategoriaProducto, any>);

export default categoriasMenu;