import { createRouter, createWebHistory } from 'vue-router'
import UnderConstruction from '@/views/UnderConstruction.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'under-construction',
      component: UnderConstruction,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
})

export default router
