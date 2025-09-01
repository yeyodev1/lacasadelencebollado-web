import type { Producto, CategoriaProducto } from '../types/menu';
import { productos } from '../data/productos';

/**
 * Service class for managing products
 * Handles all product-related operations and business logic
 */
export class ProductService {
  private products: Producto[] = productos;

  /**
   * Get all products
   */
  getAllProducts(): Producto[] {
    return this.products;
  }

  /**
   * Get products by category
   */
  getProductsByCategory(category: CategoriaProducto): Producto[] {
    return this.products.filter(product => product.category === category);
  }

  /**
   * Get popular products
   */
  getPopularProducts(): Producto[] {
    return this.products.filter(product => product.isPopular === true);
  }

  /**
   * Get promotional products
   */
  getPromotionalProducts(): Producto[] {
    return this.products.filter(product => product.isPromotion === true);
  }

  /**
   * Get available products
   */
  getAvailableProducts(): Producto[] {
    return this.products.filter(product => product.availability === true);
  }

  /**
   * Get product by ID
   */
  getProductById(id: number): Producto | undefined {
    return this.products.find(product => product.id === id);
  }

  /**
   * Search products by term
   */
  searchProducts(searchTerm: string): Producto[] {
    const term = searchTerm.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  }

  /**
   * Filter products by price range
   */
  getProductsByPriceRange(minPrice: number, maxPrice: number): Producto[] {
    return this.products.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
  }

  /**
   * Get products count by category
   */
  getProductsCountByCategory(): Record<CategoriaProducto, number> {
    const categories: CategoriaProducto[] = [
      'promociones', 'encebollados', 'ceviches', 'bollos', 
      'cazuelas', 'congelados', 'acompañamientos', 'bebidas'
    ];
    
    return categories.reduce((acc, category) => {
      acc[category] = this.getProductsByCategory(category).length;
      return acc;
    }, {} as Record<CategoriaProducto, number>);
  }

  /**
   * Get price statistics
   */
  getPriceStatistics() {
    const prices = this.products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      average: prices.reduce((sum, price) => sum + price, 0) / prices.length
    };
  }

  /**
   * Format price to currency string
   */
  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  /**
   * Get product statistics
   */
  getProductStatistics() {
    return {
      total: this.products.length,
      popular: this.getPopularProducts().length,
      promotional: this.getPromotionalProducts().length,
      available: this.getAvailableProducts().length,
      byCategory: this.getProductsCountByCategory(),
      priceStats: this.getPriceStatistics()
    };
  }
}