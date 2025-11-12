import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategorySlug } from "../../redux/productReducer";

import fruitsImg from "../../assets/image1.png";
import meatImg from "../../assets/image2.png";
import snacksImg from "../../assets/image3.png";
import bakeryImg from "../../assets/image4.png";
import drinksImg from "../../assets/image5.png";
import { allProducts } from "../../data/products";

const CategorySection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = [
    { id: 1, name: "Fruits & Vegetables", slug: "fruits", image: fruitsImg },
    { id: 2, name: "Meat & Chicken", slug: "meat", image: meatImg },
    { id: 3, name: "Snacks", slug: "snacks", image: snacksImg },
    { id: 4, name: "Bakery & Patisserie", slug: "bakery", image: bakeryImg },
    { id: 5, name: "Drinks", slug: "drinks", image: drinksImg },
  ];

  return (
    <section className="py-10 flex justify-center bg-white">
      <div className="w-[1440px] flex justify-center gap-6">
        {categories.map((cat) => {
          const itemCount = allProducts.filter((p) => p.category === cat.slug).length;
          return (
            <div
              key={cat.id}
              onClick={() => {
                // 🔹 Redux’a seçilen kategori yaz
                dispatch(setCategorySlug(cat.slug));
                // 🔹 Sayfaya yönlendir
                navigate(`/shop/category/${cat.slug}`);
              }}
              className="relative w-[260px] h-[270px] cursor-pointer overflow-hidden rounded-md hover:scale-105 transition-transform duration-300"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white font-bold">
                <h3 className="text-lg">{cat.name.toUpperCase()}</h3>
                <p className="text-sm font-normal">{itemCount} Items</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
