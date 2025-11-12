// src/components/shop/ProductGrid.jsx
import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [] }) => {
  return (
    <section className="py-10 flex justify-center">
      <div className="w-[1440px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No results</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};

// 👇👇 Burası çok önemli
export default ProductGrid;
