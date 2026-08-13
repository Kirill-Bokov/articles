import api from './axios';
import type { Article } from '@/types/article';

export async function getArticles(): Promise<Article[]> {
  const response = await api.get<Article[]>('/articles/');
  return response.data;
}

export async function getArticle(id: number): Promise<Article> {
  const response = await api.get<Article>(`/article/${id}/`);
  return response.data;
}

export async function createArticle(data: {
  title: string;
  content: string;
}): Promise<Article> {
  const response = await api.post<Article>('/article/', data);
  return response.data;
}

export async function updateArticle(
  id: number,
  data: {
    title?: string;
    content?: string;
  }
): Promise<Article> {
  const response = await api.patch<Article>(`/article/${id}/`, data);
  return response.data;
}

export async function deleteArticle(id: number): Promise<void> {
  await api.delete(`/article/${id}/`);
}
