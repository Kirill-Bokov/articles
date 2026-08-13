<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import type { Article } from '@/types/article';

const route = useRoute();
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

onMounted(() => {
    store.dispatch('articles/fetchArticle', articleId);
});
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

        <article v-else-if="article">
            <RouterLink :to="{
                name: 'article-edit',
                params: { id: article.id }
            }">
                Редактировать
            </RouterLink>
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
        </article>

        <p v-else>
            Статья не найдена.
        </p>
    </main>
</template>
