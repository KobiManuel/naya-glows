import dns from "node:dns";
import type { NextConfig } from "next";

// This machine's IPv6 DNS resolver is unreliable, which made the image
// optimizer's internal fetch() to Cloudinary fail with ENOTFOUND (it tried
// the IPv6 address first). Forcing IPv4-first resolution avoids that.
dns.setDefaultResultOrder("ipv4first");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
