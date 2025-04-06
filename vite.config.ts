import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";

const PWAConfig: Partial<VitePWAOptions> = {
  includeAssets: [
    "/favicon/favicon.ico",
    "robots.txt",
    "/pwa/apple-touch-icon.png",
  ],
  registerType: "autoUpdate",
  manifest: {
    name: "Lithium Weather",
    short_name: "lithium",
    description:
      "Dự đoán thời tiết với những công nghệ web nhanh nhất như React 19, TanStack Router/Query, Vite Rolldown và PWA",
    theme_color: "#ffffff",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "vi",
    icons: [
      {
        src: "/pwa/pwa-64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/pwa/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/pwa/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
  devOptions: {
    enabled: true,
  },
  workbox: {
    sourcemap: true,
  },
};

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    VitePWA(PWAConfig),
    tailwindcss(),
  ],

  clearScreen: false,

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 3000,
  },
});
