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
  <v-container>
    <div class="d-flex align-center justify-space-between mb-6">
      <h1 class="text-h4">
        Статьи
      </h1>

      <div class="d-flex ga-2">
        <v-btn color="primary" :to="{ name: 'article-create' }">
          Создать статью
        </v-btn>

        <v-btn variant="outlined" :to="{ name: 'comments-analytics' }">
          Аналитика
        </v-btn>
      </div>
    </div>

    <v-progress-linear v-if="loading" indeterminate class="mb-4" />

    <v-alert v-else-if="error" type="error" class="mb-4">
      {{ error }}
    </v-alert>

    <v-alert v-else-if="articles.length === 0" type="info">
      Статей пока нет.
    </v-alert>

    <v-table v-else hover>
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
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.id }}</td>

          <td>
            {{ article.title }}
          </td>

          <td>
            {{ article.content }}
          </td>

          <td>
            {{ article.createdAt }}
          </td>

          <td>
            {{ article.updatedAt }}
          </td>

          <td>
            <v-btn size="small" variant="text" color="primary" :to="{
              name: 'article',
              params: {
                id: article.id
              }
            }">
              Открыть
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>