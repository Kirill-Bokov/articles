<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import ArticleForm from '@/components/ArticleForm.vue';

const route = useRoute();
const store = useStore();

const article = computed(() => {
  return store.getters['articles/currentArticle'];
});

const loading = computed(() => {
  return store.getters['articles/loading'];
});

const error = computed(() => {
  return store.getters['articles/error'];
});

const articleId = Number(route.params.id);

onMounted(() => {
  store.dispatch('articles/fetchArticle', articleId);
});
</script>

<template>
  <main>
    <h1>Редактирование статьи</h1>

    <p v-if="loading">
      Загрузка...
    </p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <ArticleForm
      v-else-if="article"
      :article="article"
    />

    <p v-else>
      Статья не найдена.
    </p>
  </main>
</template>