import api from './axios';
import type { Comment } from '@/types/comment';

export async function getComments(articleId: number): Promise<Comment[]> {
  const response = await api.get<Comment[]>(
    `/article/${articleId}/comments/`
  );

  return response.data;
}

export async function getComment(
  articleId: number,
  commentId: number
): Promise<Comment> {
  const response = await api.get<Comment>(
    `/article/${articleId}/comment/${commentId}/`
  );

  return response.data;
}

export async function createComment(
  articleId: number,
  data: { content: string }
): Promise<Comment> {
  const response = await api.post<Comment>(
    `/article/${articleId}/comment/`,
    data
  );

  return response.data;
}

export async function updateComment(
  articleId: number,
  commentId: number,
  data: { content?: string }
): Promise<Comment> {
  const response = await api.patch<Comment>(
    `/article/${articleId}/comment/${commentId}/`,
    data
  );

  return response.data;
}

export async function deleteComment(
  articleId: number,
  commentId: number
): Promise<void> {
  await api.delete(
    `/article/${articleId}/comment/${commentId}/`
  );
}
