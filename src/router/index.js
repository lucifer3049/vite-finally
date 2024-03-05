import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '首頁',
    component: () => import('@/views/FrontendView.vue'),
    children: [
      {
        path: 'products',
        name: '產品列表',
        component: () => import('@/views/forward/ProductsView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
