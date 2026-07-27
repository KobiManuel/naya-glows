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
      image: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381930/naya-glows/legacy/new/img_7561.jpg",
      productImage: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381853/naya-glows/legacy/img_6205.jpg",
      productName: "Radiance Boost",
      productSub: "Serum",
      href: "/products/radiance-boost-serum",
    },
    {
      name: "Kezia, 29 years",
      result: "Smoother, glowing skin in 3 weeks",
      quote:
        "\"The body scrub gave me a noticeable glow. My skin feels softer and more radiant.\"",
      image: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381938/naya-glows/legacy/new/img_7563.jpg",
      productImage: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381835/naya-glows/legacy/19ea7a51-adb2-4a49-bcb7-0bbc0116f4f2.png",
      productName: "Radiance Scrub",
      productSub: "Exfoliator",
      href: "/products/exfoliating-body-scrub",
    },
  ],
};
