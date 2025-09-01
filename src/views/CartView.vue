<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cartStore';
import { useMenuStore } from '../stores/menuStore';

const cartStore = useCartStore();
const menuStore = useMenuStore();
const router = useRouter();

// Computed properties
const cartItemsWithCategory = computed(() => {
  return cartStore.items.map(item => ({
    ...item,
    categoryInfo: menuStore.getCategoryById(item.product.category)
  }));
});

// Methods
const goBack = () => {
  router.back();
};

const goToProducts = () => {
  router.push('/productos');
};

const handleCheckout = () => {
  if (cartStore.isEmpty) {
    return;
  }
  cartStore.sendWhatsAppOrder();
};
</script>

<template>
  <div class="cart-view">
    <!-- Header Section -->
    <div class="cart-header">
      <div class="container">
        <div class="header-content">
          <button class="back-btn" @click="goBack">
            <i class="icon-arrow-left">←</i>
            Volver
          </button>
          
          <div class="title-section">
            <h1 class="page-title">Mi Carrito</h1>
            <p class="page-subtitle" v-if="!cartStore.isEmpty">
              {{ cartStore.totalItems }} producto{{ cartStore.totalItems !== 1 ? 's' : '' }} en tu carrito
            </p>
          </div>
          
          <div class="cart-summary" v-if="!cartStore.isEmpty">
            <div class="total-amount">
              <span class="label">Total:</span>
              <span class="amount">{{ cartStore.formatPrice(cartStore.totalPrice) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Content -->
    <div class="cart-content">
      <div class="container">
        <!-- Empty Cart State -->
        <div v-if="cartStore.isEmpty" class="empty-cart">
          <div class="empty-icon"><i class="fas fa-shopping-cart"></i></div>
          <h3>Tu carrito está vacío</h3>
          <p>¡Agrega algunos deliciosos platos para comenzar!</p>
          <button class="browse-btn" @click="goToProducts">
            Ver Productos
          </button>
        </div>

        <!-- Cart Items -->
        <div v-else class="cart-items">
          <div class="items-list">
            <div 
              v-for="item in cartItemsWithCategory"
              :key="item.product.id"
              class="cart-item"
            >
              <div class="item-image">
                <img 
                  :src="item.product.image" 
                  :alt="item.product.name"
                  loading="lazy"
                >
              </div>
              
              <div class="item-info">
                <div class="item-header">
                  <h3 class="item-name">{{ item.product.name }}</h3>
                  <span class="item-category">{{ item.categoryInfo?.name }}</span>
                </div>
                
                <p class="item-description">{{ item.product.description }}</p>
                
                <div class="item-footer">
                  <div class="price-info">
                    <span class="unit-price">
                      {{ cartStore.formatPrice(item.product.price) }} c/u
                    </span>
                    <span class="total-price">
                      {{ cartStore.formatPrice(item.product.price * item.quantity) }}
                    </span>
                  </div>
                  
                  <div class="quantity-controls">
                    <button 
                      class="quantity-btn decrease"
                      @click="cartStore.decrementQuantity(item.product.id)"
                      :disabled="item.quantity <= 1"
                    >
                      -
                    </button>
                    <span class="quantity">{{ item.quantity }}</span>
                    <button 
                      class="quantity-btn increase"
                      @click="cartStore.incrementQuantity(item.product.id)"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    class="remove-btn"
                    @click="cartStore.removeItem(item.product.id)"
                    title="Eliminar producto"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Cart Actions -->
          <div class="cart-actions">
            <div class="actions-summary">
              <div class="summary-row">
                <span class="label">Subtotal ({{ cartStore.totalItems }} productos):</span>
                <span class="value">{{ cartStore.formatPrice(cartStore.totalPrice) }}</span>
              </div>
              <div class="summary-row total">
                <span class="label">Total a pagar:</span>
                <span class="value">{{ cartStore.formatPrice(cartStore.totalPrice) }}</span>
              </div>
            </div>
            
            <div class="action-buttons">
              <button class="clear-btn" @click="cartStore.clearCart()">
                Limpiar Carrito
              </button>
              <button class="checkout-btn" @click="handleCheckout">
                <i class="fab fa-whatsapp"></i>
                Realizar Pedido por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.cart-view {
  min-height: 100vh;
  background: linear-gradient(135deg, $background-light 0%, $gray-100 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// Header Section
.cart-header {
  background: linear-gradient(135deg, $ENCEBOLLADO-PRIMARY 0%, $blue-dark 100%);
  color: $white;
  padding: 2rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>') repeat;
    opacity: 0.3;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba($white, 0.2);
    color: $white;
    border: 2px solid rgba($white, 0.3);
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba($white, 0.3);
      border-color: rgba($white, 0.5);
      transform: translateY(-2px);
    }
  }

  .title-section {
    flex: 1;
    text-align: center;
  }

  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .page-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
  }

  .cart-summary {
    text-align: right;

    @media (max-width: 768px) {
      text-align: center;
    }
  }

  .total-amount {
    .label {
      display: block;
      font-size: 0.9rem;
      opacity: 0.8;
      margin-bottom: 0.25rem;
    }

    .amount {
      font-size: 2rem;
      font-weight: 800;
      color: $white;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  }
}

// Cart Content
.cart-content {
  padding: 2rem 0;
}

// Empty Cart
.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, $white 0%, $background-light 100%);
  border-radius: 20px;
  margin: 2rem 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);

  .empty-icon {
    font-size: 5rem;
    margin-bottom: 1.5rem;
    opacity: 0.7;
  }

  h3 {
    color: $text-dark;
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 700;
  }

  p {
    color: $text-light;
    margin-bottom: 2rem;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .browse-btn {
    padding: 1rem 2rem;
    background: linear-gradient(135deg, $ENCEBOLLADO-PRIMARY, $blue-light);
    color: $white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 16px rgba($ENCEBOLLADO-PRIMARY, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba($ENCEBOLLADO-PRIMARY, 0.4);
    }
  }
}

// Cart Items
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  background: $white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid $gray-100;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    border-color: $ENCEBOLLADO-PRIMARY;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
}

.item-image {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    align-self: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.item-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: $text-dark;
  margin: 0;
  line-height: 1.3;
}

.item-category {
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, $ENCEBOLLADO-PRIMARY, $blue-light);
  color: $white;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.item-description {
  color: $text-light;
  font-size: 0.95rem;
  line-height: 1.4;
  margin: 0;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
}

.price-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .unit-price {
    font-size: 0.9rem;
    color: $text-light;
  }

  .total-price {
    font-size: 1.2rem;
    font-weight: 700;
    color: $ENCEBOLLADO-PRIMARY;
  }
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: $background-light;
  border-radius: 25px;
  padding: 0.25rem;

  .quantity-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: $white;
    color: $ENCEBOLLADO-PRIMARY;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover:not(:disabled) {
      background: $ENCEBOLLADO-PRIMARY;
      color: $white;
      transform: scale(1.1);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .quantity {
    min-width: 40px;
    text-align: center;
    font-weight: 600;
    color: $text-dark;
  }
}

.remove-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba($error, 0.1);
  color: $error;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.2s ease;

  &:hover {
    background: $error;
    color: $white;
    transform: scale(1.1);
  }
}

// Cart Actions
.cart-actions {
  background: linear-gradient(135deg, $white 0%, $background-light 100%);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  border: 1px solid $gray-100;
}

.actions-summary {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid $border-light;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }

  &.total {
    font-size: 1.2rem;
    font-weight: 700;
    color: $text-dark;
    padding-top: 0.75rem;
    border-top: 1px solid $border-light;

    .value {
      color: $ENCEBOLLADO-PRIMARY;
      font-size: 1.4rem;
    }
  }

  .label {
    color: $text-light;
    font-weight: 500;
  }

  .value {
    color: $text-dark;
    font-weight: 600;
  }
}

.action-buttons {
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .clear-btn {
    flex: 1;
    padding: 1rem 2rem;
    background: transparent;
    color: $error;
    border: 2px solid $error;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:hover {
      background: $error;
      color: $white;
      transform: translateY(-2px);
    }
  }

  .checkout-btn {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #25D366, #128C7E);
    color: $white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 16px rgba(37, 211, 102, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
    }
  }
}

// Responsive Design
@media (max-width: 480px) {
  .cart-item {
    padding: 1rem;
  }

  .item-image {
    height: 150px;
  }

  .cart-actions {
    padding: 1.5rem;
  }
}
</style>