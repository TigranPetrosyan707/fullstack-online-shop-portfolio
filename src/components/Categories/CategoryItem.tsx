import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type TCategoryItemProps = {
   category: string;
};

const CategoryItem: FC<TCategoryItemProps> = ({ category }) => {
   // return <Link to={`/shop/${category.toLowerCase()}`}>{category}</Link>;
   return (
      <Link to={`/shop/${category.toLowerCase()}`}>
         <h1>{category}</h1>
      </Link>
   );
};

export default CategoryItem;
