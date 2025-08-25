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
      <!-- Logo/Icono principal -->
      <div class="icon-wrapper">
        <div class="construction-icon">
          <i class="fas fa-utensils"></i>
        </div>
      </div>

      <!-- Contenido principal -->
      <div class="content">
        <h1 class="title">La Casa del Encebollado</h1>
        <h2 class="subtitle">Sitio en Construcción</h2>
        <p class="description">
          Estamos trabajando arduamente para traerte la mejor experiencia culinaria.
          Muy pronto podrás disfrutar de nuestros deliciosos encebollados.
        </p>
        
        <!-- Información de contacto -->
        <div class="contact-info">
          <p class="contact-text">Mientras tanto, puedes contactarnos:</p>
          <div class="contact-methods">
            <a href="tel:+593999999999" class="contact-link">
               <i class="fas fa-phone"></i>
               +593 99 999 9999
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

.icon-wrapper {
  margin-bottom: 2rem;

  .construction-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    color: $ENCEBOLLADO-PRIMARY;
    animation: pulse 2s infinite;

    i {
      font-size: 80px;
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

    @media (min-width: 480px) {
      flex-direction: row;
      justify-content: center;
      gap: 2rem;
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

  .icon-wrapper .construction-icon {
    width: 60px;
    height: 60px;
  }
}
</style>