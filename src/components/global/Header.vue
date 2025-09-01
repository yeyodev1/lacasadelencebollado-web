<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuStore } from '../../stores/menuStore'
import { useCartStore } from '../../stores/cartStore'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()
const cartStore = useCartStore()

// Estado reactivo para animaciones y UI
const isVisible = ref(false)
const isMobileMenuOpen = ref(false)
const isSearchOpen = ref(false)
const searchQuery = ref('')

// Computed properties
const isProductsPage = computed(() => route.name === 'products')

// Animación de entrada
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    setTimeout(() => {
      const searchInput = document.querySelector('.search-input') as HTMLInputElement
      searchInput?.focus()
    }, 300)
  } else {
    searchQuery.value = ''
    menuStore.setSearchTerm('')
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    menuStore.setSearchTerm(searchQuery.value.trim())
    if (!isProductsPage.value) {
      window.location.href = '/productos'
    }
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  menuStore.setSearchTerm('')
}

const goToCart = () => {
  router.push('/carrito')
}
</script>

<template>
  <header class="header" :class="{ 'fade-in': isVisible }">
    <div class="header-container">
      <div class="logo-section">
        <img src="@/assets/logos/logo-casenc.jpg" alt="La Casa del Encebollado" class="header-logo" />
        <div class="brand-text">
          <h1 class="brand-name">La Casa del Encebollado</h1>
          <p class="brand-tagline">Tradición Culinaria Guayaca</p>
        </div>
      </div>
      <div class="header-actions">
        <!-- Search Toggle -->
        <button 
          class="action-btn search-toggle"
          @click="toggleSearch"
          :class="{ active: isSearchOpen }"
          title="Buscar productos"
        >
          <i class="fas fa-search"></i>
        </button>
        
        <!-- Cart Button -->
        <button 
          class="action-btn cart-btn"
          @click="goToCart"
          title="Ver carrito"
        >
          <i class="fas fa-shopping-cart"></i>
          <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
        </button>
        
        <!-- Desktop Navigation -->
        <nav class="navigation desktop-nav">
          <router-link to="/" class="nav-link" active-class="active">Inicio</router-link>
          <router-link to="/productos" class="nav-link" active-class="active">Productos</router-link>
          <a href="https://wa.me/593978602847" target="_blank" class="nav-link contact-link">
            <i class="fab fa-whatsapp"></i> Contacto
          </a>
        </nav>
        
        <!-- Mobile Menu Toggle -->
        <button 
          class="mobile-menu-toggle"
          @click="toggleMobileMenu"
          :class="{ active: isMobileMenuOpen }"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>
    
    <!-- Search Bar -->
    <div class="search-bar" :class="{ visible: isSearchOpen }">
      <div class="search-container">
        <div class="search-input-wrapper">
          <span class="search-icon"><i class="fas fa-search"></i></span>
          <input 
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Buscar productos, categorías..."
            @keyup.enter="handleSearch"
          >
          <button 
            v-if="searchQuery"
            class="clear-search"
            @click="clearSearch"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <button class="search-btn" @click="handleSearch">
          Buscar
        </button>
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    <div class="mobile-nav" :class="{ visible: isMobileMenuOpen }">
      <div class="mobile-nav-content">
        <div class="mobile-nav-header">
          <h3>Navegación</h3>
          <button class="close-mobile-nav" @click="closeMobileMenu">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="mobile-nav-links">
          <router-link 
            to="/" 
            class="mobile-nav-link" 
            active-class="active"
            @click="closeMobileMenu"
          >
            <i class="fas fa-home"></i> Inicio
          </router-link>
          <router-link 
            to="/productos" 
            class="mobile-nav-link" 
            active-class="active"
            @click="closeMobileMenu"
          >
            <i class="fas fa-utensils"></i> Productos
          </router-link>
          <router-link 
            to="/carrito" 
            class="mobile-nav-link" 
            active-class="active"
            @click="closeMobileMenu"
          >
            <i class="fas fa-shopping-cart"></i> 
            Mi Carrito
            <span v-if="cartStore.totalItems > 0" class="mobile-cart-badge">{{ cartStore.totalItems }}</span>
          </router-link>
          <a 
            href="https://wa.me/593978602847" 
            target="_blank"
            class="mobile-nav-link"
            @click="closeMobileMenu"
          >
            <i class="fab fa-whatsapp"></i> Contacto WhatsApp
          </a>
        </div>
      </div>
    </div>
    
    <!-- Mobile Overlay -->
    <div 
      class="mobile-overlay"
      :class="{ visible: isMobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba($ENCEBOLLADO-PRIMARY, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 0;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.8s ease;

  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 1rem;

    .header-logo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid $ENCEBOLLADO-PRIMARY;
      box-shadow: 0 4px 15px rgba($ENCEBOLLADO-PRIMARY, 0.2);
    }

    .brand-text {
      .brand-name {
        font-size: 1.5rem;
        font-weight: 700;
        color: $blue-dark;
        margin: 0;
        line-height: 1.2;
      }

      .brand-tagline {
        font-size: 0.9rem;
        color: $ENCEBOLLADO-PRIMARY;
        margin: 0;
        font-style: italic;
        font-weight: 500;
      }
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;

    .action-btn {
      background: none;
      border: none;
      font-size: 1.2rem;
      padding: 0.5rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      color: $text-light;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      min-height: 40px;

      i {
        font-size: 1.1rem;
      }

      &:hover, &.active {
        background: rgba($ENCEBOLLADO-PRIMARY, 0.1);
        color: $ENCEBOLLADO-PRIMARY;
      }
    }

    .cart-btn {
      position: relative;

      .cart-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: $ENCEBOLLADO-PRIMARY;
        color: white;
        font-size: 0.7rem;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 10px;
        min-width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        box-shadow: 0 2px 4px rgba($ENCEBOLLADO-PRIMARY, 0.3);
      }
    }

    .mobile-menu-toggle {
      display: none;
      flex-direction: column;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      gap: 3px;

      .hamburger-line {
        width: 20px;
        height: 2px;
        background: $text-light;
        transition: all 0.3s ease;
        border-radius: 1px;
      }

      &.active {
        .hamburger-line {
          &:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
          }
          &:nth-child(2) {
            opacity: 0;
          }
          &:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
          }
        }
      }
    }
  }

  .navigation {
    display: flex;
    gap: 2rem;

    .nav-link {
      text-decoration: none;
      color: $text-light;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      position: relative;

      &:hover, &.active {
        color: $ENCEBOLLADO-PRIMARY;
        background: rgba($ENCEBOLLADO-PRIMARY, 0.1);
      }

      &.contact-link {
        background: linear-gradient(135deg, $ENCEBOLLADO-PRIMARY, $ENCEBOLLADO-SECONDARY);
        color: white;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        i {
          font-size: 1rem;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba($ENCEBOLLADO-PRIMARY, 0.3);
        }
      }
    }
  }

  // Search Bar
  .search-bar {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-bottom: 1px solid rgba($ENCEBOLLADO-PRIMARY, 0.1);
    padding: 1rem 0;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    &.visible {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .search-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      gap: 1rem;
      align-items: center;

      .search-input-wrapper {
        flex: 1;
        position: relative;
        display: flex;
        align-items: center;
        background: $background-light;
        border: 2px solid transparent;
        border-radius: 12px;
        transition: all 0.3s ease;

        &:focus-within {
          border-color: $ENCEBOLLADO-PRIMARY;
          box-shadow: 0 0 0 3px rgba($ENCEBOLLADO-PRIMARY, 0.1);
        }

        .search-icon {
          padding: 0 1rem;
          color: $text-light;
          display: flex;
          align-items: center;
          
          i {
            font-size: 1rem;
          }
        }

        .search-input {
          flex: 1;
          border: none;
          background: none;
          padding: 0.75rem 0;
          font-size: 1rem;
          color: $text-dark;
          outline: none;

          &::placeholder {
            color: $text-light;
          }
        }

        .clear-search {
          background: none;
          border: none;
          padding: 0 1rem;
          color: $text-light;
          cursor: pointer;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 40px;

          i {
            font-size: 0.9rem;
          }

          &:hover {
            color: $ENCEBOLLADO-PRIMARY;
          }
        }
      }

      .search-btn {
        background: linear-gradient(135deg, $ENCEBOLLADO-PRIMARY, $ENCEBOLLADO-SECONDARY);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba($ENCEBOLLADO-PRIMARY, 0.3);
        }
      }
    }
  }

  // Mobile Navigation
  .mobile-nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: white;
    z-index: 1001;
    transition: right 0.3s ease;
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);

    &.visible {
      right: 0;
    }

    .mobile-nav-content {
      padding: 2rem;
      height: 100%;
      display: flex;
      flex-direction: column;

      .mobile-nav-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid $border-light;

        h3 {
          margin: 0;
          color: $text-dark;
          font-size: 1.25rem;
        }

        .close-mobile-nav {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: $text-light;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 40px;
          min-height: 40px;

          i {
            font-size: 1.2rem;
          }

          &:hover {
            background: rgba($ENCEBOLLADO-PRIMARY, 0.1);
            color: $ENCEBOLLADO-PRIMARY;
          }
        }
      }

      .mobile-nav-links {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .mobile-nav-link {
          text-decoration: none;
          color: $text-dark;
          padding: 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          position: relative;

          i {
            font-size: 1.1rem;
            width: 20px;
            text-align: center;
          }

          .mobile-cart-badge {
            background: $ENCEBOLLADO-PRIMARY;
            color: white;
            font-size: 0.7rem;
            font-weight: 700;
            padding: 2px 6px;
            border-radius: 10px;
            min-width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
            margin-left: auto;
          }

          &:hover, &.active {
            background: rgba($ENCEBOLLADO-PRIMARY, 0.1);
            color: $ENCEBOLLADO-PRIMARY;
          }
        }
      }
    }
  }

  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;

    &.visible {
      opacity: 1;
      visibility: visible;
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .header {
    .header-container {
      padding: 0 1rem;

      .header-actions {
        .desktop-nav {
          display: none;
        }

        .mobile-menu-toggle {
          display: flex;
        }
      }
    }

    .search-bar {
      .search-container {
        padding: 0 1rem;
        flex-direction: column;
        gap: 0.75rem;

        .search-input-wrapper {
          width: 100%;
        }

        .search-btn {
          width: 100%;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .header {
    .header-container {
      .logo-section {
        .brand-text {
          .brand-name {
            font-size: 1.1rem;
          }
        }
      }
    }
  }
}
</style>