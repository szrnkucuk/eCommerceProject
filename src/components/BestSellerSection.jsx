import yellowCard from "../assets/yellowcard.jpg";
import icecream2 from "../assets/icecream2.png";
import apples2 from "../assets/apples2.png";
import ham2 from "../assets/ham2.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BestSellerSection = () => {
  return (
    <section className="w-full max-w-[1440px] mx-auto bg-white py-[60px] flex gap-[30px] px-[80px]">
      {/* Sol Sarı Görsel */}
      <div className="relative w-[370px] h-[720px] rounded-md overflow-hidden">
        <img
          src={yellowCard}
          alt="Yellow Card"
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute top-[40px] left-[40px] text-gray-800">
          <h5 className="text-[14px] font-semibold tracking-[1px]">FURNITURE</h5>
          <p className="text-[14px] text-gray-600 mt-1">5 Items</p>
        </div>
      </div>

      {/* Sağ Ürün Alanı */}
      <div className="flex-1 flex flex-col">
        {/* Üst Başlık + Kategoriler */}
        <div className="flex items-center justify-between mb-[30px]">
          <div className="flex items-center gap-6">
            <h2 className="text-[24px] font-bold text-gray-800">
              BESTSELLER PRODUCTS
            </h2>
            <nav className="flex gap-6 text-[16px] font-medium">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition">Men</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition">
                Women
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition">
                Accessories
              </a>
            </nav>
          </div>

          {/* Oklar */}
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Ürün Grid */}
        <div className="grid grid-cols-3 gap-y-[40px] gap-x-[20px]">
          {[icecream2, apples2, ham2, icecream2, apples2, ham2].map((img, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-2"
            >
              <img
                src={img}
                alt="Product"
                className="w-[140px] h-[140px] object-contain"
              />
              <h3 className="font-bold text-[16px] text-gray-800">
                Graphic Design
              </h3>
              <p className="text-[14px] text-gray-500">English Department</p>
              <div className="flex gap-2 text-[14px]">
                <span className="text-gray-400 line-through">$16.48</span>
                <span className="text-green-600 font-semibold">$6.48</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellerSection;
