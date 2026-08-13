<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import type { Article } from '@/types/article';

const store = useStore();

const articles = computed<Article[]>(() => {
  return store.getters['articles/articles'];
});

const loading = computed<boolean>(() => {
  return store.getters['articles/loading'];
});

const error = computed<string | null>(() => {
  return store.getters['articles/error'];
});

onMounted(() => {
  store.dispatch('articles/fetchArticles');
});
</script>

<template>
  <main>
    <h1>Статьи</h1>

    <div>
      <RouterLink :to="{ name: 'article-create' }">
        Создать статью
      </RouterLink>

      <RouterLink :to="{ name: 'comments-analytics' }">
        Аналитика комментариев
      </RouterLink>
    </div>

    <p v-if="loading">
      Загрузка...
    </p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <p v-else-if="articles.length === 0">
      Статей пока нет.
    </p>

    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Текст статьи</th>
          <th>Дата создания</th>
          <th>Дата модификации</th>
          <th>Действия</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="article in articles"
          :key="article.id"
        >
          <td>{{ article.id }}</td>
          <td>{{ article.title }}</td>
          <td>{{ article.content }}</td>
          <td>{{ article.createdAt }}</td>
          <td>{{ article.updatedAt }}</td>

          <td>
            <RouterLink
              :to="{
                name: 'article',
                params: { id: article.id }
              }"
            >
              Открыть
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>