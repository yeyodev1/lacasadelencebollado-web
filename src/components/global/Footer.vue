<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer" id="contacto">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h5 class="footer-title">La Casa del Encebollado</h5>
          <p class="footer-description">
            Más de una década sirviendo la auténtica gastronomía guayaca 
            con la calidad y sabor que nos caracteriza.
          </p>
        </div>
        <div class="footer-section">
          <h5 class="footer-title">Contacto</h5>
          <div class="contact-links">
            <a href="https://wa.me/593978602847" target="_blank" class="contact-link">
              <i class="fab fa-whatsapp"></i>
              +593 97 860 2847
            </a>
            <a href="mailto:info@lacasadelencebollado.com" class="contact-link">
              <i class="fas fa-envelope"></i>
              info@lacasadelencebollado.com
            </a>
            <a href="https://www.google.com/maps/search/la+casa+del+encebollado/@-2.1407391,-79.8856817,15z?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="contact-link">
              <i class="fas fa-map-marker-alt"></i>
              Nuestras Ubicaciones
            </a>
          </div>
        </div>
        <div class="footer-section">
          <h5 class="footer-title">Horarios</h5>
          <div class="schedule">
            <p>Lunes - Domingo</p>
            <p class="hours">8:00 AM - 2:30 PM</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} MATJUFI SAS. Todos los derechos reservados.</p>
        <p class="developer-credit">
          Desarrollado con ❤️ por 
          <a href="https://yeyo.dev/" target="_blank" class="developer-link">YeyoDev</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background: linear-gradient(135deg, $gray-900 0%, $gray-800 50%, $blue-dark 100%);
  color: $white;
  padding: 3rem 0 1rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba($ENCEBOLLADO-PRIMARY, 0.1) 0%, rgba($blue-light, 0.05) 100%);
    pointer-events: none;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
  }

  .footer-section {
    .footer-title {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: $white;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .footer-description {
      line-height: 1.6;
      color: $gray-200;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    }

    .contact-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .contact-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: $gray-200;
        text-decoration: none;
        transition: all 0.3s ease;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);

        &:hover {
          color: $white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
          transform: translateX(2px);
        }

        i {
          width: 20px;
          font-size: 1.1rem;
        }
      }
    }

    .schedule {
      color: $gray-200;
      line-height: 1.6;
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);

      .hours {
        font-weight: 600;
        color: $success;
        font-size: 1.1rem;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid $gray-600;
    padding-top: 1rem;
    text-align: center;
    color: $gray-300;
    font-size: 0.9rem;
    position: relative;
    z-index: 1;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);

    .developer-credit {
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: $gray-400;

      .developer-link {
        color: $ENCEBOLLADO-PRIMARY;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

        &:hover {
          color: $white;
          text-shadow: 0 0 8px rgba($ENCEBOLLADO-PRIMARY, 0.6);
        }
      }
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .footer {
    .footer-container {
      padding: 0 1rem;
    }

    .footer-content {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }
}
</style>