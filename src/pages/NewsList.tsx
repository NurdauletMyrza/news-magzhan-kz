import React, { useState, useEffect } from "react";
import { getPosts, getTotalPagesNumber } from "../services/api";
import Card from "../components/Card";
import { CardPost } from "../types";
// import { useParams } from "react-router-dom";
import "../styles/NewsList.css";
import { Link } from "react-router-dom";

const NewsList: React.FC = () => {
  // const { tag } = useParams<{ searchValue: string }>();
  const [posts, setPosts] = useState<CardPost[]>([]);
  const [page, setPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);
  const postsLimit = 14;

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts(page, postsLimit);
      setPosts(data);
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    const fetchTotalPages = async () => {
      const totalPages = await getTotalPagesNumber(postsLimit);
      setPagesNumber(totalPages);
    };

    fetchTotalPages();
  }, []);

  return (
    <div className="news-list-page">
      <ul className="news-list _container">
        <div className="news-list__first-two">
          {posts.slice(0, 2).map((post) => (
            <li key={`post-${post.id}`} className={`news-list__item-${post.styleVersion}`}>
              <Link to={`/news/${post.id}`}>
                <Card title={post.title} tag={post.tag} date={post.date} imageLink={post.imageLink} styleVersion={post.styleVersion} />
              </Link>
            </li>
          ))}
        </div>
        <div className="news-list__others" style={{ maxHeight: `${120 * postsLimit}px`}}>
          {posts.map((post, index) => {
            if (index > 1) {
              return (
                <li key={`post-${post.id}`} className="news-list__item">
                  <Link to={`/news/${post.id}`}>
                    <Card title={post.title} tag={post.tag} date={post.date} imageLink={post.imageLink} styleVersion={post.styleVersion} />
                  </Link>
                </li>
              );
            }
            return (<></>);
          })}
        </div>
        {/* <button onClick={() => setPage(page + 1)}>Load more</button> */}
      </ul>
      <div className="news-list__pages">
        {Array.from({ length: pagesNumber}).map((_, index) => (
          <button className="news-list__pages-button" onClick={() => setPage(index + 1)}>{index + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
