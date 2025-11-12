// src/components/shop/ProductCard.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const image = product.images?.[0]?.url || product.image || "";
  const handleAdd = () => {
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price, image, quantity: 1 }));
  };

  return (
    <div className="cursor-pointer transition hover:-translate-y-1 hover:shadow-lg bg-white rounded-xl p-4">
      <img src={image} alt={product.name} className="w-full h-44 object-contain mb-3" />
      <h3 className="font-semibold line-clamp-2">{product.name}</h3>
      <p className="text-green-600 font-bold mb-3">${product.price}</p>
      <button
        onClick={(e) => { e.stopPropagation(); handleAdd(); }}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
