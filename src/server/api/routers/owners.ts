import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const ownerRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.owner.findMany();
  }),

  addOwner: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        forename: z.string(),
        surname: z.string(),
        dob: z.date(),
        gender: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.owner.create({
        data: {
          username: input.username,
          password: input.password,
          forename: input.forename,
          surname: input.surname,
          dob: input.dob,
          gender: input.gender,
        },
      });

      return {
        success: true as const,
        data: data,
      };
    }),

  updateOwner: publicProcedure
    .input(
      z.object({
        ownerId: z.string(),
        username: z.string(),
        password: z.string(),
        forename: z.string(),
        surname: z.string(),
        dob: z.date(),
        gender: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.owner.update({
        where: {
          id: input.ownerId,
        },
        data: {
          username: input.username,
          password: input.password,
          forename: input.forename,
          surname: input.surname,
          dob: input.dob,
          gender: input.gender,
        },
      });

      return {
        success: true as const,
        data: data,
      };
    }),

  deleteOwner: publicProcedure
    .input(
      z.object({
        ownerId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.prisma.owner.delete({
        where: {
          id: input.ownerId,
        },
      });

      return {
        success: true as const,
        deletedExam: data,
      };
    }),
});
