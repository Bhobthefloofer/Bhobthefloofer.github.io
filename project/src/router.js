import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';
import TweetView from './views/TweetView.vue';
import { auth } from './firebaseConfig';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/tweet',
    name: 'Tweet',
    component: TweetView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;