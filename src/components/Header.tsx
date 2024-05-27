import React from "react";
import { Link } from "react-router-dom";
import { getTags } from "../services/api";
import { TagProps } from "../types";
import "../styles/Header.css";


const Header: React.FC<TagProps> = ({ selectedTag, setSelectedTag }) => {
  const tags = getTags();

  return (
    <header className="header">
      <nav className="header__navigation navigation _container">
        <div className="navigation__head">
          <span className="navigation__quote">Мен жастарға сенемін</span>
          <span className="navigation__logo-link"><Link to="/news-magzhan-kz">Magzhan.kz</Link></span>
          <span className="navigation__author">Мағжан Жұмабаев</span>
        </div>
        <div className="navigation__menu">
          <ul className="navigation__tags">
            {tags.map((tag) => (
              <Link key={`tag-${tag}`} to={`/news-magzhan-kz/tag/#${tag}`}>
                <li className="navigation__tag">
                  {tag}
                </li>
              </Link>
            ))}
          </ul>
          <div className="search-bar">
            <input className="search-bar__text-input" type="search" name="search" id="search" placeholder="іздеу" />
            <label className="search-bar__label" htmlFor="search">
              <svg className="search-bar__icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="16" fill="white" />
                <path d="M23.7832 22.3911L28 26.6069L26.6069 28L22.3911 23.7832C20.8224 25.0407 18.8713 25.7246 16.8609 25.7218C11.9697 25.7218 8 21.7521 8 16.8609C8 11.9697 11.9697 8 16.8609 8C21.7521 8 25.7218 11.9697 25.7218 16.8609C25.7246 18.8713 25.0407 20.8224 23.7832 22.3911ZM21.8082 21.6605C23.0577 20.3756 23.7555 18.6532 23.7527 16.8609C23.7527 13.0537 20.6681 9.96909 16.8609 9.96909C13.0537 9.96909 9.96909 13.0537 9.96909 16.8609C9.96909 20.6681 13.0537 23.7527 16.8609 23.7527C18.6532 23.7555 20.3756 23.0577 21.6605 21.8082L21.8082 21.6605Z" fill="#172B4D" />
              </svg>
            </label>
          </div>
        </div>
        
        
      </nav>
    </header>
  );
};

export default Header;
