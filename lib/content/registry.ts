export type ContentSectionMeta = {
  key: string;
  label: string;
  group: string;
  description: string;
};

export const contentRegistry: ContentSectionMeta[] = [
  {
    key: "home.featuredProducts",
    label: "Featured Products",
    group: "Homepage",
    description: "Heading, description, and the 2 product cards + lifestyle image card.",
  },
  {
    key: "home.hero",
    label: "Hero",
    group: "Homepage",
    description: "Headline, subheadline, background image, and CTA buttons.",
  },
  {
    key: "home.ingredients",
    label: "Key Ingredients",
    group: "Homepage",
    description: "The 5 ingredient cards (name, benefit, image).",
  },
  {
    key: "home.whyChoose",
    label: "Why Choose Naya",
    group: "Homepage",
    description: "Heading, 3 feature cards, stat callouts, and CTA buttons.",
  },
  {
    key: "home.howItWorks",
    label: "How It Works",
    group: "Homepage",
    description: "Heading and the 3 step cards.",
  },
  {
    key: "home.testimonials",
    label: "Testimonials",
    group: "Homepage",
    description: "Customer reviews — add, edit, or remove freely.",
  },
  {
    key: "home.categories",
    label: "Shop Categories",
    group: "Homepage",
    description: "The 3 category tiles (face / body / scent).",
  },
  {
    key: "home.bestSellers",
    label: "Best Sellers",
    group: "Homepage",
    description: "Heading and the 2 customer result cards (photo, quote, product).",
  },
  {
    key: "catalog.hero",
    label: "Catalog Hero",
    group: "Catalog Page",
    description: "Headline, subheading, and toggle labels for the Skincare/Scent collections.",
  },
  {
    key: "contact.info",
    label: "Contact Info",
    group: "Contact Page",
    description: "Email, phone, and address shown on the Contact page.",
  },
  {
    key: "business.branches",
    label: "Branches",
    group: "Business",
    description: "The store/branch list on the Branches page — add or remove freely.",
  },
];
