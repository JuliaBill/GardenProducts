import React from "react";
import { useFetchCategoriesQuery } from "../../../store/slices/apiSlice";

import s from "./CategoryContainer.module.css";
import CategoryItem from "../categoryItem/CategoryItem";

const CategoryContainer = ({ limitDisplay = true }) => {
  const { data: categories } = useFetchCategoriesQuery();
  console.log(categories);

  const displayedCategories = limitDisplay
    ? categories.slice(0, 4)
    : categories;

  return (
    <div className={s.categories_container}>
      {displayedCategories.map((category) => (
        <CategoryItem key={category.id} {...category} />
      ))}
    </div>
  );
};

export default CategoryContainer;
