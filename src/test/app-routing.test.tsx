import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("keeps the withdrawn February 10–14 address routed so it can redirect", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/trips/ski-gudauri-feb-10").at(-1)?.routeId).toBe("/trips/ski-gudauri-feb-10");
  });
  it("routes both Bali departures to their own pages", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/retreats/bali").at(-1)?.routeId).toBe("/retreats/bali");
    expect(router.matchRoutes("/retreats/bali-may").at(-1)?.routeId).toBe("/retreats/bali-may");
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
