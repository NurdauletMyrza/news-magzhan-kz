import React, { useState, useEffect } from "react";
import { getPosts } from "../services/api";
import Card from "../components/Card";
import { CardPost } from "../types";
// import { useParams } from "react-router-dom";

const NewsList: React.FC = () => {
  // const { tag } = useParams<{ searchValue: string }>();
  const [posts, setPosts] = useState<CardPost[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts(page, 10);
      setPosts(data);
    };

    fetchPosts();
  }, [page]);

  return (
    <div className="news-list">
      {posts.map(post => (
        <Card key={post.id} id={post.id} title={post.title} tag={post.tag} date={post.date} imageLink={post.imageLink} />
      ))}
      <button onClick={() => setPage(page + 1)}>Load more</button>
    </div>
  );
};

export default NewsList;
