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
    <v-container>
        <v-row class="mb-4">
            <v-col>
                <h1 class="text-h4">
                    Аналитика комментариев
                </h1>
            </v-col>
        </v-row>

        <v-card class="pa-4 mb-6">
            <v-form @submit.prevent="search">
                <v-row>
                    <v-col cols="12" md="5">
                        <v-text-field v-model="dateFrom" label="От" type="datetime-local" variant="outlined" required />
                    </v-col>

                    <v-col cols="12" md="5">
                        <v-text-field v-model="dateTo" label="До" type="datetime-local" variant="outlined" required />
                    </v-col>

                    <v-col cols="12" md="2" class="d-flex align-center">
                        <v-btn type="submit" color="primary" :loading="loading" block>
                            Показать
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>

        <v-alert v-if="error" type="error" class="mb-6">
            {{ error }}
        </v-alert>

        <v-alert v-else-if="!loading && comments.length === 0" type="info" class="mb-6">
            Комментариев за выбранный период нет.
        </v-alert>

        <v-card v-for="article in comments" :key="article.articleId" class="mb-6">
            <v-card-title>
                {{ article.articleTitle }}
                <span class="text-medium-emphasis">
                    (ID: {{ article.articleId }})
                </span>
            </v-card-title>

            <v-table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Текст</th>
                        <th>Создан</th>
                        <th>Изменён</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="comment in article.comments" :key="comment.id">
                        <td>{{ comment.id }}</td>
                        <td>{{ comment.content }}</td>
                        <td>{{ comment.createdAt }}</td>
                        <td>{{ comment.updatedAt }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
    </v-container>
</template>