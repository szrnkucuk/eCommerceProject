import womanBurger from "../assets/girl.jpg";
import cashew from "../assets/caramel.jpg";
import { Download } from "lucide-react";

const PopularRightSection = () => {
  return (
    <section className="w-[1069px] h-[784px] flex justify-between items-center mx-auto my-[80px]">
      {/* Sol - MOST POPULAR Kartı */}
      <div className="w-[401px] h-[784px] flex flex-col items-center justify-center bg-[#FAFAFA] py-[80px] gap-[30px] rounded-md shadow-sm">
        <h2 className="text-[24px] font-bold text-gray-800 tracking-[0.2px]">
          MOST POPULAR
        </h2>

        <p className="text-gray-500 text-[16px] leading-[24px] text-center max-w-[280px]">
          We focus on ergonomics and meeting you where you work. It’s only a
          keystroke away.
        </p>

        {/* Ürün Görseli */}
        <img
          src={cashew}
          alt="Caramel Cashew"
          className="w-[220px] h-auto object-contain"
        />

        {/* Ürün Bilgileri */}
        <p className="font-semibold text-gray-800">English Department</p>

        <div className="flex items-center justify-center gap-2 text-gray-500 text-[14px]">
          <Download className="w-4 h-4" />
          <span>15 Sales</span>
        </div>

        {/* Fiyat Bilgisi */}
        <div className="flex gap-2 text-[14px]">
          <span className="text-gray-400 line-through">$16.48</span>
          <span className="text-green-600 font-semibold">$6.48</span>
        </div>

        {/* Renk Noktaları */}
        <div className="flex gap-2 mt-[10px]">
          <span className="w-3 h-3 rounded-full bg-blue-600"></span>
          <span className="w-3 h-3 rounded-full bg-orange-400"></span>
          <span className="w-3 h-3 rounded-full bg-gray-700"></span>
          <span className="w-3 h-3 rounded-full bg-teal-500"></span>
        </div>
      </div>

      {/* Sağ - Görsel */}
      <div className="w-[674px] h-[784px] flex flex-col gap-[35px]">
        <img
          src={womanBurger}
          alt="Woman eating burger"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    </section>
  );
};

export default PopularRightSection;
