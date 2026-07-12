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
    "/images/img_6323.jpg",
    "/images/new/IMG_7421.JPG",
    "/images/new/IMG_7558.JPG",
    "/images/new/IMG_7563.JPG",
    "/images/img_6323.jpg",
    "/images/new/IMG_7564.JPG",
    "/images/new/IMG_7565.JPG",
  ],
  primaryCtaLabel: "Shop Now",
  primaryCtaHref: "/catalog",
  secondaryCtaLabel: "Our Story",
  secondaryCtaHref: "/our-story",
};
