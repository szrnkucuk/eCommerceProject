import React from "react";
import aboutImg from "../assets/about-banner.png"; 

const AboutPage = () => {
  return (
    <section className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <div
        className="w-full h-[400px] flex flex-col justify-center items-center text-center text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutImg})` }}
      >
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="max-w-[700px] text-lg text-white/90">
          Fresh, fast, and reliable grocery delivery — because your time matters.
        </p>
      </div>

      {/* Mission Section */}
      <div className="w-full max-w-[1200px] py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          We aim to make grocery shopping easier, faster, and smarter. 
          Our platform connects customers to local stores, ensuring 
          the freshest products at the best prices — delivered right to your door.
        </p>
      </div>

      {/* Features Section */}
      <div className="w-full bg-gray-50 py-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-8 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-blue-500">🚚 Fast Delivery</h3>
            <p className="text-gray-600">
              Get your groceries delivered in as little as 30 minutes, wherever you are.
            </p>
          </div>
          <div className="p-8 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-green-500">🥬 Fresh Products</h3>
            <p className="text-gray-600">
              We partner with trusted suppliers to guarantee the highest quality items.
            </p>
          </div>
          <div className="p-8 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-yellow-500">💳 Secure Payment</h3>
            <p className="text-gray-600">
              Safe and seamless checkout options for a worry-free shopping experience.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="w-full max-w-[1200px] py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Who We Are</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Founded with the vision of simplifying everyday life, we’ve grown into a 
          trusted grocery delivery brand. Our goal is to bridge the gap between 
          local markets and busy households — one delivery at a time.
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
