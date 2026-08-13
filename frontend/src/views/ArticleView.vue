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

const showCommentForm = ref(false);
const deleting = ref(false);
const deleteError = ref<string | null>(null);

const articleId = computed(() => {
    return Number(route.params.id);
});

onMounted(() => {
    if (!Number.isInteger(articleId.value) || articleId.value <= 0) {
        router.push({
            name: 'articles'
        });

        return;
    }

    store.dispatch(
        'articles/fetchArticle',
        articleId.value
    );
});

const deleteArticle = async () => {
    if (!Number.isInteger(articleId.value) || articleId.value <= 0) {
        return;
    }

    if (!confirm('Удалить статью?')) {
        return;
    }

    deleting.value = true;
    deleteError.value = null;

    try {
        await store.dispatch(
            'articles/deleteArticle',
            articleId.value
        );

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
    <v-container>
        <v-row class="mb-4">
            <v-col>
                <v-btn variant="text" :to="{ name: 'articles' }">
                    Назад к статьям
                </v-btn>

                <v-btn variant="text" :to="{ name: 'comments-analytics' }">
                    Аналитика комментариев
                </v-btn>
            </v-col>
        </v-row>

        <v-progress-linear v-if="loading" indeterminate />

        <v-alert v-else-if="error" type="error" class="mb-4">
            {{ error }}
        </v-alert>

        <template v-else-if="article">
            <v-card class="mb-6">
                <v-card-title class="text-h5">
                    {{ article.title }}
                </v-card-title>

                <v-card-text>
                    <p class="mb-4">
                        {{ article.content }}
                    </p>

                    <v-list density="compact">
                        <v-list-item title="ID">
                            <template #append>
                                {{ article.id }}
                            </template>
                        </v-list-item>

                        <v-list-item title="Дата создания">
                            <template #append>
                                {{ article.createdAt }}
                            </template>
                        </v-list-item>

                        <v-list-item title="Дата модификации">
                            <template #append>
                                {{ article.updatedAt }}
                            </template>
                        </v-list-item>
                    </v-list>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" :to="{
                        name: 'article-edit',
                        params: {
                            id: article.id
                        }
                    }">
                        Редактировать
                    </v-btn>

                    <v-btn color="error" :loading="deleting" @click="deleteArticle">
                        Удалить статью
                    </v-btn>
                </v-card-actions>
            </v-card>

            <v-alert v-if="deleteError" type="error" class="mb-6">
                {{ deleteError }}
            </v-alert>

            <CommentsList :article-id="article.id" />

            <v-card class="mt-6">
                <v-card-title>
                    Добавление комментария
                </v-card-title>

                <v-card-actions v-if="!showCommentForm">
                    <v-btn color="primary" @click="showCommentForm = true">
                        Добавить комментарий
                    </v-btn>
                </v-card-actions>

                <v-card-text v-else>
                    <CommentForm :article-id="article.id" @saved="showCommentForm = false"
                        @cancelled="showCommentForm = false" />
                </v-card-text>
            </v-card>
        </template>

        <v-alert v-else type="warning">
            Статья не найдена.
        </v-alert>
    </v-container>
</template>