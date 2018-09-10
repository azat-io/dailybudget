import express from 'express'
import path from 'path'
import chalk from 'chalk'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { ApolloServer } from 'apollo-server-express'
import { importSchema } from 'graphql-import'

import isNil from 'lodash/isNil'

import database from './database'
import resolvers from './resolvers'

import {
  Category,
  User,
} from './models'

dotenv.config()
database.connect()

const app = express()

app.use(cors({
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
  credentials: true,
}))

app.use(async (request, response, next) => {
  const token = request.headers['authorization']
  console.log('token', token)
  if (!isNil(token)) {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET)
      console.log('Current User:', currentUser)
    } catch (error) {
      console.log('Token verification error:', error)
    }
  }
  next()
})

const server = new ApolloServer({
  typeDefs: importSchema(path.join(__dirname, './type-defs.graphql')),
  resolvers,
  context: () => ({
    Category,
    User,
  }),
})

server.applyMiddleware({ app, path: '/api' })

app.listen(process.env.SERVER_PORT, () => {
  console.log(chalk.bold('Server is up and running on: ' +
    chalk.yellow(`http://localhost:${process.env.SERVER_PORT}`)))
})
