import { createRouter, createWebHistory } from 'vue-router'
import LogInPage from '@/pages/LogInPage'
import ChatPage from '@/pages/ChatPage'


const routes = [
  {
    path: '/',
    name: 'logIn',
    component: LogInPage
  },

  {
    path: '/chat',
    name: 'chat',
    component: ChatPage
  },

  {
    path: '/store',
    name: 'store',
    component: () => import('@/pages/HomePageStore')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
