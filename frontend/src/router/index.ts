import { createRouter, createWebHistory } from 'vue-router'

import ArticlesView from '@/views/ArticlesView.vue'
import ArticleView from '@/views/ArticleView.vue'
import ArticleCreateView from '@/views/ArticleCreateView.vue'
import ArticleEditView from '@/views/ArticleEditView.vue'
import AnalyticsView from '@/views/AnalyticsView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      redirect: '/articles',
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView,
    },
    {
      path: '/articles/:id',
      name: 'article',
      component: ArticleView,
    },
    {
      path: '/articles/create',
      name: 'article-create',
      component: ArticleCreateView,
    },
    {
      path: '/articles/:id/edit',
      name: 'article-edit',
      component: ArticleEditView,
    },
    {
      path: '/analytic/comments',
      name: 'comments-analytics',
      component: AnalyticsView,
    },
  ],
})

export default router
