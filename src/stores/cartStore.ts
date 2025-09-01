import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Producto } from '../types/menu';

export interface CartItem {
  product: Producto;
  quantity: number;
  addedAt: Date;
}

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([]);
  const isOpen = ref(false);

  // Getters
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      const price = item.product.isPromotion && item.product.promotionDetails?.originalPrice
        ? item.product.price // El precio promocional ya está aplicado
        : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  });

  const isEmpty = computed(() => items.value.length === 0);

  const itemsGroupedByCategory = computed(() => {
    const grouped = new Map();
    items.value.forEach(item => {
      const categoryId = item.product.category;
      if (!grouped.has(categoryId)) {
        grouped.set(categoryId, []);
      }
      grouped.get(categoryId).push(item);
    });
    return grouped;
  });

  // Actions
  const addItem = (product: Producto, quantity: number = 1) => {
    if (!product.availability) {
      throw new Error('Producto no disponible');
    }

    const existingItemIndex = items.value.findIndex(
      item => item.product.id === product.id
    );

    if (existingItemIndex !== -1) {
      // Si el producto ya existe, incrementar cantidad
      items.value[existingItemIndex].quantity += quantity;
    } else {
      // Si es nuevo, agregarlo al carrito
      items.value.push({
        product,
        quantity,
        addedAt: new Date()
      });
    }
  };

  const removeItem = (productId: string | number) => {
    const index = items.value.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  };

  const updateQuantity = (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    const item = items.value.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  };

  const incrementQuantity = (productId: string | number) => {
    const item = items.value.find(item => item.product.id === productId);
    if (item) {
      item.quantity += 1;
    }
  };

  const decrementQuantity = (productId: string | number) => {
    const item = items.value.find(item => item.product.id === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        removeItem(productId);
      }
    }
  };

  const clearCart = () => {
    items.value = [];
  };

  const toggleCart = () => {
    isOpen.value = !isOpen.value;
  };

  const openCart = () => {
    isOpen.value = true;
  };

  const closeCart = () => {
    isOpen.value = false;
  };

  // Utility functions
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const getItemQuantity = (productId: string | number): number => {
    const item = items.value.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId: string | number): boolean => {
    return items.value.some(item => item.product.id === productId);
  };

  // WhatsApp checkout functionality
  const generateWhatsAppMessage = (): string => {
    if (isEmpty.value) {
      return '';
    }

    let message = '🍽️ *PEDIDO - La Casa del Encebollado*\n\n';
    
    // Agrupar por categoría para mejor organización
    itemsGroupedByCategory.value.forEach((categoryItems, categoryId) => {
      // Aquí podrías obtener el nombre de la categoría si tienes acceso al store del menú
      message += `📋 *Categoría*\n`;
      
      categoryItems.forEach((item: CartItem) => {
        const itemPrice = item.product.isPromotion && item.product.promotionDetails?.originalPrice
          ? item.product.price
          : item.product.price;
        
        message += `• ${item.product.name}\n`;
        message += `  Cantidad: ${item.quantity}\n`;
        message += `  Precio unitario: ${formatPrice(itemPrice)}\n`;
        message += `  Subtotal: ${formatPrice(itemPrice * item.quantity)}\n\n`;
      });
    });

    message += `💰 *TOTAL: ${formatPrice(totalPrice.value)}*\n\n`;
    message += `📅 Fecha: ${new Date().toLocaleDateString('es-EC')}\n`;
    message += `🕐 Hora: ${new Date().toLocaleTimeString('es-EC')}\n\n`;
    message += `¡Gracias por elegir La Casa del Encebollado! 🙏`;

    return message;
  };

  const sendWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    const phoneNumber = '593987654321'; // Número de WhatsApp del restaurante
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp en una nueva ventana
    window.open(whatsappUrl, '_blank');
    
    // Limpiar carrito después del envío
    clearCart();
    closeCart();
  };

  return {
    // State
    items,
    isOpen,
    
    // Getters
    totalItems,
    totalPrice,
    isEmpty,
    itemsGroupedByCategory,
    
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    
    // Utilities
    formatPrice,
    getItemQuantity,
    isInCart,
    
    // WhatsApp
    generateWhatsAppMessage,
    sendWhatsAppOrder
  };
});