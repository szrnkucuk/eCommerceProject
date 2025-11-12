import deliveryMan from "../assets/deliveryMan.png";
import meat from "../assets/meat.png";

const PopularSection = () => {
  return (
    <section className="w-full max-w-[1440px] mx-auto bg-white py-[80px] flex flex-col items-center px-[80px]">
      {/* Üst Kısım */}
      <div className="flex w-full justify-between items-center mb-[60px]">
        {/* Sol Görsel */}
        <div className="w-[50%] flex justify-center">
          <img
            src={deliveryMan}
            alt="Delivery Man"
            className="w-[500px] h-auto object-cover rounded-md"
          />
        </div>

        {/* Sağ Bilgi Alanı */}
        <div className="w-[40%] flex flex-col items-center text-center">
          <h2 className="text-[24px] font-bold text-gray-800 mb-4">MOST POPULAR</h2>
          <p className="text-gray-500 text-[16px] leading-[24px] mb-8 max-w-[350px]">
            We focus on ergonomics and meeting you where you work. It's only a keystroke away.
          </p>
          <img src={meat} alt="Product" className="w-[220px] h-auto mb-4" />
          <p className="font-semibold text-gray-800">English Department</p>
          <div className="flex gap-2 text-[14px] mt-2">
            <span className="text-gray-400 line-through">$16.48</span>
            <span className="text-green-600 font-semibold">$6.48</span>
          </div>
        </div>
      </div>

      {/* Alt 1-4 numaralı bilgiler */}
      <div className="grid grid-cols-4 gap-[40px] w-full border-t border-gray-200 pt-[40px]">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex flex-col items-start text-left">
            <h3 className="text-[36px] font-bold text-red-600 mb-2">{num}.</h3>
            <h4 className="font-semibold text-[16px] text-gray-800 mb-1">Easy to use</h4>
            <p className="text-gray-500 text-[14px] leading-[20px] max-w-[180px]">
              Things on a very small that you have any direct
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularSection;
