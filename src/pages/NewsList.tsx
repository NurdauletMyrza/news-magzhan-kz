import React, { useState, useEffect } from "react";
import { getPosts, getPostsByTag, getTotalPagesNumber, getTotalPagesNumberByTag } from "../services/api";
import Card from "../components/Card";
import { CardPost } from "../types";
import "../styles/NewsList.css";
import ScrollToTopLink from "../components/ScrollToTopLink";
import { useParams } from "react-router-dom";

const NewsList: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();
  const [posts, setPosts] = useState<CardPost[]>([]);
  const [page, setPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);
  const postsLimit = 14;

  useEffect(() => {
    const fetchPosts = async (pageNumber: number, limit: number) => {
      const data = await getPosts(pageNumber, limit);
      setPosts(data);
    };

    const fetchPostsByTag = async (tagName: string, pageNumber: number, limit: number) => {
      const data = await getPostsByTag(tagName, pageNumber, limit);
      setPosts(data);
    };

    if (tag === undefined) {
      fetchPosts(page, postsLimit);
    } else {
      fetchPostsByTag(tag, pagesNumber, postsLimit);
    }
  }, [page, tag]);

  useEffect(() => {
    const fetchTotalPages = async (limit: number) => {
      const totalPages = await getTotalPagesNumber(limit);
      setPagesNumber(totalPages);
    };

    const fetchTotalPagesByTag = async (tagName: string, limit: number) => {
      const totalPages = await getTotalPagesNumberByTag(tagName, limit);
      setPagesNumber(totalPages);
    }

    if (tag === undefined) {
      fetchTotalPages(postsLimit);
    } else {
      fetchTotalPagesByTag(tag, postsLimit);
    }
  }, [posts]);

  return (
    <div className="news-list-page">
      <ul className="news-list _container">
        <div className="news-list__first-two">
          {posts.slice(0, 2).map((post) => (
            <li key={`post-${post.id}`} className={`news-list__item-${post.styleVersion}`}>
              <ScrollToTopLink to={`/news-magzhan-kz/news/${post.id}`}>
                <Card title={post.title} tag={post.tag} date={post.date} imageLink={post.imageLink} styleVersion={post.styleVersion} />
              </ScrollToTopLink>
            </li>
          ))}
        </div>
        <div className="news-list__others" style={{ maxHeight: `${120 * postsLimit}px`}}>
          {posts.filter((post, index) => index > 1).map((post) => (
            <li key={`post-${post.id}`} className="news-list__item">
              <ScrollToTopLink to={`/news-magzhan-kz/news/${post.id}`}>
                <Card title={post.title} tag={post.tag} date={post.date} imageLink={post.imageLink} styleVersion={post.styleVersion} />
              </ScrollToTopLink>
            </li>
          ))}
        </div>
      </ul>
      <div className="news-list__pages">
        {Array.from({ length: pagesNumber}).map((_, index) => (
          <button key={`page-${index + 1}`} className={`news-list__pages-button ${page === index + 1 ? "color-red" : ""}`} onClick={() => { window.scrollTo(0, 0); setPage(index + 1) }}>{index + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
