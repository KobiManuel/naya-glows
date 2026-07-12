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
      image: "/images/img_6322.jpg",
      buttonText: "shop face",
      href: "/catalog?category=face",
    },
    {
      label: "body",
      image: "/images/img_6320.jpg",
      buttonText: "shop body",
      href: "/catalog?category=body",
    },
    {
      label: "scent",
      image: "/images/img_6326.jpg",
      buttonText: "shop scent",
      href: "/catalog?category=scent",
    },
  ],
};
