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
    <v-list-item v-if="editing">
        <CommentForm :article-id="comment.articleId" :comment="comment" @saved="editing = false"
            @cancelled="editing = false" />
    </v-list-item>

    <v-list-item v-else>
        <v-list-item-title>
            {{ comment.content }}
        </v-list-item-title>

        <v-list-item-subtitle class="mt-2">
            <div>ID: {{ comment.id }}</div>
            <div>ID статьи: {{ comment.articleId }}</div>
            <div>Создан: {{ comment.createdAt }}</div>
            <div>Изменён: {{ comment.updatedAt }}</div>
        </v-list-item-subtitle>

        <template #append>
            <div class="d-flex ga-2">
                <v-btn size="small" variant="outlined" @click="editing = true">
                    Редактировать
                </v-btn>

                <v-btn size="small" color="error" variant="outlined" :loading="deleting" @click="deleteComment">
                    Удалить
                </v-btn>
            </div>
        </template>

        <v-alert v-if="error" type="error" density="compact" class="mt-3">
            {{ error }}
        </v-alert>
    </v-list-item>
</template>