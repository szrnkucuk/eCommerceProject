import { Phone, MapPin, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  
  return (
    <footer className="w-[1440px] h-[488px] bg-[#252B42] text-white mx-auto px-[195px] py-[80px] flex flex-col justify-between">
      {/* Üst Başlık + Buton */}
      <div className="flex justify-between items-start mb-[60px]">
        <div>
          <h2 className="font-montserrat font-bold text-[24px] leading-[32px] mb-2">
            Consulting Agency For Your Business
          </h2>
          <p className="text-[#BDBDBD] text-[14px] leading-[20px]">
            the quick fox jumps over the lazy dog
          </p>
        </div>
        <button className="bg-[#23A6F0] text-white font-semibold text-[14px] px-8 py-4 rounded-md hover:bg-[#1E90D6] transition">
          Contact Us
        </button>
      </div>

      {/* Alt Bilgi Sütunları */}
      <div className="flex justify-between">
        {/* Column 1 */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-[16px] mb-2">Company Info</h3>
          <ul className="flex flex-col gap-1 text-[14px] text-[#BDBDBD]">
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <Link to="/contact" className="hover:text-white transition">
                We are hiring
              </Link>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-[16px] mb-2">Features</h3>
          <ul className="flex flex-col gap-1 text-[14px] text-[#BDBDBD]">
            <li><a href="#" className="hover:text-white">Business Marketing</a></li>
            <li><a href="#" className="hover:text-white">User Analytic</a></li>
            <li><a href="#" className="hover:text-white">Live Chat</a></li>
            <li><a href="#" className="hover:text-white">Unlimited Support</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-[16px] mb-2">Resources</h3>
          <ul className="flex flex-col gap-1 text-[14px] text-[#BDBDBD]">
            <li><a href="#" className="hover:text-white">IOS & Android</a></li>
            <li><a href="#" className="hover:text-white">Watch a Demo</a></li>
            <li><a href="#" className="hover:text-white">Customers</a></li>
            <li><a href="#" className="hover:text-white">API</a></li>
          </ul>
        </div>

        {/* Column 4 — Get In Touch */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-[16px] mb-2">Get In Touch</h3>
          <div className="flex flex-col gap-2 text-[14px] text-[#BDBDBD]">
            <div className="flex items-center gap-2">
              <Phone size={18} /> <span>+90(506) 697 2237</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} /> <span>5407 Washington Ankara Ave.</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} /> <span>sezerin@groceryshop.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alt kısım: telif ve sosyal ikonlar */}
      <div className="flex justify-between items-center mt-[60px] border-t border-[#3E4452] pt-[30px]">
        <p className="text-[14px] text-[#BDBDBD]">
          Made With Love By Turkey All Right Reserved
        </p>

        <div className="flex gap-4 text-[#23A6F0]">
          <Facebook className="cursor-pointer hover:text-white transition" size={20} />
          <Instagram className="cursor-pointer hover:text-white transition" size={20} />
          <Twitter className="cursor-pointer hover:text-white transition" size={20} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
