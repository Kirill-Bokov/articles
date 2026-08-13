import type { Module } from 'vuex';

import type { CommentsAnalytics } from '@/types/analytics';
import { getCommentsAnalytics } from '@/api/analytics';

interface AnalyticsState {
  comments: CommentsAnalytics[];
  loading: boolean;
  error: string | null;
}

const analytics: Module<AnalyticsState, unknown> = {
  namespaced: true,

  state: {
    comments: [],
    loading: false,
    error: null
  },

  getters: {
    comments: (state) => state.comments,
    loading: (state) => state.loading,
    error: (state) => state.error
  },

  mutations: {
    setComments(state, comments: CommentsAnalytics[]) {
      state.comments = comments;
    },

    setLoading(state, loading: boolean) {
      state.loading = loading;
    },

    setError(state, error: string | null) {
      state.error = error;
    }
  },

  actions: {
    async fetchCommentsAnalytics(
      { commit },
      payload: {
        dateFrom: string;
        dateTo: string;
      }
    ) {
      commit('setLoading', true);
      commit('setError', null);

      try {
        const comments = await getCommentsAnalytics(
          payload.dateFrom,
          payload.dateTo
        );

        commit('setComments', comments);

        return comments;
      } catch (error) {
        commit(
          'setError',
          'Не удалось загрузить аналитику комментариев'
        );

        throw error;
      } finally {
        commit('setLoading', false);
      }
    }
  }
};

export default analytics;
