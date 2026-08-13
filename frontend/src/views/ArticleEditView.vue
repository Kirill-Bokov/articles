<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import ArticleForm from '@/components/ArticleForm.vue';

const route = useRoute();
const store = useStore();

const article = computed(() => {
    return store.getters['articles/currentArticle'];
});

const loading = computed(() => {
    return store.getters['articles/loading'];
});

const error = computed(() => {
    return store.getters['articles/error'];
});

const articleId = Number(route.params.id);

onMounted(() => {
    store.dispatch('articles/fetchArticle', articleId);
});
</script>

<template>
    <v-container>
        <v-row class="mb-4">
            <v-col>
                <h1 class="text-h4">
                    Редактирование статьи
                </h1>
            </v-col>
        </v-row>

        <v-progress-linear v-if="loading" indeterminate class="mb-4" />

        <v-alert v-else-if="error" type="error">
            {{ error }}
        </v-alert>

        <v-card v-else-if="article" class="pa-4">
            <ArticleForm :article="article" />
        </v-card>

        <v-alert v-else type="warning">
            Статья не найдена.
        </v-alert>
    </v-container>
</template>