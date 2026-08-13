<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';

import CommentForm from './CommentForm.vue';

import type { Comment } from '@/types/comment';

const props = defineProps<{
  comment: Comment;
}>();

const store = useStore();

const editing = ref(false);
const deleting = ref(false);
const error = ref<string | null>(null);

const deleteComment = async () => {
  if (!confirm('Удалить комментарий?')) {
    return;
  }

  deleting.value = true;
  error.value = null;

  try {
    await store.dispatch('comments/deleteComment', {
      articleId: props.comment.articleId,
      commentId: props.comment.id
    });
  } catch {
    error.value = 'Не удалось удалить комментарий';
  } finally {
    deleting.value = false;
  }
};
</script>

<template>
  <article>
    <CommentForm
      v-if="editing"
      :article-id="comment.articleId"
      :comment="comment"
      @saved="editing = false"
      @cancelled="editing = false"
    />

    <template v-else>
      <p>{{ comment.content }}</p>

      <dl>
        <dt>ID</dt>
        <dd>{{ comment.id }}</dd>

        <dt>ID статьи</dt>
        <dd>{{ comment.articleId }}</dd>

        <dt>Создан</dt>
        <dd>{{ comment.createdAt }}</dd>

        <dt>Изменён</dt>
        <dd>{{ comment.updatedAt }}</dd>
      </dl>

      <button
        type="button"
        @click="editing = true"
      >
        Редактировать
      </button>

      <button
        type="button"
        :disabled="deleting"
        @click="deleteComment"
      >
        {{ deleting ? 'Удаление...' : 'Удалить' }}
      </button>

      <p v-if="error">
        {{ error }}
      </p>
    </template>
  </article>
</template>