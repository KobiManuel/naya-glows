export type Branch = {
  name: string;
  address: string;
  phone: string;
  hours: string;
};

export type BranchesContent = {
  heading: string;
  // Variable length — admins can add/remove branches freely as the
  // business opens new locations.
  branches: Branch[];
};

export const defaultBranchesContent: BranchesContent = {
  heading: "Visit Us",
  branches: [
    {
      name: "Naya Glows HQ",
      address: "Lagos, Nigeria",
      phone: "+234 800 000 0000",
      hours: "Mon–Sat, 9am–6pm",
    },
  ],
};
