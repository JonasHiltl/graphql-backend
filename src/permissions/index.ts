import { ApolloError } from 'apollo-server-errors'
import { rule, shield, or } from 'graphql-shield'
import { Context } from '../context'

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, ctx: Context) => {
    if (ctx.userId) return true
    return new ApolloError('Unauthorized, no token provided', 'FORBIDDEN')
  }),
  isAdmin: rule()(async (_parent, _args, ctx: Context) => {
    if (ctx.userId) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.userId,
        },
      })
      if (user?.role === 'ADMIN') return true
      return new ApolloError('Unauthorized, only admin access', 'FORBIDDEN')
    }
    return new ApolloError('Unauthorized, only admin access', 'FORBIDDEN')
  }),
  isDev: rule()(async (_parent, _args, ctx: Context) => {
    if (ctx.userId) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.userId,
        },
      })
      if (user?.role === 'Dev') return true
      return new ApolloError('Unauthorized, only dev access', 'FORBIDDEN')
    }
    return new ApolloError('Unauthorized, only dev access', 'FORBIDDEN')
  }),
  /* isPostOwner: rule()(async (_parent, args, ctx: Context) => {
    const author = await ctx.prisma.followRelation.findUnique({
        where: {
          id: args.id,
        },
      })
      .author()
    return ctx.userId === author.id
  }), */
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    myFollowerCount: rules.isAuthenticatedUser,
  },
  Mutation: {
    resendConfirmationEmail: rules.isAuthenticatedUser,
    uploadProfilePicture: rules.isAuthenticatedUser,
  },
})
