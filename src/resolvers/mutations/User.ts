import { arg, mutationField, nonNull, nullable, stringArg } from 'nexus'
import { hashSync, compareSync } from 'bcrypt'
import { ApolloError } from 'apollo-server-errors'
import { sign } from 'jsonwebtoken'
import { sendEmail } from '../../utils'
import { User } from '.prisma/client'
import path from 'path'
import fs from 'fs'

const SALT_ROUNDS = 10

export const signUp = mutationField('signUp', {
  type: 'AuthPayload',
  args: {
    username: nonNull(stringArg()),
    email: nonNull(stringArg()),
    firstname: nonNull(stringArg()),
    lastname: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_, args, ctx) => {
    if (args.username.includes('@'))
      return new ApolloError('Cannot include @ in username', 'BAD_USER_INPUT')

    const userByEmail = await ctx.prisma.user.findUnique({
      where: {
        email: args.email,
      },
    })

    if (userByEmail)
      return new ApolloError(
        'User with this Email already exists',
        'BAD_USER_INPUT',
      )

    const userByUsername = await ctx.prisma.user.findUnique({
      where: {
        username: args.username,
      },
    })
    if (userByUsername)
      return new ApolloError('Username already taken', 'BAD_USER_INPUT')

    const hashedPassword = hashSync(args.password, SALT_ROUNDS)

    const user = await ctx.prisma.user.create({
      data: {
        username: args.username,
        email: args.email,
        firstname: args.firstname,
        lastname: args.lastname,
        password: hashedPassword,
        role: 'USER',
      },
    })

    await sendEmail(
      user.email,
      `<a href=exp://192.168.178.27:19000/--/confirmEmail?id=${user.id}>Confirm your account</a>`,
      'Confirm Email',
    )

    let accessToken
    if (process.env.APP_SECRET)
      accessToken = sign({ userId: user.id }, process.env.APP_SECRET)
    return {
      token: accessToken,
      user,
    }
  },
})

export const logIn = mutationField('logIn', {
  type: 'AuthPayload',
  args: {
    usernameOrEmail: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_, args, ctx) => {
    let user: User | null

    if (args.usernameOrEmail.includes('@')) {
      user = await ctx.prisma.user.findUnique({
        where: {
          email: args.usernameOrEmail,
        },
      })
    } else
      user = await ctx.prisma.user.findUnique({
        where: {
          username: args.usernameOrEmail,
        },
      })

    if (!user) return new ApolloError('User not found', 'BAD_USER_INPUT')

    if (!compareSync(args.password, user.password)) {
      return new ApolloError('Wrong password', 'BAD_USER_INPUT')
    }

    let accessToken
    if (process.env.APP_SECRET)
      accessToken = sign({ userId: user.id }, process.env.APP_SECRET)
    return {
      token: accessToken,
      user,
    }
  },
})

export const resendConfirmationEmail = mutationField(
  'resendConfirmationEmail',
  {
    type: 'Boolean',
    resolve: async (_, args, ctx) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.userId,
        },
      })

      if (!user) {
        return new ApolloError('User does not exists', 'BAD_USER_INPUT')
      }

      await sendEmail(
        user.email,
        `<a href=exp://192.168.178.27:19000/--/confirmEmail?id=${user.id}>Confirm your account</a>`,
        'Confirm Email',
      )
      return true
    },
  },
)

export const confirmEmail = mutationField('confirmEmail', {
  type: 'Boolean',
  args: {
    id: nonNull(stringArg()),
  },
  resolve: async (_, args, ctx) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: args.id,
      },
    })

    if (!user) {
      return new ApolloError('User does not exists', 'BAD_USER_INPUT')
    }

    await ctx.prisma.user.update({
      where: {
        id: args.id,
      },
      data: {
        emailVerified: true,
      },
    })
    return true
  },
})

export const uploadProfilePicture = mutationField('uploadProfilePicture', {
  type: nullable('String'),
  args: {
    data: 'Upload',
  },
  resolve: async (_, args, ctx) => {
    try {
      const { filename, mimetype, encoding, createReadStream } = await args.data

      const imageType = filename.split('.')[1]

      const stream = createReadStream()
      const pathName = path.join(__dirname, `./pictures/${ctx.userId}`)
      await stream.pipe(fs.createWriteStream(pathName))

      const s3Params = {
        Bucket: 'test-sessions-profile-pictures',
        Key: ctx.userId,
      }

      await ctx.prisma.user.update({
        where: {
          id: ctx.userId,
        },
        data: {
          picture: 'testpath.com',
        },
      })

      return 'testpath.com'
    } catch (error) {
      console.log(error)
      return null
    }
  },
})
