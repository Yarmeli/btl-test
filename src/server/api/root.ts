import { createTRPCRouter } from "@/server/api/trpc";
import { examsRouter } from "@/server/api/routers/exams";
import { ownerRouter } from "./routers/owners";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  exams: examsRouter,
  owner: ownerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
