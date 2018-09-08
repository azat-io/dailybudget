import mongoose from 'mongoose'
import chalk from 'chalk'

class DataBase {
  /**
   * Connect to MongoDB
   */
  connect () {
    const mongoUrl = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
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
