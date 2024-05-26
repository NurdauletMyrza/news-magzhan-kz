// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { getTags } from "../services/api";
import { TagProps } from "../types";


const Header: React.FC<TagProps> = ({ selectedTag, setSelectedTag }) => {
  const tags = getTags();

  return (
    <header>
      <nav>
        <div>
          <span>Мен жастарға сенемін</span>
          <span><Link to="/">Magzhan.kz</Link></span>
          <span>Мағжан Жұмабаев</span>
        </div>
        <div>
          {tags.map((tag) => (
            <Link to={`/tag/#${tag}`}>
              <label key={tag}>
              <input
                type="radio"
                value={tag}
                checked={selectedTag === tag}
                onChange={(event) => setSelectedTag(event.target.value)}
              />
                {tag}
              </label>
            </Link>
          ))}
        </div>
        
        <input type="text" placeholder="Search news..." />
      </nav>
    </header>
  );
};

export default Header;
