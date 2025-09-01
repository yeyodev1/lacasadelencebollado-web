<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import type { Producto } from '../../types/menu';

interface ToastProps {
  show: boolean;
  product?: Producto;
  message?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  product: {
    type: Object as () => Producto,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
  type: {
    type: String as () => 'success' | 'error' | 'warning' | 'info',
    default: 'success',
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

const emit = defineEmits<{
  close: [];
}>();

const router = useRouter();

const isVisible = ref(false);
const isAnimating = ref(false);

// Computed message based on product or custom message
const displayMessage = computed(() => {
  if (props.message) {
    return props.message;
  }
  if (props.product) {
    return `${props.product.name} agregado al carrito`;
  }
  return 'Producto agregado al carrito';
});

// Icon based on type
const getIcon = () => {
  switch (props.type) {
    case 'success':
      return 'fas fa-check-circle';
    case 'error':
      return 'fas fa-times-circle';
    case 'warning':
      return 'fas fa-exclamation-triangle';
    case 'info':
      return 'fas fa-info-circle';
    default:
      return 'fas fa-check-circle';
  }
};

// Auto close functionality
let autoCloseTimer: number | null = null;

const startAutoClose = () => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
  }
  autoCloseTimer = setTimeout(() => {
    closeToast();
  }, props.duration);
};

const closeToast = () => {
  isAnimating.value = true;
  setTimeout(() => {
    isVisible.value = false;
    isAnimating.value = false;
    emit('close');
  }, 300); // Animation duration
};

const goToCart = () => {
  closeToast();
  router.push('/carrito');
};

// Watch for show prop changes
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      isVisible.value = true;
      startAutoClose();
    } else {
      closeToast();
    }
  },
  { immediate: true }
);

// Pause auto-close on hover
const pauseAutoClose = () => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
  }
};

const resumeAutoClose = () => {
  if (isVisible.value) {
    startAutoClose();
  }
};

// Cleanup on unmount
onUnmounted(() => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition
      name="toast"
      enter-active-class="toast-enter-active"
      leave-active-class="toast-leave-active"
      enter-from-class="toast-enter-from"
      leave-to-class="toast-leave-to"
    >
      <div
        v-if="isVisible && !isAnimating"
        class="toast-notification"
        :class="[
          `toast-${type}`,
          { 'toast-with-product': product }
        ]"
        @mouseenter="pauseAutoClose"
        @mouseleave="resumeAutoClose"
      >
        <div class="toast-content">
          <!-- Product Image (if product provided) -->
          <div v-if="product" class="toast-image">
            <img 
              :src="product.image" 
              :alt="product.name"
              loading="lazy"
            >
          </div>
          
          <!-- Icon -->
          <div class="toast-icon">
            <i :class="getIcon()"></i>
          </div>
          
          <!-- Message Content -->
          <div class="toast-message">
            <p class="toast-text">{{ displayMessage }}</p>
            <p v-if="product" class="toast-price">
              {{ `$${product.price.toFixed(2)}` }}
            </p>
            
            <!-- Action Buttons -->
            <div v-if="product && type === 'success'" class="toast-actions">
              <button 
                class="toast-cart-btn"
                @click="goToCart"
                aria-label="Ir al carrito"
              >
                <i class="fas fa-shopping-cart"></i>
                Ir al Carrito
              </button>
            </div>
          </div>
          
          <!-- Close Button -->
          <button 
            class="toast-close"
            @click="closeToast"
            aria-label="Cerrar notificación"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <!-- Progress Bar -->
        <div class="toast-progress">
          <div 
            class="toast-progress-bar"
            :style="{ animationDuration: `${duration}ms` }"
          ></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '../../styles/colorVariables.module.scss' as *;
.toast-notification {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
  min-width: 340px;
  max-width: 420px;
  background: linear-gradient(135deg, $white 0%, rgba($white, 0.98) 100%);
  border-radius: 16px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.08),
    0 8px 16px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba($ENCEBOLLADO-PRIMARY, 0.08);
  overflow: hidden;
  border: 1px solid rgba($border-light, 0.6);
  backdrop-filter: blur(20px);
  transform-origin: top right;
  
  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    min-width: auto;
    max-width: none;
    transform-origin: top center;
  }
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  position: relative;
}

.toast-image {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba($ENCEBOLLADO-PRIMARY, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
}

.toast-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, rgba($ENCEBOLLADO-PRIMARY, 0.1), rgba($ENCEBOLLADO-PRIMARY, 0.05));
  border-radius: 50%;
  animation: toast-icon-pulse 2s ease-in-out infinite;
  
  i {
    font-size: 1.2rem;
    color: $ENCEBOLLADO-PRIMARY;
  }
}

.toast-message {
  flex: 1;
  min-width: 0;
}

.toast-text {
  font-size: 1rem;
  font-weight: 600;
  color: $text-dark;
  margin: 0;
  line-height: 1.5;
  word-wrap: break-word;
  letter-spacing: 0.01em;
}

.toast-price {
  font-size: 0.9rem;
  color: $ENCEBOLLADO-PRIMARY;
  font-weight: 700;
  margin: 0.4rem 0 0.6rem 0;
  padding: 0.2rem 0.6rem;
  background: linear-gradient(135deg, rgba($ENCEBOLLADO-PRIMARY, 0.1), rgba($ENCEBOLLADO-PRIMARY, 0.05));
  border-radius: 8px;
  display: inline-block;
}

.toast-actions {
  margin-top: 0.75rem;
}

.toast-cart-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, $ENCEBOLLADO-PRIMARY, $blue-light);
  color: $white;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba($ENCEBOLLADO-PRIMARY, 0.2);
  
  i {
    font-size: 0.8rem;
  }
  
  &:hover {
    background: linear-gradient(135deg, $blue-hover, $ENCEBOLLADO-PRIMARY);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba($ENCEBOLLADO-PRIMARY, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.toast-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: $text-light;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  i {
    font-size: 1rem;
  }
  
  &:hover {
    background: $gray-100;
    color: $text-dark;
  }
}

.toast-progress {
  height: 3px;
  background: $gray-100;
  position: relative;
  overflow: hidden;
}

.toast-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, $ENCEBOLLADO-PRIMARY, $blue-light);
  width: 100%;
  transform-origin: left;
  animation: toast-progress linear forwards;
}

// Toast Type Variants
.toast-success {
  border-left: 4px solid $success;
  
  .toast-progress-bar {
    background: linear-gradient(90deg, $success, #4ade80);
  }
}

.toast-error {
  border-left: 4px solid $error;
  
  .toast-progress-bar {
    background: linear-gradient(90deg, $error, #f87171);
  }
}

.toast-warning {
  border-left: 4px solid $warning;
  
  .toast-progress-bar {
    background: linear-gradient(90deg, $warning, #fbbf24);
  }
}

.toast-info {
  border-left: 4px solid $blue-light;
  
  .toast-progress-bar {
    background: linear-gradient(90deg, $blue-light, #60a5fa);
  }
}

// Animations
.toast-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 1, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(120%) translateY(-20px) scale(0.8) rotate(5deg);
  filter: blur(4px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(120%) translateY(-10px) scale(0.9);
  filter: blur(2px);
}

@keyframes toast-progress {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

@keyframes toast-icon-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba($ENCEBOLLADO-PRIMARY, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 8px rgba($ENCEBOLLADO-PRIMARY, 0);
  }
}

// Enhanced animations for better UX
.toast-notification {
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    
    .toast-progress-bar {
      animation-play-state: paused;
    }
  }
}

// Responsive adjustments
@media (max-width: 480px) {
  .toast-content {
    padding: 0.75rem;
    gap: 0.5rem;
  }
  
  .toast-image {
    width: 40px;
    height: 40px;
  }
  
  .toast-text {
    font-size: 0.9rem;
  }
  
  .toast-price {
    font-size: 0.8rem;
  }
  
  .toast-cart-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    
    i {
      font-size: 0.75rem;
    }
  }
}
</style>