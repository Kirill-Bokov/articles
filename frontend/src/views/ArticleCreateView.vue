<script setup lang="ts">
import ArticleForm from '@/components/ArticleForm.vue';
</script>

<template>
  <v-container>
    <v-row class="mb-4">
      <v-col>
        <h1 class="text-h4">
          Создание статьи
        </h1>
      </v-col>
    </v-row>

    <v-card class="pa-4">
      <ArticleForm />
    </v-card>
  </v-container>
</template>