import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import Secure from './components/Secure.vue'
import SignUp from './components/SignUp.vue'

const routes = [
  { name: 'login', path: '/login', component: Login },
  { name: 'secure', path: '/', component: Secure },
  { name: 'signup', path: '/signup', component: SignUp },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  let token
  if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem('token')
  }
  if (to.name === 'login' && !token) return true
  if (to.name !== 'login' && to.name !== 'signup' && !token) return '/login'
  if (to.name === 'login' && token) return '/'
  else return true
})
