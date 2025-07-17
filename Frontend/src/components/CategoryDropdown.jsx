import React from 'react';
import { Link } from 'react-router-dom';

const CategoryDropdown = ({ categories }) => {
  return (
    <ul className="category-menu">
      {categories.map((category) => (
        <li className="category-item" key={category.id}>
          <Link to={`/categories/${category.id}/products`} className="category-link">
            {category.name}
          </Link>

          {category.children && category.children.length > 0 && (
            <ul className="subcategory-menu">
              <CategoryDropdown categories={category.children} />
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CategoryDropdown;
