export type FeaturedProductCard = {
  image: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export type FeaturedProductsContent = {
  headingLine1: string;
  headingIcon1: string;
  headingLine1Suffix: string;
  headingLine2Prefix: string;
  headingIcon2: string;
  headingLine2Bold: string;
  headingLine2Light: string;
  description: string;
  label: string;
  // Fixed at exactly 2 — the layout's 3rd slot is a distinct lifestyle
  // image card (see lifestyle* fields below), not another product card.
  cards: [FeaturedProductCard, FeaturedProductCard];
  lifestyleImage: string;
  lifestyleBadge: string;
  lifestyleText: string;
  disclaimer: string;
};

export const defaultFeaturedProductsContent: FeaturedProductsContent = {
  headingLine1: "Your Daily Skincare",
  headingIcon1: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381853/naya-glows/legacy/img_6205.jpg",
  headingLine1Suffix: "Essentials",
  headingLine2Prefix: "Gentle care.",
  headingIcon2: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381873/naya-glows/legacy/img_6326.jpg",
  headingLine2Bold: "Visible",
  headingLine2Light: "results",
  description:
    "Reveal refreshed, glowing skin with our top brightening and hydrating treatments, designed for daily beauty.",
  label: "Featured Products",
  cards: [
    {
      image: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381853/naya-glows/legacy/img_6205.jpg",
      title: "Radiance Boost Serum",
      description:
        "Brightens skin tone, evens complexion, and provides deep lasting hydration with Niacinamide & Hyaluronic Acid.",
      primaryCtaLabel: "Get Started",
      primaryCtaHref: "/products/radiance-boost-serum",
      secondaryCtaLabel: "Learn More",
      secondaryCtaHref: "/products/radiance-boost-serum",
    },
    {
      image: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381835/naya-glows/legacy/19ea7a51-adb2-4a49-bcb7-0bbc0116f4f2.png",
      title: "Exfoliating Body Scrub",
      description:
        "Gently exfoliates dead skin, brightens dull skin, and smooths rough texture with Kojic Acid & Lemon.",
      primaryCtaLabel: "Get Started",
      primaryCtaHref: "/products/exfoliating-body-scrub",
      secondaryCtaLabel: "Learn More",
      secondaryCtaHref: "/products/exfoliating-body-scrub",
    },
  ],
  lifestyleImage: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381858/naya-glows/legacy/img_6322.jpg",
  lifestyleBadge: "Skin Health",
  lifestyleText: "Confidence starts with skincare",
  disclaimer:
    "Results may vary. Consistent use helps improve skin texture, hydration, and tone.",
};
