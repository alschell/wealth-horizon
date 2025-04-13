
export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  image: string;
};

export type Comment = {
  id: number;
  postId: number;
  author: string;
  content: string;
  date: string;
  email?: string;
};
