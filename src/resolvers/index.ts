import { DateTimeResolver } from 'graphql-scalars'
import { asNexusMethod } from 'nexus'
import { GraphQLUpload, FileUpload } from 'graphql-upload'

export * from './models'
export * from './queries'
export * from './mutations'
export * from './inputs'

export const GQLDate = asNexusMethod(DateTimeResolver, 'date')

export type Upload = Promise<FileUpload>
// Bang is required due to https://github.com/apollographql/apollo-server/blob/570f548b88750a06fbf5f67a4abe78fb0f870ccd/packages/apollo-server-core/src/index.ts#L49-L56
export const Upload = asNexusMethod(GraphQLUpload!, 'upload')
