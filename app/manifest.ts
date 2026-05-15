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
        src: "/images/emoji.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/images/emoji.webp",
        sizes: "any",
        type: "image/webp",
      },
    ],
  }
}
