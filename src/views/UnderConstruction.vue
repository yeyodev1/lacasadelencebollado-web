<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Estado reactivo para animaciones
const isVisible = ref(false)
const currentYear = new Date().getFullYear()

// Animación de entrada
onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="under-construction">
    <div class="container" :class="{ 'fade-in': isVisible }">
      <!-- Logo principal -->
      <div class="logo-wrapper">
        <div class="logo-container">
          <img src="@/assets/logos/logo-casenc.jpg" alt="La Casa del Encebollado" class="logo" />
        </div>
      </div>

      <!-- Contenido principal -->
      <div class="content">
        <h1 class="title">La Casa del Encebollado</h1>
        <h2 class="subtitle">El verdadero sabor Guayaco</h2>
        <p class="description">
          Descubre la auténtica tradición culinaria de Guayaquil en cada plato.
          Sabores únicos que despiertan tus sentidos y te transportan al corazón de la costa ecuatoriana.
        </p>
        
        <!-- Galería de productos -->
        <div class="products-gallery">
          <div class="product-item">
            <img src="@/assets/stock/encebollado.png" alt="Encebollado" class="product-image" />
            <h3 class="product-name">Encebollado</h3>
          </div>
          <div class="product-item">
            <img src="@/assets/stock/bollo.png" alt="Bollo" class="product-image" />
            <h3 class="product-name">Bollo</h3>
          </div>
          <div class="product-item">
            <img src="@/assets/stock/chifle.png" alt="Chifle" class="product-image" />
            <h3 class="product-name">Chifle</h3>
          </div>
        </div>
        
        <!-- Información de contacto -->
        <div class="contact-info">
          <p class="contact-text">Visítanos o contáctanos:</p>
          <div class="contact-methods">
            <a href="https://maps.app.goo.gl/w5AxsfAFWsz4N7yh6" target="_blank" class="contact-link">
               <i class="fas fa-map-marker-alt"></i>
               Nuestra Ubicación
             </a>
            <a href="https://wa.me/593978602847" target="_blank" class="contact-link">
               <i class="fab fa-whatsapp"></i>
               +593 97 860 2847
             </a>
            <a href="mailto:info@lacasadelencebollado.com" class="contact-link">
               <i class="fas fa-envelope"></i>
               info@lacasadelencebollado.com
             </a>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="footer">
        <p>&copy; {{ currentYear }} MATJUFI SAS. Todos los derechos reservados.</p>
      </footer>
    </div>

    <!-- Elementos decorativos -->
    <div class="decoration decoration-1"></div>
    <div class="decoration decoration-2"></div>
    <div class="decoration decoration-3"></div>
  </div>
</template>

<style lang="scss" scoped>
.under-construction {
  min-height: 100vh;
  background: linear-gradient(135deg, $white 0%, $gray-50 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 600px;
  width: 100%;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo-wrapper {
  margin-bottom: 2rem;

  .logo-container {
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba($ENCEBOLLADO-PRIMARY, 0.2);
    animation: pulse 2s infinite;
    border: 3px solid $ENCEBOLLADO-PRIMARY;

    .logo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

.content {
  margin-bottom: 3rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: $text-dark;
  margin-bottom: 0.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
}

.subtitle {
  font-size: 1.5rem;
  font-weight: 500;
  color: $ENCEBOLLADO-PRIMARY;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
}

.description {
  font-size: 1.125rem;
  color: $text-light;
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
}

.products-gallery {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
}

.product-item {
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .product-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba($ENCEBOLLADO-PRIMARY, 0.15);
    transition: all 0.3s ease;
    border: 2px solid $blue-overlay;

    &:hover {
      box-shadow: 0 8px 24px rgba($ENCEBOLLADO-PRIMARY, 0.25);
      border-color: $ENCEBOLLADO-PRIMARY;
    }

    @media (max-width: 768px) {
      width: 70px;
      height: 70px;
    }

    @media (max-width: 480px) {
      width: 60px;
      height: 60px;
    }
  }

  .product-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: $text-dark;
    margin-top: 0.5rem;
    margin-bottom: 0;

    @media (max-width: 480px) {
      font-size: 0.75rem;
    }
  }
}

.contact-info {
  .contact-text {
    font-size: 1rem;
    color: $text-dark;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .contact-methods {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: center;
      gap: 1.5rem;
    }

    @media (max-width: 767px) {
      gap: 0.5rem;
    }
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: $ENCEBOLLADO-PRIMARY;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;

    i {
      font-size: 20px;
    }

    &:hover {
      background-color: $blue-overlay;
      color: $blue-hover;
      transform: translateY(-2px);
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
}

.footer {
  p {
    font-size: 0.875rem;
    color: $gray-600;
    margin: 0;
  }
}

// Elementos decorativos
.decoration {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, $blue-overlay, transparent);
  pointer-events: none;

  &.decoration-1 {
    width: 200px;
    height: 200px;
    top: 10%;
    left: -5%;
    animation: float 6s ease-in-out infinite;
  }

  &.decoration-2 {
    width: 150px;
    height: 150px;
    bottom: 15%;
    right: -3%;
    animation: float 8s ease-in-out infinite reverse;
  }

  &.decoration-3 {
    width: 100px;
    height: 100px;
    top: 60%;
    left: 5%;
    animation: float 10s ease-in-out infinite;
  }
}

// Animaciones
@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

// Responsive design
@media (max-width: 768px) {
  .under-construction {
    padding: 1.5rem;
  }

  .decoration {
    opacity: 0.3;

    &.decoration-1 {
      width: 120px;
      height: 120px;
    }

    &.decoration-2 {
      width: 100px;
      height: 100px;
    }

    &.decoration-3 {
      display: none;
    }
  }
}

@media (max-width: 480px) {
  .under-construction {
    padding: 1rem;
  }

  .logo-wrapper .logo-container {
    width: 100px;
    height: 100px;
  }
}
</style>