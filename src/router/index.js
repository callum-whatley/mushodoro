import { createRouter, createWebHashHistory } from 'vue-router'
import Form from '../components/Form.vue'
import Timer from '../components/Timer.vue'

const routes = [
  {
    path: '/',
    component: Form
  },
  {
    path: '/timer',
    component: Timer
  },
  {
    path: '/^*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
