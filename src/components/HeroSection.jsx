import { ChevronLeft, ChevronRight } from "lucide-react";
import heroImg from "../assets/homepage.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate(); 

  return (
    <section
      className="relative h-[90vh] flex flex-col justify-center items-center text-center text-white overflow-hidden"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
  
      <div className="z-10 flex flex-col justify-center items-center">
        <h1 className="font-bold text-[60px] leading-[80px] tracking-[0.2px] text-center text-green-900">
          GROCERIES DELIVERY
        </h1>

        <h4 className="font-normal text-[20px] leading-[30px] tracking-[0.2px] text-center max-w-[600px] mt-4  text-green-900">
          From our store to your home — fresh, fast, and easy.
        </h4>

    
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center justify-center gap-[10px] w-[204px] h-[62px] bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md tracking-[0.2px] mt-8 transition"
        >
          Start Now
        </button>
      </div>

  
      <button className="absolute left-[60px] top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur-sm transition">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

  
      <button className="absolute right-[60px] top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur-sm transition">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

    
      <div className="absolute bottom-[40px] flex gap-3">
        <span className="w-[60px] h-[4px] bg-white/70 rounded-full"></span>
        <span className="w-[30px] h-[4px] bg-white/40 rounded-full"></span>
        <span className="w-[30px] h-[4px] bg-white/40 rounded-full"></span>
      </div>
    </section>
  );
};

export default HeroSection;
