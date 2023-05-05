import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const examsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.examCenter.findMany({ include: { owner: true } });
  }),

  addExamCentre: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        address: z.string().min(1),
        town: z.string().min(1),
        owner: z.string().min(1),
        country: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Does this owner exist?

      const owner = await ctx.prisma.owner.findFirst({
        where: {
          username: input.owner,
        },
      });

      if (!owner) {
        return {
          success: false as const,
          error: `This owner '${input.owner}' does not exist`,
        };
      }

      const data = await ctx.prisma.examCenter.create({
        data: {
          name: input.name,
          address: input.address,
          town: input.town,
          country: input.country,
          owner: {
            connect: {
              id: owner.id,
            },
          },
        },
      });

      return {
        success: true as const,
        data: data,
      };
    }),

  updateExamCentre: publicProcedure
    .input(
      z.object({
        centreId: z.string(),
        name: z.string(),
        address: z.string(),
        town: z.string(),
        owner: z.string(),
        country: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Does the new owner exist?

      const owner = await ctx.prisma.owner.findFirst({
        where: {
          username: input.owner,
        },
      });

      if (!owner) {
        return {
          success: false as const,
          error: `This owner '${input.owner}' does not exist`,
        };
      }

      const data = await ctx.prisma.examCenter.update({
        where: {
          id: input.centreId,
        },
        data: {
          name: input.name,
          address: input.address,
          town: input.town,
          country: input.country,
          owner: {
            connect: {
              id: owner.id,
            },
          },
        },
      });

      return {
        success: true as const,
        data: data,
      };
    }),

  deleteExamCentre: publicProcedure
    .input(
      z.object({
        centreId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.examCenter.delete({
        where: {
          id: input.centreId,
        },
      });

      return {
        success: true as const,
        deletedExam: data,
      };
    }),
});
