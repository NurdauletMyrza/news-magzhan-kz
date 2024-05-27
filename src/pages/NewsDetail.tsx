import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById, getCommentsByPostId, updatePostLikes, addComment, deleteComment, getPosts, editComment } from "../services/api";
import { CardPost, UpdatedComment, UpdatedPost } from "../types";
import "../styles/NewsDetail.css";
import Tag from "../components/Tag";
import UploadDate from "../components/UploadDate";
import Card from "../components/Card";
import ScrollToTopLink from "../components/ScrollToTopLink";
import Comment from "../components/Comment";

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<UpdatedPost | null>(null);
  const [comments, setComments] = useState<UpdatedComment[]>([]);
  const [likes, setLikes] = useState(0);
  const [uploaderText, setUploaderText] = useState("");
  const [relatedPosts, setRelatedPosts] = useState<CardPost[]>([]);
  const relatedPostsLimit = 6;

  function likeButtonHandler() {
    if (likes === post?.likes) {
      setLikes(likes => (post?.likes + 1));
    } else {
      setLikes(post?.likes === undefined ? 0 : post?.likes);
    }
    if (post?.id && likes) {
      updatePostLikes(post?.id, likes);
    }
    return likes;
  }

  function shareURL() {
    const URL = window.location.href;

    const shareURLs = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${URL}`,
      twitter: `https://twitter.com/intent/tweet?url=${URL}`,
      vk: `https://vk.com/share.php?url=${URL}`
    };
    window.open(shareURLs.twitter, "_blank");
    window.open(shareURLs.facebook, "_blank");
    window.open(shareURLs.vk, "_blank");
  }


  function saveCommentChanges(id: number, body: string) {
    const index = comments.findIndex((comment) => comment.id === id);

    if (index !== - 1) {
      const updatedComment = { ...comments[index], body, date: new Date() };

      const updatedComments = [
        ...comments.slice(0, index),
        updatedComment,
        ...comments.slice(index + 1)
      ];
      editComment(updatedComment);
      setComments(updatedComments);
    }
  }

  function removeComment(id: number) {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
    deleteComment(id);
  }

  function handleUploaderTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setUploaderText(event.target.value);
  }

  function commentUpload() {
    if (post?.id !== undefined) {
      const commentId = comments[comments.length - 1].id + 1;

      const comment: UpdatedComment = {
        avatarLink: `${process.env.PUBLIC_URL}/icons/avatar.svg`,
        body: uploaderText,
        date: new Date(),
        email: "Nurdaulet@gmail.com",
        id: commentId,
        name: "Lorem ipsum dolor sit amet.",
        postId: post?.id
      };

      comments.push(comment);
      addComment(comment);
      setUploaderText("");
    }
  }

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const data = await getPostById(parseInt(id));
        setPost(data);
        setLikes(data.likes);
      };

      const fetchComments = async () => {
        const data = await getCommentsByPostId(parseInt(id));
        setComments(data);
      };

      const fetchPosts = async () => {
        const data = await getPosts(1, relatedPostsLimit);
        setRelatedPosts(data);
      };
  
      fetchPost();
      fetchComments();
      fetchPosts();
    }
  }, [id]);

  return (
    <div className="news-detail-page">
      <article className="news-detail">
        {post && (
          <article className="news-detail__news news">
            <h1 className="news__title">{post.title}</h1>
            <div className="news__info">
              <Tag className="news__tag" tag={post.tag} />
              <UploadDate className="news__date" date={post.date} />
            </div>
            {post.bodyContent.map((item, index) => {
              if (typeof item === "object") {
                if ("imageLink" in item) {
                  return (
                    <section key={`${item.imageLink}-${index}`} className="news__image">
                      <img className="_img" src={item.imageLink} alt={item.imageLink} />
                    </section>
                  );
                } else if ("specialText" in item) {
                  return <section key={`${item.specialText}-${index}`} className="news__special-text">{item.specialText}</section>
                }
              }
              return <p key={`${item.toString()}-${index}`} className="news__p-text">{item.toString()}</p>
            })}
          </article>
        )}
        <section className="news-detail__social-actions">
          <button className={`news-detail__button button like-button ${likes === post?.likes ? "" : "liked-button"}`} onClick={likeButtonHandler}>
            <svg className="button__icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30.6668 13.3333C30.6668 12.626 30.3859 11.9477 29.8858 11.4476C29.3857 10.9475 28.7074 10.6666 28.0002 10.6666H19.5735L20.8535 4.57325C20.8802 4.43992 20.8935 4.29325 20.8935 4.14658C20.8935 3.59992 20.6668 3.09325 20.3068 2.73325L18.8935 1.33325L10.1202 10.1066C9.62683 10.5999 9.3335 11.2666 9.3335 11.9999V25.3333C9.3335 26.0405 9.61445 26.7188 10.1145 27.2189C10.6146 27.719 11.2929 27.9999 12.0002 27.9999H24.0002C25.1068 27.9999 26.0535 27.3333 26.4535 26.3733L30.4802 16.9733C30.6002 16.6666 30.6668 16.3466 30.6668 15.9999V13.3333ZM1.3335 27.9999H6.66683V11.9999H1.3335V27.9999Z" fill="#172B4D" />
            </svg>
            {`Ұнайды (${likes})`}
          </button>
          <button className="news-detail__button button share-button" onClick={shareURL}>
            <svg className="button__icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.3332 16.0001C29.3332 8.64008 23.3598 2.66675 15.9998 2.66675C8.63984 2.66675 2.6665 8.64008 2.6665 16.0001C2.6665 22.4534 7.25317 27.8267 13.3332 29.0667V20.0001H10.6665V16.0001H13.3332V12.6667C13.3332 10.0934 15.4265 8.00008 17.9998 8.00008H21.3332V12.0001H18.6665C17.9332 12.0001 17.3332 12.6001 17.3332 13.3334V16.0001H21.3332V20.0001H17.3332V29.2667C24.0665 28.6001 29.3332 22.9201 29.3332 16.0001Z" fill="#172B4D" />
            </svg>
            <svg className="button__icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.6175 7.54124C28.5996 7.99149 27.5201 8.2872 26.4148 8.41857C27.5789 7.72142 28.4499 6.62489 28.8655 5.33324C27.7722 5.9839 26.5735 6.4399 25.3255 6.68657C24.4863 5.78867 23.374 5.19319 22.1614 4.99268C20.9489 4.79218 19.7041 4.99789 18.6205 5.57784C17.537 6.15779 16.6753 7.07948 16.1697 8.19963C15.664 9.31977 15.5425 10.5756 15.8242 11.7719C13.6067 11.661 11.4375 11.0849 9.45715 10.0811C7.47685 9.07724 5.72982 7.66813 4.3295 5.94524C3.83389 6.7965 3.57344 7.7642 3.57483 8.74924C3.57483 10.6826 4.56017 12.3906 6.05483 13.3906C5.16952 13.3626 4.3037 13.1236 3.5295 12.6932V12.7612C3.52946 14.0491 3.97488 15.2973 4.79021 16.2941C5.60554 17.291 6.74058 17.9752 8.00283 18.2306C7.18102 18.4535 6.31922 18.4864 5.48283 18.3266C5.83873 19.4351 6.53245 20.4045 7.46683 21.0991C8.40121 21.7937 9.52944 22.1786 10.6935 22.1999C9.53664 23.1085 8.21201 23.7801 6.79538 24.1764C5.37874 24.5727 3.89788 24.6858 2.4375 24.5092C4.98646 26.1484 7.95364 27.0187 10.9842 27.0159C21.2428 27.0159 26.8508 18.5186 26.8508 11.1492C26.8508 10.9092 26.8455 10.6666 26.8348 10.4279C27.926 9.63905 28.8679 8.66199 29.6162 7.54257" fill="#172B4D" />
            </svg>
            <svg className="button__icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.0972 2.66675H11.9172C4.4425 2.66675 2.6665 4.44408 2.6665 11.9028V20.0841C2.6665 27.5561 4.4305 29.3334 11.9025 29.3334H20.0838C27.5558 29.3334 29.3332 27.5694 29.3332 20.0974V11.9174C29.3332 4.44275 27.5692 2.66675 20.0972 2.66675ZM24.1945 21.6934H22.2492C21.5132 21.6934 21.2918 21.0974 19.9718 19.7774C18.8198 18.6668 18.3332 18.5281 18.0412 18.5281C17.6385 18.5281 17.5278 18.6388 17.5278 19.1948V20.9441C17.5278 21.4174 17.3745 21.6948 16.1385 21.6948C14.939 21.6141 13.7757 21.2497 12.7446 20.6315C11.7135 20.0132 10.8441 19.1589 10.2078 18.1388C8.6974 16.2587 7.64643 14.0523 7.1385 11.6947C7.1385 11.4028 7.24917 11.1388 7.80517 11.1388H9.75051C10.2505 11.1388 10.4305 11.3614 10.6252 11.8748C11.5692 14.6534 13.1798 17.0694 13.8332 17.0694C14.0838 17.0694 14.1932 16.9588 14.1932 16.3334V13.4721C14.1105 12.1667 13.4172 12.0561 13.4172 11.5841C13.4261 11.4596 13.4831 11.3435 13.5762 11.2603C13.6693 11.1772 13.7911 11.1336 13.9158 11.1388H16.9718C17.3892 11.1388 17.5278 11.3468 17.5278 11.8468V15.7081C17.5278 16.1254 17.7078 16.2641 17.8332 16.2641C18.0838 16.2641 18.2772 16.1254 18.7358 15.6668C19.721 14.4653 20.5259 13.1269 21.1252 11.6934C21.1864 11.5212 21.3023 11.3738 21.4552 11.2737C21.6081 11.1735 21.7895 11.1261 21.9718 11.1388H23.9172C24.4998 11.1388 24.6238 11.4307 24.4998 11.8468C23.7925 13.4313 22.9173 14.9355 21.8892 16.3334C21.6798 16.6534 21.5958 16.8201 21.8892 17.1948C22.0825 17.4868 22.7638 18.0561 23.2225 18.5974C23.889 19.2623 24.4426 20.0315 24.8612 20.8748C25.0278 21.4161 24.7492 21.6934 24.1945 21.6934Z" fill="#172B4D" />
            </svg>
          </button>
        </section>
        <section className="news-detail__comments comments">
          <h3 className="comments__header">Пікірлер ({comments.length})</h3>
          <ul className="comments__list">
            {comments.map((comment) => (
              <Comment
                className="comments__item"
                id={comment.id}
                body={comment.body}
                avatarLink={comment.avatarLink}
                email={comment.email}
                date={comment.date}
                removeComment={removeComment}
                saveCommentChanges={saveCommentChanges}
              />
            ))}
          </ul>
          <div className="comments__comment-uploader comment-uploader">
            <textarea
              className="comment-uploader__textarea"
              value={uploaderText}
              onChange={handleUploaderTextChange}
              placeholder="Пікіріңізді жазыңыз..."
            />
            <button className="comment-uploader__button" onClick={commentUpload}>Қосу</button>
          </div>
        </section>
        
      </article>
      <ul className="related-news-list _container">
        {relatedPosts.map((relatedPost) => (
          <li key={`post-${relatedPost.id}`} className="related-news-list__item">
            <ScrollToTopLink to={`/news-magzhan-kz/news/${relatedPost.id}`}>
              <Card title={relatedPost.title} tag={relatedPost.tag} date={relatedPost.date} imageLink={relatedPost.imageLink} styleVersion={relatedPost.styleVersion} />
            </ScrollToTopLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsDetail;