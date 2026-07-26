export type Category = {
  label: string;
  image: string;
  buttonText: string;
  href: string;
};

export type CategoriesContent = {
  // Fixed at exactly 3 — a fixed 3-column grid, not a scroll list.
  categories: [Category, Category, Category];
};

export const defaultCategoriesContent: CategoriesContent = {
  categories: [
    {
      label: "face",
      image: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381858/naya-glows/legacy/img_6322.jpg",
      buttonText: "shop face",
      href: "/catalog?category=face",
    },
    {
      label: "body",
      image: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381854/naya-glows/legacy/img_6320.jpg",
      buttonText: "shop body",
      href: "/catalog?category=body",
    },
    {
      label: "scent",
      image: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381873/naya-glows/legacy/img_6326.jpg",
      buttonText: "shop scent",
      href: "/catalog?category=scent",
    },
  ],
};
