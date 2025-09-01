<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

interface Props {
  isVisible: boolean;
  productName: string;
  productImage?: string;
}

interface Emits {
  confirm: [];
  cancel: [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const modalRef = ref<HTMLElement | null>(null);

// Handle escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isVisible) {
    emit('cancel');
  }
};

// Handle click outside modal
const handleClickOutside = (event: MouseEvent) => {
  if (modalRef.value && !modalRef.value.contains(event.target as Node)) {
    emit('cancel');
  }
};

// Focus management
const focusFirstButton = () => {
  if (modalRef.value) {
    const firstButton = modalRef.value.querySelector('button');
    firstButton?.focus();
  }
};

// Add/remove event listeners based on modal visibility
watch(() => props.isVisible, async (newValue) => {
  if (newValue) {
    // Wait for next tick to ensure modal is rendered
    await nextTick();
    // Add a small delay to prevent immediate closing from the same click event
    setTimeout(() => {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
    }, 100);
    
    focusFirstButton();
  } else {
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', handleClickOutside);
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
  document.removeEventListener('click', handleClickOutside);
});

// Methods
const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isVisible" class="modal-overlay">
        <div 
          ref="modalRef"
          class="modal-container"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <!-- Modal Header -->
          <div class="modal-header">
            <div class="warning-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3 id="modal-title" class="modal-title">
              ¿Eliminar producto?
            </h3>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <div class="product-preview" v-if="productImage">
              <img 
                :src="productImage" 
                :alt="productName"
                class="product-image"
                loading="lazy"
              >
            </div>
            
            <p id="modal-description" class="modal-description">
              ¿Estás seguro de que deseas eliminar 
              <strong>{{ productName }}</strong> 
              de tu carrito?
            </p>
            
            <p class="modal-warning">
              Esta acción no se puede deshacer.
            </p>
          </div>

          <!-- Modal Actions -->
          <div class="modal-actions">
            <button 
              class="cancel-btn"
              @click="handleCancel"
              type="button"
            >
              <i class="fas fa-times"></i>
              Cancelar
            </button>
            
            <button 
              class="confirm-btn"
              @click="handleConfirm"
              type="button"
            >
              <i class="fas fa-trash"></i>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
// Modal Transitions
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}

// Modal Overlay
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

// Modal Container
.modal-container {
  background: $white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  transform-origin: center;
  border: 1px solid $border-light;
}

// Modal Header
.modal-header {
  padding: 2rem 2rem 1rem;
  text-align: center;
  background: linear-gradient(135deg, $white 0%, $background-light 100%);
  border-bottom: 1px solid $border-light;

  .warning-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1rem;
    background: linear-gradient(135deg, rgba($error, 0.1), rgba($error, 0.2));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: $error;
    border: 3px solid rgba($error, 0.2);
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: $text-dark;
    margin: 0;
    line-height: 1.3;
  }
}

// Modal Body
.modal-body {
  padding: 1.5rem 2rem;
  text-align: center;

  .product-preview {
    margin-bottom: 1.5rem;
    
    .product-image {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid $border-light;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .modal-description {
    font-size: 1.1rem;
    color: $text-dark;
    line-height: 1.5;
    margin: 0 0 1rem;

    strong {
      color: $ENCEBOLLADO-PRIMARY;
      font-weight: 700;
    }
  }

  .modal-warning {
    font-size: 0.9rem;
    color: $text-light;
    margin: 0;
    font-style: italic;
  }
}

// Modal Actions
.modal-actions {
  padding: 1.5rem 2rem 2rem;
  display: flex;
  gap: 1rem;
  background: $background-light;
  border-top: 1px solid $border-light;

  @media (max-width: 480px) {
    flex-direction: column;
  }

  button {
    flex: 1;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 2px solid transparent;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba($ENCEBOLLADO-PRIMARY, 0.3);
    }
  }

  .cancel-btn {
    background: $white;
    color: $text-dark;
    border-color: $border-light;

    &:hover {
      background: $background-light;
      border-color: $gray-300;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .confirm-btn {
    background: linear-gradient(135deg, $error, darken($error, 10%));
    color: $white;
    border-color: $error;

    &:hover {
      background: linear-gradient(135deg, darken($error, 5%), darken($error, 15%));
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba($error, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

// Responsive Design
@media (max-width: 480px) {
  .modal-container {
    margin: 1rem;
    border-radius: 16px;
  }

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;

    .warning-icon {
      width: 60px;
      height: 60px;
      font-size: 2rem;
    }

    .modal-title {
      font-size: 1.3rem;
    }
  }

  .modal-body {
    padding: 1rem 1.5rem;

    .modal-description {
      font-size: 1rem;
    }
  }

  .modal-actions {
    padding: 1rem 1.5rem 1.5rem;

    button {
      padding: 0.875rem 1.25rem;
      font-size: 0.95rem;
    }
  }
}
</style>