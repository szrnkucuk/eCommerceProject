import { useState } from "react";
import post1 from "../assets/post1.jpg";
import post2 from "../assets/post2.jpg";
import post3 from "../assets/post3.jpg";
import { Clock, BarChart3, ArrowRight } from "lucide-react";

const FeaturedPosts = () => {
  
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  
  const PostCard = ({ image }) => {
    const [activeTag, setActiveTag] = useState("Google");

    return (
      <div className="w-[328px] h-[606px] bg-white shadow-md border border-[#E6E6E6] rounded-sm overflow-hidden hover:shadow-lg transition">
        {/* Görsel */}
        <div className="relative">
          <img
            src={image}
            alt="Loudest à la Madison #1"
            className="w-[348px] h-[300px] object-cover"
          />
          <span className="absolute top-4 left-4 bg-[#E74040] text-white text-[12px] font-bold px-3 py-1 rounded">
            NEW
          </span>
        </div>

        {/* İçerik */}
        <div className="p-6 flex flex-col gap-3">
          {/* Etiketler */}
          <div className="flex gap-3 text-[14px]">
            {["Google", "Trending", "New"].map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)} 
                className={`transition ${
                  activeTag === tag
                    ? "text-[#23A6F0] font-semibold"
                    : "text-[#737373] hover:text-[#23A6F0]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Başlık */}
          <h3 className="text-[#252B42] font-montserrat font-bold text-[20px] leading-[30px]">
            Loudest à la Madison #1 (L’intégral)
          </h3>

          {/* Açıklama */}
          <p className="text-[#737373] text-[14px] leading-[20px]">
            We focus on ergonomics and meeting you where you work. It's only a
            keystroke away.
          </p>

          {/* Tarih & yorum */}
          <div className="flex justify-between text-[14px] text-[#737373] mt-2">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{today}</span>
            </div>

            <a
              href="#comments"
              className="flex items-center gap-1 hover:text-[#23A6F0] transition"
            >
              <BarChart3 size={16} className="text-[#23A6F0]" />
              <span>10 comments</span>
            </a>
          </div>

          {/* Learn More */}
          <button className="flex items-center gap-2 text-[#252B42] font-semibold text-[14px] mt-3 hover:text-[#23A6F0] transition">
            Learn More <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="w-[1440px] h-[994px] bg-white mx-auto flex flex-col items-center pt-[112px] pb-[112px] gap-[80px]">
      {/* Başlık */}
      <div className="flex flex-col items-center gap-[10px] w-[691px] h-[84px] text-center">
        <p className="text-[#23A6F0] font-montserrat font-semibold text-[14px] leading-[24px] tracking-[0.2px]">
          Practice Advice
        </p>
        <h2 className="text-[#252B42] font-montserrat font-bold text-[40px] leading-[50px] tracking-[0.2px]">
          Featured Posts
        </h2>
      </div>

      {/* Kartlar */}
      <div className="flex justify-between w-[1050px]">
        <PostCard image={post1} />
        <PostCard image={post2} />
        <PostCard image={post3} />
      </div>
    </section>
  );
};

export default FeaturedPosts;
