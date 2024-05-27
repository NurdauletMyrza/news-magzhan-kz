import React from "react";
import { Link } from "react-router-dom";
import { LinkProps } from "react-router-dom";

const ScrollToTopLink: React.FC<LinkProps> = ({ children, ...props }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    window.scrollTo(0, 0);
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default ScrollToTopLink;