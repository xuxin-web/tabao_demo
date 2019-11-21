import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/home',
    component: Home,
  },
  {
    name: "category",
    path: "/category",
    component: () => import("@/views/Category")
  },
  {
    name: "product",
    path: "/product/:itemId",
    component: () => import("@/views/Product")
  },
  {
    name: "personal",
    path: "/personal",
    component: () => import("@/views/Personal")
  },
  {
    name: "cart",
    path: "/cart",
    component: () => import("@/views/Cart")
  },
  {
    name: "search",
    path: "/search",
    component: () => import("@/views/Search")
  },
  {
    path:"*",
    redirect:"/home"
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
