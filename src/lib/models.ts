export type Post = {
  id: number;
  created_at: Date;
  title: string;
  subtitle: string;
  content: string;
  published: boolean;
  author_id: number;
  category_id: number;
};

export type User = {
  id: number;
  created_at: Date;
  email: string;
  name: string;
};

export type Category = {
  id: number;
  created_at: Date;
  name: string;
};
