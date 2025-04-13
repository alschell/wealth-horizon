
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar?: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  image: string;
}

export interface BlogComment {
  id: number;
  author: string;
  authorAvatar?: string;
  date: string;
  content: string;
  replies?: BlogComment[];
}
