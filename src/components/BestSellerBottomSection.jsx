import pitcher from "../assets/blue.png";
import cheese from "../assets/cheese.jpg";
import bleach from "../assets/bleach.jpg";
import werthers from "../assets/werthers.jpg";

const BestSellerBottomSection = () => {
  return (
    <section className="w-full max-w-[1440px] mx-auto bg-[#FAFAFA] py-[80px] flex flex-col items-center">
      {/* Başlık */}
      <h2 className="text-[24px] font-bold text-gray-800 mb-[50px]">
        BESTSELLER PRODUCTS
      </h2>

      {/* Ürün Grid */}
      <div className="grid grid-cols-4 gap-[40px]">
        {[pitcher, cheese, bleach, werthers].map((img, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-[20px] rounded-md shadow-sm hover:shadow-md transition-all duration-300"
          >
            <img
              src={img}
              alt="Product"
              className="w-[180px] h-[180px] object-contain mb-4"
            />
            <h3 className="text-[16px] font-bold text-gray-800">
              Graphic Design
            </h3>
            <p className="text-[14px] text-gray-500">English Department</p>
            <div className="flex gap-2 text-[14px] mt-2">
              <span className="text-gray-400 line-through">$16.48</span>
              <span className="text-green-600 font-semibold">$6.48</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellerBottomSection;
