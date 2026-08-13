<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import type { CommentsAnalytics } from '@/types/analytics';

const store = useStore();

const dateFrom = ref('');
const dateTo = ref('');

const comments = computed<CommentsAnalytics[]>(() => {
  return store.getters['analytics/comments'];
});

const loading = computed<boolean>(() => {
  return store.getters['analytics/loading'];
});

const error = computed<string | null>(() => {
  return store.getters['analytics/error'];
});

const search = async () => {
  if (!dateFrom.value || !dateTo.value) {
    return;
  }

  await store.dispatch(
    'analytics/fetchCommentsAnalytics',
    {
      dateFrom: dateFrom.value,
      dateTo: dateTo.value
    }
  );
};
</script>

<template>
  <main>
    <h1>Аналитика комментариев</h1>

    <form @submit.prevent="search">
      <div>
        <label for="date-from">
          От
        </label>

        <input
          id="date-from"
          v-model="dateFrom"
          type="datetime-local"
          required
        >
      </div>

      <div>
        <label for="date-to">
          До
        </label>

        <input
          id="date-to"
          v-model="dateTo"
          type="datetime-local"
          required
        >
      </div>

      <button
        type="submit"
        :disabled="loading"
      >
        {{ loading ? 'Загрузка...' : 'Показать' }}
      </button>
    </form>

    <p v-if="error">
      {{ error }}
    </p>

    <p v-else-if="!loading && comments.length === 0">
      Комментариев за выбранный период нет.
    </p>

    <section
      v-for="article in comments"
      :key="article.articleId"
    >
      <h2>
        {{ article.articleTitle }}
        (ID: {{ article.articleId }})
      </h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Текст</th>
            <th>Создан</th>
            <th>Изменён</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="comment in article.comments"
            :key="comment.id"
          >
            <td>{{ comment.id }}</td>
            <td>{{ comment.content }}</td>
            <td>{{ comment.createdAt }}</td>
            <td>{{ comment.updatedAt }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>
