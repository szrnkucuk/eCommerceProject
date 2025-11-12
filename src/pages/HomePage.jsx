import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import PopularSection from "../components/PopularSection";
import PopularRightSection from "../components/PopularRightSection";
import LogoSection from "../components/LogoSection";
import FeaturedPosts from "../components/FeaturedPosts";
import BestSellerSection from "../components/BestSellerSection";
import BestSellerRightSection from "../components/BestSellerRightSection";
import BestSellerBottomSection from "../components/BestSellerBottomSection";


const HomePage = () => {
    return (
    <>    
      <HeroSection />
      <FeatureSection />
      <BestSellerSection />
      <PopularSection />
      <BestSellerRightSection />
      <PopularRightSection />
      <BestSellerBottomSection />
      <LogoSection />
      <FeaturedPosts />

    </>
  );
}

export default HomePage;
