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
  <v-card>
    <v-card-title>
      Комментарии
    </v-card-title>

    <v-card-text>
      <v-progress-linear v-if="loading" indeterminate />

      <v-alert v-else-if="error" type="error">
        {{ error }}
      </v-alert>

      <v-alert v-else-if="comments.length === 0" type="info">
        Комментариев пока нет.
      </v-alert>

      <v-list v-else lines="three">
        <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
      </v-list>
    </v-card-text>
  </v-card>
</template>