import type { CategoriaMenu, CategoriaProducto } from '../types/menu';
import { categoriasMenu, infoCategoriasDetallada } from '../data/categorias';
import { ProductService } from './ProductService';

/**
 * Service class for managing categories
 * Handles all category-related operations and business logic
 */
export class CategoryService {
  private categories: CategoriaMenu[] = categoriasMenu;
  private categoryDetails = infoCategoriasDetallada;
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  /**
   * Get all categories
   */
  getAllCategories(): CategoriaMenu[] {
    return this.categories;
  }

  /**
   * Get category by ID
   */
  getCategoryById(categoryId: CategoriaProducto): CategoriaMenu | undefined {
    return this.categories.find(category => category.id === categoryId);
  }

  /**
   * Get categories with available products
   */
  getCategoriesWithProducts(): CategoriaMenu[] {
    return this.categories.filter(category => category.productos.length > 0);
  }

  /**
   * Get category detailed information
   */
  getCategoryDetails(categoryId: CategoriaProducto) {
    return this.categoryDetails[categoryId];
  }

  /**
   * Get category statistics
   */
  getCategoryStatistics(categoryId: CategoriaProducto) {
    const products = this.productService.getProductsByCategory(categoryId);
    const prices = products.map(p => p.price);
    
    return {
      totalProducts: products.length,
      popularProducts: products.filter(p => p.isPopular).length,
      promotionalProducts: products.filter(p => p.isPromotion).length,
      availableProducts: products.filter(p => p.availability).length,
      priceRange: {
        min: prices.length > 0 ? Math.min(...prices) : 0,
        max: prices.length > 0 ? Math.max(...prices) : 0,
        average: prices.length > 0 ? prices.reduce((sum, price) => sum + price, 0) / prices.length : 0
      }
    };
  }

  /**
   * Get all categories statistics
   */
  getAllCategoriesStatistics() {
    const categoryIds: CategoriaProducto[] = [
      'promociones', 'encebollados', 'ceviches', 'bollos',
      'cazuelas', 'congelados', 'acompañamientos', 'bebidas'
    ];

    return categoryIds.reduce((acc, categoryId) => {
      acc[categoryId] = this.getCategoryStatistics(categoryId);
      return acc;
    }, {} as Record<CategoriaProducto, any>);
  }

  /**
   * Get featured categories (categories with popular products)
   */
  getFeaturedCategories(): CategoriaMenu[] {
    return this.categories.filter(category => 
      category.productos.some(product => product.isPopular)
    );
  }

  /**
   * Get promotional categories (categories with promotional products)
   */
  getPromotionalCategories(): CategoriaMenu[] {
    return this.categories.filter(category => 
      category.productos.some(product => product.isPromotion)
    );
  }

  /**
   * Search categories by name or description
   */
  searchCategories(searchTerm: string): CategoriaMenu[] {
    const term = searchTerm.toLowerCase();
    return this.categories.filter(category => 
      category.name.toLowerCase().includes(term) ||
      category.description.toLowerCase().includes(term)
    );
  }

  /**
   * Get category recommendations based on product popularity
   */
  getCategoryRecommendations(): CategoriaMenu[] {
    return this.categories
      .map(category => ({
        ...category,
        popularityScore: category.productos.filter(p => p.isPopular).length
      }))
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, 4)
      .map(({ popularityScore, ...category }) => category);
  }

  /**
   * Get category overview with key metrics
   */
  getCategoryOverview() {
    return {
      totalCategories: this.categories.length,
      categoriesWithProducts: this.getCategoriesWithProducts().length,
      featuredCategories: this.getFeaturedCategories().length,
      promotionalCategories: this.getPromotionalCategories().length,
      statistics: this.getAllCategoriesStatistics()
    };
  }
}