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
        path:'product/:id',
        name:'產品細節',
        component:()=> import('@/views/forward/ProductView.vue')
      }
    ]
  },
  // 404頁面
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue')
  },
  // 404重新導向
  {
    path: '/newPage/:pathMatch(.*)*',
    redirect: {
      name: '首頁'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
