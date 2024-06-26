export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CardPost extends Omit<Post, "body" | "userId"> {
  tag: string;
  date: Date;
  imageLink: string;
  styleVersion: number;
}

export interface UpdatedPost extends Post {
  bodyContent: (string | { imageLink?: string; specialText?: string })[];
  tag: string;
  date: Date;
  likes: number;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface UpdatedComment extends Comment {
  date: Date;
  avatarLink: string;
}

export interface TagProps {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}