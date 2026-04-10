import React from "react";
import HeroIngredients from "./helpers/HeroIngredients";
import FeaturedSection from "./helpers/FeatureSection";
import TransformationsSection from "./helpers/TransformationsSection";
import CatalogSection from "./helpers/CatalogSection";

type Props = {};

const Main = (props: Props) => {
  return (
    <>
      <HeroIngredients />
      <FeaturedSection />
      <TransformationsSection />
      <CatalogSection />
    </>
  );
};

export default Main;
