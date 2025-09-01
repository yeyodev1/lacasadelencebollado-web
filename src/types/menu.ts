// Tipos para el sistema de menú y productos de La Casa del Encebollado

export type CategoriaProducto = 
  | 'promociones'
  | 'encebollados'
  | 'ceviches'
  | 'bollos'
  | 'cazuelas'
  | 'congelados'
  | 'acompañamientos'
  | 'bebidas';

export interface Producto {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: CategoriaProducto;
  availability: boolean;
  isPopular?: boolean;
  isPromotion?: boolean;
  promotionDetails?: {
    originalPrice: number;
    discount: number;
    validUntil: Date;
  };
}

export interface CategoriaMenu {
  id: string;
  name: string;
  description: string;
  icon: string;
  productos: Producto[];
}

export interface Promocion {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: CategoriaProducto;
  isActive: boolean;
  validUntil: Date;
  items: Array<{
    name: string;
    quantity: number;
  }>;
  terms: string;
  isPopular: boolean;
}

export interface CarritoItem {
  producto: Producto;
  cantidad: number;
  notas?: string;
  subtotal: number;
}

export interface Pedido {
  id: string;
  items: CarritoItem[];
  total: number;
  fecha: Date;
  estado: 'pendiente' | 'confirmado' | 'preparando' | 'listo' | 'entregado' | 'cancelado';
  cliente: {
    nombre: string;
    telefono: string;
    email?: string;
    direccion?: string;
  };
  tipoEntrega: 'delivery' | 'pickup';
  notas?: string;
}

export interface FiltrosProducto {
  categoria?: CategoriaProducto;
  precioMin?: number;
  precioMax?: number;
  soloPopulares?: boolean;
  soloPromociones?: boolean;
  disponibles?: boolean;
}

export interface ResultadoBusqueda {
  productos: Producto[];
  total: number;
  filtrosAplicados: FiltrosProducto;
}

export interface ConfiguracionRestaurante {
  nombre: string;
  descripcion: string;
  telefono: string;
  email: string;
  direccion: string;
  horarios: {
    [dia: string]: {
      abierto: boolean;
      apertura?: string;
      cierre?: string;
    };
  };
  redesSociales: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
  configuracionDelivery: {
    disponible: boolean;
    costoMinimo?: number;
    tiempoEstimado?: string;
    zonasCoberturas?: string[];
  };
}

// Tipos de utilidad
export type EstadoPedido = Pedido['estado'];
export type TipoEntrega = Pedido['tipoEntrega'];
export type ProductoConCantidad = CarritoItem;

// Constantes
export const CATEGORIAS_PRODUCTOS: Record<CategoriaProducto, string> = {
  promociones: 'Promociones',
  encebollados: 'Encebollados',
  ceviches: 'Ceviches',
  bollos: 'Bollos',
  cazuelas: 'Cazuelas',
  congelados: 'Congelados',
  acompañamientos: 'Acompañamientos',
  bebidas: 'Bebidas'
};

export const ESTADOS_PEDIDO: Record<EstadoPedido, string> = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  preparando: 'Preparando',
  listo: 'Listo',
  entregado: 'Entregado',
  cancelado: 'Cancelado'
};

export const TIPOS_ENTREGA: Record<TipoEntrega, string> = {
  delivery: 'Delivery',
  pickup: 'Recoger en tienda'
};