import type { Module } from 'vuex';

import type { Comment } from '@/types/comment';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment
} from '@/api/comments';

interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const comments: Module<CommentsState, unknown> = {
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
    setComments(state, comments: Comment[]) {
      state.comments = comments;
    },

    addComment(state, comment: Comment) {
      state.comments.push(comment);
    },

    replaceComment(state, comment: Comment) {
      const index = state.comments.findIndex(
        item => item.id === comment.id
      );

      if (index !== -1) {
        state.comments[index] = comment;
      }
    },

    removeComment(state, id: number) {
      state.comments = state.comments.filter(
        comment => comment.id !== id
      );
    },

    setLoading(state, loading: boolean) {
      state.loading = loading;
    },

    setError(state, error: string | null) {
      state.error = error;
    }
  },

  actions: {
    async fetchComments({ commit }, articleId: number) {
      commit('setLoading', true);
      commit('setError', null);

      try {
        const comments = await getComments(articleId);

        commit('setComments', comments);
      } catch (error) {
        commit('setError', 'Не удалось загрузить комментарии');
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },

    async createComment(
      { commit },
      payload: {
        articleId: number;
        data: {
          content: string;
        };
      }
    ) {
      const comment = await createComment(
        payload.articleId,
        payload.data
      );

      commit('addComment', comment);

      return comment;
    },

    async updateComment(
      { commit },
      payload: {
        articleId: number;
        commentId: number;
        data: {
          content?: string;
        };
      }
    ) {
      const comment = await updateComment(
        payload.articleId,
        payload.commentId,
        payload.data
      );

      commit('replaceComment', comment);

      return comment;
    },

    async deleteComment(
      { commit },
      payload: {
        articleId: number;
        commentId: number;
      }
    ) {
      await deleteComment(
        payload.articleId,
        payload.commentId
      );

      commit('removeComment', payload.commentId);
    }
  }
};

export default comments;
