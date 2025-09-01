import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Producto, CategoriaProducto, CategoriaMenu, Promocion } from '../types/menu';
import { ProductService } from '../services/ProductService';
import { CategoryService } from '../services/CategoryService';
import { PromotionService } from '../services/PromotionService';

/**
 * Main store for managing menu data
 * Uses services to handle business logic and state management
 */
export const useMenuStore = defineStore('menu', () => {
  // Services instances
  const productService = new ProductService();
  const categoryService = new CategoryService();
  const promotionService = new PromotionService();

  // State
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const selectedCategory = ref<CategoriaProducto | null>(null);
  const searchTerm = ref('');
  const priceRange = ref({ min: 0, max: 100 });
  const showOnlyPopular = ref(false);
  const showOnlyPromotions = ref(false);
  const showOnlyAvailable = ref(true);

  // Computed - Products
  const allProducts = computed(() => productService.getAllProducts());
  
  const filteredProducts = computed(() => {
    let products = allProducts.value;

    // Filter by category
    if (selectedCategory.value) {
      products = productService.getProductsByCategory(selectedCategory.value);
    }

    // Filter by search term
    if (searchTerm.value) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    }

    // Filter by price range
    products = products.filter(product => 
      product.price >= priceRange.value.min && product.price <= priceRange.value.max
    );

    // Filter by popular
    if (showOnlyPopular.value) {
      products = products.filter(product => product.isPopular);
    }

    // Filter by promotions
    if (showOnlyPromotions.value) {
      products = products.filter(product => product.isPromotion);
    }

    // Filter by availability
    if (showOnlyAvailable.value) {
      products = products.filter(product => product.availability);
    }

    return products;
  });

  const popularProducts = computed(() => productService.getPopularProducts());
  const promotionalProducts = computed(() => productService.getPromotionalProducts());
  const availableProducts = computed(() => productService.getAvailableProducts());
  const productStatistics = computed(() => productService.getProductStatistics());

  // Computed - Categories
  const allCategories = computed(() => categoryService.getAllCategories());
  const categoriesWithProducts = computed(() => categoryService.getCategoriesWithProducts());
  const featuredCategories = computed(() => categoryService.getFeaturedCategories());
  const categoryRecommendations = computed(() => categoryService.getCategoryRecommendations());
  const categoryOverview = computed(() => categoryService.getCategoryOverview());

  // Computed - Promotions
  const allPromotions = computed(() => promotionService.getAllPromotions());
  const activePromotions = computed(() => promotionService.getActivePromotions());
  const validPromotions = computed(() => promotionService.getValidPromotions());
  const popularPromotions = computed(() => promotionService.getPopularPromotions());
  const bestValuePromotions = computed(() => promotionService.getBestValuePromotions());
  const promotionsExpiringSoon = computed(() => promotionService.getPromotionsExpiringSoon());
  const promotionStatistics = computed(() => promotionService.getPromotionStatistics());

  // Actions - Products
  const getProductById = (id: number): Producto | undefined => {
    return productService.getProductById(id);
  };

  const getProductsByCategory = (category: CategoriaProducto): Producto[] => {
    return productService.getProductsByCategory(category);
  };

  const searchProducts = (term: string): Producto[] => {
    return productService.searchProducts(term);
  };

  const getProductsByPriceRange = (min: number, max: number): Producto[] => {
    return productService.getProductsByPriceRange(min, max);
  };

  const formatPrice = (price: number): string => {
    return productService.formatPrice(price);
  };

  // Actions - Categories
  const getCategoryById = (categoryId: CategoriaProducto): CategoriaMenu | undefined => {
    return categoryService.getCategoryById(categoryId);
  };

  const getCategoryDetails = (categoryId: CategoriaProducto) => {
    return categoryService.getCategoryDetails(categoryId);
  };

  const getCategoryStatistics = (categoryId: CategoriaProducto) => {
    return categoryService.getCategoryStatistics(categoryId);
  };

  const searchCategories = (term: string): CategoriaMenu[] => {
    return categoryService.searchCategories(term);
  };

  // Actions - Promotions
  const getPromotionById = (id: number): Promocion | undefined => {
    return promotionService.getPromotionById(id);
  };

  const isPromotionValid = (promotion: Promocion): boolean => {
    return promotionService.isPromotionValid(promotion);
  };

  const calculatePromotionSavings = (promotion: Promocion): number => {
    return promotionService.calculateSavings(promotion);
  };

  const getPromotionSummary = (promotion: Promocion) => {
    return promotionService.getPromotionSummary(promotion);
  };

  const searchPromotions = (term: string): Promocion[] => {
    return promotionService.searchPromotions(term);
  };

  // Actions - Filters
  const setSelectedCategory = (category: CategoriaProducto | null) => {
    selectedCategory.value = category;
  };

  const setSearchTerm = (term: string) => {
    searchTerm.value = term;
  };

  const setPriceRange = (min: number, max: number) => {
    priceRange.value = { min, max };
  };

  const togglePopularFilter = () => {
    showOnlyPopular.value = !showOnlyPopular.value;
  };

  const togglePromotionsFilter = () => {
    showOnlyPromotions.value = !showOnlyPromotions.value;
  };

  const toggleAvailabilityFilter = () => {
    showOnlyAvailable.value = !showOnlyAvailable.value;
  };

  const clearFilters = () => {
    selectedCategory.value = null;
    searchTerm.value = '';
    priceRange.value = { min: 0, max: 100 };
    showOnlyPopular.value = false;
    showOnlyPromotions.value = false;
    showOnlyAvailable.value = true;
  };

  // Actions - Loading and Error handling
  const setLoading = (loading: boolean) => {
    isLoading.value = loading;
  };

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage;
  };

  const clearError = () => {
    error.value = null;
  };

  // Actions - Data loading (for future API integration)
  const loadMenuData = async () => {
    try {
      setLoading(true);
      clearError();
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Data is already loaded from static files
      // This method is prepared for future API integration
      
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load menu data');
      setLoading(false);
    }
  };

  return {
    // State
    isLoading,
    error,
    selectedCategory,
    searchTerm,
    priceRange,
    showOnlyPopular,
    showOnlyPromotions,
    showOnlyAvailable,

    // Computed - Products
    allProducts,
    filteredProducts,
    popularProducts,
    promotionalProducts,
    availableProducts,
    productStatistics,

    // Computed - Categories
    allCategories,
    categoriesWithProducts,
    featuredCategories,
    categoryRecommendations,
    categoryOverview,

    // Computed - Promotions
    allPromotions,
    activePromotions,
    validPromotions,
    popularPromotions,
    bestValuePromotions,
    promotionsExpiringSoon,
    promotionStatistics,

    // Actions - Products
    getProductById,
    getProductsByCategory,
    searchProducts,
    getProductsByPriceRange,
    formatPrice,

    // Actions - Categories
    getCategoryById,
    getCategoryDetails,
    getCategoryStatistics,
    searchCategories,

    // Actions - Promotions
    getPromotionById,
    isPromotionValid,
    calculatePromotionSavings,
    getPromotionSummary,
    searchPromotions,

    // Actions - Filters
    setSelectedCategory,
    setSearchTerm,
    setPriceRange,
    togglePopularFilter,
    togglePromotionsFilter,
    toggleAvailabilityFilter,
    clearFilters,

    // Actions - Loading and Error handling
    setLoading,
    setError,
    clearError,
    loadMenuData
  };
});