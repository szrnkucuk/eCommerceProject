import { useNavigate } from "react-router-dom";
import icecream from "../assets/icecream.png";
import apples from "../assets/apples.png";
import ham from "../assets/ham.png";

const FeatureSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-[1440px] mx-auto bg-[#FAFAFA] py-[60px] flex justify-center">
      <div className="flex flex-wrap justify-center gap-[40px]">
        {/* 🍦 Card 1 — Ice Cream → snacks */}
        <div
          onClick={() => navigate("/shop/category/snacks")}
          className="bg-white w-[370px] h-[290px] shadow-sm flex justify-between items-center px-[20px] rounded-md hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col items-start gap-2">
            <p className="text-gray-500 text-[14px]">Fresh Today</p>
            <h3 className="text-[24px] font-bold text-gray-800 leading-[32px]">
              Ice Cream Lovers
            </h3>
            <p className="text-[14px] text-gray-500">
              Sweet moments start here
            </p>
          </div>
          <img
            src={icecream}
            alt="Ice Cream"
            className="w-[140px] h-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 🍎 Card 2 — Fresh Fruits → fruits */}
        <div
          onClick={() => navigate("/shop/category/fruits")}
          className="bg-white w-[370px] h-[290px] shadow-sm flex justify-between items-center px-[20px] rounded-md hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col items-start gap-2">
            <p className="text-gray-500 text-[14px]">Weekly Picks</p>
            <h3 className="text-[24px] font-bold text-gray-800 leading-[32px]">
              Fresh & Organic
            </h3>
            <p className="text-[14px] text-gray-500">
              Picked today, delivered tomorrow
            </p>
          </div>
          <img
            src={apples}
            alt="Apples"
            className="w-[140px] h-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 🍖 Card 3 — Bakery → bakery */}
        <div
          onClick={() => navigate("/shop/category/meat")}
          className="bg-white w-[370px] h-[290px] shadow-sm flex justify-between items-center px-[20px] rounded-md hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col items-start gap-2">
            <p className="text-gray-500 text-[14px]">Limited Offer</p>
            <h3 className="text-[24px] font-bold text-gray-800 leading-[32px]">
              Butcher’s Corner
            </h3>
            <p className="text-[14px] text-gray-500">
              Premium cuts for your table
            </p>
          </div>
          <img
            src={ham}
            alt="Ham"
            className="w-[140px] h-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
