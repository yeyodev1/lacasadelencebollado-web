import type { Promocion } from '../types/menu';
import { promociones } from '../data/promociones';

/**
 * Service class for managing promotions
 * Handles all promotion-related operations and business logic
 */
export class PromotionService {
  private promotions: Promocion[] = promociones;

  /**
   * Get all promotions
   */
  getAllPromotions(): Promocion[] {
    return this.promotions;
  }

  /**
   * Get active promotions
   */
  getActivePromotions(): Promocion[] {
    return this.promotions.filter(promotion => promotion.isActive);
  }

  /**
   * Get popular promotions
   */
  getPopularPromotions(): Promocion[] {
    return this.promotions.filter(promotion => promotion.isPopular);
  }

  /**
   * Get promotion by ID
   */
  getPromotionById(id: number): Promocion | undefined {
    return this.promotions.find(promotion => promotion.id === id);
  }

  /**
   * Get valid promotions (active and not expired)
   */
  getValidPromotions(): Promocion[] {
    const now = new Date();
    return this.promotions.filter(promotion => 
      promotion.isActive && promotion.validUntil > now
    );
  }

  /**
   * Check if promotion is valid
   */
  isPromotionValid(promotion: Promocion): boolean {
    const now = new Date();
    return promotion.isActive && promotion.validUntil > now;
  }

  /**
   * Calculate savings for a promotion
   */
  calculateSavings(promotion: Promocion): number {
    return promotion.originalPrice - promotion.price;
  }

  /**
   * Calculate savings percentage
   */
  calculateSavingsPercentage(promotion: Promocion): number {
    return ((promotion.originalPrice - promotion.price) / promotion.originalPrice) * 100;
  }

  /**
   * Get promotions by minimum discount
   */
  getPromotionsByMinDiscount(minDiscount: number): Promocion[] {
    return this.promotions.filter(promotion => promotion.discount >= minDiscount);
  }

  /**
   * Get promotions by price range
   */
  getPromotionsByPriceRange(minPrice: number, maxPrice: number): Promocion[] {
    return this.promotions.filter(promotion => 
      promotion.price >= minPrice && promotion.price <= maxPrice
    );
  }

  /**
   * Search promotions by name or description
   */
  searchPromotions(searchTerm: string): Promocion[] {
    const term = searchTerm.toLowerCase();
    return this.promotions.filter(promotion => 
      promotion.name.toLowerCase().includes(term) ||
      promotion.description.toLowerCase().includes(term)
    );
  }

  /**
   * Get best value promotions (highest savings)
   */
  getBestValuePromotions(limit: number = 3): Promocion[] {
    return this.promotions
      .map(promotion => ({
        ...promotion,
        savings: this.calculateSavings(promotion)
      }))
      .sort((a, b) => b.savings - a.savings)
      .slice(0, limit)
      .map(({ savings, ...promotion }) => promotion);
  }

  /**
   * Get promotions expiring soon
   */
  getPromotionsExpiringSoon(daysThreshold: number = 7): Promocion[] {
    const now = new Date();
    const threshold = new Date(now.getTime() + (daysThreshold * 24 * 60 * 60 * 1000));
    
    return this.promotions.filter(promotion => 
      promotion.isActive && 
      promotion.validUntil > now && 
      promotion.validUntil <= threshold
    );
  }

  /**
   * Get promotion statistics
   */
  getPromotionStatistics() {
    const validPromotions = this.getValidPromotions();
    const totalSavings = this.promotions.reduce((sum, promo) => 
      sum + this.calculateSavings(promo), 0
    );
    const averageDiscount = this.promotions.reduce((sum, promo) => 
      sum + promo.discount, 0
    ) / this.promotions.length;
    
    return {
      total: this.promotions.length,
      active: this.getActivePromotions().length,
      valid: validPromotions.length,
      popular: this.getPopularPromotions().length,
      expiringSoon: this.getPromotionsExpiringSoon().length,
      totalSavings,
      averageDiscount,
      averagePrice: this.promotions.reduce((sum, promo) => sum + promo.price, 0) / this.promotions.length
    };
  }

  /**
   * Format promotion price
   */
  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  /**
   * Get promotion summary for display
   */
  getPromotionSummary(promotion: Promocion) {
    return {
      id: promotion.id,
      name: promotion.name,
      description: promotion.description,
      price: this.formatPrice(promotion.price),
      originalPrice: this.formatPrice(promotion.originalPrice),
      savings: this.formatPrice(this.calculateSavings(promotion)),
      savingsPercentage: Math.round(this.calculateSavingsPercentage(promotion)),
      isValid: this.isPromotionValid(promotion),
      isPopular: promotion.isPopular,
      itemsCount: promotion.items.length
    };
  }
}