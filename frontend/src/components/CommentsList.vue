<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import CommentItem from './CommentItem.vue';

const props = defineProps<{
  articleId: number;
}>();

const store = useStore();

const comments = computed(() => {
  return store.getters['comments/comments'];
});

const loading = computed(() => {
  return store.getters['comments/loading'];
});

const error = computed(() => {
  return store.getters['comments/error'];
});

onMounted(() => {
  store.dispatch('comments/fetchComments', props.articleId);
});
</script>

<template>
  <section>
    <h2>Комментарии</h2>

    <p v-if="loading">
      Загрузка комментариев...
    </p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <p v-else-if="comments.length === 0">
      Комментариев пока нет.
    </p>

    <div v-else>
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </section>
</template>
