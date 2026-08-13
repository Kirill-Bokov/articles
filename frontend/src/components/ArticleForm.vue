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
    <v-form @submit.prevent="submit">
        <v-text-field v-model="title" label="Название" variant="outlined" class="mb-2" />

        <v-textarea v-model="content" label="Текст статьи" variant="outlined" rows="10" auto-grow class="mb-2" />

        <v-alert v-if="error" type="error" class="mb-4">
            {{ error }}
        </v-alert>

        <v-btn type="submit" color="primary" :loading="submitting">
            {{ submitting ? 'Сохранение...' : 'Сохранить' }}
        </v-btn>
    </v-form>
</template>