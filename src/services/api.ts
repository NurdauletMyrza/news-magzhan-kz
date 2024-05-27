import axios from "axios";
import { UpdatedPost, Post, Comment, UpdatedComment, CardPost } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com";
const public_PATH = process.env.PUBLIC_URL;
const tags = ["Ақпарат", "Әдебиет", "Өнер", "Ғылым", "Эксклюзив", "Карьера", "Спорт", "Тарих"];

export const getPosts = async (page: number, limit: number): Promise<CardPost[]> => {
  const response = await axios.get<Post[]>(`${API_URL}/posts`, {
    params: { _page: page, _limit: limit },
  });
  return response.data.map(litlePostUpdate);
};

export const getTotalPagesNumber = async (limit: number): Promise<number> => {
  const response = await axios.get<Post[]>(`${API_URL}/posts`);
  return Math.ceil(response.data.length / limit);
}

export const getPostsByTag = () => {};

export const getPostsBySearchTitle = () => {};

export const getPostById = async (id: number): Promise<UpdatedPost> => {
  const response = await axios.get<Post>(`${API_URL}/posts/${id}`);
  return updatePost(response.data);
};

export const updatePostLikes = async (postId: number, likes: number): Promise<void> => {
  await axios.patch(`${API_URL}/posts/${postId}`, { likes });
  console.log("post likes updated");
};

export const addComment = async (comment: UpdatedComment): Promise<void> => {
  await axios.post(`${API_URL}/comments`, comment);
  console.log("comment added");
};

export const deleteComment = async (commentId: number): Promise<void> => {
  await axios.delete(`${API_URL}/comments/${commentId}`);
  console.log("comment deleted");
}

export const getCommentsByPostId = async (postId: number): Promise<UpdatedComment[]> => {
  const response = await axios.get<Comment[]>(`${API_URL}/posts/${postId}/comments`);
  return response.data.map(updateComment);
};

export const getTags = (): string[] => {
  return tags;
}








function litlePostUpdate(post: Post): CardPost {
  let x = Math.floor(post.title.length / 20);
  if (x > 2) {
    x = 2;
  }
  const tagId = (post.id - 1) % tags.length;
  return {
    id: post.id,
    title: post.title,
    tag: tags[tagId],
    date: getDate(post),
    imageLink: `../images/image_${tagId + 1}_1.jpg`,
    styleVersion: 3 - x
  };
}

function updatePost(post: Post): UpdatedPost {
  const tagId = (post.id - 1) % tags.length;
  return {
    ...post,
    bodyContent: [
      { imageLink: `${public_PATH}/images/image_${tagId + 1}_1.jpg` },
      ( post.body + post.body + post.body + post.body ),
      { specialText: (post.body + post.body)},
      ( post.body + post.body + post.body + post.body ),
      { imageLink: `${public_PATH}/images/image_${tagId + 1}_2.jpg` },      
      ( post.body + post.body + post.body + post.body )
    ],
    tag: tags[tagId],
    date: getDate(post),
    likes: Math.floor(Math.random() * 100)
  };
};

function updateComment(comment: Comment): UpdatedComment {
  return {
    ...comment,
    date: getDate(comment),
    avatarLink: `${public_PATH}/icons/avatar.svg`
  };
}

// function getDate(objPostComment: Post | Comment): Date {
//   if (objPostComment as Post) {
//     return subtractDays(new Date(), objPostComment.id);
//   } else if (objPostComment as Comment) {
//     return addDays(subtractDays(new Date(), objPostComment.postId), objPostComment.id);
//   }
//   return new Date();

//   function subtractDays(date: Date, days: number): Date {
//     const result = new Date(date);
//     result.setDate(result.getDate() - days);
//     return result;
//   }

//   function addDays(date: Date, days: number): Date {
//     const result = new Date(date);
//     result.setDate(result.getDate() + days);
//     return result;
//   }
// }

function getDate(objPostComment: Post | Comment): Date {
  if (isPost(objPostComment)) {
    return subtractDays(new Date(), objPostComment.id);
  } else if (isComment(objPostComment)) {
    return addDays(subtractDays(new Date(), objPostComment.postId), objPostComment.id);
  }
  return new Date();

  function isPost(obj: Post | Comment): obj is Post {
    return (obj as Post).userId !== undefined;
  }

  function isComment(obj: Post | Comment): obj is Comment {
    return (obj as Comment).postId !== undefined;
  }

  function subtractDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }

  function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
