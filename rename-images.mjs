// rename-images.mjs
import fs from "fs";
import path from "path";

const dir = "./public/images";

fs.readdirSync(dir).forEach((file) => {
  const oldPath = path.join(dir, file);
  const newName = file
    .toLowerCase() // lowercase everything
    .replace(/\s+/g, "-"); // spaces → hyphens
  const newPath = path.join(dir, newName);

  if (oldPath !== newPath) {
    fs.renameSync(oldPath, newPath);
    console.log(`✓ ${file} → ${newName}`);
  }
});

console.log("Done.");
