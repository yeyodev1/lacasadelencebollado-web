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
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background: linear-gradient(135deg, $blue-dark 0%, $ENCEBOLLADO-PRIMARY 100%);
  color: white;
  padding: 3rem 0 1rem;

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
  }

  .footer-section {
    .footer-title {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: white;
    }

    .footer-description {
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.8);
    }

    .contact-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .contact-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: white;
        }

        i {
          width: 20px;
          font-size: 1.1rem;
        }
      }
    }

    .schedule {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;

      .hours {
        font-weight: 600;
        color: $success;
        font-size: 1.1rem;
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 1rem;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
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