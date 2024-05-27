import React from "react";
import { Link } from "react-router-dom";
// import { UpdatedPost } from "../types";

interface CardProps {
  id: number;
  title: string;
  tag: string;
  date: Date;
  imageLink: string;
}

const Card: React.FC<CardProps> = ({ id, title, tag, date, imageLink}) => {
  return (
    <div className="card">
      <Link to={`/news/${id}`}>
        <div className="card-image" style={{ backgroundImage: `url(${imageLink})` }}></div>
        <div className="card-content">
          <h2>{title}</h2>
          <p>{tag}</p>
          <p>{date.toDateString()}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
