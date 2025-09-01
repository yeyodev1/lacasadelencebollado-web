import type { Producto, CategoriaProducto } from '../types/menu';

// Productos completos extraídos del sitio web de La Casa del Encebollado
export const productos: Producto[] = [
  // Promociones WhatsApp
  {
    id: 1,
    name: 'Promo 1: Big Whatsapp',
    price: 12.99,
    description: '2 Encebollados Big + 2 Chifles + 2 Jugos',
    image: 'https://www.tumesero.com/imagenes/5027/promo1_2big.jpg',
    category: 'promociones' as CategoriaProducto,
    availability: true,
    isPromotion: true,
    promotionDetails: {
      originalPrice: 15.99,
      discount: 18.75,
      validUntil: new Date('2024-12-31')
    }
  },
  {
    id: 2,
    name: 'Promo 2: x2 Whatsapp',
    price: 9.99,
    description: '2 Encebollados Normales + 2 Chifles + 2 Jugos',
    image: 'https://www.tumesero.com/imagenes/5027/promo2_2normales.jpg',
    category: 'promociones' as CategoriaProducto,
    availability: true,
    isPromotion: true,
    promotionDetails: {
      originalPrice: 12.99,
      discount: 23.09,
      validUntil: new Date('2024-12-31')
    }
  },
  {
    id: 3,
    name: 'Promo 3: Familiar Whatsapp',
    price: 19.99,
    description: '4 Encebollados Normales + 2 Chifles + 2 Pan + 2 Jugos',
    image: 'https://www.tumesero.com/imagenes/5027/promo3_4normales.jpg',
    category: 'promociones' as CategoriaProducto,
    availability: true,
    isPromotion: true,
    promotionDetails: {
      originalPrice: 24.99,
      discount: 20.01,
      validUntil: new Date('2024-12-31')
    }
  },

  // Encebollados
  {
    id: 4,
    name: 'Encebollado Normal',
    price: 4.40,
    description: 'Caldo de pescado con yuca, pescado, cebolla, y varias especias.',
    image: 'https://www.tumesero.com/imagenes/5027/encenormal.jpg',
    category: 'encebollados' as CategoriaProducto,
    availability: true,
    isPopular: true
  },
  {
    id: 5,
    name: 'Encebollado Mixto',
    price: 6.60,
    description: 'Caldo de pescado con yuca, pescado, cebolla, y varias especias.',
    image: 'https://www.tumesero.com/imagenes/5027/juniormixto.jpg',
    category: 'encebollados' as CategoriaProducto,
    availability: true
  },
  {
    id: 6,
    name: 'Encebollado Junior',
    price: 3.70,
    description: 'Caldo de pescado con yuca, pescado, cebolla, y varias especias.',
    image: 'https://www.tumesero.com/imagenes/5027/encejunior.jpg',
    category: 'encebollados' as CategoriaProducto,
    availability: true
  },
  {
    id: 7,
    name: 'Encebollado Junior Mixto',
    price: 5.10,
    description: 'Caldo de pescado con yuca, pescado, cebolla, y varias especias.',
    image: 'https://www.tumesero.com/imagenes/5027/juniormixto.jpg',
    category: 'encebollados' as CategoriaProducto,
    availability: true
  },
  {
    id: 8,
    name: 'Encebollado Big',
    price: 6.30,
    description: 'Liquido de pescado, yuca, pescado, cebolla y especias tamaño grande.',
    image: 'https://www.tumesero.com/imagenes/5027/encenormal.jpg',
    category: 'encebollados' as CategoriaProducto,
    availability: true,
    isPopular: true
  },
  {
    id: 9,
    name: 'Encebollado Big Mixto',
    price: 8.60,
    description: 'Encebollado con camarón.',
    image: 'https://www.tumesero.com/imagenes/5027/juniormixto.jpg',
    category: 'encebollados' as CategoriaProducto,
    availability: true
  },
  {
    id: 10,
    name: 'Encebollado Macho Normal',
    price: 10.00,
    description: 'Curtido de pescado, camarón y maní.',
    image: 'https://www.tumesero.com/imagenes/5027/encebolladomacho.jpg',
    category: 'encebollados' as CategoriaProducto,
    availability: true
  },
  {
    id: 11,
    name: 'Encebollado Macho Junior',
    price: 6.15,
    description: 'Curtido de pescado, camarón y maní.',
    image: 'https://www.tumesero.com/imagenes/5027/encebolladojuniormacho.jpg',
    category: 'encebollados' as CategoriaProducto,
    availability: true
  },

  // Ceviches
  {
    id: 12,
    name: 'Ceviche Pescado',
    price: 7.50,
    description: 'Fresco ceviche de pescado con cebolla, limón y especias.',
    image: 'https://www.tumesero.com/imagenes/5027/cevichepescado.jpg',
    category: 'ceviches' as CategoriaProducto,
    availability: true
  },
  {
    id: 13,
    name: 'Ceviche Camarón',
    price: 8.75,
    description: 'Delicioso ceviche de camarón fresco.',
    image: 'https://www.tumesero.com/imagenes/5027/cevichecamaron.jpg',
    category: 'ceviches' as CategoriaProducto,
    availability: true
  },
  {
    id: 14,
    name: 'Ceviche Mixto (Pescado y Camarón)',
    price: 10.00,
    description: 'Combinación perfecta de pescado y camarón en ceviche.',
    image: 'https://www.tumesero.com/imagenes/5027/cevichemixto.jpg',
    category: 'ceviches' as CategoriaProducto,
    availability: true,
    isPopular: true
  },

  // Bollos
  {
    id: 15,
    name: 'Bollo',
    price: 3.50,
    description: 'Masa de verde con pescado y salsa de mani.',
    image: 'https://www.tumesero.com/imagenes/5027/bollopescado.jpg',
    category: 'bollos' as CategoriaProducto,
    availability: true
  },
  {
    id: 16,
    name: 'Bollo Mixto',
    price: 5.15,
    description: 'Masa de verde con pescado, camaron y salsa de mani.',
    image: 'https://www.tumesero.com/imagenes/5027/bollomixto.jpg',
    category: 'bollos' as CategoriaProducto,
    availability: true
  },
  {
    id: 17,
    name: 'Guatita Sola',
    price: 5.00,
    description: 'Base de papa, salsa de maní, mondongo y especias de la casa.',
    image: 'https://www.tumesero.com/imagenes/5027/guatitasola.jpg',
    category: 'bollos' as CategoriaProducto,
    availability: true
  },
  {
    id: 18,
    name: 'Bandera Sencilla',
    price: 6.30,
    description: 'Encebollado de albacora, guatita y arroz.',
    image: 'https://www.tumesero.com/imagenes/5027/banderasencilla.jpg',
    category: 'bollos' as CategoriaProducto,
    availability: true
  },
  {
    id: 19,
    name: 'Bandera Completa',
    price: 7.95,
    description: 'Encebollado de Albacora, arroz, guatita y camarones.',
    image: 'https://www.tumesero.com/imagenes/5027/banderaa.jpg',
    category: 'bollos' as CategoriaProducto,
    availability: true
  },
  {
    id: 20,
    name: 'Terremoto',
    price: 9.75,
    description: 'Encebollado de Albacora, arroz, guatita, bollo de pescado y camarones.',
    image: 'https://www.tumesero.com/imagenes/5027/terremoto.jpg',
    category: 'bollos' as CategoriaProducto,
    availability: true,
    isPopular: true
  },

  // Cazuelas
  {
    id: 21,
    name: 'Cazuela Grande',
    price: 6.30,
    description: 'Masa de verde con masa de mani y pescado',
    image: 'https://www.tumesero.com/imagenes/5027/cazuela.jpg',
    category: 'cazuelas' as CategoriaProducto,
    availability: true
  },
  {
    id: 22,
    name: 'Cazuela Grande Mixta',
    price: 8.20,
    description: 'Masa de verde con pescado y camarón con masa de mani.',
    image: 'https://www.tumesero.com/imagenes/5027/cazuelamixta.jpg',
    category: 'cazuelas' as CategoriaProducto,
    availability: true
  },
  {
    id: 23,
    name: 'Cazuela Pequeña',
    price: 3.98,
    description: 'Masa de verde con masa de mani y pescado',
    image: 'https://www.tumesero.com/imagenes/5027/cazuela.jpg',
    category: 'cazuelas' as CategoriaProducto,
    availability: true
  },
  {
    id: 24,
    name: 'Cazuela Mixta Pequeña',
    price: 5.60,
    description: 'Masa de verde con pescado y camarón con masa de mani.',
    image: 'https://www.tumesero.com/imagenes/5027/cazuelamixta.jpg',
    category: 'cazuelas' as CategoriaProducto,
    availability: true
  },
  {
    id: 25,
    name: 'Cazuela Grande Macho',
    price: 10.00,
    description: 'Masa de verde con maní, pescado albacora, ceviche...',
    image: 'https://www.tumesero.com/imagenes/5027/cazuelamacho.jpg',
    category: 'cazuelas' as CategoriaProducto,
    availability: true
  },
  {
    id: 26,
    name: 'Cazuela Macho Junior',
    price: 6.15,
    description: 'Masa de verde con maní, pescado albacora, ceviche...',
    image: 'https://www.tumesero.com/imagenes/5027/cazuelamachojunior.jpg',
    category: 'cazuelas' as CategoriaProducto,
    availability: true
  },

  // Congelados
  {
    id: 27,
    name: 'Encebollado Congelado',
    price: 4.15,
    description: 'Encebollado congelado empacado al vacio.',
    image: 'https://www.tumesero.com/imagenes/5027/encebolladocongelado.jpg',
    category: 'congelados' as CategoriaProducto,
    availability: true
  },
  {
    id: 28,
    name: 'Bollo Congelado',
    price: 4.15,
    description: 'Bollo congelado empacado al vacio.',
    image: 'https://www.tumesero.com/imagenes/5027/bollomixto.jpg',
    category: 'congelados' as CategoriaProducto,
    availability: true
  },

  // Acompañamientos
  {
    id: 29,
    name: 'Porción de Arroz',
    price: 1.49,
    description: 'Porción de arroz',
    image: 'https://www.tumesero.com/imagenes/5027/img_porcionarroz_2025.jpg',
    category: 'acompañamientos' as CategoriaProducto,
    availability: true
  },
  {
    id: 30,
    name: 'Porción de Cocolon',
    price: 0.90,
    description: 'Arroz al horno',
    image: 'https://www.tumesero.com/imagenes/5027/img_cocolon_2025.jpg',
    category: 'acompañamientos' as CategoriaProducto,
    availability: true
  },
  {
    id: 31,
    name: 'Chifle',
    price: 0.90,
    description: 'Verdes laminados',
    image: 'https://www.tumesero.com/imagenes/5027/img_chifles_2025.jpg',
    category: 'acompañamientos' as CategoriaProducto,
    availability: true
  },
  {
    id: 32,
    name: 'Pan de sal',
    price: 0.34,
    description: 'Pan de sal enrrollado',
    image: 'https://www.tumesero.com/imagenes/5027/pan.jpg',
    category: 'acompañamientos' as CategoriaProducto,
    availability: true
  },
  {
    id: 33,
    name: 'Porcion de Pescado',
    price: 3.00,
    description: 'Porción adicional de pescado',
    image: 'https://www.tumesero.com/imagenes/5027/porcion_pescado.jpg',
    category: 'acompañamientos' as CategoriaProducto,
    availability: true
  },
  {
    id: 34,
    name: 'Liquido de Encebollado',
    price: 1.80,
    description: 'Liquido de pescado',
    image: 'https://www.tumesero.com/imagenes/5027/liquido_encebollado.jpg',
    category: 'acompañamientos' as CategoriaProducto,
    availability: true
  },

  // Bebidas
  {
    id: 35,
    name: 'Jugo de Maracuyá 500ml',
    price: 1.80,
    description: 'Botella de refresco de maracuyá de 500ml',
    image: 'https://www.tumesero.com/imagenes/5027/jugo_maracuya.jpg',
    category: 'bebidas' as CategoriaProducto,
    availability: true
  },
  {
    id: 36,
    name: 'Jugo de Naranja 500ml',
    price: 1.80,
    description: 'Botella de refresco de naranja de 500ml',
    image: 'https://www.tumesero.com/imagenes/5027/jugonaranja.jpg',
    category: 'bebidas' as CategoriaProducto,
    availability: true
  },
  {
    id: 37,
    name: 'Jugo de Limon 500ml',
    price: 1.80,
    description: 'Botella de refresco de limon 500ml.',
    image: 'https://www.tumesero.com/imagenes/5027/img_jugolimon_2025.jpg',
    category: 'bebidas' as CategoriaProducto,
    availability: true
  },
  {
    id: 38,
    name: 'Jugo de Jamaica 500ml',
    price: 1.80,
    description: 'Botella de refresco de Jamaica de 500ml',
    image: 'https://www.tumesero.com/imagenes/5027/jugo_jamaica_normal.jpg',
    category: 'bebidas' as CategoriaProducto,
    availability: true
  },
  {
    id: 39,
    name: 'Jugo de Jamaica con Stevia 500ml',
    price: 1.80,
    description: 'Botella de refresco de Jamaica de 500ml endulzado con Stevia',
    image: 'https://www.tumesero.com/imagenes/5027/jugo_jamaica_stevia.jpg',
    category: 'bebidas' as CategoriaProducto,
    availability: true
  },
  {
    id: 40,
    name: 'Botella de Quaker',
    price: 1.80,
    description: 'Bebida nutritiva Quaker',
    image: 'https://www.tumesero.com/imagenes/5027/botella_quaker.jpg',
    category: 'bebidas' as CategoriaProducto,
    availability: true
  },
  {
    id: 41,
    name: 'Agua Dasanni 600 ml',
    price: 0.90,
    description: 'Agua natural',
    image: 'https://www.tumesero.com/imagenes/5027/agua.jpg',
    category: 'bebidas' as CategoriaProducto,
    availability: true
  },
  {
    id: 42,
    name: 'Coca-Cola Light 500 ml',
    price: 1.80,
    description: 'Coca-Cola Light 500ml',
    image: 'https://www.tumesero.com/imagenes/5027/cocacolalight.jpg',
    category: 'bebidas' as CategoriaProducto,
    availability: true
  },
  {
    id: 43,
    name: 'Coca-Cola Sin Azúcar 500 ml',
    price: 1.80,
    description: 'Coca-Cola Sin Azúcar 500ml',
    image: 'https://www.tumesero.com/imagenes/5027/cocacolasinazucar.jpg',
    category: 'bebidas' as CategoriaProducto,
    availability: true
  },
  {
    id: 44,
    name: 'Coca-Cola Sabor Original 500 ml',
    price: 1.80,
    description: 'Coca-Cola Sabor Original 500ml',
    image: 'https://www.tumesero.com/imagenes/5027/cocacola500.jpg',
    category: 'bebidas' as CategoriaProducto,
    availability: true
  },
  {
    id: 45,
    name: 'Fuze Té Limón',
    price: 1.80,
    description: 'Té helado sabor limón',
    image: 'https://www.tumesero.com/imagenes/5027/fuze_tea.jpg',
    category: 'bebidas' as CategoriaProducto,
    availability: true
  },
  {
    id: 46,
    name: 'Coca Cola Grande 1.35 ml',
    price: 2.70,
    description: 'Coca-Cola tamaño familiar 1.35L',
    image: 'https://www.tumesero.com/imagenes/5027/cocacola135.jpg',
    category: 'bebidas' as CategoriaProducto,
    availability: true
  }
];

// Funciones de utilidad
export const obtenerProductosPorCategoria = (categoria: CategoriaProducto): Producto[] => {
  return productos.filter(producto => producto.category === categoria);
};

export const obtenerProductosPopulares = (): Producto[] => {
  return productos.filter(producto => producto.isPopular === true);
};

export const obtenerPromociones = (): Producto[] => {
  return productos.filter(producto => producto.isPromotion === true);
};

export const obtenerProductoPorId = (id: number): Producto | undefined => {
  return productos.find(producto => producto.id === id);
};

export const buscarProductos = (termino: string): Producto[] => {
  const terminoLower = termino.toLowerCase();
  return productos.filter(producto => 
    producto.name.toLowerCase().includes(terminoLower) ||
    producto.description.toLowerCase().includes(terminoLower)
  );
};

export const formatearPrecio = (precio: number): string => {
  return `$${precio.toFixed(2)}`;
};

// Estadísticas de productos
export const estadisticasProductos = {
  total: productos.length,
  porCategoria: {
    promociones: obtenerProductosPorCategoria('promociones').length,
    encebollados: obtenerProductosPorCategoria('encebollados').length,
    ceviches: obtenerProductosPorCategoria('ceviches').length,
    bollos: obtenerProductosPorCategoria('bollos').length,
    cazuelas: obtenerProductosPorCategoria('cazuelas').length,
    congelados: obtenerProductosPorCategoria('congelados').length,
    acompañamientos: obtenerProductosPorCategoria('acompañamientos').length,
    bebidas: obtenerProductosPorCategoria('bebidas').length
  },
  populares: obtenerProductosPopulares().length,
  promociones: obtenerPromociones().length
};

// Re-exportar el tipo Producto para compatibilidad
export type { Producto } from '../types/menu';

export default productos;