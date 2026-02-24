import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import CategoryMattress from "../components/CategoryMattress";
import PressSection from "../components/PressSection";
import WhyBuySection from "../components/WhyBuySection";

const Home = () => {
  return (
    <div>
      <Hero />
      <BestSeller />
      <CategoryMattress />
      <PressSection />
      <WhyBuySection />
    </div>
  );
};

export default Home;
