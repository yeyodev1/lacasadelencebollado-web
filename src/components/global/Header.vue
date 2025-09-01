<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const route = useRoute()
const cartStore = useCartStore()
const isMobileMenuOpen = ref(false)

const totalItems = computed(() => cartStore.totalItems)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <RouterLink to="/" class="logo-link" @click="closeMobileMenu">
          <img 
            src="/src/assets/logos/logo-casenc.jpg" 
            alt="La Casa del Encebollado" 
            class="logo"
          >
        </RouterLink>

        <!-- Navegación Desktop -->
        <nav class="desktop-nav">
          <RouterLink 
            to="/" 
            class="nav-link"
            :class="{ active: route.name === 'home' }"
          >
            Inicio
          </RouterLink>
          <RouterLink 
            to="/productos" 
            class="nav-link"
            :class="{ active: route.name === 'productos' }"
          >
            Productos
          </RouterLink>
        </nav>

        <!-- Carrito y Menú Mobile -->
        <div class="header-actions">
          <!-- Carrito -->
          <RouterLink to="/carrito" class="cart-link">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="totalItems > 0" class="cart-badge">{{ totalItems }}</span>
          </RouterLink>

          <!-- Botón Menú Mobile -->
          <button 
            class="mobile-menu-btn"
            @click="toggleMobileMenu"
            :class="{ active: isMobileMenuOpen }"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Overlay Mobile -->
    <div 
      v-if="isMobileMenuOpen" 
      class="mobile-overlay"
      @click="closeMobileMenu"
    ></div>

    <!-- Navegación Mobile -->
    <nav 
      class="mobile-nav"
      :class="{ open: isMobileMenuOpen }"
    >
      <RouterLink 
        to="/" 
        class="mobile-nav-link"
        :class="{ active: route.name === 'home' }"
        @click="closeMobileMenu"
      >
        <i class="fas fa-home"></i>
        Inicio
      </RouterLink>
      <RouterLink 
        to="/productos" 
        class="mobile-nav-link"
        :class="{ active: route.name === 'productos' }"
        @click="closeMobileMenu"
      >
        <i class="fas fa-utensils"></i>
        Productos
      </RouterLink>
      <RouterLink 
        to="/carrito" 
        class="mobile-nav-link"
        :class="{ active: route.name === 'carrito' }"
        @click="closeMobileMenu"
      >
        <i class="fas fa-shopping-cart"></i>
        Mi Carrito
        <span v-if="totalItems > 0" class="mobile-cart-badge">{{ totalItems }}</span>
      </RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background-color: $white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 3px solid $ENCEBOLLADO-PRIMARY;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  min-height: 70px;
}

// Logo
.logo-link {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}

.logo {
  height: 50px;
  width: auto;
  border-radius: 8px;
  object-fit: contain;

  @media (max-width: 768px) {
    height: 40px;
  }
}

// Navegación Desktop
.desktop-nav {
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
}

.nav-link {
  font-weight: 500;
  color: $text-dark;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: $ENCEBOLLADO-PRIMARY;
    background-color: $blue-overlay;
  }

  &.active {
    color: $ENCEBOLLADO-PRIMARY;
    background-color: $blue-overlay;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 3px;
      background-color: $ENCEBOLLADO-PRIMARY;
      border-radius: 2px;
    }
  }
}

// Acciones del Header
.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

// Carrito
.cart-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background-color: $ENCEBOLLADO-PRIMARY;
  color: $white;
  border-radius: 50%;
  transition: all 0.3s ease;
  font-size: 1.2rem;

  &:hover {
    background-color: $blue-hover;
    transform: scale(1.1);
  }
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: $error;
  color: $white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
  line-height: 1;
}

// Botón Menú Mobile
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 100%;
    height: 3px;
    background-color: $text-dark;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  &.active {
    span:nth-child(1) {
      transform: rotate(45deg) translate(7px, 7px);
    }

    span:nth-child(2) {
      opacity: 0;
    }

    span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -7px);
    }
  }
}

// Overlay Mobile
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
}

// Navegación Mobile
.mobile-nav {
  position: fixed;
  top: 0;
  right: -100%;
  width: 85vw;
  max-width: 300px;
  height: 100vh;
  background-color: $white;
  z-index: 1000;
  transition: right 0.3s ease;
  padding: 2rem 1.5rem;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &.open {
    right: 0;
  }
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: $text-dark;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;

  i {
    font-size: 1.2rem;
    width: 24px;
    text-align: center;
    color: $ENCEBOLLADO-PRIMARY;
  }

  &:hover {
    background-color: $blue-overlay;
    color: $ENCEBOLLADO-PRIMARY;
  }

  &.active {
    background-color: $ENCEBOLLADO-PRIMARY;
    color: $white;

    i {
      color: $white;
    }
  }
}

.mobile-cart-badge {
  margin-left: auto;
  background-color: $error;
  color: $white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}

// Responsive adjustments
@media (max-width: 480px) {
  .header-content {
    padding: 0.75rem 0;
  }

  .logo {
    height: 35px;
  }

  .cart-link {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }

  .mobile-nav {
    width: 90vw;
    padding: 1.5rem 1rem;
  }
}
</style>