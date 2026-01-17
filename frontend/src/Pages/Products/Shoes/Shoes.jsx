import React from "react";
import CategoryPage from "../../../component/CategoryPage.jsx";

const Shoes = () => {
  return (
    <CategoryPage
      categoryName="shoes"
      categoryTitle="Shoes"
      categoryDescription="Step up your style with our collection of sneakers, boots, and casual footwear."
      categoryImage="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
      categoryIcon="👟"
    />
  );
};

export default Shoes;
