import { createRouter, createWebHashHistory } from 'vue-router'
import SetupPoll from '../views/SetupPoll.vue'

const routes = [
  {
    path: '/',
    name: 'SetupPoll',
    component: SetupPoll
  },
  {
    path: '/Vote',
    name: 'Vote',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Vote.vue')
  },
  {
    path: '/Results',
    name: 'Results',
    component: () => import('../views/Results.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
