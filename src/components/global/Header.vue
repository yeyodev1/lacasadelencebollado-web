<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Estado reactivo para animaciones
const isVisible = ref(false)

// Animación de entrada
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
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
      <nav class="navigation">
        <router-link to="/" class="nav-link" active-class="active">Inicio</router-link>
        <a href="#productos" class="nav-link">Productos</a>
        <a href="#contacto" class="nav-link">Contacto</a>
      </nav>
    </div>
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
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .header {
    .header-container {
      padding: 0 1rem;
      flex-direction: column;
      gap: 1rem;
    }

    .navigation {
      gap: 1rem;
    }
  }
}
</style>