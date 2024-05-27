import React from "react";
import "../styles/Card.css";
import Tag from "./Tag";
import UploadDate from "./UploadDate";

interface CardProps {
  title: string;
  tag: string;
  date: Date;
  imageLink: string;
  styleVersion: number;
}

const Card: React.FC<CardProps> = ({ title, tag, date, imageLink, styleVersion }) => {
  if (imageLink === undefined) {
    styleVersion = 3;
  }
  
  switch (styleVersion) {
    case 1:
      return (
        <div className={`card card-${styleVersion}`} style={{ backgroundImage: `url(${imageLink})`}}>
          <div className="card__content">
            <Tag className="card__tag" tag={tag} />
            <h4 className="card__title">{title}</h4>
          </div>
          <UploadDate className="card__date" date={date} />
        </div>
      );
    case 2:
      return (
        <div className={`card card-${styleVersion}`}>
          <div className="card__image" style={{ backgroundImage: `url(${imageLink})`}}></div>
          <div className="card__content">
            <Tag className="card__tag" tag={tag} />
            <h4 className="card__title">{title}</h4>
          </div>
          <UploadDate className="card__date" date={date} />
        </div>
      );
  }
  return (
    <div className="card">
      <div className="card__content">
        <Tag className="card__tag" tag={tag} />
        <h4 className="card__title">{title}</h4>
      </div>
      <UploadDate className="card__date" date={date} />
    </div>
  );
};

export default Card;
