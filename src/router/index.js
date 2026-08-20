import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArenaView from '../views/ArenaView.vue'
import WalletView from '../views/WalletView.vue'
import RewardsView from '../views/RewardsView.vue'
import BlogView from '../views/BlogView.vue'
import BlogDetail from '../views/BlogDetail.vue'
import DiscoveryDetail from '../views/DiscoveryDetail.vue'
import EarnView from '../views/EarnView.vue'

import { blogs } from '../data/blogs'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/arena', name: 'arena', component: ArenaView },
  { path: '/earn', name: 'earn', component: EarnView },
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
  // Update Canonical Tag (Self-referencing for SEO)
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  
  // Use current browsing origin (e.g. localhost during dev, or live vercel domain in prod)
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://nexyorkcasino.vercel.app';
  const path = to.path === '/' ? '' : to.path.replace(/\/$/, '');
  canonical.setAttribute('href', `${baseUrl}${path}`);

  // Dynamic Title & Meta Tags
  const siteTitle = 'NexYork - Elite Casino & Sports Exchange';
  let pageTitle = siteTitle;
  let pageDesc = 'Experience the pulse of NYC gaming. Live casino, real-time sports betting, luxury romance lifestyle, and exclusive VIP rewards.';
  let pageImage = `${baseUrl}/favicon.png`;

  if (to.meta && to.meta.title) {
    pageTitle = `${to.meta.title} | ${siteTitle}`;
  } else if (to.name === 'magazine-detail' && to.params.slug) {
    const article = blogs.find(b => b.slug === to.params.slug);
    if (article) {
      pageTitle = `${article.title} | NexYork Magazine`;
      pageDesc = article.excerpt;
      pageImage = article.image;
    } else {
      const slugParts = to.params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1));
      pageTitle = `${slugParts.join(' ')} | NexYork Magazine`;
    }
  } else if (to.name === 'magazine') {
    pageTitle = 'VIP Crypto, Casino & Romance Magazine | NexYork Elite';
    pageDesc = 'Explore 75+ exclusive articles on high-stakes trading strategies, provably fair casino systems, and lavish Manhattan romance & nightlife.';
  } else if (to.name === 'arena') {
    pageTitle = 'Live Global Arena & Sports Betting | NexYork';
    pageDesc = 'Bet in real-time on live ESPN sports, Crash, Mines, and live dealer casino tables in NYC.';
  } else if (to.name === 'earn') {
    pageTitle = 'Earn 20% Affiliate Program & VIP Rewards | NexYork';
    pageDesc = 'Earn 20% lifetime commission on every referral wagered in the NexYork Arena.';
  }

  document.title = pageTitle;

  // Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', pageDesc);

  // Update Open Graph tags
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', pageTitle);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', pageDesc);

  let ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute('content', pageImage);

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `${baseUrl}${path}`);
});

export default router
