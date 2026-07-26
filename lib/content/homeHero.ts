export type HeroContent = {
  eyebrow: string;
  headline: string;
  taglines: string[];
  body: string;
  backgroundImages: string[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export const defaultHeroContent: HeroContent = {
  eyebrow: "Clean, Potent Skincare",
  headline: "Your Glow,",
  taglines: ["Backed by Science", "Made for Real Skin", "Radiant Every Day"],
  body: "Brightening, hydrating, and renewing formulas made with kojic acid, niacinamide, and hyaluronic acid.",
  backgroundImages: [
    "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381863/naya-glows/legacy/img_6323.jpg",
    "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381919/naya-glows/legacy/new/img_7421.jpg",
    "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381927/naya-glows/legacy/new/img_7558.jpg",
    "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381938/naya-glows/legacy/new/img_7563.jpg",
    "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381863/naya-glows/legacy/img_6323.jpg",
    "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381942/naya-glows/legacy/new/img_7564.jpg",
    "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381946/naya-glows/legacy/new/img_7565.jpg",
  ],
  primaryCtaLabel: "Shop Now",
  primaryCtaHref: "/catalog",
  secondaryCtaLabel: "Our Story",
  secondaryCtaHref: "/our-story",
};
