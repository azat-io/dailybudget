import express from 'express'
import path from 'path'
import chalk from 'chalk'
import cors from 'cors'
import dotenv from 'dotenv'

import { ApolloServer } from 'apollo-server-express'
import { importSchema } from 'graphql-import'

import database from './database'
import resolvers from './resolvers'

import {
  Category,
} from './models'

dotenv.config()
database.connect()

const app = express()

app.use(cors())

const server = new ApolloServer({
  typeDefs: importSchema(path.join(__dirname, './type-defs.graphql')),
  resolvers,
  context: () => ({
    Category,
  }),
})

server.applyMiddleware({ app, path: '/api' })

app.listen(process.env.SERVER_PORT, () => {
  console.log(chalk.bold('Server is up and running on: ' +
    chalk.yellow(`http://localhost:${process.env.SERVER_PORT}`)))
})
