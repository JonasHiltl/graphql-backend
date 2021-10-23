import { nonNull, nullable, queryField, stringArg } from 'nexus'

export const me = queryField('me', {
  type: nullable('User'),
  resolve: async (_root, _args, ctx) => {
    return ctx.prisma.user
      .findUnique({
        where: {
          id: ctx.userId,
        },
      })
      .then()
  },
})

export const myFollowerCount = queryField('myFollowerCount', {
  type: 'User',
  resolve: async (_root, _args, ctx) => {
    return ctx.prisma.user
      .findUnique({
        where: {
          id: ctx.userId,
        },
        select: {
          _count: {
            select: { followers: true },
          },
        },
      })
      .then()
  },
})

export const userNameExists = queryField('userNameExists', {
  type: 'Boolean',
  args: {
    username: nonNull(stringArg()),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const user = await ctx.prisma.user.findUnique({
        where: {
          username: args.username,
        },
      })
      return Boolean(user)
    } catch (error) {
      console.log(error)
    }
  },
})

export const userById = queryField('userById', {
  type: nullable('User'),
  args: {
    id: nonNull(stringArg()),
  },
  resolve: async (root, args, ctx) => {
    return ctx.prisma.user
      .findUnique({
        where: {
          id: args.id,
        },
      })
      .then()
  },
})

export const userByUsername = queryField('userByUsername', {
  type: nullable('User'),
  args: {
    username: nonNull(stringArg()),
  },
  resolve: async (root, args, ctx) => {
    return ctx.prisma.user
      .findUnique({
        where: {
          username: args.username,
        },
      })
      .then()
  },
})
