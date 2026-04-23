import React from "react";
import HeroIngredients from "./helpers/HeroIngredients";
import FeaturedSection from "./helpers/FeatureSection";
import TransformationsSection from "./helpers/TransformationsSection";
import CatalogSection from "./helpers/CatalogSection";
import HowItWorksSection from "./helpers/HowItWorks";
import ProductSpotlightSection from "./helpers/ProductSpotlightSection";

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
    </>
  );
};

export default Main;
