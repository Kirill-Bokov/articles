import type { Module } from 'vuex';

import type { Article } from '@/types/article';
import {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} from '@/api/articles';

interface ArticlesState {
  articles: Article[];
  currentArticle: Article | null;
  loading: boolean;
  error: string | null;
}

const articles: Module<ArticlesState, unknown> = {
  namespaced: true,

  state: {
    articles: [],
    currentArticle: null,
    loading: false,
    error: null
  },

  getters: {
    articles: (state) => state.articles,
    currentArticle: (state) => state.currentArticle,
    loading: (state) => state.loading,
    error: (state) => state.error
  },

  mutations: {
    setArticles(state, articles: Article[]) {
      state.articles = articles;
    },

    setCurrentArticle(state, article: Article | null) {
      state.currentArticle = article;
    },

    setLoading(state, loading: boolean) {
      state.loading = loading;
    },

    setError(state, error: string | null) {
      state.error = error;
    },

    addArticle(state, article: Article) {
      state.articles.push(article);
    },

    replaceArticle(state, article: Article) {
      const index = state.articles.findIndex(
        item => item.id === article.id
      );

      if (index !== -1) {
        state.articles[index] = article;
      }
    },

    removeArticle(state, id: number) {
      state.articles = state.articles.filter(
        article => article.id !== id
      );
    }
  },

  actions: {
    async fetchArticles({ commit }) {
      commit('setLoading', true);
      commit('setError', null);

      try {
        const articles = await getArticles();

        commit('setArticles', articles);
      } catch (error) {
        commit('setError', 'Не удалось загрузить статьи');
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },

    async fetchArticle({ commit }, id: number) {
      commit('setLoading', true);
      commit('setError', null);

      try {
        const article = await getArticle(id);

        commit('setCurrentArticle', article);

        return article;
      } catch (error) {
        commit('setError', 'Не удалось загрузить статью');
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },

    async createArticle({ commit }, data: {
      title: string;
      content: string;
    }) {
      const article = await createArticle(data);

      commit('addArticle', article);

      return article;
    },

    async updateArticle(
      { commit },
      payload: {
        id: number;
        data: {
          title?: string;
          content?: string;
        };
      }
    ) {
      const article = await updateArticle(
        payload.id,
        payload.data
      );

      commit('replaceArticle', article);
      commit('setCurrentArticle', article);

      return article;
    },

    async deleteArticle({ commit }, id: number) {
      await deleteArticle(id);

      commit('removeArticle', id);
    }
  }
};

export default articles;
