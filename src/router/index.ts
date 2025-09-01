import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'

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
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
})

// Configurar títulos de página dinámicos
router.beforeEach((to) => {
  document.title = to.meta?.title as string || 'La Casa del Encebollado'
})

export default router
