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

// SEO: Global Trailing Slash Removal & Canonical Tags
router.beforeEach((to, from, next) => {
  if (to.path !== '/' && to.path.endsWith('/')) {
    const nextPath = to.path.slice(0, -1);
    next({ path: nextPath, query: to.query, hash: to.hash });
  } else {
    next();
  }
});

router.afterEach((to) => {
  // Update Canonical Tag
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  const baseUrl = 'https://nexyorkcasino.vercel.app';
  const path = to.path === '/' ? '' : to.path.replace(/\/$/, '');
  canonical.setAttribute('href', `${baseUrl}${path}`);

  // Update Page Title
  const siteTitle = 'NexYork - Elite Casino & Sports Exchange';
  if (to.meta.title) {
    document.title = `${to.meta.title} | ${siteTitle}`;
  } else if (to.name === 'magazine-detail' && to.params.slug) {
    // Dynamic title for magazine
    const slugParts = to.params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1));
    document.title = `${slugParts.join(' ')} | NexYork Magazine`;
  }
});

export default router
