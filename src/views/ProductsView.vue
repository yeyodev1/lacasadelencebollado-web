<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMenuStore } from '../stores/menuStore';
import type { CategoriaProducto } from '../types/menu';

const menuStore = useMenuStore();
const router = useRouter();

// Local state for UI
const showFilters = ref(false);
const viewMode = ref<'grid' | 'list'>('grid');
const sortBy = ref<'name' | 'price' | 'popularity'>('name');
const sortOrder = ref<'asc' | 'desc'>('asc');

// Computed properties
const sortedProducts = computed(() => {
  const products = [...menuStore.filteredProducts];

  return products.sort((a, b) => {
    let comparison = 0;

    switch (sortBy.value) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'popularity':
        comparison = (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        break;
    }

    return sortOrder.value === 'asc' ? comparison : -comparison;
  });
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
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

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

    <!-- Filters and Controls -->
    <div class="filters-section">
      <div class="container">
        <div class="filters-header">
          <button 
            class="filters-toggle"
            @click="toggleFilters"
            :class="{ active: showFilters }"
          >
            <i class="icon-filter"></i>
            Filtros
            <i class="icon-chevron" :class="{ rotated: showFilters }"></i>
          </button>
          
          <div class="view-controls">
            <div class="sort-controls">
              <select v-model="sortBy" class="sort-select">
                <option value="name">Nombre</option>
                <option value="price">Precio</option>
                <option value="popularity">Popularidad</option>
              </select>
              
              <button 
                class="sort-order"
                @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
                :class="sortOrder"
              >
                <i class="icon-sort"></i>
              </button>
            </div>
            
            <div class="view-mode">
              <button 
                class="view-btn"
                :class="{ active: viewMode === 'grid' }"
                @click="viewMode = 'grid'"
              >
                <i class="icon-grid"></i>
              </button>
              <button 
                class="view-btn"
                :class="{ active: viewMode === 'list' }"
                @click="viewMode = 'list'"
              >
                <i class="icon-list"></i>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Filters Panel -->
        <div class="filters-panel" :class="{ visible: showFilters }">
          <div class="filters-grid">
            <!-- Search Filter -->
            <div class="filter-group">
              <label class="filter-label">Buscar</label>
              <input 
                type="text"
                class="search-input"
                placeholder="Buscar productos..."
                :value="menuStore.searchTerm"
                @input="updateSearch"
              >
            </div>
            
            <!-- Category Filter -->
            <div class="filter-group">
              <label class="filter-label">Categoría</label>
              <div class="category-filters">
                <button 
                  class="category-btn"
                  :class="{ active: !menuStore.selectedCategory }"
                  @click="selectCategory(null)"
                >
                  Todas
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
            
            <!-- Price Range Filter -->
            <div class="filter-group">
              <label class="filter-label">Rango de Precio</label>
              <div class="price-range">
                <input 
                  type="range"
                  min="0"
                  max="50"
                  :value="menuStore.priceRange.min"
                  @input="updateMinPrice"
                  class="range-input"
                >
                <input 
                  type="range"
                  min="0"
                  max="50"
                  :value="menuStore.priceRange.max"
                  @input="updateMaxPrice"
                  class="range-input"
                >
                <div class="price-display">
                  ${{ menuStore.priceRange.min }} - ${{ menuStore.priceRange.max }}
                </div>
              </div>
            </div>
            
            <!-- Quick Filters -->
            <div class="filter-group">
              <label class="filter-label">Filtros Rápidos</label>
              <div class="quick-filters">
                <button 
                  class="quick-filter-btn"
                  :class="{ active: menuStore.showOnlyPopular }"
                  @click="menuStore.togglePopularFilter()"
                >
                  <i class="icon-star"></i>
                  Populares
                </button>
                <button 
                  class="quick-filter-btn"
                  :class="{ active: menuStore.showOnlyPromotions }"
                  @click="menuStore.togglePromotionsFilter()"
                >
                  <i class="icon-tag"></i>
                  Promociones
                </button>
                <button 
                  class="quick-filter-btn"
                  :class="{ active: menuStore.showOnlyAvailable }"
                  @click="menuStore.toggleAvailabilityFilter()"
                >
                  <i class="icon-check"></i>
                  Disponibles
                </button>
              </div>
            </div>
          </div>
          
          <div class="filters-actions">
            <button class="clear-filters-btn" @click="clearAllFilters">
              Limpiar Filtros
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
            
            <div 
              class="products-grid"
              :class="{
                'grid-view': viewMode === 'grid',
                'list-view': viewMode === 'list'
              }"
            >
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
  </div>
</template>

<style lang="scss" scoped>
.products-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// Header Section
.products-header {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 3rem 0;

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
      font-size: 2rem;
      font-weight: 700;
      color: #f39c12;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }
}

// Filters Section
.filters-section {
  background: white;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  z-index: 100;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.filters-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
  }

  &.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }

  .icon-chevron {
    transition: transform 0.3s ease;

    &.rotated {
      transform: rotate(180deg);
    }
  }
}

.view-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .sort-select {
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    background: white;
  }

  .sort-order {
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #f8f9fa;
    }

    &.desc {
      transform: rotate(180deg);
    }
  }
}

.view-mode {
  display: flex;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  overflow: hidden;

  .view-btn {
    padding: 0.5rem 0.75rem;
    border: none;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #f8f9fa;
    }

    &.active {
      background: #007bff;
      color: white;
    }

    &:not(:last-child) {
      border-right: 1px solid #dee2e6;
    }
  }
}

.filters-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;

  &.visible {
    max-height: 500px;
    padding: 1rem 0;
    border-top: 1px solid #e9ecef;
  }
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.filter-group {
  .filter-label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #495057;
  }
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 1.5rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: #f8f9fa;
  }

  &.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }
}

.price-range {
  .range-input {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .price-display {
    text-align: center;
    font-weight: 600;
    color: #007bff;
  }
}

.quick-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.quick-filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: #f8f9fa;
  }

  &.active {
    background: #28a745;
    color: white;
    border-color: #28a745;
  }
}

.filters-actions {
  text-align: center;

  .clear-filters-btn {
    padding: 0.75rem 1.5rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #c82333;
    }
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
  padding: 3rem 1rem;

  .loading-spinner {
    width: 3rem;
    height: 3rem;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  .error-icon,
  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: #495057;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6c757d;
    margin-bottom: 1rem;
  }

  .retry-btn {
    padding: 0.75rem 1.5rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #0056b3;
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
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;

  .category-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .category-description {
    color: #6c757d;
    margin-bottom: 0.5rem;
  }

  .products-count {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    background: #007bff;
    color: white;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 600;
  }
}

// Products Grid
.products-grid {
  &.grid-view {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  &.list-view {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .product-card {
      display: flex;
      align-items: center;

      .product-image {
        width: 120px;
        height: 120px;
        flex-shrink: 0;
        margin-right: 1rem;
      }

      .product-info {
        flex: 1;
      }
    }
  }
}

.product-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }

  &.unavailable {
    opacity: 0.7;

    .product-image img {
      filter: grayscale(100%);
    }
  }

  &.promotion {
    border: 2px solid #f39c12;
  }

  &.popular {
    border: 2px solid #e74c3c;
  }
}

.product-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
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
  gap: 0.25rem;
}

.badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;

  &.popular {
    background: #e74c3c;
    color: white;
  }

  &.promotion {
    background: #f39c12;
    color: white;
  }

  &.unavailable {
    background: #6c757d;
    color: white;
  }
}

.product-info {
  padding: 1rem;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.product-description {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
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
  font-size: 1.2rem;
  font-weight: 700;
  color: #28a745;
}

.original-price {
  font-size: 0.9rem;
  color: #6c757d;
  text-decoration: line-through;
}

.add-to-cart-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover:not(:disabled) {
    background: #0056b3;
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
}

// Responsive Design
@media (max-width: 768px) {
  .filters-grid {
    grid-template-columns: 1fr;
  }

  .products-grid.grid-view {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .products-grid.list-view .product-card {
    flex-direction: column;

    .product-image {
      width: 100%;
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .products-grid.grid-view {
    grid-template-columns: 1fr;
  }

  .category-filters,
  .quick-filters {
    justify-content: center;
  }
}
</style>