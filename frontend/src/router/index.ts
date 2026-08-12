import { createRouter, createWebHistory } from 'vue-router';
import ArticlesView from '@/views/ArticlesView.vue';

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView
    }
  ]
});

export default router;