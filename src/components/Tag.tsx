import React from "react";
import { getTags } from "../services/api";

interface TagProps {
  className: string;
  tag: string;
}

const Tag: React.FC<TagProps> = ({ className, tag }) => {
  const tags = getTags();
  const number = tags.indexOf(tag) + 1;

  return (
    <span className={`tag tag_${number} ${className}`}>{tag}</span>
  );
};

export default Tag;