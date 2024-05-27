import React from 'react';
import { Link } from 'react-router-dom';
import { TagProps } from '../types';
import { getTags } from '../services/api';
import "../styles/Footer.css";

const Footer: React.FC<TagProps> = ({ selectedTag, setSelectedTag }) => {
  const tags = getTags();
  
  return (
    <footer className="footer ">
      <section className="footer__tags _container">
        {tags.map((tag) => (
          <Link key={`tag2-${tag}`} to={`/news-magzhan-kz/tag/#${tag}`}>
            <span className="footer__tag">
              {tag}
            </span>
          </Link>
        ))}
      </section>
      <section className="footer__contacts">
        <span className="footer__text">
          Байлыныс үшін: magzhankz@gmail.com
        </span>
      </section>
      <section className="footer__privacy">
        <span className="footer__text">
          Барлық құқықтар сақталған@2024
        </span>
      </section>
    </footer>
  );
};

export default Footer;
