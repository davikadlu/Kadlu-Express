import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PagePost from '../views/PagePost.vue'

const routes = [
  {
    path: '/homeview',
    name: "my Home View",
    component: HomeView
  },
  {
    path: '/pagepost',
    name: 'Page Post',
    component: PagePost
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
