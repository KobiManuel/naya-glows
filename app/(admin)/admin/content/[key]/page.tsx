"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import HeroForm from "../forms/HeroForm";
import IngredientsForm from "../forms/IngredientsForm";
import WhyChooseForm from "../forms/WhyChooseForm";
import HowItWorksForm from "../forms/HowItWorksForm";
import TestimonialsForm from "../forms/TestimonialsForm";
import CategoriesForm from "../forms/CategoriesForm";
import ContactInfoForm from "../forms/ContactInfoForm";
import BranchesForm from "../forms/BranchesForm";
import BestSellersForm from "../forms/BestSellersForm";
import CatalogHeroForm from "../forms/CatalogHeroForm";
import FeaturedProductsForm from "../forms/FeaturedProductsForm";

const forms: Record<string, React.ComponentType> = {
  "home.featuredProducts": FeaturedProductsForm,
  "home.hero": HeroForm,
  "home.ingredients": IngredientsForm,
  "home.whyChoose": WhyChooseForm,
  "home.howItWorks": HowItWorksForm,
  "home.testimonials": TestimonialsForm,
  "home.categories": CategoriesForm,
  "home.bestSellers": BestSellersForm,
  "catalog.hero": CatalogHeroForm,
  "contact.info": ContactInfoForm,
  "business.branches": BranchesForm,
};

export default function AdminContentKeyPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = use(params);
  const Form = forms[key];

  if (!Form) notFound();

  return <Form />;
}
