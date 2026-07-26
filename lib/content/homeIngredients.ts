export type Ingredient = {
  name: string;
  benefit: string;
  image: string;
};

export type IngredientsContent = {
  eyebrow: string;
  heading: string;
  // Fixed at exactly 5 — the ring animation's angle offset is tuned for 5
  // items so nothing lands at 12 o'clock. Do not add/remove slots.
  ingredients: [Ingredient, Ingredient, Ingredient, Ingredient, Ingredient];
};

export const defaultIngredientsContent: IngredientsContent = {
  eyebrow: "What's Inside",
  heading: "Key Ingredients",
  ingredients: [
    {
      name: "Kojic Acid",
      benefit: "Brightens & fades dark spots",
      image: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381849/naya-glows/legacy/body-scrub-with-lemon-and-mint.png",
    },
    {
      name: "Lemon Extract",
      benefit: "Evens skin tone & exfoliates",
      image: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381849/naya-glows/legacy/body-scrub-with-lemon-and-mint.png",
    },
    {
      name: "Niacinamide",
      benefit: "Controls oil & reduces redness",
      image: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381849/naya-glows/legacy/body-scrub-with-lemon-and-mint.png",
    },
    {
      name: "Hyaluronic Acid",
      benefit: "Deep lasting hydration",
      image: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381849/naya-glows/legacy/body-scrub-with-lemon-and-mint.png",
    },
    {
      name: "Green Tea Extract",
      benefit: "Antioxidant & anti-inflammatory",
      image: "https://res.cloudinary.com/bhozkz7o/image/upload/v1784381849/naya-glows/legacy/body-scrub-with-lemon-and-mint.png",
    },
  ],
};
