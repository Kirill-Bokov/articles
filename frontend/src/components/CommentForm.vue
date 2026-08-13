<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import type { Comment } from '@/types/comment';

const props = defineProps<{
  articleId: number;
  comment?: Comment | null;
}>();

const emit = defineEmits<{
  saved: [];
  cancelled: [];
}>();

const store = useStore();

const content = ref(props.comment?.content ?? '');
const submitting = ref(false);
const error = ref<string | null>(null);

const isEditMode = computed(() => Boolean(props.comment));

const submit = async () => {
  if (!content.value.trim()) {
    error.value = 'Текст комментария обязателен';
    return;
  }

  submitting.value = true;
  error.value = null;

  try {
    if (isEditMode.value && props.comment) {
      await store.dispatch('comments/updateComment', {
        articleId: props.articleId,
        commentId: props.comment.id,
        data: {
          content: content.value.trim()
        }
      });
    } else {
      await store.dispatch('comments/createComment', {
        articleId: props.articleId,
        data: {
          content: content.value.trim()
        }
      });
    }

    emit('saved');
  } catch {
    error.value = 'Не удалось сохранить комментарий';
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="submit">
    <label for="comment-content">
      {{ isEditMode ? 'Редактирование комментария' : 'Новый комментарий' }}
    </label>

    <textarea
      id="comment-content"
      v-model="content"
      rows="5"
    />

    <p v-if="error">
      {{ error }}
    </p>

    <button
      type="submit"
      :disabled="submitting"
    >
      {{ submitting ? 'Сохранение...' : 'Сохранить' }}
    </button>

    <button
      v-if="isEditMode"
      type="button"
      @click="emit('cancelled')"
    >
      Отмена
    </button>
  </form>
</template>
