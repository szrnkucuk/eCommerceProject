
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import BestsellerSection from "../components/BestSellerSection";
import PopularSection from "../components/PopularSection";
import BestsellerRightSection from "../components/BestsellerRightSection";
import PopularRightSection from "../components/PopularRightSection";
import BestsellerBottomSection from "../components/BestsellerBottomSection";
import LogoSection from "../components/LogoSection";
import FeaturedPosts from "../components/FeaturedPosts";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
    <>    
      <HeroSection />
      <FeatureSection />
      <BestsellerSection />
      <PopularSection />
      <BestsellerRightSection />
      <PopularRightSection />
      <BestsellerBottomSection />
      <LogoSection />
      <FeaturedPosts />

    </>
  );
}

export default HomePage;
