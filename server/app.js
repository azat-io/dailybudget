import express from 'express'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import database from './database'

import categories from './controllers/categories'

const app = express()
const logError = error => chalk.bold.red('Error: ') + error

dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
}))

app.use(express.static('public'))

app.get('/api/categories', categories.all)
app.get('/api/categories/:id', categories.findById)
app.post('/api/categories', categories.create)
app.put('/api/categories/:id', categories.update)
app.delete('/api/categories/:id', categories.delete)

database.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, error => {
  if (error) {
    return logError(error)
  }
  app.listen(process.env.SERVER_PORT, () => {
    console.log(chalk.bold('Server is up and running on port: ' +
      chalk.yellow(process.env.SERVER_PORT)))
  })
})
