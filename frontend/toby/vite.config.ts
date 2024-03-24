import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg,json}"],
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "toby's carrot farm",
        short_name: "toby",
        start_url: "/",
        scope: ".",
        display: "standalone",
        orientation: "portrait", // landscape // portrait // portrait-primary
        background_color: "#fff",
        theme_color: "#fff",
        description: "app description",
        dir: "ltr",
        lang: "ko-KR",
        icons: [
          {
            src: "/icon-192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/icon-512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "/icon-512.png",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icon-512.png",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
  ],
});
