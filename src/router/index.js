import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArenaView from '../views/ArenaView.vue'
import WalletView from '../views/WalletView.vue'
import RewardsView from '../views/RewardsView.vue'
import BlogView from '../views/BlogView.vue'
import BlogDetail from '../views/BlogDetail.vue'
import DiscoveryDetail from '../views/DiscoveryDetail.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/arena', name: 'arena', component: ArenaView },
  { path: '/wallet', name: 'wallet', component: WalletView },
  { path: '/rewards', name: 'rewards', component: RewardsView },
  { path: '/magazine', name: 'magazine', component: BlogView },
  { path: '/magazine/:slug', name: 'magazine-detail', component: BlogDetail },
  { path: '/discovery/:id', name: 'discovery-detail', component: DiscoveryDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
