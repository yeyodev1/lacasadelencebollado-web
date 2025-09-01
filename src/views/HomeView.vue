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
  <div class="home-page">
    <!-- Hero Section Premium -->
    <section class="hero" :class="{ 'fade-in': isVisible }">
      <div class="hero-container">
        <div class="hero-content">
          <h2 class="hero-title">El Verdadero Sabor Guayaco</h2>
          <p class="hero-subtitle">Una experiencia culinaria auténtica que despierta tus sentidos</p>
          <p class="hero-description">
            Descubre la tradición gastronómica más exquisita de Guayaquil. Cada plato es una obra maestra 
            elaborada con ingredientes selectos y técnicas ancestrales que han pasado de generación en generación.
          </p>
          <div class="hero-cta">
            <a href="https://wa.me/593978602847" target="_blank" class="cta-button primary">
              <i class="fab fa-whatsapp"></i>
              Reservar Mesa
            </a>
            <a href="https://maps.app.goo.gl/w5AxsfAFWsz4N7yh6" target="_blank" class="cta-button secondary">
              <i class="fas fa-map-marker-alt"></i>
              Ubicación
            </a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="featured-dish">
            <img src="@/assets/stock/encebollado.png" alt="Encebollado Signature" class="dish-image" />
            <div class="dish-badge">Especialidad de la Casa</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section Premium -->
    <section class="products" id="productos">
      <div class="products-container">
        <div class="section-header">
          <h3 class="section-title">Nuestra Selección Gourmet</h3>
          <p class="section-subtitle">Sabores auténticos preparados con maestría</p>
        </div>
        <div class="products-grid">
          <div class="product-card">
            <div class="product-image-wrapper">
              <img src="@/assets/stock/encebollado.png" alt="Encebollado Premium" class="product-image" />
              <div class="product-overlay">
                <span class="product-price">Desde $8.50</span>
              </div>
            </div>
            <div class="product-info">
              <h4 class="product-name">Encebollado Premium</h4>
              <p class="product-description">Nuestro plato insignia con pescado fresco del día</p>
            </div>
          </div>
          <div class="product-card">
            <div class="product-image-wrapper">
              <img src="@/assets/stock/bollo.png" alt="Bollo Artesanal" class="product-image" />
              <div class="product-overlay">
                <span class="product-price">Desde $3.50</span>
              </div>
            </div>
            <div class="product-info">
              <h4 class="product-name">Bollo Artesanal</h4>
              <p class="product-description">Elaborado con técnicas tradicionales</p>
            </div>
          </div>
          <div class="product-card">
            <div class="product-image-wrapper">
              <img src="@/assets/stock/chifle.png" alt="Chifle Gourmet" class="product-image" />
              <div class="product-overlay">
                <span class="product-price">Desde $2.50</span>
              </div>
            </div>
            <div class="product-info">
              <h4 class="product-name">Chifle Gourmet</h4>
              <p class="product-description">Crujiente acompañamiento premium</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Elementos decorativos premium -->
    <div class="decoration decoration-1"></div>
    <div class="decoration decoration-2"></div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, $gray-50 0%, $gray-100 100%);
  position: relative;
  overflow-x: hidden;
}

// Hero Section Premium
.hero {
  padding: 4rem 0;
  background: linear-gradient(135deg, rgba($ENCEBOLLADO-PRIMARY, 0.05) 0%, rgba($blue-light, 0.05) 100%);
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease 0.3s;

  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .hero-content {
    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      color: $blue-dark;
      margin-bottom: 1rem;
      line-height: 1.1;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .hero-subtitle {
      font-size: 1.3rem;
      color: $ENCEBOLLADO-PRIMARY;
      margin-bottom: 1.5rem;
      font-weight: 600;
      font-style: italic;
    }

    .hero-description {
      font-size: 1.1rem;
      line-height: 1.7;
      color: $text-light;
      margin-bottom: 2.5rem;
    }

    .hero-cta {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
  }

  .hero-visual {
    display: flex;
    justify-content: center;
    align-items: center;

    .featured-dish {
      position: relative;
      animation: float 4s ease-in-out infinite;

      .dish-image {
        width: 300px;
        height: 300px;
        object-fit: cover;
        border-radius: 20px;
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
        border: 3px solid white;
      }

      .dish-badge {
        position: absolute;
        top: -10px;
        right: -10px;
        background: $success;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba($success, 0.3);
      }
    }
  }
}

// CTA Buttons Premium
.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

  &.primary {
    background: linear-gradient(135deg, $ENCEBOLLADO-PRIMARY 0%, $blue-dark 100%);
    color: white;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba($ENCEBOLLADO-PRIMARY, 0.4);
    }
  }

  &.secondary {
    background: white;
    color: $ENCEBOLLADO-PRIMARY;
    border: 2px solid $ENCEBOLLADO-PRIMARY;

    &:hover {
      background: $ENCEBOLLADO-PRIMARY;
      color: white;
      transform: translateY(-3px);
    }
  }

  i {
    font-size: 1.2rem;
  }
}

// Products Section Premium
.products {
  padding: 5rem 0;
  background: white;

  .products-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: $blue-dark;
      margin-bottom: 1rem;
    }

    .section-subtitle {
      font-size: 1.2rem;
      color: $gray-600;
      font-style: italic;
    }
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .product-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px solid rgba($ENCEBOLLADO-PRIMARY, 0.1);

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
    }

    .product-image-wrapper {
      position: relative;
      overflow: hidden;
      height: 250px;

      .product-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .product-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
        display: flex;
        align-items: flex-end;
        padding: 1.5rem;
        opacity: 0;
        transition: opacity 0.3s ease;

        .product-price {
          color: white;
          font-size: 1.2rem;
          font-weight: 700;
          background: $success;
          padding: 0.5rem 1rem;
          border-radius: 20px;
        }
      }

      &:hover {
        .product-image {
          transform: scale(1.1);
        }

        .product-overlay {
          opacity: 1;
        }
      }
    }

    .product-info {
      padding: 1.5rem;

      .product-name {
        font-size: 1.3rem;
        font-weight: 700;
        color: $blue-dark;
        margin-bottom: 0.5rem;
      }

      .product-description {
        color: $gray-600;
        line-height: 1.6;
      }
    }
  }
}

// Elementos decorativos premium
.decoration {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba($ENCEBOLLADO-PRIMARY, 0.1) 0%, rgba($blue-light, 0.1) 100%);
  animation: pulse 6s ease-in-out infinite;
  z-index: -1;

  &.decoration-1 {
    width: 400px;
    height: 400px;
    top: 10%;
    right: -10%;
    animation-delay: 0s;
  }

  &.decoration-2 {
    width: 300px;
    height: 300px;
    bottom: 20%;
    left: -8%;
    animation-delay: 3s;
  }
}

// Animaciones
@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(1deg);
  }
  66% {
    transform: translateY(-5px) rotate(-1deg);
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .hero {
    .hero-container {
      grid-template-columns: 1fr;
      gap: 3rem;
      text-align: center;
    }

    .hero-content {
      .hero-title {
        font-size: 2.8rem;
      }
    }
  }

  .products {
    .products-grid {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 0;

    .hero-container {
      padding: 0 1rem;
    }

    .hero-content {
      .hero-title {
        font-size: 2.2rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }

      .hero-cta {
        justify-content: center;
      }
    }

    .hero-visual {
      .featured-dish {
        .dish-image {
          width: 250px;
          height: 250px;
        }
      }
    }
  }

  .products {
    padding: 3rem 0;

    .products-container {
      padding: 0 1rem;
    }

    .section-header {
      .section-title {
        font-size: 2rem;
      }
    }

    .products-grid {
      grid-template-columns: 1fr;
    }
  }

  .cta-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero {
    .hero-content {
      .hero-title {
        font-size: 1.8rem;
      }

      .hero-cta {
        flex-direction: column;
        align-items: center;
      }
    }

    .hero-visual {
      .featured-dish {
        .dish-image {
          width: 200px;
          height: 200px;
        }
      }
    }
  }

  .cta-button {
    width: 100%;
    justify-content: center;
  }
}
</style>