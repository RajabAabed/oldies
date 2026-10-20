import { resolve } from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        articles: resolve(import.meta.dirname, "articles.html"),
        article: resolve(import.meta.dirname, "article.html"),
        contact: resolve(import.meta.dirname, "contact.html"),
        services: resolve(import.meta.dirname, "services.html"),
        property: resolve(import.meta.dirname, "property.html"),
        district: resolve(import.meta.dirname, "district.html"),
        riyadh: resolve(import.meta.dirname, "riyadh.html"),
        jeddah: resolve(import.meta.dirname, "jeddah.html"),
        valuation: resolve(import.meta.dirname, "valuation.html"),
        faq: resolve(import.meta.dirname, "faq.html"),
        terms: resolve(import.meta.dirname, "terms.html"),
        privacy: resolve(import.meta.dirname, "privacy.html"),
      },
    },
  },
});
