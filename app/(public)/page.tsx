import React from "react";
import HeroIngredients from "./helpers/HeroIngredients";
import FeaturedSection from "./helpers/FeatureSection";

type Props = {};

const Main = (props: Props) => {
  return (
    <>
      <HeroIngredients />
      <FeaturedSection />
    </>
  );
};

export default Main;
