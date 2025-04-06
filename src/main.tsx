import { createRoot } from "react-dom/client";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { DefaultLoading, ErrorComponent, NotFound } from "@/components";

import { routeTree } from "./routeTree.gen";
import "./styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  context: { queryClient },
  defaultStaleTime: 0,
  defaultPreload: "intent",
  defaultPendingComponent: DefaultLoading,
  defaultNotFoundComponent: NotFound,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}
