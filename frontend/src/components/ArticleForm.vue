<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import type { Article } from '@/types/article';

const props = defineProps<{
  article?: Article | null;
}>();

const store = useStore();
const router = useRouter();

const title = ref(props.article?.title ?? '');
const content = ref(props.article?.content ?? '');
const submitting = ref(false);
const error = ref<string | null>(null);

const isEditMode = computed(() => Boolean(props.article));

const submit = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    error.value = 'Название и текст статьи обязательны';
    return;
  }

  submitting.value = true;
  error.value = null;

  try {
    if (isEditMode.value && props.article) {
      await store.dispatch('articles/updateArticle', {
        id: props.article.id,
        data: {
          title: title.value.trim(),
          content: content.value.trim()
        }
      });

      await router.push({
        name: 'article',
        params: {
          id: props.article.id
        }
      });

      return;
    }

    const article = await store.dispatch(
      'articles/createArticle',
      {
        title: title.value.trim(),
        content: content.value.trim()
      }
    );

    await router.push({
      name: 'article',
      params: {
        id: article.id
      }
    });
  } catch {
    error.value = 'Не удалось сохранить статью';
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="submit">
    <div>
      <label for="title">
        Название
      </label>

      <input
        id="title"
        v-model="title"
        type="text"
      >
    </div>

    <div>
      <label for="content">
        Текст статьи
      </label>

      <textarea
        id="content"
        v-model="content"
        rows="10"
      />
    </div>

    <p v-if="error">
      {{ error }}
    </p>

    <button
      type="submit"
      :disabled="submitting"
    >
      {{ submitting ? 'Сохранение...' : 'Сохранить' }}
    </button>
  </form>
</template>
