import api from './axios';
import type { CommentsAnalytics } from '@/types/analytics';

export async function getCommentsAnalytics(
  dateFrom: string,
  dateTo: string
): Promise<CommentsAnalytics[]> {
  const response = await api.get<CommentsAnalytics[]>(
    '/analytic/comments/',
    {
      params: {
        dateFrom,
        dateTo
      }
    }
  );

  return response.data;
}
