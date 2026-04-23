import React from "react";
import HeroIngredients from "./helpers/HeroIngredients";
import FeaturedSection from "./helpers/FeatureSection";
import TransformationsSection from "./helpers/TransformationsSection";
import CatalogSection from "./helpers/CatalogSection";
import HowItWorksSection from "./helpers/HowItWorks";
import ProductSpotlightSection from "./helpers/ProductSpotlightSection";
import BestSellersSection from "./helpers/BestSellerSection";
import TestimonialsSection from "./helpers/TestiomonialsSection";
import WhyChooseSection from "./helpers/WhyChooseUs";
import BannerSection from "./helpers/BannerSection";
import CategoriesSection from "./helpers/FaceBodySkin";

type Props = {};

const Main = (props: Props) => {
  return (
    <>
      <HeroIngredients />
      <FeaturedSection />
      <TransformationsSection />
      <CatalogSection />
      <HowItWorksSection />
      <ProductSpotlightSection />
      <BestSellersSection />
      <TestimonialsSection />
      <CategoriesSection />
      <WhyChooseSection />
      {/* <BannerSection /> */}
    </>
  );
};

export default Main;
