export interface AnalyticsComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentsAnalytics {
  articleId: number;
  articleTitle: string;
  comments: AnalyticsComment[];
}
