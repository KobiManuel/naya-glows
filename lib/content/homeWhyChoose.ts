export type WhyChooseFeature = {
  title: string;
  description: string;
};

export type WhyChooseContent = {
  headingLine1: string;
  headingLine2: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  stat1Value: string;
  stat1Label: string;
  stat1Sublabel: string;
  stat2Value: string;
  stat2Label: string;
  // Fixed at exactly 3 — one per icon (FlaskConical, Rocket, MessageCircleHeart).
  features: [WhyChooseFeature, WhyChooseFeature, WhyChooseFeature];
};

export const defaultWhyChooseContent: WhyChooseContent = {
  headingLine1: "Why Choose",
  headingLine2: "Naya?",
  primaryCtaLabel: "Get Started",
  secondaryCtaLabel: "Online consultation",
  stat1Value: "27%",
  stat1Label: "Skin Clarity",
  stat1Sublabel: "Improvements in 4 weeks",
  stat2Value: "23+",
  stat2Label: "Trusted by thousands",
  features: [
    {
      title: "Clinically Proven Formulas",
      description:
        "Backed by science and dermatology, every product is tested for visible results.",
    },
    {
      title: "Fast, Visible Results",
      description:
        "From clearer skin to smoother texture — most users notice changes within 2–4 weeks.",
    },
    {
      title: "Personalized Support",
      description:
        "Expert guidance and easy online consultation to help you achieve your skincare goals.",
    },
  ],
};
