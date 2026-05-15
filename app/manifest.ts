import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Matias Vallejos",
    short_name: "Matias",
    description:
      "Product Engineer & Co-Founder @ Tegu. Building lean products from Córdoba, Argentina.",
    start_url: "/",
    display: "standalone",
    background_color: "#080706",
    theme_color: "#080706",
    icons: [
      {
        src: "/images/emoji.webp",
        sizes: "96x96",
        type: "image/webp",
      },
      {
        src: "/images/emoji-180.webp",
        sizes: "180x180",
        type: "image/webp",
      },
      {
        src: "/images/emoji-512.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "any maskable",
      },
    ],
  }
}
