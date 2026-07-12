export type BestSellerCard = {
  name: string;
  result: string;
  quote: string;
  image: string;
  productImage: string;
  productName: string;
  productSub: string;
  href: string;
};

export type BestSellersContent = {
  headingHighlight: string;
  headingRest: string;
  cards: BestSellerCard[];
};

export const defaultBestSellersContent: BestSellersContent = {
  headingHighlight: "Real",
  headingRest: "Results",
  cards: [
    {
      name: "Amara, 34 years",
      result: "Visibly brighter skin in 4 weeks",
      quote:
        "\"The Naya Radiance Boost Serum transformed my skin. It's clearer, more even.\"",
      image: "/images/new/IMG_7561.JPG",
      productImage: "/images/9cb3aae2-d6b9-4d9d-8a24-e679c00c2705.png",
      productName: "Radiance Boost",
      productSub: "Serum",
      href: "/products/radiance-boost-serum",
    },
    {
      name: "Kezia, 29 years",
      result: "Smoother, glowing skin in 3 weeks",
      quote:
        "\"The body scrub gave me a noticeable glow. My skin feels softer and more radiant.\"",
      image: "/images/new/IMG_7562.JPG",
      productImage: "/images/0323d23a-ed8d-4ab5-8f52-b8a8eb31e04f.png",
      productName: "Radiance Scrub",
      productSub: "Exfoliator",
      href: "/products/radiance-body-scrub",
    },
  ],
};
