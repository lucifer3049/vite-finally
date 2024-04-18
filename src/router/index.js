import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '首頁',
    component: () => import('@/views/FrontendView.vue'),
    children: [
      {
        path: '',
        name: '產品列表',
        component: () => import('@/views/forward/ProductsView.vue')
      },
      {
        path: 'product/:id',
        name: '產品細節',
        component: () => import('@/views/forward/ProductView.vue')
      },
      {
        path: 'cart',
        name: '購物車',
        component: () => import('@/views/forward/CartView.vue')
      },
      {
        path: 'order',
        name: '訂單查詢',
        component: () => import('@/views/forward/OrdersView.vue'),
      },
      {
        path: 'checkout/:orderId',
        name: '確認付款',
        component: () => import('@/views/forward/CheckoutView.vue')
      },
      // 404重新導向
      {
        path: '/newPage/:pathMatch(.*)*',
        redirect: {
          name: '首頁'
        }
      }
    ]
  },
  // 404頁面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
