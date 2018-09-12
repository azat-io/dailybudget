import mongoose from 'mongoose'
import chalk from 'chalk'

class DataBase {
  /**
   * Connect to MongoDB
   */
  connect () {
    mongoose.set('useCreateIndex', true)
    const { DB_HOST, DB_PORT, DB_NAME } = process.env
    const mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
    mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
    }).then(() => {
      console.log(chalk.bold('MongoDB is up on: ' +
        chalk.green(mongoUrl)))
    }).catch((error) => {
      console.log(chalk.bold('MongoDB error: ' +
        chalk.red(error)))
    })
  }
}

const database = new DataBase()

export default database
