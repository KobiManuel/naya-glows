export type HowItWorksStep = {
  title: string;
  description: string;
  image: string;
};

export type HowItWorksContent = {
  headingPart1: string;
  headingPart2: string;
  headingPart3: string;
  footerNote: string;
  // Fixed at exactly 3 — the connector/dot UI assumes exactly 3 steps.
  steps: [HowItWorksStep, HowItWorksStep, HowItWorksStep];
};

export const defaultHowItWorksContent: HowItWorksContent = {
  headingPart1: "How It Works:",
  headingPart2: "Just 3",
  headingPart3: "Simple Steps",
  footerNote: "Free delivery on orders over $75. No subscription required.",
  steps: [
    {
      title: "Choose Your Product",
      description:
        "Browse our collection and pick what fits your skin, hair, or wellness needs",
      image: "/images/img_6325.jpg",
    },
    {
      title: "Place Your Order",
      description: "Fast and secure checkout — no subscriptions or hidden fees.",
      image: "/images/img_6326.jpg",
    },
    {
      title: "Get It Delivered",
      description:
        "Enjoy doorstep delivery in just a few days — start your transformation right away",
      image: "/images/img_6328.jpg",
    },
  ],
};
