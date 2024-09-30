import { initEdgeStore } from "@edgestore/server";
import {
  CreateContextOptions,
  createEdgeStoreNextHandler,
} from "@edgestore/server/adapters/next/app";
import { z } from "zod";

type Context = {
  userId: string;
  userRole: "admin" | "user";
};

interface BucketConfig {
  maxSize?: number;
  mimeTypes?: string[];
}

function createContext({ req }: CreateContextOptions): Context {
  // get the session from your auth provider
  return {
    userId: "1234",
    userRole: "user",
  };
}

const es = initEdgeStore.context<Context>().create();

const edgeStoreRouter = es.router({
  // Bucket for images
  myPublicImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 1, // 1MB for images
    })
    .input(
      z.object({
        type: z.enum(["post", "profile"]),
      })
    )
    .path(({ input }) => [{ type: input.type }]),

  // Bucket for PDFs
  myPublicPDFs: es
    .fileBucket({
      maxSize: 1024 * 1024 * 5, // 5MB for PDFs
      mimeTypes: ["application/pdf"], // Only accept PDFs
    } as BucketConfig) // Add type assertion here
    .input(
      z.object({
        type: z.enum(["pdf"]), // Specific to PDFs
      })
    )
    .path(({ input }) => [{ type: input.type }]),

  // Optionally, add a protected file bucket if needed for private PDFs or files
  myProtectedFiles: es
    .fileBucket()
    .path(({ ctx }) => [{ owner: ctx.userId }])
    .accessControl({
      OR: [
        {
          userId: { path: "owner" },
        },
        {
          userRole: { eq: "admin" },
        },
      ],
    }),
});

// Create the EdgeStore handler for Next.js API routes
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
