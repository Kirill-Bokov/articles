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
    <v-form @submit.prevent="submit">
        <div class="text-subtitle-1 mb-2">
            {{ isEditMode ? 'Редактирование комментария' : 'Новый комментарий' }}
        </div>

        <v-textarea v-model="content" label="Текст комментария" variant="outlined" rows="5" auto-grow class="mb-2" />

        <v-alert v-if="error" type="error" density="compact" class="mb-4">
            {{ error }}
        </v-alert>

        <div class="d-flex ga-2">
            <v-btn type="submit" color="primary" :loading="submitting">
                {{ submitting ? 'Сохранение...' : 'Сохранить' }}
            </v-btn>

            <v-btn v-if="isEditMode" type="button" variant="outlined" @click="emit('cancelled')">
                Отмена
            </v-btn>
        </div>
    </v-form>
</template>
