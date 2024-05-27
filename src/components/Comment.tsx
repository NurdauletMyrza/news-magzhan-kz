import React, { useState } from "react";
import UploadDate from "./UploadDate";
import "../styles/Comment.css";

interface CommentProps {
  id: number;
  body: string;
  avatarLink: string;
  email: string;
  date: Date;
  saveCommentChanges: (id: number, body: string) => void;
  removeComment: (id: number) => void;
  className: string;
}

const Comment: React.FC<CommentProps> = ({ id, body, avatarLink, email, date, saveCommentChanges, removeComment, className }) => {
  const [editerText, setEditerText] = useState(body);
  const [isOnEditMode, setIsOnEditMode] = useState(false);

  function handleEditerTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setEditerText(event.target.value);
  }

  function editComment(id: number) {
    setIsOnEditMode(true);
  }

  function confirmCommentChanges() {
    saveCommentChanges(id, editerText);
    setIsOnEditMode(false);
  }

  function cancelCommentChanges() {
    setEditerText(body);
    setIsOnEditMode(false);
  }

  return (
    <li key={`comment-${id}`} className={`${className} comment`}>
      <div className="comment__left-side">
        <div className="comment__avatar" style={{backgroundImage: `url(${avatarLink})`}}></div>
      </div>
      <div className="comment__right-side">
        <h4 className="comment__header">
          {email} <UploadDate className="comment__date" date={date} />
        </h4>
        {!isOnEditMode && (
          <>
            <p className="comment__text">
              {body}
            </p>
            <div className="comment__actions">
              <button className="comment__button edit-button" onClick={() => editComment(id)}>
                <svg className="comment__button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.70344 15.1566L1.94344 20.4366C1.88237 20.8813 2.0337 21.3289 2.35212 21.6454C2.67053 21.9618 3.11907 22.1104 3.56343 22.0466L8.84344 21.2866C9.55914 21.1879 10.2229 20.8578 10.7334 20.3466L20.4734 10.5966C21.7732 9.34119 22.2945 7.48218 21.8369 5.73403C21.3793 3.98588 20.0141 2.62066 18.266 2.16308C16.5178 1.7055 14.6588 2.22678 13.4034 3.52656L3.64343 13.2666C3.13223 13.7771 2.80211 14.4409 2.70344 15.1566ZM13.2934 11.7666C13.0006 12.059 12.5263 12.059 12.2334 11.7666C11.941 11.4737 11.941 10.9994 12.2334 10.7066L16.4434 6.49656C16.7389 6.22121 17.1994 6.22933 17.4851 6.51494C17.7707 6.80056 17.7788 7.26105 17.5034 7.55656L13.2934 11.7666Z" fill="#172B4D" />
                </svg>
              </button>
              <button className="comment__button delete-button" onClick={() => removeComment(id)}>
                <svg className="comment__button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.75 5H16.08L14.87 3.68C14.4271 3.24459 13.8311 3.00041 13.21 3H10.29C9.65816 3.00529 9.05413 3.26056 8.61 3.71L7.42 5H4.75C4.33579 5 4 5.33579 4 5.75C4 6.16421 4.33579 6.5 4.75 6.5H18.75C19.1642 6.5 19.5 6.16421 19.5 5.75C19.5 5.33579 19.1642 5 18.75 5ZM9.69 4.74C9.8496 4.58138 10.065 4.49163 10.29 4.49H13.21C13.4257 4.48936 13.6334 4.57171 13.79 4.72L14.04 4.99H9.46L9.69 4.74Z" fill="#172B4D" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.23 9.52V17C4.23 19.4632 6.22681 21.46 8.69 21.46H14.81C17.2732 21.46 19.27 19.4632 19.27 17V9.52C19.27 8.41543 18.3746 7.52 17.27 7.52H6.27C5.73267 7.50925 5.21363 7.71521 4.82986 8.09145C4.44609 8.4677 4.22989 8.98256 4.23 9.52ZM9.5 13.05C9.5 13.4642 9.16421 13.8 8.75 13.8C8.33579 13.8 8 13.4642 8 13.05V10.68C8 10.2658 8.33579 9.93 8.75 9.93C9.16421 9.93 9.5 10.2658 9.5 10.68V13.05ZM11.75 17.75C12.1642 17.75 12.5 17.4142 12.5 17V10.68C12.5 10.2658 12.1642 9.93 11.75 9.93C11.3358 9.93 11 10.2658 11 10.68V17C11 17.4142 11.3358 17.75 11.75 17.75ZM15.5 13.05C15.5 13.4642 15.1642 13.8 14.75 13.8C14.3358 13.8 14 13.4642 14 13.05V10.68C14 10.2658 14.3358 9.93 14.75 9.93C15.1642 9.93 15.5 10.2658 15.5 10.68V13.05Z" fill="#172B4D" />
                </svg>
              </button>
            </div>
          </>
        )}
        {isOnEditMode && (
          <div className="comment__editer">
            <textarea
              className="comment__textarea"
              value={editerText}
              onChange={handleEditerTextChange}
              placeholder="Пікіріңізді жазыңыз..."
            />
            <div className="comment__editer-buttons">
              <button className="comment__button save-button" onClick={confirmCommentChanges}>✅</button>
              <button className="comment__button cancel-button" onClick={cancelCommentChanges}>❎</button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

export default Comment;