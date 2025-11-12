import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import contactImg from "../assets/contact.png"; 

const ContactPage = () => {
  return (
    <section className="flex flex-col items-center justify-center py-16 bg-gray-50">
      {/* Banner */}
      <div
        className="w-full h-[300px] flex items-center justify-center bg-cover bg-center text-white font-bold text-4xl"
        style={{ backgroundImage: `url(${contactImg})` }}
      >
      </div>

      {/* İçerik */}
      <div className="w-[1200px] mt-12 grid grid-cols-2 gap-12">
        {/* Sol Kısım: Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Sağ Kısım: Bilgi Kartları */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 bg-white p-5 rounded-lg shadow">
            <MapPin className="w-6 h-6 text-blue-500" />
            <div>
              <h4 className="font-semibold text-gray-800">Our Address</h4>
              <p className="text-gray-600">5407 Washington Ankara Ave.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-5 rounded-lg shadow">
            <Phone className="w-6 h-6 text-blue-500" />
            <div>
              <h4 className="font-semibold text-gray-800">Phone</h4>
              <p className="text-gray-600">+90(506) 697 2237</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-5 rounded-lg shadow">
            <Mail className="w-6 h-6 text-blue-500" />
            <div>
              <h4 className="font-semibold text-gray-800">Email</h4>
              <p className="text-gray-600">sezerin@groceryshop.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
