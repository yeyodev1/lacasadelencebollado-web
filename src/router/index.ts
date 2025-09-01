import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'La Casa del Encebollado - Auténtico Sabor Ecuatoriano'
      }
    },
    {
    path: '/productos',
    name: 'productos',
    component: ProductsView,
    meta: {
      title: 'Productos - La Casa del Encebollado'
    }
  },
  {
    path: '/productos/:id',
    name: 'producto-detalle',
    component: ProductDetailView,
    meta: {
      title: 'Detalle del Producto - La Casa del Encebollado'
    }
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: CartView,
    meta: {
      title: 'Mi Carrito - La Casa del Encebollado'
    }
  },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
})

// Configurar títulos de página dinámicos y scroll al top
router.beforeEach((to) => {
  document.title = to.meta?.title as string || 'La Casa del Encebollado'
})

// Scroll suave al top en cada cambio de ruta
router.afterEach(() => {
  // Usar requestAnimationFrame para asegurar que el DOM esté listo
  requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  })
})

export default router
