<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import CommentsList from '@/components/CommentsList.vue';
import CommentForm from '@/components/CommentForm.vue';

import type { Article } from '@/types/article';

const route = useRoute();
const router = useRouter();
const store = useStore();

const article = computed<Article | null>(() => {
  return store.getters['articles/currentArticle'];
});

const loading = computed<boolean>(() => {
  return store.getters['articles/loading'];
});

const error = computed<string | null>(() => {
  return store.getters['articles/error'];
});

const articleId = Number(route.params.id);

const showCommentForm = ref(false);
const deleting = ref(false);
const deleteError = ref<string | null>(null);

onMounted(() => {
  store.dispatch('articles/fetchArticle', articleId);
});

const deleteArticle = async () => {
  if (!confirm('Удалить статью?')) {
    return;
  }

  deleting.value = true;
  deleteError.value = null;

  try {
    await store.dispatch('articles/deleteArticle', articleId);

    await router.push({
      name: 'articles'
    });
  } catch {
    deleteError.value = 'Не удалось удалить статью';
  } finally {
    deleting.value = false;
  }
};
</script>

<template>
  <main>
    <RouterLink :to="{ name: 'articles' }">
      Назад к статьям
    </RouterLink>

    <p v-if="loading">
      Загрузка...
    </p>

    <p v-else-if="error">
      {{ error }}
    </p>

    <template v-else-if="article">
      <article>
        <h1>{{ article.title }}</h1>

        <p>{{ article.content }}</p>

        <dl>
          <dt>ID</dt>
          <dd>{{ article.id }}</dd>

          <dt>Дата создания</dt>
          <dd>{{ article.createdAt }}</dd>

          <dt>Дата модификации</dt>
          <dd>{{ article.updatedAt }}</dd>
        </dl>

        <RouterLink
          :to="{
            name: 'article-edit',
            params: { id: article.id }
          }"
        >
          Редактировать
        </RouterLink>

        <button
          type="button"
          :disabled="deleting"
          @click="deleteArticle"
        >
          {{ deleting ? 'Удаление...' : 'Удалить статью' }}
        </button>

        <p v-if="deleteError">
          {{ deleteError }}
        </p>
      </article>

      <CommentsList :article-id="article.id" />

      <section>
        <button
          v-if="!showCommentForm"
          type="button"
          @click="showCommentForm = true"
        >
          Добавить комментарий
        </button>

        <CommentForm
          v-else
          :article-id="article.id"
          @saved="showCommentForm = false"
          @cancelled="showCommentForm = false"
        />
      </section>
    </template>

    <p v-else>
      Статья не найдена.
    </p>
  </main>
</template>