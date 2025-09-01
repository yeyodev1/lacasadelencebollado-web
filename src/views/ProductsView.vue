<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuStore } from '../stores/menuStore';
import { useCartStore } from '../stores/cartStore';
import ToastNotification from '../components/global/ToastNotification.vue';
import type { CategoriaProducto, Producto } from '../types/menu';

const menuStore = useMenuStore();
const cartStore = useCartStore();
const router = useRouter();

// Local state for UI (simplified)
// Removed complex filters - keeping only essential functionality

// Computed properties
const sortedProducts = computed(() => {
  const products = [...menuStore.filteredProducts];
  // Simple alphabetical sorting by name
  return products.sort((a, b) => a.name.localeCompare(b.name));
});

const productsByCategory = computed(() => {
  const grouped = new Map();

  sortedProducts.value.forEach(product => {
    if (!grouped.has(product.category)) {
      grouped.set(product.category, []);
    }
    grouped.get(product.category).push(product);
  });

  return grouped;
});

const totalProducts = computed(() => sortedProducts.value.length);
const totalCategories = computed(() => productsByCategory.value.size);

// Methods
const selectCategory = (category: CategoriaProducto | null) => {
  menuStore.setSelectedCategory(category);
};

const updateSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;
  menuStore.setSearchTerm(target.value);
};

const updatePriceRange = (min: number, max: number) => {
  menuStore.setPriceRange(min, max);
};

const updateMinPrice = (event: Event) => {
  const target = event.target as HTMLInputElement;
  updatePriceRange(Number(target.value), menuStore.priceRange.max);
};

const updateMaxPrice = (event: Event) => {
  const target = event.target as HTMLInputElement;
  updatePriceRange(menuStore.priceRange.min, Number(target.value));
};

const clearAllFilters = () => {
  menuStore.clearFilters();
};

const getCategoryInfo = (categoryId: CategoriaProducto) => {
  return menuStore.getCategoryById(categoryId);
};

const goToProductDetail = (productId: string | number) => {
  router.push(`/productos/${productId}`);
};

const addToCart = (product: Producto, event?: Event) => {
  if (event) {
    event.stopPropagation(); // Evitar que se active el click del card
  }
  
  if (!product.availability) {
    return;
  }
  
  try {
    cartStore.addItem(product, 1);
    // Aquí podrías agregar una notificación de éxito
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    // Aquí podrías agregar una notificación de error
  }
};

// Lifecycle
onMounted(() => {
  menuStore.loadMenuData();
});
</script>

<template>
  <div class="products-view">
    <!-- Header Section -->
    <div class="products-header">
      <div class="container">
        <div class="header-content">
          <div class="title-section">
            <h1 class="page-title">Nuestros Productos</h1>
            <p class="page-subtitle">
              Descubre toda nuestra deliciosa variedad de platos tradicionales
            </p>
          </div>
          
          <div class="stats-section">
            <div class="stat-item">
              <span class="stat-number">{{ totalProducts }}</span>
              <span class="stat-label">Productos</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalCategories }}</span>
              <span class="stat-label">Categorías</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Simple Filters -->
    <div class="filters-section">
      <div class="container">
        <div class="simple-filters">
          <!-- Search Bar -->
          <div class="search-container">
            <input 
              type="text"
              class="search-input"
              placeholder="Buscar platos..."
              :value="menuStore.searchTerm"
              @input="updateSearch"
            >
            <i class="search-icon">🔍</i>
          </div>
          
          <!-- Category Buttons -->
          <div class="category-filters">
            <button 
              class="category-btn"
              :class="{ active: !menuStore.selectedCategory }"
              @click="selectCategory(null)"
            >
              Todos los Platos
            </button>
            <button 
              v-for="category in menuStore.allCategories"
              :key="category.id"
              class="category-btn"
              :class="{ active: menuStore.selectedCategory === category.id }"
              @click="selectCategory(category.id as CategoriaProducto)"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Content -->
    <div class="products-content">
      <div class="container">
        <!-- Loading State -->
        <div v-if="menuStore.isLoading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Cargando productos...</p>
        </div>
        
        <!-- Error State -->
        <div v-else-if="menuStore.error" class="error-state">
          <div class="error-icon">⚠️</div>
          <h3>Error al cargar productos</h3>
          <p>{{ menuStore.error }}</p>
          <button class="retry-btn" @click="menuStore.loadMenuData()">
            Reintentar
          </button>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="sortedProducts.length === 0" class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No se encontraron productos</h3>
          <p>Intenta ajustar los filtros para ver más resultados</p>
          <button class="clear-filters-btn" @click="clearAllFilters">
            Limpiar Filtros
          </button>
        </div>
        
        <!-- Products by Category -->
        <div v-else class="products-by-category">
          <div 
            v-for="[categoryId, products] in productsByCategory"
            :key="categoryId"
            class="category-section"
          >
            <div class="category-header">
              <h2 class="category-title">
                {{ getCategoryInfo(categoryId)?.name }}
              </h2>
              <p class="category-description">
                {{ getCategoryInfo(categoryId)?.description }}
              </p>
              <span class="products-count">
                {{ products.length }} producto{{ products.length !== 1 ? 's' : '' }}
              </span>
            </div>
            
            <div class="products-grid">
              <div 
                v-for="product in products"
                :key="product.id"
                class="product-card"
                :class="{
                  'unavailable': !product.availability,
                  'promotion': product.isPromotion,
                  'popular': product.isPopular
                }"
                @click="goToProductDetail(product.id)"
              >
                <div class="product-image">
                  <img 
                    :src="product.image" 
                    :alt="product.name"
                    loading="lazy"
                  >
                  <div class="product-badges">
                    <span v-if="product.isPopular" class="badge popular">
                      <i class="icon-star"></i>
                      Popular
                    </span>
                    <span v-if="product.isPromotion" class="badge promotion">
                      <i class="icon-tag"></i>
                      Oferta
                    </span>
                    <span v-if="!product.availability" class="badge unavailable">
                      Agotado
                    </span>
                  </div>
                </div>
                
                <div class="product-info">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <p class="product-description">{{ product.description }}</p>
                  
                  <div class="product-footer">
                    <div class="price-section">
                      <span class="current-price">
                        {{ menuStore.formatPrice(product.price) }}
                      </span>
                      <span 
                        v-if="product.isPromotion && product.promotionDetails?.originalPrice"
                        class="original-price"
                      >
                        {{ menuStore.formatPrice(product.promotionDetails.originalPrice) }}
                      </span>
                    </div>
                    
                    <button 
                      class="add-to-cart-btn"
                      :disabled="!product.availability"
                      @click="addToCart(product, $event)"
                    >
                      <i class="icon-cart"></i>
                      {{ product.availability ? 'Agregar' : 'Agotado' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Toast Notifications -->
    <ToastNotification
      v-if="cartStore.currentNotification"
      :show="cartStore.currentNotification.show"
      :product="cartStore.currentNotification.product"
      :message="cartStore.currentNotification.message"
      :type="cartStore.currentNotification.type"
      :duration="cartStore.currentNotification.duration"
      @close="cartStore.closeCurrentNotification"
    />
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.products-view {
  min-height: 100vh;
  background: linear-gradient(135deg, $background-light 0%, $gray-100 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// Header Section
.products-header {
  background: linear-gradient(135deg, $ENCEBOLLADO-PRIMARY 0%, $blue-dark 100%);
  color: $white;
  padding: 4rem 0;
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

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }

  .title-section {
    flex: 1;
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

  .stats-section {
    display: flex;
    gap: 2rem;

    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  .stat-item {
    text-align: center;

    .stat-number {
      display: block;
      font-size: 2.5rem;
      font-weight: 800;
      color: $white;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }
}

// Simple Filters Section
.filters-section {
  background: $white;
  border-bottom: 1px solid $border-light;
  padding: 1.5rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.simple-filters {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
}

.search-container {
  position: relative;
  width: 100%;
  max-width: 400px;

  .search-input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid $border-light;
    border-radius: 50px;
    font-size: 1rem;
    background: $background-light;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:focus {
      outline: none;
      border-color: $ENCEBOLLADO-PRIMARY;
      background: $white;
      box-shadow: 0 0 0 3px rgba($ENCEBOLLADO-PRIMARY, 0.1);
    }

    &::placeholder {
      color: $text-light;
    }
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: $text-light;
    pointer-events: none;
  }
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
}

.category-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid $border-light;
  border-radius: 25px;
  background: $white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.95rem;
  font-weight: 600;
  color: $text-dark;
  white-space: nowrap;

  &:hover {
    background: $background-light;
    border-color: $ENCEBOLLADO-PRIMARY;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.active {
    background: $ENCEBOLLADO-PRIMARY;
    color: $white;
    border-color: $ENCEBOLLADO-PRIMARY;
    box-shadow: 0 6px 20px rgba($ENCEBOLLADO-PRIMARY, 0.3);
    transform: translateY(-2px);
  }
}

// Products Content
.products-content {
  padding: 2rem 0;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, $white 0%, $background-light 100%);
  border-radius: 20px;
  margin: 2rem 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid $gray-200;
    border-top: 4px solid $ENCEBOLLADO-PRIMARY;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  .error-icon,
  .empty-icon {
    font-size: 5rem;
    margin-bottom: 1.5rem;
    color: $gray-300;
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
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .retry-btn,
  .clear-filters-btn {
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

// Category Section
.category-section {
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.category-header {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, $white 0%, $background-light 100%);
  border-radius: 16px;
  border-left: 4px solid $ENCEBOLLADO-PRIMARY;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .category-title {
    font-size: 2rem;
    font-weight: 800;
    color: $text-dark;
    margin-bottom: 0.75rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, $ENCEBOLLADO-PRIMARY, $blue-light);
      border-radius: 2px;
    }
  }

  .category-description {
    color: $text-light;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .products-count {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, $ENCEBOLLADO-PRIMARY, $blue-light);
    color: $white;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba($ENCEBOLLADO-PRIMARY, 0.3);
  }
}

// Products Grid
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

.product-card {
  background: $white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid $gray-100;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba($ENCEBOLLADO-PRIMARY, 0.05) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    border-color: $ENCEBOLLADO-PRIMARY;

    &::before {
      opacity: 1;
    }
  }

  &.unavailable {
    opacity: 0.7;

    .product-image img {
      filter: grayscale(100%);
    }
  }

  &.promotion {
    border: 2px solid $warning;
    box-shadow: 0 4px 20px rgba($warning, 0.2);

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-top: 20px solid $warning;
    }
  }

  &.popular {
    border: 2px solid $error;
    box-shadow: 0 4px 20px rgba($error, 0.2);

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-top: 20px solid $error;
    }
  }
}

.product-image {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.product-badges {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &.new {
    background: linear-gradient(135deg, $success, color.adjust($success, $lightness: -10%));
    color: $white;
  }

  &.popular {
    background: linear-gradient(135deg, $error, color.adjust($error, $lightness: -10%));
    color: $white;
  }

  &.promotion {
    background: linear-gradient(135deg, $warning, color.adjust($warning, $lightness: -10%));
    color: $white;
  }

  &.unavailable {
    background: #6c757d;
    color: white;
  }
}

.product-info {
  padding: 1.25rem;
  position: relative;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: $text-dark;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-description {
  color: $text-light;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.current-price {
  font-size: 1.3rem;
  font-weight: 800;
  color: $ENCEBOLLADO-PRIMARY;
}

.original-price {
  font-size: 1rem;
  color: $text-light;
  text-decoration: line-through;
  font-weight: 500;
}

.add-to-cart-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  background: linear-gradient(135deg, $ENCEBOLLADO-PRIMARY, $blue-light);
  color: $white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 3px 10px rgba($ENCEBOLLADO-PRIMARY, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 16px rgba($ENCEBOLLADO-PRIMARY, 0.4);
  }

  &:disabled {
    background: $gray-400;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
}

// Responsive Design
@media (max-width: 768px) {
  .category-filters {
    justify-content: center;
  }

  .product-card {
    .product-name {
      font-size: 1rem;
    }

    .current-price {
      font-size: 1.2rem;
    }
  }
}

@media (max-width: 480px) {
  .category-filters {
    gap: 0.5rem;
  }

  .category-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}
</style>