<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/global/Header.vue'
import Footer from './components/global/Footer.vue'
</script>

<template>
  <div id="app">
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: $text-light;
  background-color: $gray-50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

// Utilidades globales
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
}

.text-center {
  text-align: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// Animaciones globales
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Scroll suave
html {
  scroll-behavior: smooth;
}

// Estilos para enlaces
a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: $ENCEBOLLADO-PRIMARY;
  }
}

// Estilos para botones
button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: 2px solid $ENCEBOLLADO-PRIMARY;
    outline-offset: 2px;
  }
}

// Estilos para imágenes
img {
  max-width: 100%;
  height: auto;
  display: block;
}

// Estilos para formularios
input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
  border: 1px solid $gray-300;
  border-radius: 8px;
  padding: 0.75rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: $ENCEBOLLADO-PRIMARY;
    box-shadow: 0 0 0 3px rgba($ENCEBOLLADO-PRIMARY, 0.1);
  }
}
</style>
