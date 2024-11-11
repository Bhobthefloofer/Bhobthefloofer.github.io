// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/LoginView.vue';
import TweetPage from '../views/TweetPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tweet',
    name: 'TweetPage',
    component: TweetPage,
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = document.cookie.includes('access_token');
  if (to.matched.some(record => record.meta.requiresAuth) && !currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;
