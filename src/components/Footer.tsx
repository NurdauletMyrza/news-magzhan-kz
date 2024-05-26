// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { TagProps } from '../types';
import { getTags } from '../services/api';

const Footer: React.FC<TagProps> = ({ selectedTag, setSelectedTag }) => {
  const tags = getTags();
  
  return (
    <footer>
      <nav>
        <div>
          {tags.map((tag) => (
            <Link to={`/tag/#${tag}`}>
              <label key={tag}>
              <input
                type="radio"
                value={tag}
                checked={selectedTag === tag}
              />
                {tag}
              </label>
            </Link>
          ))}
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
