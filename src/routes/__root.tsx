import { lazy } from "react";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { Header, ThemeProvider } from "@/components";
import { seo } from "@/lib/utils";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          httpEquiv: "Content-Security-Policy",
          content: "upgrade-insecure-requests",
        },
        ...seo({
          title: "Lithium Weather",
          description:
            "Dự đoán thời tiết với những công nghệ web nhanh nhất như React 19, TanStack Router/Query, Vite Rolldown và PWA",
          keywords:
            "Lithium,Weather,Tracking,App,PWA,Vite,React,Noah,Rolldown,TanStack",
          image: "https://i.ibb.co/DDrZyNy8/lithium-og.png",
        }),
      ],

      links: [
        { rel: "author", href: "https://github.com/Coder-Blue" },
        { rel: "icon", href: "/favicon/favicon.ico" },
        { rel: "shortcut icon", href: "/favicon/favicon-16x16.png" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/pwa/apple-touch-icon-180x180.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "64x64",
          href: "/pwa/pwa-64x64.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/pwa/pwa-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/pwa/pwa-512x512.png",
        },
      ],
    }),
    component: RootComponent,
  },
);

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/react-router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

function RootComponent() {
  return (
    <>
      <HeadContent />
      <ThemeProvider defaultTheme="system">
        <div className="from-background to-muted bg-gradient-to-r">
          <Header />
          <main className="container mx-auto min-h-screen px-4 py-8">
            <Outlet />
          </main>
          <footer className="supports-[backdrop-filter]:bg-background/60 border-t py-12 backdrop-blur">
            <div className="container mx-auto px-4 text-center text-gray-400">
              <a
                href="https://github.com/Coder-Blue/lithium-pwa"
                target="_blank"
                className="hover:underline"
              >
                <p>Lithium Weather &copy;</p>
              </a>
            </div>
          </footer>
        </div>
        <Toaster richColors />
      </ThemeProvider>
      <Scripts />
      <Analytics />
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
