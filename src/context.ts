import { PrismaClient } from '.prisma/client'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { Request, Response } from 'express'
import ibm from 'ibm-cos-sdk'

import { prisma } from './clients'
import { getUserId } from './utils'

export interface Context {
  request: Request
  response: Response
  prisma: PrismaClient
  userId: string | undefined
  s3: ibm.S3
}

const config = {
  endpoint: process.env.IBM_OBJECT_STORAGE_ENDPOINT,
  apiKeyId: process.env.IBM_OBJECT_STORAGE_APIKEY,
  serviceInstanceId: process.env.IBM_OBJECT_STORAGE_RESOURCE_INSTANCE_ID,
}

const s3 = new ibm.S3(config)

export async function createContext(
  request: ExpressContext,
): Promise<Partial<Context>> {
  const userId = getUserId(request)

  return {
    ...request,
    response: request.res,
    request: request.req,
    prisma: prisma,
    userId: userId,
    s3,
  }
}
