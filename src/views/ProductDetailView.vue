<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMenuStore } from '../stores/menuStore';
import { useCartStore } from '../stores/cartStore';
import ToastNotification from '../components/global/ToastNotification.vue';
import type { Producto } from '../types/menu';

const route = useRoute();
const router = useRouter();
const menuStore = useMenuStore();
const cartStore = useCartStore();

// Local state
const quantity = ref(1);
const selectedImageIndex = ref(0);
const showFullDescription = ref(false);
const isLoading = ref(true);
const showToast = ref(false);
const toastProduct = ref<Producto | undefined>(undefined);

// Computed properties
const productId = computed(() => route.params.id as string);
const product = computed(() => {
  return menuStore.allProducts.find(p => p.id.toString() === productId.value);
});

const relatedProducts = computed(() => {
  if (!product.value) return [];
  return menuStore.allProducts
    .filter(p => p.category === product.value?.category && p.id.toString() !== product.value?.id.toString())
    .slice(0, 4);
});

const totalPrice = computed(() => {
  if (!product.value) return 0;
  return product.value.price * quantity.value;
});

const productImages = computed(() => {
  if (!product.value) return [];
  // En un caso real, aquí tendrías múltiples imágenes
  return [product.value.image, product.value.image, product.value.image];
});

const categoryInfo = computed(() => {
  if (!product.value) return null;
  return menuStore.getCategoryById(product.value.category);
});

// Methods
const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = () => {
  if (!product.value) return;
  
  cartStore.addItem(product.value, quantity.value);
  
  // Show toast notification
  toastProduct.value = product.value;
  showToast.value = true;
  
  // Reset quantity after adding to cart
  quantity.value = 1;
};

const closeToast = () => {
  showToast.value = false;
  toastProduct.value = undefined;
};

const goBack = () => {
  router.back();
};

const goToProduct = (productId: string) => {
  router.push(`/productos/${productId}`);
};

const selectImage = (index: number) => {
  selectedImageIndex.value = index;
};

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

// Lifecycle
onMounted(async () => {
  await menuStore.loadMenuData();
  isLoading.value = false;
  
  if (!product.value) {
    router.push('/productos');
  }
});
</script>

<template>
  <div class="product-detail-view">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Cargando producto...</p>
    </div>

    <!-- Product Not Found -->
    <div v-else-if="!product" class="not-found-container">
      <div class="not-found-content">
        <i class="fas fa-exclamation-triangle"></i>
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o ha sido eliminado.</p>
        <button class="back-btn" @click="goBack">
          <i class="fas fa-arrow-left"></i>
          Volver
        </button>
      </div>
    </div>

    <!-- Product Detail Content -->
    <div v-else class="product-detail-content">
      <!-- Breadcrumb -->
      <div class="breadcrumb-section">
        <div class="container">
          <nav class="breadcrumb">
            <router-link to="/" class="breadcrumb-item">
              <i class="fas fa-home"></i>
              Inicio
            </router-link>
            <span class="breadcrumb-separator">/</span>
            <router-link to="/productos" class="breadcrumb-item">
              Productos
            </router-link>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item active">{{ categoryInfo?.name }}</span>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item active">{{ product.name }}</span>
          </nav>
        </div>
      </div>

      <!-- Main Product Section -->
      <div class="main-product-section">
        <div class="container">
          <div class="product-layout">
            <!-- Product Images -->
            <div class="product-images">
              <div class="main-image">
                <img 
                  :src="productImages[selectedImageIndex]" 
                  :alt="product.name"
                  class="main-product-image"
                >
                <div class="product-badges">
                  <span v-if="product.isPopular" class="badge popular">
                    <i class="fas fa-star"></i>
                    Popular
                  </span>
                  <span v-if="product.isPromotion" class="badge promotion">
                    <i class="fas fa-tag"></i>
                    Oferta
                  </span>
                  <span v-if="!product.availability" class="badge unavailable">
                    Agotado
                  </span>
                </div>
              </div>
              
              <div class="image-thumbnails">
                <button 
                  v-for="(image, index) in productImages"
                  :key="index"
                  class="thumbnail-btn"
                  :class="{ active: selectedImageIndex === index }"
                  @click="selectImage(index)"
                >
                  <img :src="image" :alt="`${product.name} ${index + 1}`">
                </button>
              </div>
            </div>

            <!-- Product Info -->
            <div class="product-info">
              <div class="product-header">
                <div class="category-tag">
                  <i class="fas fa-utensils"></i>
                  {{ categoryInfo?.name }}
                </div>
                <h1 class="product-title">{{ product.name }}</h1>
                
                <div class="price-section">
                  <div class="current-price">
                    {{ menuStore.formatPrice(product.price) }}
                  </div>
                  <div 
                    v-if="product.isPromotion && product.promotionDetails?.originalPrice"
                    class="original-price"
                  >
                    {{ menuStore.formatPrice(product.promotionDetails.originalPrice) }}
                  </div>
                  <div 
                    v-if="product.isPromotion && product.promotionDetails?.discount"
                    class="discount-badge"
                  >
                    -{{ product.promotionDetails.discount }}%
                  </div>
                </div>
              </div>

              <div class="product-description">
                <h3>Descripción</h3>
                <p 
                  class="description-text"
                  :class="{ expanded: showFullDescription }"
                >
                  {{ product.description }}
                </p>
                <button 
                  v-if="product.description.length > 150"
                  class="toggle-description"
                  @click="toggleDescription"
                >
                  {{ showFullDescription ? 'Ver menos' : 'Ver más' }}
                  <i :class="showFullDescription ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                </button>
              </div>

              <!-- Quantity and Add to Cart -->
              <div class="purchase-section">
                <div class="quantity-selector">
                  <label class="quantity-label">Cantidad:</label>
                  <div class="quantity-controls">
                    <button 
                      class="quantity-btn decrease"
                      @click="decreaseQuantity"
                      :disabled="quantity <= 1"
                    >
                      <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">{{ quantity }}</span>
                    <button 
                      class="quantity-btn increase"
                      @click="increaseQuantity"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div class="total-price">
                  <span class="total-label">Total:</span>
                  <span class="total-amount">{{ menuStore.formatPrice(totalPrice) }}</span>
                </div>

                <div class="action-buttons">
                  <button 
                    class="add-to-cart-btn"
                    :disabled="!product.availability"
                    @click="addToCart"
                  >
                    <i class="fas fa-shopping-cart"></i>
                    {{ product.availability ? 'Agregar al Carrito' : 'No Disponible' }}
                  </button>
                  
                  <a 
                    href="https://wa.me/593978602847" 
                    target="_blank" 
                    class="whatsapp-btn"
                  >
                    <i class="fab fa-whatsapp"></i>
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>

              <!-- Product Features -->
              <div class="product-features">
                <h3>Características</h3>
                <div class="features-grid">
                  <div class="feature-item">
                    <i class="fas fa-clock"></i>
                    <span>Preparación: 15-20 min</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-users"></i>
                    <span>Porciones: 1-2 personas</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-fire"></i>
                    <span>Nivel de picante: Medio</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-leaf"></i>
                    <span>Ingredientes frescos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length > 0" class="related-products-section">
        <div class="container">
          <h2 class="section-title">Productos Relacionados</h2>
          <div class="related-products-grid">
            <div 
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct.id"
              class="related-product-card"
              @click="goToProduct(relatedProduct.id.toString())"
            >
              <div class="related-product-image">
                <img :src="relatedProduct.image" :alt="relatedProduct.name">
                <div class="related-product-overlay">
                  <i class="fas fa-eye"></i>
                  Ver Producto
                </div>
              </div>
              <div class="related-product-info">
                <h4 class="related-product-name">{{ relatedProduct.name }}</h4>
                <div class="related-product-price">
                  {{ menuStore.formatPrice(relatedProduct.price) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <ToastNotification
      :show="showToast"
      :product="toastProduct"
      type="success"
      @close="closeToast"
    />
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '../styles/colorVariables.module.scss' as *;

.product-detail-view {
  min-height: 100vh;
  background: linear-gradient(135deg, $gray-50 0%, $gray-100 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// Loading State
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  
  .loading-spinner {
    width: 3rem;
    height: 3rem;
    border: 3px solid $gray-200;
    border-top: 3px solid $ENCEBOLLADO-PRIMARY;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  p {
    color: $text-light;
    font-size: 1.1rem;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// Not Found State
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  
  .not-found-content {
    text-align: center;
    
    i {
      font-size: 4rem;
      color: $warning;
      margin-bottom: 1rem;
    }
    
    h2 {
      color: $text-dark;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: $text-light;
      margin-bottom: 2rem;
    }
    
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: $ENCEBOLLADO-PRIMARY;
      color: white;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: $blue-hover;
        transform: translateY(-2px);
      }
    }
  }
}

// Breadcrumb
.breadcrumb-section {
  background: white;
  border-bottom: 1px solid $border-light;
  padding: 1rem 0;
  
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    
    .breadcrumb-item {
      color: $text-light;
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: $ENCEBOLLADO-PRIMARY;
      }
      
      &.active {
        color: $text-dark;
        font-weight: 600;
      }
    }
    
    .breadcrumb-separator {
      color: $gray-400;
    }
  }
}

// Main Product Section
.main-product-section {
  padding: 2rem 0;
  
  .product-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
}

// Product Images
.product-images {
  .main-image {
    position: relative;
    margin-bottom: 1rem;
    border-radius: 1rem;
    overflow: hidden;
    background: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    
    .main-product-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }
    
    .product-badges {
      position: absolute;
      top: 1rem;
      left: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      .badge {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        font-weight: 600;
        
        &.popular {
          background: $error;
          color: white;
        }
        
        &.promotion {
          background: $warning;
          color: white;
        }
        
        &.unavailable {
          background: $gray-600;
          color: white;
        }
      }
    }
  }
  
  .image-thumbnails {
    display: flex;
    gap: 0.5rem;
    
    .thumbnail-btn {
      width: 80px;
      height: 80px;
      border: 2px solid transparent;
      border-radius: 0.5rem;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: $ENCEBOLLADO-PRIMARY;
      }
      
      &.active {
        border-color: $ENCEBOLLADO-PRIMARY;
        box-shadow: 0 0 0 2px rgba($ENCEBOLLADO-PRIMARY, 0.2);
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

// Product Info
.product-info {
  .product-header {
    margin-bottom: 2rem;
    
    .category-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: $blue-overlay;
      color: $ENCEBOLLADO-PRIMARY;
      border-radius: 1rem;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    
    .product-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: $text-dark;
      margin-bottom: 1rem;
      line-height: 1.2;
      
      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }
    
    .price-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .current-price {
        font-size: 2rem;
        font-weight: 700;
        color: $ENCEBOLLADO-PRIMARY;
      }
      
      .original-price {
        font-size: 1.2rem;
        color: $text-light;
        text-decoration: line-through;
      }
      
      .discount-badge {
        padding: 0.25rem 0.75rem;
        background: $error;
        color: white;
        border-radius: 1rem;
        font-size: 0.9rem;
        font-weight: 600;
      }
    }
  }
  
  .product-description {
    margin-bottom: 2rem;
    
    h3 {
      color: $text-dark;
      margin-bottom: 1rem;
      font-size: 1.2rem;
      font-weight: 600;
    }
    
    .description-text {
      color: $text-light;
      line-height: 1.6;
      max-height: 4.8em;
      overflow: hidden;
      transition: max-height 0.3s ease;
      
      &.expanded {
        max-height: none;
      }
    }
    
    .toggle-description {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: $ENCEBOLLADO-PRIMARY;
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 600;
      margin-top: 0.5rem;
      transition: color 0.3s ease;
      
      &:hover {
        color: $blue-hover;
      }
    }
  }
  
  .purchase-section {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
    
    .quantity-selector {
      margin-bottom: 1.5rem;
      
      .quantity-label {
        display: block;
        color: $text-dark;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      
      .quantity-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
        
        .quantity-btn {
          width: 40px;
          height: 40px;
          border: 1px solid $border-light;
          border-radius: 0.5rem;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &:hover:not(:disabled) {
            background: $ENCEBOLLADO-PRIMARY;
            color: white;
            border-color: $ENCEBOLLADO-PRIMARY;
          }
          
          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
        
        .quantity-display {
          font-size: 1.2rem;
          font-weight: 600;
          color: $text-dark;
          min-width: 2rem;
          text-align: center;
        }
      }
    }
    
    .total-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-top: 1px solid $border-light;
      border-bottom: 1px solid $border-light;
      margin-bottom: 1.5rem;
      
      .total-label {
        font-size: 1.1rem;
        color: $text-dark;
        font-weight: 600;
      }
      
      .total-amount {
        font-size: 1.5rem;
        font-weight: 700;
        color: $ENCEBOLLADO-PRIMARY;
      }
    }
    
    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      
      .add-to-cart-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem 2rem;
        background: $ENCEBOLLADO-PRIMARY;
        color: white;
        border: none;
        border-radius: 0.75rem;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover:not(:disabled) {
          background: $blue-hover;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba($ENCEBOLLADO-PRIMARY, 0.3);
        }
        
        &:disabled {
          background: $gray-400;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
      }
      
      .whatsapp-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem 2rem;
        background: $success;
        color: white;
        border: none;
        border-radius: 0.75rem;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.3s ease;
        
        &:hover {
          background: color.adjust($success, $lightness: -10%);
          transform: translateY(-2px);
          color: white;
        }
      }
    }
  }
  
  .product-features {
    h3 {
      color: $text-dark;
      margin-bottom: 1rem;
      font-size: 1.2rem;
      font-weight: 600;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      
      .feature-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        background: white;
        border-radius: 0.75rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        
        i {
          color: $ENCEBOLLADO-PRIMARY;
          font-size: 1.2rem;
        }
        
        span {
          color: $text-dark;
          font-weight: 500;
        }
      }
    }
  }
}

// Related Products
.related-products-section {
  background: white;
  padding: 3rem 0;
  
  .section-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: $text-dark;
    margin-bottom: 2rem;
  }
  
  .related-products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .related-product-card {
    background: white;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      
      .related-product-overlay {
        opacity: 1;
      }
    }
    
    .related-product-image {
      position: relative;
      height: 200px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      
      .related-product-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba($ENCEBOLLADO-PRIMARY, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        opacity: 0;
        transition: opacity 0.3s ease;
        
        i {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
      }
    }
    
    .related-product-info {
      padding: 1rem;
      
      .related-product-name {
        color: $text-dark;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }
      
      .related-product-price {
        color: $ENCEBOLLADO-PRIMARY;
        font-size: 1.1rem;
        font-weight: 700;
      }
    }
  }
}
</style>