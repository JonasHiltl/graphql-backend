import dotenv from 'dotenv'
dotenv.config()

import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core'
import express from 'express'
import http from 'http'
import { GraphQLUpload, graphqlUploadExpress } from 'graphql-upload'

import { schema } from './schema'
import { createContext } from './context'

async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema: schema,
    context: createContext,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  })
  await server.start()

  app.use(graphqlUploadExpress())

  server.applyMiddleware({ app })
  await new Promise<void>((resolve) => {
    httpServer.listen({ port: 4000 })
    resolve()
  })

  console.log(`🚀 Server ready ` + `http://localhost:4000${server.graphqlPath}`)
}

startApolloServer()
