import React from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/shop/ProductGrid";
import ShopFilterBar from "../components/shop/ShopFilterBar";
import { allProducts } from "../data/products";

const CategoryProducts = () => {
  const { slug } = useParams();
  const filteredProducts = allProducts.filter((p) => p.category === slug);

  return (
    <div>
      <ShopFilterBar totalItems={filteredProducts.length} />
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default CategoryProducts;
