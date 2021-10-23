import { enumType, objectType } from 'nexus'

// User
// FollowRelation
// Event

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('username')
    t.string('email')
    t.boolean('emailVerified')
    t.string('firstname')
    t.nullable.string('lastname')
    t.nullable.string('picture')
    t.field('role', { type: Role })
    t.nullable.list.nonNull.field('followers', {
      type: FollowRelation,
      resolve: async (parent, _args, ctx) => {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .followers({ where: { accepted: true } })
      },
    })
    t.nullable.list.nonNull.field('following', {
      type: 'FollowRelation',
      resolve: async (parent, _args, ctx) => {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .following({ where: { accepted: true } })
      },
    })
  },
})

export const FollowRelation = objectType({
  name: 'FollowRelation',
  definition(t) {
    t.string('fromId')
    t.string('toId')
    t.field('from', {
      type: User,
      resolve: async (parent, _args, ctx) => {
        return ctx.prisma.user
          .findUnique({
            where: {
              id: parent.fromId,
            },
            rejectOnNotFound: true,
          })
          .then()
      },
    })
    t.field('to', {
      type: User,
      resolve: async (parent, _args, ctx) => {
        return ctx.prisma.user
          .findUnique({
            where: {
              id: parent.toId,
            },
            rejectOnNotFound: true,
          })
          .then()
      },
    })
    t.boolean('accepted')
    t.date('createdAt')
    t.date('updatedAt')
  },
})

const Role = enumType({
  name: 'Role',
  members: ['USER', 'DEV', 'ADMIN'],
})

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})
