<script setup lang="ts">
import { computed, ref } from 'vue';

const articles = ref([
  {
    id: 1,
    title: 'Изучаем Vue'
  },
  {
    id: 2,
    title: 'Изучаем TypeScript'
  }
]);

const search = ref('');

const filteredArticles = computed(() => {
  return articles.value.filter(article =>
    article.title
      .toLowerCase()
      .includes(search.value.toLowerCase())
  );
});

import { useStore } from 'vuex/types/index.js';
const store = useStore();

const count = computed(() => store.state.count);
</script>

<template>
  <h1>Список статей</h1>
     <p>{{ count }}</p>
  <input
    v-model="search"
    placeholder="Поиск"
  >

  <p>
    Найдено: {{ filteredArticles.length }}
  </p>

  <ul>
    <li
      v-for="article in filteredArticles"
      :key="article.id"
    >
      {{ article.title }}
    </li>
  </ul>
</template>