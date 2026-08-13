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

    <p v-if="loading">
      Загрузка...
    </p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <p v-else-if="articles.length === 0">
      Статей пока нет.
    </p>

    <ul v-else>
      <li
        v-for="article in articles"
        :key="article.id"
      >
        <h2>{{ article.title }}</h2>

        <p>{{ article.content }}</p>

        <p>
          Создана: {{ article.createdAt }}
        </p>

        <p>
          Изменена: {{ article.updatedAt }}
        </p>
      </li>
    </ul>
  </main>
</template>