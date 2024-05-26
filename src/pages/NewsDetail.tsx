// src/pages/NewsDetail.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById, getCommentsByPostId } from "../services/api";
import { Post, Comment, UpdatedComment, UpdatedPost } from "../types";

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<UpdatedPost | null>(null);
  const [comments, setComments] = useState<UpdatedComment[]>([]);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const data = await getPostById(parseInt(id));
        setPost(data);
      };

      const fetchComments = async () => {
        const data = await getCommentsByPostId(parseInt(id));
        setComments(data);
      };

      fetchPost();
      fetchComments();
    }
  }, [id]);

  return (
    <article className="news-detail">
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <section>
            <h2>Comments</h2>
            {comments.map(comment => (
              <div key={comment.id}>
                <h3>{comment.name}</h3>
                <p>{comment.body}</p>
                <p>{comment.date.toDateString()}</p>
              </div>
            ))}
          </section>
        </>
      )}
    </article>
  );
};

export default NewsDetail;
